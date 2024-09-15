const axios = require('axios');
const msal = require('@azure/msal-node'); // Microsoft Authentication Library

class PowerBiService {
  constructor() {
    this.config = {
      clientId: '18e93edb-4a8c-404e-9b07-15cc9e303c1e',
      clientSecret: 'ad33b89f-a22c-4041-9bdc-9cd1d768bf69',
      tenantId: '70ad6609-70d8-4962-a379-3581f839202a',
      workspaceId: '0d3b31ea-6b41-4641-beb1-7f63d1042e63',
    };
    this.apiUrl = 'https://api.powerbi.com/v1.0/myorg/';
  }

//   CLIENT_ID=18e93edb-4a8c-404e-9b07-15cc9e303c1e
// CLIENT_SECRET=ad33b89f-a22c-4041-9bdc-9cd1d768bf69
// TENANT_ID=70ad6609-70d8-4962-a379-3581f839202a
// REDIRECT_URI=http://localhost:5173/auth/callback


  // Function to get an access token using MSAL
  async getAccessToken() {
    const msalConfig = {
      auth: {
        clientId: this.config.clientId,
        authority: `https://login.microsoftonline.com/${this.config.tenantId}`,
        clientSecret: this.config.clientSecret,
      },
    };

    const cca = new msal.ConfidentialClientApplication(msalConfig);
    const tokenResponse = await cca.acquireTokenByClientCredential({
      scopes: ['https://analysis.windows.net/powerbi/api/.default'],
    });
    
    return tokenResponse.accessToken;
  }

  // Function to upload and analyze dataset in Power BI
  async uploadAndAnalyzeDataset(dataset) {
    const accessToken = await this.getAccessToken();

    // Upload dataset to Power BI (assuming you have an import API)
    const importUrl = `${this.apiUrl}groups/${this.config.workspaceId}/imports`;
    const formData = new FormData();
    formData.append('dataset', dataset.path);

    const uploadResponse = await axios.post(importUrl, formData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    const reportId = uploadResponse.data.id; // Report ID from the response

    // Generate embed information for the Power BI report
    const embedUrl = `${this.apiUrl}groups/${this.config.workspaceId}/reports/${reportId}`;
    return { embedUrl, accessToken, reportId };
  }
}

module.exports = PowerBiService;

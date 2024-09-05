const msal = require('@azure/msal-node');
const axios = require('axios');
const config = require('../config/config');

const msalConfig = {
    auth: {
        clientId: config.clientId,
        authority: config.authorityUrl,
        clientSecret: config.clientSecret
    }
};

const pca = new msal.ConfidentialClientApplication(msalConfig);

const getAccessToken = async () => {
    const tokenRequest = {
        scopes: ["https://graph.microsoft.com/.default"],
    };

    try {
        const response = await pca.acquireTokenByClientCredential(tokenRequest);
        return response.accessToken;
    } catch (error) {
        console.error('Error acquiring access token:', error);
        throw error;
    }
};

const uploadDataset = async (accessToken, dataset) => {
    const url = `${config.powerBiApiUrl}v1.0/myorg/datasets`;

    try {
        const response = await axios.post(url, dataset, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading dataset:', error);
        throw error;
    }
};

// Additional Power BI functions like createReport, getReport, etc. can be added here.

module.exports = {
    getAccessToken,
    uploadDataset
};

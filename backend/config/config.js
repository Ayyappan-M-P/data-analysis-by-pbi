require('dotenv').config();

module.exports = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    tenantId: process.env.TENANT_ID,
    authorityUrl: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
    powerBiApiUrl: "https://api.powerbi.com/",
    redirectUri: process.env.REDIRECT_URI
};

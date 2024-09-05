const powerbiService = require('../services/powerbiService');

exports.uploadDataset = async (req, res) => {
    try {
        const accessToken = await powerbiService.getAccessToken();
        const dataset = req.body;  // Assuming dataset details are sent in request body
        const response = await powerbiService.uploadDataset(accessToken, dataset);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

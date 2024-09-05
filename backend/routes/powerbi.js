const express = require('express');
const powerbiController = require('../controllers/powerbiController');
const router = express.Router();

router.post('/uploadDataset', powerbiController.uploadDataset);

// Additional routes for creating reports, getting reports, etc., can be added here.

module.exports = router;

// // server.js
// const express = require('express');
// const cors = require('cors');
// app.use(cors()); // This allows requests from any origin

// const app = express();
// const PORT = 3000;

// // Middleware
// app.use(cors()); // Enable CORS for all routes
// app.use(express.json()); // For parsing application/json

// // Sample route
// app.post('/api/analyze', (req, res) => {
//   const dataset = req.body.dataset;
//   // Analyze dataset here and generate a report
//   const report = generateReport(dataset); // Example function
//   res.json({ report });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// function generateReport(dataset) {
//   // Logic to analyze dataset and return a report
//   return {
//     pieChart: {}, // Data for pie chart
//     barChart: {}, // Data for bar chart
//     lineChart: {} // Data for line chart
//   };
// }


// server.js
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const { parse } = require('csv-parse/sync'); // Assumes dataset is in CSV format
// const app = express();
// const port = 3000;

// app.use(cors());
// app.use(bodyParser.json());

// app.post('/api/analyze', (req, res) => {
//     const { dataset } = req.body;
    
//     // Parse the dataset (assuming CSV format)
//     const records = parse(dataset, {
//         columns: true,
//         skip_empty_lines: true,
//     });

//     // Example: Counting the occurrences of values in the first column
//     const result = {};
//     for (const record of records) {
//         const key = record[Object.keys(record)[0]]; // Get the first column's value
//         if (result[key]) {
//             result[key]++;
//         } else {
//             result[key] = 1;
//         }
//     }

//     // Respond with the analysis report
//     res.json({ report: result });
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });


const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const PowerBiService = require('./services/powerbiService'); // Power BI service to handle embedding

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/pbi', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Route to handle dataset upload and analysis
app.post('/api/analyze-dataset', upload.single('dataset'), async (req, res) => {
  const dataset = req.file; // The uploaded dataset
  const powerBiService = new PowerBiService();

  try {
    // Upload dataset to Power BI and get embed info (like embedUrl and accessToken)
    const reportEmbedInfo = await powerBiService.uploadAndAnalyzeDataset(dataset);

    // Send embed information to frontend
    res.json({
      success: true,
      embedUrl: reportEmbedInfo.embedUrl,
      accessToken: reportEmbedInfo.accessToken,
      embedReportId: reportEmbedInfo.reportId,
    });
  } catch (error) {
    console.error('Failed to analyze dataset:', error);
    res.status(500).json({ success: false, message: 'Failed to analyze dataset' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


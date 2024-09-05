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


// backend/server.js

const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Endpoint for handling file uploads and analysis
app.post('/api/analyze-dataset', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // Access the uploaded file
    let dataset = req.files.dataset;

    // Process the dataset (for example, save it to the server, analyze it, etc.)
    // For now, we'll just send a response back saying it was received
    dataset.mv(path.join(__dirname, 'uploads', dataset.name), (err) => {
        if (err) {
            return res.status(500).send(err);
        }

        // After processing the dataset, send back a success response
        res.send('File uploaded and analyzed successfully');
    });
});

// Start the server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

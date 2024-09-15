const mongoose = require('mongoose');

const analysisResultSchema = new mongoose.Schema({
  analysisType: String,
  data: Object,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const AnalysisResult = mongoose.model('AnalysisResult', analysisResultSchema);

module.exports = AnalysisResult;

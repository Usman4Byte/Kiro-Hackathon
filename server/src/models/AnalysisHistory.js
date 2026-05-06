const mongoose = require('mongoose');

const analysisHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    matchResultId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MatchResult',
      required: true,
    },
    metadata: {
      type: Map,
      of: String,
    },
  },
  {
    timestamps: true,
  }
);

const AnalysisHistory = mongoose.model('AnalysisHistory', analysisHistorySchema);
module.exports = AnalysisHistory;

const mongoose = require('mongoose');

const matchResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobDescription',
      required: true,
    },
    jobTitle: String,
    company: String,
    scores: {
      overall: Number,
      semantic: Number,
      ats: Number,
      experience: Number,
    },
    matchedSkills: [
      {
        name: String,
        strength: Number, // 0-100
      },
    ],
    missingSkills: [
      {
        name: String,
        importance: String, // High, Medium, Low
      },
    ],
    weakSkills: [
      {
        name: String,
        strength: Number,
        note: String,
      },
    ],
    radarData: [
      {
        subject: String,
        A: Number,
        fullMark: { type: Number, default: 100 },
      },
    ],
    semanticExplanation: String,
    suggestions: [
      {
        priority: { type: String, enum: ['High', 'Medium', 'Low'] },
        category: String,
        title: String,
        description: String,
        action: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const MatchResult = mongoose.model('MatchResult', matchResultSchema);
module.exports = MatchResult;

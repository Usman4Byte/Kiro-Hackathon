const mongoose = require('mongoose');

const jobDescriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      default: 'Unknown Role',
    },
    company: {
      type: String,
      default: 'Unknown Company',
    },
    rawText: {
      type: String,
      required: true,
    },
    extractedSkills: [
      {
        name: String,
        importance: {
          type: String,
          enum: ['High', 'Medium', 'Low'],
          default: 'Medium',
        },
      },
    ],
    requirements: [String],
    embedding: {
      type: [Number],
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

const JobDescription = mongoose.model('JobDescription', jobDescriptionSchema);
module.exports = JobDescription;

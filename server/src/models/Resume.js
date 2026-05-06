const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    originalFilename: {
      type: String,
    },
    fileUrl: {
      type: String, // Local path or cloud URL
    },
    rawText: {
      type: String,
      required: true,
    },
    parsedData: {
      contact: {
        email: String,
        phone: String,
        links: [String],
      },
      skills: [String],
      experience: [
        {
          title: String,
          company: String,
          dateRange: String,
          bullets: [String],
        },
      ],
      education: [
        {
          degree: String,
          institution: String,
          year: String,
        },
      ],
    },
    embedding: {
      type: [Number], // For fast semantic similarity search later
      select: false,  // Don't fetch by default, it's large
    },
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model('Resume', resumeSchema);
module.exports = Resume;

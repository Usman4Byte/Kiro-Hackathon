# 🚀 ResumeAI - Smart Resume Matching & Career Coach

ResumeAI is a high-performance, AI-driven platform designed to bridge the gap between job seekers and their dream roles. By leveraging advanced Large Language Models (LLMs), it provides instant ATS compatibility scoring, semantic job matching, and a personalized AI career coach.

![Main Dashboard Mockup](https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=2070)

---

## ✨ Key Features

### 🔍 Smart Analysis
- **Resume Parsing**: Instantly extract text and structured data from PDF, DOCX, and TXT files.
- **ATS Compatibility**: Get an "ATS Score" that predicts how well your resume will pass through automated screening systems.
- **Semantic Matching**: Beyond keyword matching—our AI understands the *context* and *intent* of your experience relative to the job description.

### 🛠 AI Improvement Studio
- **Bullet Point Optimizer**: Paste your existing resume bullets and get them rewritten to be more impactful, metric-driven, and action-oriented.
- **Dynamic Suggestions**: Receive specific, actionable feedback on what's missing from your profile.

### 🤖 AI Resume Coach
- **Context-Aware Chat**: A floating AI assistant that knows your current match results and can answer questions like "How do I improve my React score?" or "What should I emphasize for this role?"

### 📊 Professional Dashboard
- **Performance Trends**: Track your improvement over time with beautiful, interactive charts.
- **History Tracking**: Keep a secure record of all your previous analyses and job-specific versions.

---

## 🛠 Tech Stack

### Frontend
- **React (Vite)**: For a lightning-fast, modern UI experience.
- **Tailwind CSS**: Custom-designed, premium aesthetics with glassmorphism and smooth animations.
- **Framer Motion**: For fluid, professional transitions and micro-interactions.
- **Recharts**: For data visualization and performance tracking.
- **Zustand**: Lightweight, scalable state management.

### Backend
- **Node.js & Express**: Robust and scalable server architecture.
- **MongoDB & Mongoose**: Flexible, document-based data storage.
- **Google Gemini AI**: Powering the core analysis and embedding engine.
*   **OpenRouter**: Integrated as a high-reliability fallback for AI generation.
- **JWT & Bcrypt**: Secure, industry-standard authentication.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- Google Gemini API Key or OpenRouter API Key

### 2. Installation

Clone the repository:
```bash
git clone https://github.com/your-username/kiro-hackathon.git
cd kiro-hackathon
```

Install dependencies for both folders:
```bash
# Install Server Dependencies
cd server
npm install

# Install Client Dependencies
cd ../client
npm install
```

### 3. Environment Setup

Create a `.env` file in the `server` folder:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
GEMINI_API_KEY=your_gemini_key
OPENROUTER_API_KEY=your_openrouter_key
CORS_ORIGIN=http://localhost:5173
```

Create a `.env` file in the `client` folder:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Running Locally

Start the backend:
```bash
cd server
npm run dev
```

Start the frontend:
```bash
cd client
npm run dev
```

---

## 📦 Deployment

The project is optimized for **Vercel**. 

- **Backend**: Configure as a Serverless Function using the included `server/vercel.json`.
- **Frontend**: Deploy as a standard Vite project using `client/vercel.json` for SPA support.

*Detailed instructions can be found in the [Deployment Guide](C:\Users\usman\.gemini\antigravity\brain\2e2edb0a-96d1-4409-ba71-670ad6f94a1f\deployment_guide.md).*

---

## 🛡 License

This project is developed for the **Kiro Hackathon**. 

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/kiro-hackathon/issues).

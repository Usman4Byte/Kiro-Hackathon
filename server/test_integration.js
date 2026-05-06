require('dotenv').config();
const mongoose = require('mongoose');
const resumeService = require('./src/services/resumeService');
const matchService = require('./src/services/matchService');
const logger = require('./src/utils/logger');

const SAMPLE_RESUME = `
John Doe
Email: john@example.com
Phone: 123-456-7890
LinkedIn: linkedin.com/in/johndoe

Summary:
Experienced Software Engineer with 5 years of expertise in full-stack development.
Expert in React, Node.js, and MongoDB.

Skills:
React, Node.js, JavaScript, MongoDB, Express, AWS, TypeScript, HTML/CSS.

Experience:
Senior Developer at Tech Corp (2020 - Present)
- Developed and maintained high-traffic React applications.
- Optimized backend APIs in Node.js, improving performance by 40%.
- Led a team of 3 junior developers.

Education:
BS in Computer Science, University of Technology (2015-2019)
`;

const SAMPLE_JD = `
Job Title: Senior Frontend Engineer
Company: InnovateX

We are looking for a Senior Frontend Engineer to lead our web application development.
Requirements:
- 5+ years of experience with React.js.
- Strong knowledge of Node.js and RESTful APIs.
- Experience with TypeScript is a plus.
- Hands-on with cloud services (AWS).
- Proficiency in CSS/HTML.

Responsibilites:
- Architect scalable frontend solutions.
- Collaborate with backend teams for API integration.
- Mentor junior engineers.
`;

async function runTest() {
  try {
    console.log('--- STARTING INTEGRATION TEST ---');
    
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected!');

    const testUserId = '69fb00b4470d2f20e4dba04c'; // From previous tests
    const sleep = (ms) => new Promise(res => setTimeout(res, ms));

    // 1. Process Resume
    console.log('\nStep 1: Processing Resume...');
    const resume = await resumeService.processResume(testUserId, SAMPLE_RESUME, 'sample_resume.txt');
    console.log('Resume processed! ID:', resume._id);
    console.log('Extracted Skills:', resume.parsedData.skills);

    await sleep(2000);

    // 2. Process Job Description
    console.log('\nStep 2: Processing Job Description...');
    const job = await resumeService.processJobDescription(testUserId, SAMPLE_JD);
    console.log('Job processed! ID:', job._id);
    console.log('Job Title:', job.title);

    await sleep(2000);

    // 3. Perform Match Analysis
    console.log('\nStep 3: Performing Match Analysis...');
    const match = await matchService.performAnalysis(testUserId, resume._id, job._id);
    
    console.log('\n--- ANALYSIS RESULT ---');
    console.log('Overall Score:', match.scores.overall + '%');
    console.log('Semantic Score:', match.scores.semantic + '%');
    console.log('ATS Score:', match.scores.ats + '%');
    console.log('Matched Skills:', match.matchedSkills.length);
    console.log('Missing Skills:', match.missingSkills.length);
    console.log('Top Suggestion:', match.suggestions[0]?.title);
    
    console.log('\n--- TEST SUCCESSFUL ---');
  } catch (error) {
    console.error('\n--- TEST FAILED ---');
    console.error(error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

runTest();

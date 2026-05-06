// Mock data for development — replace with real API calls

export const mockUser = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  avatar: null,
  plan: 'Pro',
  createdAt: '2024-01-15',
  analysisCount: 24,
  avgScore: 73,
}

export const mockAnalysis = {
  id: 'ana-001',
  jobTitle: 'Senior Frontend Engineer',
  company: 'Stripe',
  createdAt: new Date().toISOString(),
  overallScore: 78,
  atsScore: 82,
  semanticScore: 74,
  matchedSkills: [
    { name: 'React.js', strength: 95 },
    { name: 'TypeScript', strength: 88 },
    { name: 'JavaScript', strength: 92 },
    { name: 'REST APIs', strength: 80 },
    { name: 'Git', strength: 90 },
    { name: 'CSS/SCSS', strength: 85 },
    { name: 'Node.js', strength: 70 },
  ],
  missingSkills: [
    { name: 'GraphQL', importance: 'High' },
    { name: 'WebSockets', importance: 'Medium' },
    { name: 'Docker', importance: 'Medium' },
    { name: 'AWS', importance: 'Low' },
  ],
  weakSkills: [
    { name: 'System Design', strength: 45, note: 'Mentioned briefly but lacks depth' },
    { name: 'Performance Optimization', strength: 50, note: 'Only basic concepts covered' },
    { name: 'Testing (Jest)', strength: 55, note: 'Limited examples provided' },
  ],
  semanticExplanation: `Your resume demonstrates strong proficiency in frontend technologies with a particular emphasis on React ecosystem. The semantic similarity analysis shows that your experience aligns well with the core engineering requirements, especially in component architecture and state management.

However, the job description places significant emphasis on GraphQL and real-time data handling, which are areas not covered in your resume. Additionally, the role requires leadership in architectural decisions, and while your resume shows technical depth, it lacks explicit examples of cross-team collaboration and technical mentorship.`,
  suggestions: [
    {
      id: '1',
      priority: 'High',
      category: 'Missing Technology',
      title: 'Add GraphQL experience',
      description: 'The job requires strong GraphQL knowledge. Even basic familiarity should be included.',
      action: 'Add a project or course that involved GraphQL queries and mutations.',
    },
    {
      id: '2',
      priority: 'High',
      category: 'Leadership',
      title: 'Highlight team leadership',
      description: 'Senior roles expect mentorship and architectural ownership. This is absent from your resume.',
      action: 'Add 1-2 bullet points describing when you led technical decisions or mentored junior developers.',
    },
    {
      id: '3',
      priority: 'Medium',
      category: 'Quantification',
      title: 'Quantify your achievements',
      description: '60% of your bullet points lack measurable results.',
      action: 'Add metrics like performance improvements %, users served, or team size.',
    },
    {
      id: '4',
      priority: 'Low',
      category: 'ATS Optimization',
      title: 'Optimize keywords for ATS',
      description: 'Your resume is missing some keywords that ATS systems scan for.',
      action: 'Include exact phrases from the job description: "component library", "code review", "CI/CD pipeline".',
    },
  ],
  radarData: [
    { subject: 'Frontend', A: 92, fullMark: 100 },
    { subject: 'Backend', A: 60, fullMark: 100 },
    { subject: 'Testing', A: 55, fullMark: 100 },
    { subject: 'DevOps', A: 40, fullMark: 100 },
    { subject: 'Leadership', A: 48, fullMark: 100 },
    { subject: 'Architecture', A: 70, fullMark: 100 },
  ],
}

export const mockBulletPoints = [
  {
    id: '1',
    original: 'Worked on React components for the dashboard',
    improved: 'Architected and delivered 15+ reusable React components for a data-intensive analytics dashboard, reducing development time by 40% across engineering teams.',
    category: 'Work Experience',
  },
  {
    id: '2',
    original: 'Fixed bugs and improved performance',
    improved: 'Identified and resolved 30+ critical performance bottlenecks through code profiling and lazy-loading strategies, achieving a 65% improvement in initial page load time (from 4.2s to 1.5s).',
    category: 'Work Experience',
  },
  {
    id: '3',
    original: 'Worked with the team on API integration',
    improved: 'Led cross-functional collaboration with 3 backend engineers to design and implement RESTful API integrations, enabling real-time data synchronization for 50,000+ daily active users.',
    category: 'Work Experience',
  },
]

export const mockHistory = [
  {
    id: 'ana-001',
    jobTitle: 'Senior Frontend Engineer',
    company: 'Stripe',
    date: '2024-05-01',
    score: 78,
    atsScore: 82,
    status: 'completed',
  },
  {
    id: 'ana-002',
    jobTitle: 'React Developer',
    company: 'Vercel',
    date: '2024-04-28',
    score: 65,
    atsScore: 70,
    status: 'completed',
  },
  {
    id: 'ana-003',
    jobTitle: 'Full Stack Engineer',
    company: 'Notion',
    date: '2024-04-22',
    score: 83,
    atsScore: 88,
    status: 'completed',
  },
  {
    id: 'ana-004',
    jobTitle: 'UI/UX Engineer',
    company: 'Figma',
    date: '2024-04-18',
    score: 71,
    atsScore: 76,
    status: 'completed',
  },
  {
    id: 'ana-005',
    jobTitle: 'Software Engineer',
    company: 'Airbnb',
    date: '2024-04-10',
    score: 58,
    atsScore: 64,
    status: 'completed',
  },
]

export const mockTrendData = [
  { date: 'Jan', score: 55 },
  { date: 'Feb', score: 62 },
  { date: 'Mar', score: 58 },
  { date: 'Apr', score: 71 },
  { date: 'May', score: 78 },
  { date: 'Jun', score: 83 },
]

export const mockSkillData = [
  { skill: 'React.js', level: 92 },
  { skill: 'TypeScript', level: 85 },
  { skill: 'Node.js', level: 68 },
  { skill: 'CSS/SCSS', level: 88 },
  { skill: 'Testing', level: 55 },
  { skill: 'DevOps', level: 40 },
]

export const mockAdminStats = {
  totalUsers: 1284,
  totalAnalyses: 9823,
  avgMatchScore: 71,
  activeToday: 237,
  topSkills: [
    { name: 'React.js', count: 824 },
    { name: 'Python', count: 712 },
    { name: 'AWS', count: 634 },
    { name: 'TypeScript', count: 598 },
    { name: 'Docker', count: 487 },
  ],
  weeklyAnalyses: [
    { day: 'Mon', count: 142 },
    { day: 'Tue', count: 168 },
    { day: 'Wed', count: 195 },
    { day: 'Thu', count: 210 },
    { day: 'Fri', count: 175 },
    { day: 'Sat', count: 98 },
    { day: 'Sun', count: 87 },
  ],
}

export const mockTestimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Software Engineer',
    company: 'Google',
    avatar: 'SC',
    rating: 5,
    text: 'ResumeAI helped me identify exactly what was missing from my resume. I went from 40% match scores to 85%+ in just 2 weeks. Got my dream job at Google!',
  },
  {
    id: 2,
    name: 'Marcus Thompson',
    role: 'Product Manager',
    company: 'Meta',
    avatar: 'MT',
    rating: 5,
    text: 'The AI suggestions were incredibly specific and actionable. Not generic advice — it knew exactly what the job description needed and tailored every suggestion accordingly.',
  },
  {
    id: 3,
    name: 'Priya Sharma',
    role: 'Data Scientist',
    company: 'OpenAI',
    avatar: 'PS',
    rating: 5,
    text: 'The semantic analysis blew my mind. It understood context, not just keywords. My interview callback rate increased by 3x after using the improvement suggestions.',
  },
  {
    id: 4,
    name: 'James O\'Brien',
    role: 'DevOps Engineer',
    company: 'Stripe',
    avatar: 'JO',
    rating: 5,
    text: 'I was skeptical at first, but the ATS optimization alone was worth it. Went from 0 callbacks to 6 in the first week after optimizing my resume.',
  },
]

import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  Zap, Brain, Target, TrendingUp, Shield, Download, CheckCircle,
  Star, ChevronDown, ArrowRight, Sparkles, Users, FileText, Award
} from 'lucide-react'
import { Navbar } from '../../components/layout/Navbar'
import { AnimatedCounter } from '../../components/charts/ScoreCircle'
import { staggerContainer, staggerItem, fadeInUp, floatAnimation, floatAnimationDelay } from '../../animations/variants'
import { mockTestimonials } from '../../utils/mockData'

const features = [
  {
    icon: Brain,
    title: 'Semantic AI Analysis',
    description: 'Goes beyond keywords — understands context and meaning using advanced NLP models.',
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50',
    iconColor: 'text-violet-600',
  },
  {
    icon: Target,
    title: 'Precise Match Scoring',
    description: 'Get a comprehensive 0–100% match score with detailed breakdown of strengths and gaps.',
    color: 'from-primary-500 to-blue-600',
    bg: 'bg-primary-50',
    iconColor: 'text-primary-600',
  },
  {
    icon: TrendingUp,
    title: 'Skill Gap Detection',
    description: 'Instantly identify missing and weak skills, prioritized by job importance.',
    color: 'from-emerald-500 to-green-600',
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    icon: Sparkles,
    title: 'AI Bullet Rewriting',
    description: 'Transform weak bullet points into powerful, quantified achievements with one click.',
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    icon: Shield,
    title: 'ATS Optimization',
    description: 'Ensure your resume passes automated screening systems with our ATS compatibility score.',
    color: 'from-cyan-500 to-sky-600',
    bg: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
  },
  {
    icon: Download,
    title: 'Export & Reports',
    description: 'Download detailed PDF reports, improved resumes, and skill gap analysis.',
    color: 'from-pink-500 to-rose-600',
    bg: 'bg-pink-50',
    iconColor: 'text-pink-600',
  },
]

const steps = [
  { step: '01', title: 'Upload Your Resume', desc: 'Drag & drop your PDF/DOCX or paste text directly.' },
  { step: '02', title: 'Add Job Description', desc: 'Paste the job posting you want to apply for.' },
  { step: '03', title: 'AI Analysis Runs', desc: 'Our AI performs semantic analysis in seconds.' },
  { step: '04', title: 'Get Actionable Insights', desc: 'Review scores, gaps, and AI-powered improvements.' },
]

const faqs = [
  {
    q: 'How is this different from other resume checkers?',
    a: 'Most resume tools do simple keyword matching. ResumeAI uses advanced NLP semantic understanding — it grasps context, relevance, and meaning, just like a human recruiter would.',
  },
  {
    q: 'What file formats are supported?',
    a: 'We support PDF, DOCX, and plain text. You can also paste your resume directly into our editor.',
  },
  {
    q: 'How accurate is the match score?',
    a: 'Our scoring model is trained on thousands of real job postings and hire decisions. It correlates with callback rates with ~85% accuracy.',
  },
  {
    q: 'Is my resume data kept private?',
    a: 'Absolutely. Your resume data is encrypted, never sold to third parties, and you can delete your data at any time.',
  },
  {
    q: 'Can I analyze multiple job descriptions?',
    a: 'Yes! You can run unlimited analyses on any job posting and track your improvement history over time.',
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-slate-100 rounded-2xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-slate-900 pr-4">{q}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="px-6 pb-4 text-slate-600 text-sm leading-relaxed"
        >
          {a}
        </motion.div>
      )}
    </div>
  )
}

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />

      {/* ── Hero ── */}
      <section className="pt-32 pb-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="text-center lg:text-left"
            >
              <motion.div variants={staggerItem} className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-200 rounded-full text-sm font-semibold text-primary-700 mb-6">
                <Sparkles className="w-4 h-4" />
                AI-Powered Resume Intelligence
              </motion.div>

              <motion.h1 variants={staggerItem} className="text-5xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tight mb-6">
                Land Your{' '}
                <span className="gradient-text">Dream Job</span>{' '}
                Faster with AI
              </motion.h1>

              <motion.p variants={staggerItem} className="text-xl text-slate-500 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                Upload your resume, paste any job description, and get an instant AI analysis with match scores, skill gap detection, and professional resume improvements.
              </motion.p>

              <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/register" className="btn-primary text-base py-3.5 px-8 shadow-md hover:shadow-lg">
                  <Zap className="w-5 h-5" />
                  Analyze My Resume Free
                </Link>
                <Link to="/login" className="btn-secondary text-base py-3.5">
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>

              {/* Social proof */}
              <motion.div variants={staggerItem} className="flex items-center gap-4 mt-8 justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {['SC', 'MT', 'PS', 'JO'].map((i, idx) => (
                    <div key={idx} className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-primary-400 to-cyan-400 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{i[0]}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5">{Array(5).fill(0).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}</div>
                  <p className="text-xs text-slate-500 mt-0.5">Loved by 10,000+ job seekers</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Hero Visual */}
            <div className="relative hidden lg:block">
              {/* Main card */}
              <motion.div
                animate={floatAnimation}
                className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 mx-auto max-w-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-slate-900">Match Analysis</h3>
                    <p className="text-sm text-slate-400">Senior Frontend Engineer</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary-600" />
                  </div>
                </div>

                {/* Score */}
                <div className="flex items-center justify-center py-4">
                  <div className="relative w-32 h-32">
                    <svg viewBox="0 0 120 120" className="-rotate-90 w-full h-full">
                      <circle cx="60" cy="60" r="50" fill="none" stroke="#f1f5f9" strokeWidth="10" />
                      <motion.circle
                        cx="60" cy="60" r="50" fill="none" stroke="#22C55E" strokeWidth="10"
                        strokeLinecap="round" strokeDasharray={2 * Math.PI * 50}
                        initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 50 * (1 - 0.78) }}
                        transition={{ duration: 2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-black text-green-600">78%</span>
                      <span className="text-xs text-slate-400">Match</span>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-2">
                  {[['React.js', 92, '#2563eb'], ['TypeScript', 85, '#2563eb'], ['GraphQL', 0, '#EF4444']].map(([skill, val, color]) => (
                    <div key={skill}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-slate-700">{skill}</span>
                        <span style={{ color }}>{val > 0 ? `${val}%` : 'Missing'}</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${val}%` }}
                          transition={{ duration: 1, delay: 0.8 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Floating smaller cards */}
              <motion.div
                animate={floatAnimationDelay}
                className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg border border-slate-100 px-4 py-3 flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900">ATS Score</p>
                  <p className="text-sm font-bold text-green-600">82/100</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0], transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
                className="absolute -bottom-6 -left-8 bg-white rounded-2xl shadow-lg border border-slate-100 px-4 py-3 flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900">AI Suggestions</p>
                  <p className="text-sm font-bold text-primary-600">4 improvements</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 bg-white/60 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { value: 10000, suffix: '+', label: 'Resumes Analyzed' },
              { value: 85, suffix: '%', label: 'Accuracy Rate' },
              { value: 3, suffix: 'x', label: 'More Callbacks' },
              { value: 50, suffix: '+', label: 'Skills Tracked' },
            ].map((stat) => (
              <motion.div key={stat.label} variants={staggerItem} className="space-y-1">
                <div className="text-4xl font-black gradient-text">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-primary mb-4 inline-flex">Features</span>
            <h2 className="text-4xl font-black text-slate-900 mb-4">
              Everything You Need to{' '}
              <span className="gradient-text">Get Hired Faster</span>
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Powered by state-of-the-art NLP models that understand your resume the way recruiters do.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={staggerItem}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="glass-card p-6 group cursor-default"
              >
                <div className={`w-12 h-12 rounded-2xl ${f.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <f.icon className={`w-6 h-6 ${f.iconColor}`} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-24 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-primary mb-4 inline-flex">How It Works</span>
            <h2 className="text-4xl font-black text-slate-900 mb-4">
              4 Steps to Your{' '}
              <span className="gradient-text">Perfect Resume</span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-6 relative"
          >
            {steps.map((s, i) => (
              <motion.div key={s.step} variants={staggerItem} className="text-center relative">
                <div className="w-14 h-14 rounded-2xl bg-primary-600 text-white flex items-center justify-center mx-auto mb-4 font-black text-lg shadow-glow">
                  {s.step}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500">{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[calc(50%+36px)] w-[calc(100%-72px)] h-0.5 bg-primary-100" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="badge-primary mb-4 inline-flex">
              <Star className="w-3.5 h-3.5 fill-current" /> Testimonials
            </span>
            <h2 className="text-4xl font-black text-slate-900 mb-4">
              Real People, <span className="gradient-text">Real Results</span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {mockTestimonials.map((t) => (
              <motion.div
                key={t.id}
                variants={staggerItem}
                whileHover={{ y: -4 }}
                className="glass-card p-5 flex flex-col gap-4"
              >
                <div className="flex gap-0.5">
                  {Array(t.rating).fill(0).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed flex-1">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-cyan-400 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role} @ {t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black text-slate-900 mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <FAQItem {...faq} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-4 bg-gradient-primary">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black text-white mb-4">
              Ready to Land Your Dream Job?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Join 10,000+ job seekers who've improved their match scores and landed interviews.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 font-bold text-lg rounded-2xl hover:bg-slate-50 transition-colors shadow-lg"
            >
              <Zap className="w-5 h-5" />
              Start for Free — No Credit Card
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-600 to-cyan-500 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl">ResumeAI</span>
            </div>
            <div className="flex gap-8 text-sm text-slate-400">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
              <Link to="/login" className="hover:text-white transition-colors">Sign In</Link>
              <Link to="/register" className="hover:text-white transition-colors">Register</Link>
            </div>
            <p className="text-slate-500 text-sm">© 2024 ResumeAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

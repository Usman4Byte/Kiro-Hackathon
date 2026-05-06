import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip
} from 'recharts'
import {
  CheckCircle, XCircle, AlertCircle, ChevronDown, Download,
  TrendingUp, Brain, ArrowLeft, Copy, Sparkles, Target, Shield
} from 'lucide-react'
import { useAnalysisStore } from '../../store/useAnalysisStore'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { ScoreCircle, ProgressBar } from '../../components/charts/ScoreCircle'
import { staggerContainer, staggerItem, fadeInUp } from '../../animations/variants'
import { getScoreColor, getPriorityColor, copyToClipboard } from '../../utils/helpers'
import toast from 'react-hot-toast'

function SuggestionCard({ suggestion }) {
  const [expanded, setExpanded] = useState(false)
  const p = getPriorityColor(suggestion.priority)

  return (
    <div className="border border-slate-100 rounded-2xl overflow-hidden">
      <button
        className="w-full flex items-start gap-4 p-4 text-left hover:bg-slate-50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold flex-shrink-0 ${p.bg} ${p.text} border ${p.border}`}>
          {suggestion.priority}
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-900 text-sm">{suggestion.title}</p>
          <p className="text-xs text-slate-400 mt-0.5">{suggestion.category}</p>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 flex-shrink-0 mt-1 transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 pb-4 border-t border-slate-100"
          >
            <p className="text-sm text-slate-600 mt-3 mb-2 leading-relaxed">{suggestion.description}</p>
            <div className="bg-primary-50 rounded-xl p-3 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-primary-700 font-medium">{suggestion.action}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function MatchResultsPage() {
  const { id } = useParams()
  const { currentAnalysis, fetchAnalysis, isLoading } = useAnalysisStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentAnalysis || currentAnalysis.id !== id) {
      fetchAnalysis(id)
    }
  }, [id])

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto space-y-4">
        {Array(4).fill(0).map((_, i) => (
          <div key={i} className="skeleton h-40 rounded-2xl" />
        ))}
      </div>
    )
  }

  const a = currentAnalysis
  if (!a) return null

  const overallColor = getScoreColor(a.overallScore)
  const atsColor = getScoreColor(a.atsScore)

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <h1 className="page-header">{a.jobTitle}</h1>
          <p className="text-slate-500 mt-1">{a.company} · AI Match Analysis</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" icon={Download}>Export PDF</Button>
          <Button variant="gradient" size="sm" icon={TrendingUp} onClick={() => navigate('/improvement')}>
            Improve Resume
          </Button>
        </div>
      </motion.div>

      {/* Score Row */}
      <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Overall Score */}
        <Card className="flex flex-col items-center text-center col-span-1">
          <p className="text-sm font-semibold text-slate-500 mb-4">Overall Match</p>
          <ScoreCircle score={a.overallScore} size={140} />
        </Card>

        {/* ATS Score */}
        <Card className="flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center mb-3">
            <Shield className="w-5 h-5 text-cyan-600" />
          </div>
          <p className="text-sm font-semibold text-slate-500 mb-2">ATS Score</p>
          <p className={`text-4xl font-black ${atsColor.text}`}>{a.atsScore}%</p>
          <Badge variant={a.atsScore >= 75 ? 'success' : a.atsScore >= 50 ? 'warning' : 'error'} className="mt-2">
            {a.atsScore >= 75 ? 'ATS Friendly' : 'Needs Work'}
          </Badge>
        </Card>

        {/* Semantic Score */}
        <Card className="flex flex-col items-center text-center">
          <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center mb-3">
            <Brain className="w-5 h-5 text-violet-600" />
          </div>
          <p className="text-sm font-semibold text-slate-500 mb-2">Semantic Score</p>
          <p className="text-4xl font-black text-violet-600">{a.semanticScore}%</p>
          <Badge variant="purple" className="mt-2">Context Match</Badge>
        </Card>
      </motion.div>

      {/* Skills + Radar */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Matched Skills */}
        <motion.div variants={staggerItem}>
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <h3 className="font-bold text-slate-900">Matched Skills</h3>
              <Badge variant="success">{a.matchedSkills.length} found</Badge>
            </div>
            <div className="space-y-3">
              {a.matchedSkills.map((skill) => (
                <ProgressBar
                  key={skill.name}
                  label={skill.name}
                  value={skill.strength}
                  colorHex="#22C55E"
                />
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Radar Chart */}
        <motion.div variants={staggerItem}>
          <Card>
            <h3 className="font-bold text-slate-900 mb-4">Competency Radar</h3>
            <ResponsiveContainer width="100%" height={240}>
              <RadarChart data={a.radarData}>
                <PolarGrid stroke="#f1f5f9" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: '#64748b' }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
                <Radar
                  name="Your Profile"
                  dataKey="A"
                  stroke="#2563eb"
                  fill="#2563eb"
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
                <Tooltip formatter={(v) => [`${v}%`]} />
              </RadarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>

      {/* Missing & Weak Skills */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Missing Skills */}
        <motion.div variants={staggerItem}>
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="w-5 h-5 text-red-500" />
              <h3 className="font-bold text-slate-900">Missing Skills</h3>
              <Badge variant="error">{a.missingSkills.length} gaps</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {a.missingSkills.map((skill) => (
                <span
                  key={skill.name}
                  className="inline-flex flex-col items-start px-3 py-2 bg-red-50 border border-red-200 rounded-xl"
                >
                  <span className="text-sm font-semibold text-red-700">{skill.name}</span>
                  <span className="text-xs text-red-400">{skill.importance} priority</span>
                </span>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Weak Skills */}
        <motion.div variants={staggerItem}>
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-slate-900">Weak Skills</h3>
              <Badge variant="warning">{a.weakSkills.length} to improve</Badge>
            </div>
            <div className="space-y-3">
              {a.weakSkills.map((skill) => (
                <div key={skill.name}>
                  <ProgressBar label={skill.name} value={skill.strength} colorHex="#F59E0B" />
                  <p className="text-xs text-slate-400 mt-1 ml-0.5">{skill.note}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* AI Explanation */}
      <motion.div variants={staggerItem}>
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center">
              <Brain className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">AI Match Explanation</h3>
              <p className="text-xs text-slate-400">Semantic analysis of your profile vs. role requirements</p>
            </div>
            <button
              className="ml-auto btn-ghost text-xs"
              onClick={async () => {
                await copyToClipboard(a.semanticExplanation)
                toast.success('Copied!')
              }}
            >
              <Copy className="w-3.5 h-3.5" /> Copy
            </button>
          </div>
          <div className="bg-slate-50 rounded-2xl p-5 text-sm text-slate-700 leading-relaxed whitespace-pre-line border border-slate-100">
            {a.semanticExplanation}
          </div>
        </Card>
      </motion.div>

      {/* Suggestions */}
      <motion.div variants={staggerItem}>
        <Card>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">AI Improvement Suggestions</h3>
              <p className="text-xs text-slate-400">{a.suggestions.length} actionable recommendations</p>
            </div>
          </div>
          <div className="space-y-2">
            {a.suggestions.map((s) => (
              <SuggestionCard key={s.id} suggestion={s} />
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex justify-center">
            <Button variant="gradient" icon={TrendingUp} onClick={() => navigate('/improvement')}>
              Open AI Improvement Studio
            </Button>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}

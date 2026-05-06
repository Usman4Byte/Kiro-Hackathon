import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts'
import {
  FileText, TrendingUp, Zap, History, ArrowRight, Target, Brain,
  Plus, Clock, ChevronRight, Award
} from 'lucide-react'
import { useAuthStore } from '../../store/useAuthStore'
import { useAnalysisStore } from '../../store/useAnalysisStore'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { ScoreCircle, AnimatedCounter } from '../../components/charts/ScoreCircle'
import { staggerContainer, staggerItem, fadeInUp } from '../../animations/variants'
import { getScoreColor, formatDate, getScoreLabel } from '../../utils/helpers'

function StatCard({ icon: Icon, label, value, delta, color = 'primary' }) {
  const colorMap = {
    primary: 'bg-primary-50 text-primary-600',
    green: 'bg-green-50 text-green-600',
    amber: 'bg-amber-50 text-amber-600',
    purple: 'bg-purple-50 text-purple-600',
  }
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -4 }}
      className="glass-card p-6 flex items-center gap-4"
    >
      <div className={`w-12 h-12 rounded-2xl ${colorMap[color]} flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-slate-500 font-medium">{label}</p>
        <p className="text-2xl font-black text-slate-900">{value}</p>
        {delta && <p className="text-xs text-green-600 font-medium mt-0.5">{delta}</p>}
      </div>
    </motion.div>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-100 px-4 py-3">
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <p className="text-sm font-bold text-primary-600">{payload[0].value}% Match</p>
    </div>
  )
}

export function DashboardPage() {
  const { user } = useAuthStore()
  const { history, fetchHistory, isLoading } = useAnalysisStore()
  const navigate = useNavigate()

  useEffect(() => {
    fetchHistory()
  }, [])

  const recentHistory = history.slice(0, 5)

  // Dynamic calculations
  const totalAnalyses = history.length
  const avgScore = totalAnalyses > 0 ? Math.round(history.reduce((a, b) => a + b.score, 0) / totalAnalyses) : 0
  const bestScoreObj = totalAnalyses > 0 ? history.reduce((prev, current) => (prev.score > current.score) ? prev : current) : null
  const bestScore = bestScoreObj ? bestScoreObj.score : 0
  const bestScoreContext = bestScoreObj ? `${bestScoreObj.company}` : 'No analyses yet'
  const latestAnalysis = totalAnalyses > 0 ? history[0] : null

  // Generate basic trend data from history (reverse for chronological)
  const trendData = [...history].reverse().map(h => ({
    date: new Date(h.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    score: h.score
  }))

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">
            Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0] || 'there'}!</span>
          </h1>
          <p className="text-slate-500 mt-1">Here's your resume performance overview.</p>
        </div>
        <Button variant="gradient" icon={Plus} onClick={() => navigate('/upload')}>
          New Analysis
        </Button>
      </motion.div>

      {/* Stat Cards */}
      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard icon={FileText} label="Total Analyses" value={<AnimatedCounter value={totalAnalyses} />} delta={totalAnalyses > 0 ? "Lifetime" : "Get started!"} color="primary" />
        <StatCard icon={Target} label="Avg Match Score" value={<><AnimatedCounter value={avgScore} />%</>} delta={totalAnalyses > 0 ? "Overall average" : ""} color="green" />
        <StatCard icon={TrendingUp} label="Analyses This Week" value={<AnimatedCounter value={totalAnalyses} />} delta="Keep it up" color="amber" />
        <StatCard icon={Award} label="Best Score" value={<><AnimatedCounter value={bestScore} />%</>} delta={bestScoreContext} color="purple" />
      </motion.div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Score Trend */}
        <motion.div variants={staggerItem} className="lg:col-span-2">
          <Card className="h-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-slate-900">Match Score Trend</h3>
                <p className="text-sm text-slate-400 mt-0.5">Your improvement history</p>
              </div>
              {totalAnalyses > 0 && <Badge variant="primary">{totalAnalyses} scans</Badge>}
            </div>
            {totalAnalyses > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[0, 100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone" dataKey="score"
                    stroke="#2563eb" strokeWidth={2.5}
                    dot={{ fill: '#2563eb', strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6, fill: '#2563eb' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[200px] flex items-center justify-center text-slate-400 text-sm">
                Upload a resume to see your progress trend
              </div>
            )}
          </Card>
        </motion.div>

        {/* Current Score */}
        <motion.div variants={staggerItem}>
          <Card className="flex flex-col items-center justify-center text-center h-full">
            <h3 className="font-bold text-slate-900 mb-1">Latest Score</h3>
            {latestAnalysis ? (
              <>
                <p className="text-sm text-slate-400 mb-6 truncate max-w-[200px]">{latestAnalysis.jobTitle}</p>
                <ScoreCircle score={latestAnalysis.score} size={160} />
                <div className="mt-6 w-full pt-4 border-t border-slate-100">
                  <Button variant="outline" className="w-full" onClick={() => navigate(`/analysis/${latestAnalysis.id}`)}>
                    View Details
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-[200px] text-slate-400">
                <Target className="w-12 h-12 mb-3 opacity-20" />
                <p className="text-sm">No analysis performed yet.</p>
              </div>
            )}
          </Card>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Skills Chart */}
        <motion.div variants={staggerItem}>
          <Card className="h-full">
            <h3 className="font-bold text-slate-900 mb-4">Skill Strengths</h3>
            {totalAnalyses > 0 ? (
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={mockSkillData} layout="vertical" barSize={8}>
                  <XAxis type="number" hide domain={[0, 100]} />
                  <YAxis dataKey="skill" type="category" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} width={70} />
                  <Tooltip formatter={(v) => [`${v}%`]} />
                  <Bar dataKey="level" fill="#2563eb" radius={[0, 4, 4, 0]} background={{ fill: '#f1f5f9', radius: 4 }} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-[180px] text-slate-400">
                <p className="text-sm">Scan a job to extract skills.</p>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Recent History */}
        <motion.div variants={staggerItem} className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900">Recent Analyses</h3>
              <Link to="/history" className="text-sm text-primary-600 font-semibold hover:text-primary-700 flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-2">
              {isLoading
                ? Array(3).fill(0).map((_, i) => (
                    <div key={i} className="skeleton h-14 rounded-xl" />
                  ))
                : recentHistory.length > 0 ? recentHistory.map((item) => {
                    const colors = getScoreColor(item.score)
                    return (
                      <Link
                        key={item.id}
                        to={`/analysis/${item.id}`}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        <div className={`w-10 h-10 rounded-xl ${colors.light} flex items-center justify-center flex-shrink-0`}>
                          <span className={`text-sm font-black ${colors.text}`}>{item.score}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-900 text-sm truncate">{item.jobTitle}</p>
                          <p className="text-xs text-slate-400">{item.company} · {formatDate(item.date)}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors flex-shrink-0" />
                      </Link>
                    )
                  }) : (
                    <div className="py-6 text-center text-slate-500 text-sm">
                      You haven't analyzed any resumes yet.
                    </div>
                  )}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100">
              <Button variant="ghost" onClick={() => navigate('/upload')} className="w-full justify-center">
                <Plus className="w-4 h-4" /> Analyze New Resume
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}

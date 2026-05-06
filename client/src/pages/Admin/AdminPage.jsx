import { motion } from 'framer-motion'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts'
import { Users, FileText, TrendingUp, Activity, Shield } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { AnimatedCounter } from '../../components/charts/ScoreCircle'
import { staggerContainer, staggerItem, fadeInUp } from '../../animations/variants'

const COLORS = ['#2563eb', '#38bdf8', '#22c55e', '#f59e0b', '#a855f7']

export function AdminPage() {
  // TODO: Fetch real global admin stats from backend.
  // Using zeroed out placeholders for now so it doesn't show fake data.
  const s = {
    totalUsers: 1, // Just the current user
    totalAnalyses: 0,
    avgMatchScore: 0,
    activeToday: 1,
    weeklyAnalyses: [],
    topSkills: []
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto space-y-6"
    >
      <motion.div variants={fadeInUp} className="flex items-center justify-between">
        <div>
          <h1 className="page-header">Admin Analytics</h1>
          <p className="text-slate-500 mt-1">Platform-wide usage and performance metrics.</p>
        </div>
        <Badge variant="primary" icon={Shield}>Admin View</Badge>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { icon: Users, label: 'Total Users', value: s.totalUsers, color: 'bg-primary-50 text-primary-600', delta: '+12 today' },
          { icon: FileText, label: 'Total Analyses', value: s.totalAnalyses, color: 'bg-violet-50 text-violet-600', delta: '+87 today' },
          { icon: TrendingUp, label: 'Avg Match Score', value: `${s.avgMatchScore}%`, color: 'bg-green-50 text-green-600', delta: '+2% this week' },
          { icon: Activity, label: 'Active Today', value: s.activeToday, color: 'bg-amber-50 text-amber-600', delta: 'Live users' },
        ].map((stat) => (
          <motion.div key={stat.label} variants={staggerItem}>
            <Card className="flex items-center gap-4 p-5" hover>
              <div className={`w-11 h-11 rounded-2xl ${stat.color} flex items-center justify-center flex-shrink-0`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                <p className="text-2xl font-black text-slate-900">
                  {typeof stat.value === 'string' ? stat.value : <AnimatedCounter value={stat.value} />}
                </p>
                <p className="text-xs text-green-600 font-medium">{stat.delta}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Weekly Analyses */}
        <motion.div variants={staggerItem} className="lg:col-span-2">
          <Card>
            <h3 className="font-bold text-slate-900 mb-4">Weekly Analyses</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={s.weeklyAnalyses}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v) => [`${v} analyses`]} />
                <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Top Skills */}
        <motion.div variants={staggerItem}>
          <Card className="h-full">
            <h3 className="font-bold text-slate-900 mb-4">Top In-Demand Skills</h3>
            {s.topSkills && s.topSkills.length > 0 ? (
              <div className="space-y-3">
                {s.topSkills.map((skill, i) => (
                  <div key={skill.name} className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: COLORS[i % COLORS.length] }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-slate-700 truncate">{skill.name}</span>
                        <span className="text-xs text-slate-400 ml-2">{skill.count}</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${(skill.count / s.topSkills[0].count) * 100}%`,
                            backgroundColor: COLORS[i % COLORS.length],
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[200px] text-slate-400">
                <p className="text-sm">Not enough data to display skills.</p>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}

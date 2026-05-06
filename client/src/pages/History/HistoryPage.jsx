import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { History, Search, Trash2, Eye, ChevronRight, Filter } from 'lucide-react'
import { useAnalysisStore } from '../../store/useAnalysisStore'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { staggerContainer, staggerItem, fadeInUp } from '../../animations/variants'
import { getScoreColor, formatDate, getScoreLabel } from '../../utils/helpers'
import toast from 'react-hot-toast'

export function HistoryPage() {
  const [search, setSearch] = useState('')
  const { history, fetchHistory, deleteAnalysis, isLoading } = useAnalysisStore()
  const navigate = useNavigate()

  useEffect(() => { fetchHistory() }, [])

  const filtered = history.filter(
    (item) =>
      item.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
      item.company.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = async (id, e) => {
    e.stopPropagation()
    await deleteAnalysis(id)
    toast.success('Analysis deleted')
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="page-header">Analysis History</h1>
          <p className="text-slate-500 mt-1">{history.length} analyses stored</p>
        </div>
        <Button variant="gradient" onClick={() => navigate('/upload')}>
          New Analysis
        </Button>
      </motion.div>

      {/* Search */}
      <motion.div variants={staggerItem}>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            id="history-search"
            type="text"
            placeholder="Search by job title or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-11"
          />
        </div>
      </motion.div>

      {/* Table */}
      <motion.div variants={staggerItem}>
        <Card padding={false}>
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-slate-50 border-b border-slate-100 rounded-t-2xl">
            <p className="col-span-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Position</p>
            <p className="col-span-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Match Score</p>
            <p className="col-span-2 text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:block">ATS</p>
            <p className="col-span-2 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:block">Date</p>
            <p className="col-span-1 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</p>
          </div>

          {/* Rows */}
          {isLoading ? (
            Array(5).fill(0).map((_, i) => (
              <div key={i} className="px-5 py-4 border-b border-slate-50">
                <div className="skeleton h-10 rounded-xl" />
              </div>
            ))
          ) : filtered.length === 0 ? (
            <div className="px-5 py-12 text-center">
              <History className="w-10 h-10 text-slate-200 mx-auto mb-3" />
              <p className="font-semibold text-slate-500">No analyses found</p>
              <p className="text-sm text-slate-400 mt-1">Try a different search or run a new analysis.</p>
            </div>
          ) : (
            filtered.map((item, idx) => {
              const colors = getScoreColor(item.score)
              const atsColors = getScoreColor(item.atsScore)
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className="grid grid-cols-12 gap-4 px-5 py-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer group"
                  onClick={() => navigate(`/analysis/${item.id}`)}
                >
                  <div className="col-span-5">
                    <p className="font-semibold text-slate-900 text-sm">{item.jobTitle}</p>
                    <p className="text-xs text-slate-400">{item.company}</p>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <span className={`text-sm font-black ${colors.text}`}>{item.score}%</span>
                  </div>
                  <div className="col-span-2 items-center hidden sm:flex">
                    <span className={`text-sm font-bold ${atsColors.text}`}>{item.atsScore}%</span>
                  </div>
                  <div className="col-span-2 items-center hidden md:flex">
                    <span className="text-sm text-slate-400">{formatDate(item.date)}</span>
                  </div>
                  <div className="col-span-1 flex items-center gap-1">
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(`/analysis/${item.id}`) }}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(item.id, e)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )
            })
          )}
        </Card>
      </motion.div>
    </motion.div>
  )
}

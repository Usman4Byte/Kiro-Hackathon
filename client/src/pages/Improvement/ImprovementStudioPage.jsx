import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles, Copy, ChevronRight, ArrowRight, Brain, Loader2,
  CheckCircle, Wand2, Download
} from 'lucide-react'
import { useAnalysisStore } from '../../store/useAnalysisStore'
import { aiService } from '../../services/resumeService'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { staggerContainer, staggerItem, fadeInUp } from '../../animations/variants'
import { copyToClipboard } from '../../utils/helpers'
import toast from 'react-hot-toast'

function BulletCard({ bullet }) {
  const [copied, setCopied] = useState(false)
  const [showImproved, setShowImproved] = useState(false)

  const handleCopy = async () => {
    await copyToClipboard(bullet.improved)
    setCopied(true)
    toast.success('Copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      variants={staggerItem}
      className="border border-slate-100 rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-b border-slate-100">
        <Badge variant="neutral">{bullet.category}</Badge>
        <div className="flex gap-2">
          <button
            onClick={() => setShowImproved(!showImproved)}
            className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors"
          >
            {showImproved ? 'Hide' : 'Show'} improved
            <ChevronRight className={`w-3 h-3 transition-transform ${showImproved ? 'rotate-90' : ''}`} />
          </button>
        </div>
      </div>

      {/* Original */}
      <div className="px-5 py-4">
        <p className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Original</p>
        <p className="text-sm text-slate-600 leading-relaxed">{bullet.original}</p>
      </div>

      {/* Improved */}
      <AnimatePresence>
        {showImproved && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-slate-100"
          >
            <div className="px-5 py-4 bg-green-50/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-primary-600" />
                  <p className="text-xs font-semibold text-primary-600 uppercase tracking-wider">AI Improved</p>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors"
                >
                  {copied ? <CheckCircle className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <p className="text-sm text-slate-800 leading-relaxed font-medium">{bullet.improved}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function TypewriterText({ text, onDone }) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    setDisplayed('')
    let i = 0
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i))
        i++
      } else {
        clearInterval(interval)
        onDone?.()
      }
    }, 12)
    return () => clearInterval(interval)
  }, [text])

  return <span>{displayed}<span className="animate-pulse">|</span></span>
}

export function ImprovementStudioPage() {
  const [inputText, setInputText] = useState('')
  const [bullets, setBullets] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [aiTip, setAiTip] = useState('')
  const [typingDone, setTypingDone] = useState(true)

  const tips = [
    'Quantify your achievements: Use numbers, percentages, and timeframes to make your impact concrete.',
    'Start bullet points with strong action verbs like "Led", "Architected", "Optimized", "Delivered".',
    'Focus on outcomes, not just responsibilities. What did you achieve, not just what you did.',
    'Mirror language from the job description to improve ATS compatibility and recruiter resonance.',
  ]

  useEffect(() => {
    setAiTip(tips[0])
  }, [])

  const generate = async () => {
    if (!inputText.trim()) {
      toast.error('Please enter some bullet points to improve')
      return
    }

    setIsGenerating(true)
    try {
      // Split input text by newlines and filter out empty ones
      const bulletArray = inputText.split('\n').filter(b => b.trim().length > 0)
      
      const result = await aiService.improveBullets(bulletArray, '')
      // The backend returns an array of { original, improved, category }
      setBullets(result.map((b, i) => ({ id: i, ...b })))
      toast.success('Bullets improved successfully!')
    } catch (err) {
      toast.error('Failed to generate improvements')
    } finally {
      setIsGenerating(false)
    }
  }

  const nextTip = () => {
    const idx = tips.indexOf(aiTip)
    setTypingDone(false)
    setAiTip(tips[(idx + 1) % tips.length])
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
          <h1 className="page-header">AI Improvement Studio</h1>
          <p className="text-slate-500 mt-1">Paste your resume bullet points to get them rewritten by AI.</p>
        </div>
      </motion.div>

      {/* AI Tip Card */}
      <motion.div variants={staggerItem}>
        <div className="bg-gradient-to-r from-primary-600 to-cyan-500 rounded-2xl p-5 text-white">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm mb-1">AI Resume Coach Tip</p>
              <p className="text-white/90 text-sm leading-relaxed">
                {typingDone ? aiTip : <TypewriterText text={aiTip} onDone={() => setTypingDone(true)} />}
              </p>
            </div>
            <button
              onClick={nextTip}
              className="flex-shrink-0 w-8 h-8 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Input Section */}
      <motion.div variants={staggerItem}>
        <Card>
          <label className="block text-sm font-bold text-slate-900 mb-2">Paste Your Bullet Points</label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="• Developed a web application using React...&#10;• Led a team of 5 developers...&#10;• Increased sales by doing marketing..."
            className="w-full min-h-[120px] p-4 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all resize-y text-sm"
          />
          <div className="mt-4 flex justify-end">
            <Button variant="gradient" size="sm" icon={Wand2} loading={isGenerating} onClick={generate}>
              Improve with AI
            </Button>
          </div>
        </Card>
      </motion.div>

      {bullets.length > 0 && (
        <>
          {/* Stats */}
          <motion.div variants={staggerItem} className="grid grid-cols-3 gap-4">
            {[
              { label: 'Bullets Improved', value: bullets.length, color: 'text-primary-600' },
              { label: 'Impact Upgraded', value: '100%', color: 'text-amber-600' },
              { label: 'ATS Ready', value: 'Yes', color: 'text-green-600' },
            ].map((s) => (
              <div key={s.label} className="glass-card p-4 text-center">
                <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{s.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Bullet Point Cards */}
          <motion.div variants={staggerItem}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-900">AI Suggestions</h2>
            </div>
            <div className="space-y-3">
              {bullets.map((b) => (
                <BulletCard key={b.id} bullet={b} />
              ))}
            </div>
          </motion.div>

          {/* Before/After Preview */}
          <motion.div variants={staggerItem}>
            <Card>
              <h3 className="font-bold text-slate-900 mb-4">Before/After Summary</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-50 rounded-2xl p-4 border border-red-100">
                  <p className="text-xs font-bold text-red-500 mb-3 uppercase tracking-wider">❌ Before</p>
                  <ul className="space-y-2">
                    {bullets.map((b) => (
                      <li key={b.id} className="text-sm text-slate-600 flex gap-2">
                        <span className="text-red-400 mt-0.5 flex-shrink-0">•</span>
                        {b.original}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
                  <p className="text-xs font-bold text-green-600 mb-3 uppercase tracking-wider">✅ After AI</p>
                  <ul className="space-y-2">
                    {bullets.map((b) => (
                      <li key={b.id} className="text-sm text-slate-700 font-medium flex gap-2">
                        <span className="text-green-500 mt-0.5 flex-shrink-0">•</span>
                        {b.improved}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={Copy}
                  onClick={async () => {
                    await copyToClipboard(bullets.map(b => `• ${b.improved}`).join('\n'))
                    toast.success('All improved bullets copied!')
                  }}
                >
                  Copy All
                </Button>
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </motion.div>
  )
}

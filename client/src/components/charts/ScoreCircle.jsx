import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { getScoreColor, getScoreLabel } from '../../utils/helpers'

// Animated circular score indicator
export function ScoreCircle({ score = 0, size = 160, strokeWidth = 12, label = true, animate = true }) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const colors = getScoreColor(score)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const [displayScore, setDisplayScore] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1400
    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayScore(Math.round(eased * score))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, score])

  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          {/* Background ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
          />
          {/* Score ring */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={colors.hex}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={inView ? { strokeDashoffset: offset } : {}}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold ${colors.text}`}>{displayScore}%</span>
          {label && <span className="text-xs text-slate-400 font-medium mt-0.5">Match</span>}
        </div>
      </div>
      {label && (
        <div className="text-center">
          <span className={`text-sm font-semibold ${colors.text}`}>{getScoreLabel(score)}</span>
        </div>
      )}
    </div>
  )
}

// Simple progress bar
export function ProgressBar({ value = 0, label, showValue = true, className = '', colorHex }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const colors = getScoreColor(value)

  return (
    <div ref={ref} className={className}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-sm font-medium text-slate-700">{label}</span>}
          {showValue && <span className={`text-sm font-semibold ${colors.text}`}>{value}%</span>}
        </div>
      )}
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: colorHex || colors.hex }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${value}%` } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}

// Animated number counter
export function AnimatedCounter({ value, prefix = '', suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1200
    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, value])

  return (
    <span ref={ref}>
      {prefix}{display.toLocaleString()}{suffix}
    </span>
  )
}

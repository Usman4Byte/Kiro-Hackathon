import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export function Card({ children, className = '', hover = false, glass = true, padding = true, ...props }) {
  const base = cn(
    glass ? 'bg-white/80 backdrop-blur-sm border border-white/60' : 'bg-white border border-slate-100',
    'shadow-card rounded-2xl',
    padding && 'p-6',
    className
  )

  if (hover) {
    return (
      <motion.div
        whileHover={{ y: -4, boxShadow: '0 12px 40px -4px rgba(37,99,235,0.12), 0 4px 16px -2px rgba(0,0,0,0.06)' }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className={base}
        {...props}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={base} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ title, subtitle, icon: Icon, action, className = '' }) {
  return (
    <div className={cn('flex items-start justify-between mb-4', className)}>
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-primary-600" />
          </div>
        )}
        <div>
          <h3 className="font-semibold text-slate-900 text-base leading-tight">{title}</h3>
          {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  )
}

// Skeleton loading card
export function SkeletonCard({ lines = 3 }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 animate-pulse">
      <div className="skeleton h-4 w-2/3 rounded-lg mb-3" />
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className={`skeleton h-3 rounded-lg mb-2 ${i === lines - 1 ? 'w-1/2' : 'w-full'}`} />
      ))}
    </div>
  )
}

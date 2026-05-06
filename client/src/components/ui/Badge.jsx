import { cn } from '../../utils/cn'

const variantMap = {
  success: 'bg-green-50 text-green-700 border border-green-200',
  warning: 'bg-amber-50 text-amber-700 border border-amber-200',
  error: 'bg-red-50 text-red-700 border border-red-200',
  primary: 'bg-primary-50 text-primary-700 border border-primary-200',
  neutral: 'bg-slate-100 text-slate-600 border border-slate-200',
  purple: 'bg-purple-50 text-purple-700 border border-purple-200',
  cyan: 'bg-cyan-50 text-cyan-700 border border-cyan-200',
}

export function Badge({ children, variant = 'neutral', icon: Icon, className = '' }) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full',
      variantMap[variant],
      className
    )}>
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {children}
    </span>
  )
}

export function SkillTag({ skill, variant = 'neutral', size = 'sm' }) {
  const sizeMap = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-1.5 text-sm',
  }
  return (
    <span className={cn(
      'inline-flex items-center gap-1 font-medium rounded-full',
      variantMap[variant],
      sizeMap[size]
    )}>
      {skill}
    </span>
  )
}

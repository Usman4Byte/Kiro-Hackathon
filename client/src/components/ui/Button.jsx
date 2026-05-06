import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { cn } from '../../utils/cn'

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon: Icon,
  iconRight: IconRight,
  className = '',
  disabled,
  ...props
}) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none'

  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm hover:shadow-md focus:ring-primary-500',
    secondary: 'bg-white text-primary-600 border-2 border-primary-200 hover:border-primary-400 hover:bg-primary-50 focus:ring-primary-400',
    ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-300',
    danger: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-sm focus:ring-red-400',
    success: 'bg-green-500 text-white hover:bg-green-600 shadow-sm focus:ring-green-400',
    gradient: 'bg-gradient-to-r from-primary-600 to-accent-DEFAULT text-white shadow-md hover:shadow-lg hover:from-primary-700 hover:to-cyan-500 focus:ring-primary-500',
    outline: 'text-slate-700 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 focus:ring-slate-300',
  }

  const sizes = {
    xs: 'px-3 py-1.5 text-xs',
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  }

  return (
    <motion.button
      whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : Icon ? (
        <Icon className="w-4 h-4 flex-shrink-0" />
      ) : null}
      {children}
      {IconRight && !loading && <IconRight className="w-4 h-4 flex-shrink-0" />}
    </motion.button>
  )
}

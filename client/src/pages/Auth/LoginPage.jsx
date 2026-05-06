import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Zap, Mail, Lock, ArrowRight } from 'lucide-react'
import { useAuthStore } from '../../store/useAuthStore'
import { Button } from '../../components/ui/Button'
import toast from 'react-hot-toast'

export function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const { login, isLoading, error } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) { toast.error('Please fill all fields'); return }
    const res = await login(form)
    if (res.success) {
      toast.success('Welcome back!')
      navigate('/dashboard')
    } else {
      toast.error(res.error || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-1 bg-gradient-primary items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${80 + i * 40}px`,
                height: `${80 + i * 40}px`,
                top: `${10 + i * 15}%`,
                left: `${5 + i * 12}%`,
                opacity: 0.3,
              }}
              animate={{ y: [0, -20, 0], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
            />
          ))}
        </div>
        <div className="relative text-white text-center max-w-sm">
          <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-black mb-4">Welcome Back!</h2>
          <p className="text-white/80 text-lg">Sign in to continue improving your resume and landing your dream job.</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo mobile */}
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-600 to-cyan-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-900">ResumeAI</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-black text-slate-900 mb-2">Sign In</h1>
            <p className="text-slate-500">New here? <Link to="/register" className="text-primary-600 font-semibold hover:underline">Create an account</Link></p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-field pl-11"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input-field pl-11 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="gradient"
              size="lg"
              loading={isLoading}
              className="w-full"
            >
              Sign In
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <div className="mt-6 p-4 bg-primary-50 rounded-xl border border-primary-100">
            <p className="text-xs text-primary-600 font-medium text-center">
              🚀 Demo: enter any email & password to explore the app
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

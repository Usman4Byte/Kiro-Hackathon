import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Zap, Mail, Lock, User, ArrowRight, CheckCircle } from 'lucide-react'
import { useAuthStore } from '../../store/useAuthStore'
import { Button } from '../../components/ui/Button'
import { isValidEmail } from '../../utils/helpers'
import toast from 'react-hot-toast'

const perks = [
  'Unlimited resume analyses',
  'AI-powered improvement suggestions',
  'ATS compatibility scoring',
  'Export PDF reports',
]

export function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const { register, isLoading } = useAuthStore()
  const navigate = useNavigate()

  const validate = () => {
    if (!form.name.trim()) { toast.error('Please enter your name'); return false }
    if (!isValidEmail(form.email)) { toast.error('Please enter a valid email'); return false }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return false }
    if (form.password !== form.confirm) { toast.error('Passwords do not match'); return false }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    const res = await register({ name: form.name, email: form.email, password: form.password })
    if (res.success) {
      toast.success('Account created! Welcome to ResumeAI 🎉')
      navigate('/dashboard')
    } else {
      toast.error(res.error || 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col flex-1 bg-gradient-primary items-center justify-center p-12 relative overflow-hidden">
        <div className="relative text-white max-w-sm">
          <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-black mb-3">Start Landing Interviews</h2>
          <p className="text-white/80 mb-8">Join 10,000+ professionals using ResumeAI to get noticed.</p>
          <div className="space-y-3">
            {perks.map((perk) => (
              <div key={perk} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-white/90 text-sm">{perk}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-600 to-cyan-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-900">ResumeAI</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-black text-slate-900 mb-2">Create Account</h1>
            <p className="text-slate-500">Already have one? <Link to="/login" className="text-primary-600 font-semibold hover:underline">Sign In</Link></p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="reg-name"
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-field pl-11"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="reg-email"
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
                  id="reg-password"
                  type={showPass ? 'text' : 'password'}
                  placeholder="At least 6 characters"
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

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="reg-confirm"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Repeat your password"
                  value={form.confirm}
                  onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                  className="input-field pl-11"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="gradient"
              size="lg"
              loading={isLoading}
              className="w-full"
            >
              Create Account
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <p className="text-xs text-slate-400 text-center mt-4">
            By creating an account, you agree to our{' '}
            <span className="text-primary-600 cursor-pointer hover:underline">Terms of Service</span>{' '}
            and{' '}
            <span className="text-primary-600 cursor-pointer hover:underline">Privacy Policy</span>.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

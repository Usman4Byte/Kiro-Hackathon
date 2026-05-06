import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Menu, X, ChevronDown, Bell, LogOut, Settings, User } from 'lucide-react'
import { useAuthStore } from '../../store/useAuthStore'
import { getInitials } from '../../utils/helpers'

const navLinks = [
  { href: '/#features', label: 'Features' },
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/#testimonials', label: 'Testimonials' },
  { href: '/#faq', label: 'FAQ' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const isLanding = location.pathname === '/'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isLanding
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-600 to-cyan-500 flex items-center justify-center shadow-md">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-900 tracking-tight">
              Resume<span className="gradient-text">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          {isLanding && (
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}

          {/* Auth Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/dashboard"
                  className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
                >
                  Dashboard
                </Link>
                {/* Profile dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 pl-3 pr-2 py-2 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-cyan-400 flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">{getInitials(user?.name || 'U')}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-1 w-52 bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden"
                        onMouseLeave={() => setProfileOpen(false)}
                      >
                        <div className="px-4 py-3 border-b border-slate-100">
                          <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
                          <p className="text-xs text-slate-400">{user?.email}</p>
                        </div>
                        <div className="py-1">
                          <Link to="/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                            <User className="w-4 h-4 text-slate-400" /> Profile
                          </Link>
                          <Link to="/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                            <Settings className="w-4 h-4 text-slate-400" /> Settings
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="w-4 h-4" /> Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn-primary py-2 text-sm shadow-none"
                >
                  Get Started Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {isLanding && navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg">Dashboard</Link>
                    <button onClick={handleLogout} className="w-full text-left px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg">Sign Out</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-center bg-slate-50 rounded-xl">Sign In</Link>
                    <Link to="/register" onClick={() => setMobileOpen(false)} className="btn-primary justify-center">Get Started Free</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

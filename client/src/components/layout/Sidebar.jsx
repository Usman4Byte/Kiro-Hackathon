import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, FileText, Search, TrendingUp, History,
  User, Settings, LogOut, Zap, Shield, ChevronLeft, ChevronRight
} from 'lucide-react'
import { useAuthStore } from '../../store/useAuthStore'
import { getInitials } from '../../utils/helpers'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/upload', icon: FileText, label: 'Analyze Resume' },
  { to: '/history', icon: History, label: 'History' },
  { to: '/improvement', icon: TrendingUp, label: 'AI Studio' },
]

const bottomItems = [
  { to: '/profile', icon: Settings, label: 'Settings' },
  { to: '/admin', icon: Shield, label: 'Admin' },
]

export function Sidebar({ collapsed, onToggle }) {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 top-0 bottom-0 z-40 flex flex-col bg-white border-r border-slate-100 shadow-sm overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-slate-100 flex-shrink-0">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-600 to-cyan-500 flex items-center justify-center shadow-md flex-shrink-0">
          <Zap className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="font-bold text-lg text-slate-900 tracking-tight whitespace-nowrap"
          >
            Resume<span className="gradient-text">AI</span>
          </motion.span>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto scrollbar-thin">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="activeNavBg"
                    className="absolute inset-0 bg-primary-50 rounded-xl"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className={`w-5 h-5 flex-shrink-0 relative z-10 ${isActive ? 'text-primary-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                {!collapsed && (
                  <span className="relative z-10 whitespace-nowrap">{label}</span>
                )}
                {isActive && !collapsed && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-600 relative z-10" />
                )}
                {/* Tooltip when collapsed */}
                {collapsed && (
                  <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg z-50">
                    {label}
                  </div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-slate-100 py-2 px-2 space-y-1">
        {bottomItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative ${
                isActive ? 'bg-primary-50 text-primary-700' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-primary-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                {!collapsed && <span className="whitespace-nowrap">{label}</span>}
                {collapsed && (
                  <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    {label}
                  </div>
                )}
              </>
            )}
          </NavLink>
        ))}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all group relative"
        >
          <LogOut className="w-5 h-5 flex-shrink-0 text-slate-400 group-hover:text-red-500" />
          {!collapsed && <span className="whitespace-nowrap">Sign Out</span>}
          {collapsed && (
            <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Sign Out
            </div>
          )}
        </button>

        {/* User Profile */}
        <div className="mt-2 pt-2 border-t border-slate-100">
          <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl ${collapsed ? '' : 'bg-slate-50'}`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-semibold">{getInitials(user?.name || 'U')}</span>
            </div>
            {!collapsed && (
              <div className="overflow-hidden flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">{user?.name || 'User'}</p>
                <p className="text-xs text-slate-400 truncate">{user?.email}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow z-50"
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3 text-slate-500" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-slate-500" />
        )}
      </button>
    </motion.aside>
  )
}

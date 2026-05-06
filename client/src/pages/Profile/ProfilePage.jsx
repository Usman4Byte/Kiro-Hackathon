import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Lock, Bell, Trash2, Save, Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '../../store/useAuthStore'
import { authService } from '../../services/authService'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { staggerContainer, staggerItem, fadeInUp } from '../../animations/variants'
import { getInitials } from '../../utils/helpers'
import toast from 'react-hot-toast'

export function ProfilePage() {
  const { user, updateUser } = useAuthStore()
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' })
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [notifs, setNotifs] = useState({ email: true, weekly: false, tips: true })

  const handleSaveProfile = async () => {
    setIsSaving(true)
    try {
      const updated = await authService.updateProfile(form)
      updateUser(updated)
      toast.success('Profile updated!')
    } catch {
      toast.error('Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="max-w-3xl mx-auto space-y-6"
    >
      <motion.div variants={fadeInUp}>
        <h1 className="page-header">Profile & Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account information and preferences.</p>
      </motion.div>

      {/* Profile Avatar */}
      <motion.div variants={staggerItem}>
        <Card>
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-500 to-cyan-400 flex items-center justify-center shadow-glow flex-shrink-0">
              <span className="text-white text-2xl font-black">{getInitials(user?.name || 'U')}</span>
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">{user?.name}</h2>
              <p className="text-slate-500">{user?.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="badge-primary">{user?.plan || 'Free'} Plan</span>
                <span className="badge-neutral">{user?.analysisCount || 24} analyses</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Personal Info */}
      <motion.div variants={staggerItem}>
        <Card>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center">
              <User className="w-5 h-5 text-primary-600" />
            </div>
            <h3 className="font-bold text-slate-900">Personal Information</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
              <input
                id="profile-name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <input
                id="profile-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-field"
              />
            </div>
            <div className="flex justify-end">
              <Button variant="gradient" size="sm" icon={Save} loading={isSaving} onClick={handleSaveProfile}>
                Save Changes
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Change Password */}
      <motion.div variants={staggerItem}>
        <Card>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
              <Lock className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="font-bold text-slate-900">Change Password</h3>
          </div>
          <div className="space-y-4">
            {[
              { id: 'current-pass', label: 'Current Password', key: 'current' },
              { id: 'new-pass', label: 'New Password', key: 'newPass' },
              { id: 'confirm-pass', label: 'Confirm New Password', key: 'confirm' },
            ].map(({ id, label, key }) => (
              <div key={key}>
                <label className="block text-sm font-semibold text-slate-700 mb-2">{label}</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    id={id}
                    type={showPass ? 'text' : 'password'}
                    value={passwords[key]}
                    onChange={(e) => setPasswords({ ...passwords, [key]: e.target.value })}
                    className="input-field pl-11 pr-11"
                    placeholder="••••••••"
                  />
                  {key === 'current' && (
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div className="flex justify-end">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => toast.success('Password updated (mock)')}
              >
                Update Password
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Notifications */}
      <motion.div variants={staggerItem}>
        <Card>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">
              <Bell className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-bold text-slate-900">Notifications</h3>
          </div>
          <div className="space-y-4">
            {[
              { key: 'email', label: 'Email notifications', desc: 'Receive analysis results via email' },
              { key: 'weekly', label: 'Weekly digest', desc: 'Summary of your resume improvements' },
              { key: 'tips', label: 'AI career tips', desc: 'Weekly personalized career tips from AI' },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{label}</p>
                  <p className="text-xs text-slate-400">{desc}</p>
                </div>
                <button
                  onClick={() => setNotifs({ ...notifs, [key]: !notifs[key] })}
                  className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${notifs[key] ? 'bg-primary-600' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${notifs[key] ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Danger Zone */}
      <motion.div variants={staggerItem}>
        <div className="border-2 border-red-100 rounded-2xl p-6 bg-red-50/50">
          <div className="flex items-center gap-3 mb-4">
            <Trash2 className="w-5 h-5 text-red-500" />
            <h3 className="font-bold text-red-700">Danger Zone</h3>
          </div>
          <p className="text-sm text-red-600 mb-4">Once you delete your account, there is no going back. All your analyses and data will be permanently removed.</p>
          <Button variant="danger" size="sm" onClick={() => toast.error('Account deletion requires confirmation (not implemented in demo)')}>
            Delete Account
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

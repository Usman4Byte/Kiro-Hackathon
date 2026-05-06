import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Suspense, lazy } from 'react'

// Layouts
import { AppLayout } from './layouts/AppLayout'
import { ProtectedRoute, PublicOnlyRoute } from './layouts/ProtectedRoute'

// Pages (lazy-loaded for performance)
const LandingPage = lazy(() => import('./pages/Landing/LandingPage').then(m => ({ default: m.LandingPage })))
const LoginPage = lazy(() => import('./pages/Auth/LoginPage').then(m => ({ default: m.LoginPage })))
const RegisterPage = lazy(() => import('./pages/Auth/RegisterPage').then(m => ({ default: m.RegisterPage })))
const DashboardPage = lazy(() => import('./pages/Dashboard/DashboardPage').then(m => ({ default: m.DashboardPage })))
const ResumeUploadPage = lazy(() => import('./pages/Resume/ResumeUploadPage').then(m => ({ default: m.ResumeUploadPage })))
const MatchResultsPage = lazy(() => import('./pages/Analysis/MatchResultsPage').then(m => ({ default: m.MatchResultsPage })))
const ImprovementStudioPage = lazy(() => import('./pages/Improvement/ImprovementStudioPage').then(m => ({ default: m.ImprovementStudioPage })))
const HistoryPage = lazy(() => import('./pages/History/HistoryPage').then(m => ({ default: m.HistoryPage })))
const ProfilePage = lazy(() => import('./pages/Profile/ProfilePage').then(m => ({ default: m.ProfilePage })))
const AdminPage = lazy(() => import('./pages/Admin/AdminPage').then(m => ({ default: m.AdminPage })))

// Fallback loading
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-primary-100 border-t-primary-600 animate-spin" />
        </div>
        <p className="text-slate-400 text-sm font-medium animate-pulse">Loading...</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />

          {/* Auth Routes (redirect to dashboard if already logged in) */}
          <Route element={<PublicOnlyRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Protected App Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/upload" element={<ResumeUploadPage />} />
              <Route path="/analysis/:id" element={<MatchResultsPage />} />
              <Route path="/improvement" element={<ImprovementStudioPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Route>
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

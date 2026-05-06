import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sidebar } from '../components/layout/Sidebar'
import { Toaster } from 'react-hot-toast'
import { AIAssistantSidebar } from '../components/ai/AIAssistantSidebar'

export function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [aiOpen, setAiOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <motion.main
        animate={{ marginLeft: sidebarCollapsed ? 72 : 240 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-screen"
      >
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </motion.main>

      {/* AI Assistant */}
      <AIAssistantSidebar isOpen={aiOpen} onToggle={() => setAiOpen(!aiOpen)} />

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: '12px',
            background: '#fff',
            color: '#0f172a',
            border: '1px solid #f1f5f9',
            boxShadow: '0 4px 24px -2px rgba(0,0,0,0.08)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
          },
          success: { iconTheme: { primary: '#22C55E', secondary: '#fff' } },
          error: { iconTheme: { primary: '#EF4444', secondary: '#fff' } },
        }}
      />
    </div>
  )
}

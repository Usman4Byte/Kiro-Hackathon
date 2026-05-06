import { create } from 'zustand'
import { resumeService } from '../services/resumeService'

export const useAnalysisStore = create((set, get) => ({
  currentAnalysis: null,
  history: [],
  isAnalyzing: false,
  isLoading: false,
  error: null,

  // Set current analysis (after upload)
  setCurrentAnalysis: (analysis) => set({ currentAnalysis: analysis }),

  // Run analysis
  runAnalysis: async (formData) => {
    set({ isAnalyzing: true, error: null })
    try {
      const analysis = await resumeService.analyze(formData)
      set({ currentAnalysis: analysis, isAnalyzing: false })
      return { success: true, analysis }
    } catch (err) {
      set({ isAnalyzing: false, error: err.message })
      return { success: false, error: err.message }
    }
  },

  // Fetch history
  fetchHistory: async () => {
    set({ isLoading: true })
    try {
      const rawHistory = await resumeService.getHistory()
      // Map backend fields to frontend expectations
      const history = rawHistory.map(item => ({
        id: item._id,
        jobTitle: item.jobTitle || 'Unknown Role',
        company: item.company || 'Unknown Company',
        score: item.scores?.overall || 0,
        date: item.createdAt
      }))
      set({ history, isLoading: false })
    } catch (err) {
      set({ isLoading: false, error: err.message })
    }
  },

  // Fetch single analysis
  fetchAnalysis: async (id) => {
    set({ isLoading: true })
    try {
      const analysis = await resumeService.getAnalysisById(id)
      set({ currentAnalysis: analysis, isLoading: false })
      return analysis
    } catch (err) {
      set({ isLoading: false, error: err.message })
    }
  },

  // Delete analysis from history
  deleteAnalysis: async (id) => {
    try {
      await resumeService.deleteAnalysis(id)
      set({ history: get().history.filter((a) => a.id !== id) })
    } catch (err) {
      set({ error: err.message })
    }
  },

  clearError: () => set({ error: null }),
  clearCurrent: () => set({ currentAnalysis: null }),
}))

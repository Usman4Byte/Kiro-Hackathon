import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import {
  Upload, FileText, X, Briefcase, ChevronRight, Loader2,
  FileUp, Type, CheckCircle, Brain
} from 'lucide-react'
import { useAnalysisStore } from '../../store/useAnalysisStore'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { staggerContainer, staggerItem, fadeInUp } from '../../animations/variants'
import { formatFileSize } from '../../utils/helpers'
import toast from 'react-hot-toast'

function DropZone({ onFile, file, label, accept }) {
  const onDrop = useCallback((accepted) => {
    if (accepted[0]) onFile(accepted[0])
  }, [onFile])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles: 1,
  })

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
        isDragActive
          ? 'border-primary-400 bg-primary-50'
          : file
          ? 'border-green-300 bg-green-50'
          : 'border-slate-200 hover:border-primary-300 hover:bg-primary-50/50'
      }`}
    >
      <input {...getInputProps()} />
      {file ? (
        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-green-700 text-sm">{file.name}</p>
            <p className="text-xs text-green-500">{formatFileSize(file.size)}</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isDragActive ? 'bg-primary-100' : 'bg-slate-100'}`}>
            <FileUp className={`w-6 h-6 ${isDragActive ? 'text-primary-600' : 'text-slate-400'}`} />
          </div>
          <div>
            <p className="font-semibold text-slate-700 text-sm">{label}</p>
            <p className="text-xs text-slate-400 mt-0.5">PDF, DOCX, or TXT · Max 10MB</p>
          </div>
          <span className="text-xs text-primary-600 font-medium bg-primary-50 px-3 py-1 rounded-full">
            Browse Files
          </span>
        </div>
      )}
    </div>
  )
}

function AIThinkingOverlay() {
  const steps = [
    'Parsing resume structure...',
    'Analyzing semantic content...',
    'Matching against job requirements...',
    'Identifying skill gaps...',
    'Calculating compatibility score...',
    'Generating AI suggestions...',
  ]
  const [step, setStep] = useState(0)

  useState(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % steps.length)
    }, 600)
    return () => clearInterval(interval)
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-white/80 backdrop-blur-md z-50 flex items-center justify-center"
    >
      <div className="text-center max-w-sm px-6">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border-4 border-primary-100 border-t-primary-600"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Brain className="w-8 h-8 text-primary-600" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">AI Analysis in Progress</h3>
        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-slate-500 text-sm"
          >
            {steps[step % steps.length]}
          </motion.p>
        </AnimatePresence>
        <div className="mt-4 flex gap-1 justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-primary-400 rounded-full"
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export function ResumeUploadPage() {
  const [resumeTab, setResumeTab] = useState('upload') // 'upload' | 'paste'
  const [jobTab, setJobTab] = useState('paste')
  const [resumeFile, setResumeFile] = useState(null)
  const [resumeText, setResumeText] = useState('')
  const [jobText, setJobText] = useState('')
  const { isAnalyzing, runAnalysis } = useAnalysisStore()
  const navigate = useNavigate()

  const handleAnalyze = async () => {
    const hasResume = resumeTab === 'upload' ? !!resumeFile : !!resumeText.trim()
    const hasJob = !!jobText.trim()
    if (!hasResume) { toast.error('Please provide your resume'); return }
    if (!hasJob) { toast.error('Please enter the job description'); return }

    const formData = new FormData()
    if (resumeTab === 'upload' && resumeFile) formData.append('resume', resumeFile)
    else formData.append('resumeText', resumeText)
    formData.append('jobDescription', jobText)

    const res = await runAnalysis(formData)
    if (res.success) {
      toast.success('Analysis complete!')
      navigate(`/analysis/${res.analysis.id}`)
    } else {
      toast.error(res.error || 'Analysis failed')
    }
  }

  return (
    <>
      {isAnalyzing && <AIThinkingOverlay />}

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto space-y-6"
      >
        {/* Header */}
        <motion.div variants={fadeInUp}>
          <h1 className="page-header">Analyze Resume</h1>
          <p className="text-slate-500 mt-1">Upload your resume and paste the job description to get an AI match analysis.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Resume Input */}
          <motion.div variants={staggerItem}>
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary-600" />
                </div>
                <h2 className="font-bold text-slate-900">Your Resume</h2>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-4">
                {[
                  { id: 'upload', label: 'Upload File', icon: Upload },
                  { id: 'paste', label: 'Paste Text', icon: Type },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setResumeTab(id)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-semibold rounded-lg transition-all ${
                      resumeTab === id
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" /> {label}
                  </button>
                ))}
              </div>

              {resumeTab === 'upload' ? (
                <div>
                  <DropZone
                    label="Drop your resume here"
                    onFile={setResumeFile}
                    file={resumeFile}
                    accept={{ 'application/pdf': ['.pdf'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'], 'text/plain': ['.txt'] }}
                  />
                  {resumeFile && (
                    <button
                      onClick={() => setResumeFile(null)}
                      className="mt-2 text-xs text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors"
                    >
                      <X className="w-3 h-3" /> Remove file
                    </button>
                  )}
                </div>
              ) : (
                <textarea
                  id="resume-text"
                  placeholder="Paste your resume text here..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  rows={12}
                  className="input-field resize-none text-sm font-normal leading-relaxed"
                />
              )}
            </Card>
          </motion.div>

          {/* Job Description Input */}
          <motion.div variants={staggerItem}>
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-violet-600" />
                </div>
                <h2 className="font-bold text-slate-900">Job Description</h2>
              </div>

              <textarea
                id="job-description"
                placeholder="Paste the full job description here — including responsibilities, requirements, and preferred qualifications..."
                value={jobText}
                onChange={(e) => setJobText(e.target.value)}
                rows={16}
                className="input-field resize-none text-sm font-normal leading-relaxed"
              />
              <p className="text-xs text-slate-400 mt-2">{jobText.length} characters</p>
            </Card>
          </motion.div>
        </div>

        {/* Analyze Button */}
        <motion.div variants={staggerItem} className="flex justify-center">
          <Button
            variant="gradient"
            size="xl"
            onClick={handleAnalyze}
            loading={isAnalyzing}
            className="min-w-64 shadow-glow"
          >
            <Brain className="w-5 h-5" />
            Run AI Analysis
            <ChevronRight className="w-5 h-5" />
          </Button>
        </motion.div>

        {/* Info Banner */}
        <motion.div variants={staggerItem}>
          <div className="bg-primary-50 border border-primary-100 rounded-2xl p-4 flex items-start gap-3">
            <Brain className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-primary-900">Semantic AI Analysis</p>
              <p className="text-sm text-primary-700 mt-0.5">
                Our AI doesn't just match keywords — it understands context, role expectations, and career alignment to give you a true compatibility score.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  )
}

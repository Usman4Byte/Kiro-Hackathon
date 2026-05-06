// Utility helper functions

/**
 * Format a date string to a readable format
 * @param {string} dateStr
 * @param {object} options
 * @returns {string}
 */
export function formatDate(dateStr, options = {}) {
  const date = new Date(dateStr)
  const defaults = { year: 'numeric', month: 'short', day: 'numeric' }
  return date.toLocaleDateString('en-US', { ...defaults, ...options })
}

/**
 * Get color class based on score
 * @param {number} score 0-100
 * @returns {{ text: string, bg: string, border: string, light: string }}
 */
export function getScoreColor(score) {
  if (score >= 75) {
    return { text: 'text-green-600', bg: 'bg-green-500', border: 'border-green-400', light: 'bg-green-50', hex: '#22C55E' }
  } else if (score >= 50) {
    return { text: 'text-amber-600', bg: 'bg-amber-500', border: 'border-amber-400', light: 'bg-amber-50', hex: '#F59E0B' }
  }
  return { text: 'text-red-600', bg: 'bg-red-500', border: 'border-red-400', light: 'bg-red-50', hex: '#EF4444' }
}

/**
 * Get label for score range
 * @param {number} score
 * @returns {string}
 */
export function getScoreLabel(score) {
  if (score >= 85) return 'Excellent Match'
  if (score >= 70) return 'Good Match'
  if (score >= 50) return 'Fair Match'
  if (score >= 30) return 'Weak Match'
  return 'Poor Match'
}

/**
 * Get priority color classes
 */
export function getPriorityColor(priority) {
  const map = {
    High: { text: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' },
    Medium: { text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
    Low: { text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
  }
  return map[priority] || map.Low
}

/**
 * Truncate string to maxLength
 */
export function truncate(str, maxLength = 100) {
  if (!str) return ''
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength) + '...'
}

/**
 * Format file size
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Get file extension
 */
export function getFileExtension(filename) {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2)
}

/**
 * Simulate async delay (for mock API calls)
 */
export function delay(ms = 1500) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Debounce function
 */
export function debounce(fn, wait) {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), wait)
  }
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = text
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    return true
  }
}

/**
 * Generate initials from name
 */
export function getInitials(name) {
  if (!name) return '?'
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

/**
 * Validate email format
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Get relative time string
 */
export function getRelativeTime(dateStr) {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now - date
  const diffDays = Math.floor(diffMs / 86400000)
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return formatDate(dateStr)
}

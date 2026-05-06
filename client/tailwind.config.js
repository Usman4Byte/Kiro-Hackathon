/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        accent: {
          light: '#e0f2fe',
          DEFAULT: '#38bdf8',
          dark: '#0284c7',
        },
        background: '#F8FAFC',
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'card': '0 4px 24px -2px rgba(0,0,0,0.06), 0 2px 8px -2px rgba(0,0,0,0.04)',
        'card-hover': '0 12px 40px -4px rgba(37,99,235,0.12), 0 4px 16px -2px rgba(0,0,0,0.06)',
        'glow': '0 0 30px rgba(37,99,235,0.15)',
        'glow-accent': '0 0 40px rgba(56,189,248,0.2)',
        'inner-soft': 'inset 0 1px 3px rgba(0,0,0,0.06)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #2563eb 0%, #38bdf8 100%)',
        'gradient-soft': 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 50%, #e0f2fe 100%)',
        'gradient-hero': 'linear-gradient(160deg, #eff6ff 0%, #e0f2fe 30%, #f0fdf4 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 2s infinite',
        'float-delay-2': 'float 6s ease-in-out 4s infinite',
        'scan': 'scan 3s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'typing': 'typing 1.2s steps(3) infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.4s ease-out',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(400%)', opacity: '0' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        typing: {
          '0%': { content: '"."' },
          '33%': { content: '".."' },
          '66%': { content: '"..."' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

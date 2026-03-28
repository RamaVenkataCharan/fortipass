/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
      },
      colors: {
        bg: '#020617',
        card: '#0F172A',
        input: '#1E293B',
        primary: '#22C55E',
        warning: '#FACC15',
        danger: '#EF4444',
        accent: '#38BDF8',
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(34,197,94,0.35)',
        'glow-red':   '0 0 20px rgba(239,68,68,0.35)',
        'glow-blue':  '0 0 20px rgba(56,189,248,0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'slide-in':   'slideIn 0.4s ease-out both',
        'fade-in':    'fadeIn 0.3s ease-out both',
      },
      keyframes: {
        slideIn: {
          '0%':   { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}

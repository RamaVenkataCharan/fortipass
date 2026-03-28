const ICONS = {
  success: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  info: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
}

const COLORS = {
  success: 'border-primary/30 bg-primary/10 text-primary',
  error:   'border-danger/30 bg-danger/10 text-danger',
  info:    'border-accent/30 bg-accent/10 text-accent',
}

export default function Toast({ msg, type = 'success' }) {
  return (
    <div
      className={`toast fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2.5 rounded-xl border backdrop-blur-xl shadow-xl z-50 text-sm font-semibold ${COLORS[type]}`}
      role="status"
      aria-live="polite"
    >
      {ICONS[type]}
      {msg}
    </div>
  )
}

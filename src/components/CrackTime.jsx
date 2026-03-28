export default function CrackTime({ crackTime, textColor }) {
  return (
    <div className="flex items-center gap-2 mt-3 px-3 py-2 rounded-lg bg-white/3 border border-white/5">
      <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 ${textColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
      <span className="text-xs text-slate-400">Crack time estimate:</span>
      <span className={`text-sm font-bold ${textColor}`} aria-live="polite">
        {crackTime}
      </span>
    </div>
  )
}

export default function RecommendationsPanel({ suggestions }) {
  if (!suggestions || suggestions.length === 0) return null

  return (
    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 section-appear">
      <div className="flex items-center gap-2 mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <span className="text-xs font-bold text-primary uppercase tracking-widest">Recommendations</span>
      </div>
      <ul className="flex flex-col gap-1.5">
        {suggestions.slice(0, 6).map((sug, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
            <span className="text-primary mt-0.5 shrink-0">✔</span>
            {sug}
          </li>
        ))}
      </ul>
    </div>
  )
}

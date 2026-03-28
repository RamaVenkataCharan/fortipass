export default function IssuesPanel({ issues }) {
  if (!issues || issues.length === 0) return null

  return (
    <div className="rounded-xl border border-danger/20 bg-danger/5 p-4 section-appear">
      <div className="flex items-center gap-2 mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
        <span className="text-xs font-bold text-danger uppercase tracking-widest">Detected Issues</span>
      </div>
      <ul className="flex flex-col gap-1.5">
        {issues.map((issue, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
            <span className="text-danger mt-0.5 shrink-0">✕</span>
            {issue}
          </li>
        ))}
      </ul>
    </div>
  )
}

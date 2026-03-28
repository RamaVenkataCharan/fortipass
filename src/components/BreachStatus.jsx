export default function BreachStatus({ loading, breach, count, active }) {
  if (!active) return null

  const formatCount = (n) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
    if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
    return n.toString()
  }

  return (
    <div className="flex items-center justify-between rounded-xl px-4 py-3 border border-white/5 bg-white/3 section-appear">
      <div className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <span className="text-xs text-slate-400 font-medium">Breach Status</span>
      </div>

      {loading ? (
        <span className="text-xs text-slate-500 flex items-center gap-1.5">
          <svg className="animate-spin w-3.5 h-3.5 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          Checking…
        </span>
      ) : breach === null ? (
        <span className="text-xs text-slate-500">—</span>
      ) : breach === true ? (
        <div className="flex items-center gap-1.5 breach-pulse">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-danger/15 text-danger border border-danger/30">
            <span>⚠</span>
            Found in {formatCount(count)} breach{count !== 1 ? 'es' : ''}
          </span>
        </div>
      ) : breach === false ? (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-primary/15 text-primary border border-primary/30">
          <span>✓</span> Not found in leaks
        </span>
      ) : (
        <span className="text-xs text-slate-500">Unable to check</span>
      )}
    </div>
  )
}

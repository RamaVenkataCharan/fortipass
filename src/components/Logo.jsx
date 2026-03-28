export default function Logo() {
  return (
    <div className="flex flex-col items-center gap-1 py-2 section-appear">
      {/* Shield SVG icon */}
      <div className="relative logo-shimmer overflow-hidden">
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="shieldGrad" x1="0" y1="0" x2="52" y2="52" gradientUnits="userSpaceOnUse">
              <stop stopColor="#22C55E"/>
              <stop offset="1" stopColor="#38BDF8"/>
            </linearGradient>
          </defs>
          <path d="M26 3L6 11v14c0 12.15 8.6 23.52 20 26 11.4-2.48 20-13.85 20-26V11L26 3z"
            fill="url(#shieldGrad)" opacity="0.15"/>
          <path d="M26 3L6 11v14c0 12.15 8.6 23.52 20 26 11.4-2.48 20-13.85 20-26V11L26 3z"
            stroke="url(#shieldGrad)" strokeWidth="2" fill="none"/>
          <path d="M20 26l4.5 4.5L33 20" stroke="url(#shieldGrad)" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <h1 className="text-3xl font-bold tracking-tight" style={{
        fontFamily: "'Poppins', sans-serif",
        background: 'linear-gradient(135deg, #22C55E 30%, #38BDF8 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        FortiPass
      </h1>
      <p className="text-sm text-slate-400 tracking-wider uppercase font-medium">
        Password Security Analyzer
      </p>
    </div>
  )
}

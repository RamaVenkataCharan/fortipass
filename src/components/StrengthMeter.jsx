const FILL_COLORS = {
  'Very Weak': 'linear-gradient(90deg, #EF4444, #b91c1c)',
  'Weak':      'linear-gradient(90deg, #EF4444, #f97316)',
  'Fair':      'linear-gradient(90deg, #FACC15, #f97316)',
  'Strong':    'linear-gradient(90deg, #22C55E, #16a34a)',
  'Very Strong': 'linear-gradient(90deg, #22C55E, #38BDF8)',
}

const SCORE_DOTS = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong']

export default function StrengthMeter({ analysis }) {
  const { label, percentage, score } = analysis
  const fillColor = FILL_COLORS[label] || FILL_COLORS['Very Weak']

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center text-xs font-semibold">
        <span className="text-slate-400 uppercase tracking-widest">Strength</span>
        <span className={`font-bold ${analysis.textColor}`}>{label}</span>
      </div>

      {/* Progress bar */}
      <div className="strength-track">
        <div
          className="strength-fill"
          style={{
            width: `${percentage}%`,
            background: fillColor,
            boxShadow: score >= 3 ? '0 0 10px rgba(34,197,94,0.5)' : score >= 2 ? '0 0 8px rgba(250,204,21,0.35)' : '0 0 8px rgba(239,68,68,0.4)',
          }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      {/* Dot indicators */}
      <div className="flex gap-1.5 justify-between">
        {SCORE_DOTS.map((s, i) => (
          <div
            key={s}
            className="flex-1 h-1 rounded-full transition-all duration-500"
            style={{
              background: i <= score
                ? (score >= 3 ? '#22C55E' : score === 2 ? '#FACC15' : '#EF4444')
                : 'rgba(255,255,255,0.08)',
            }}
            title={s}
          />
        ))}
      </div>

      <div className="flex justify-between text-xs text-slate-600">
        <span>Very Weak</span>
        <span>Very Strong</span>
      </div>
    </div>
  )
}

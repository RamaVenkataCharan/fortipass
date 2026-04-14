import { FILL_COLORS, STRENGTH_LABELS } from '@/config/constants'
import { motion } from 'framer-motion'

export default function StrengthMeter({ analysis }) {
  const { label, percentage, score } = analysis
  const fillColor = FILL_COLORS[label] || FILL_COLORS['Very Weak']

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center text-xs font-semibold">
        <span className="text-slate-400 uppercase tracking-widest">Strength</span>
        <motion.span 
          key={label}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`font-bold ${analysis.textColor}`}
        >
          {label}
        </motion.span>
      </div>

      {/* Progress bar */}
      <div className="strength-track">
        <motion.div
          className="strength-fill"
          initial={{ width: 0 }}
          animate={{
            width: `${percentage}%`,
            background: fillColor,
            boxShadow: score >= 3 ? '0 0 10px rgba(34,197,94,0.5)' : score >= 2 ? '0 0 8px rgba(250,204,21,0.35)' : '0 0 8px rgba(239,68,68,0.4)',
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      {/* Dot indicators */}
      <div className="flex gap-1.5 justify-between">
        {STRENGTH_LABELS.map((s, i) => (
          <motion.div
            key={s}
            className="flex-1 h-1 rounded-full"
            animate={{
              background: i <= score
                ? (score >= 3 ? '#22C55E' : score === 2 ? '#FACC15' : '#EF4444')
                : 'rgba(255,255,255,0.08)',
            }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
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

/**
 * FortiPass — Reusable Input Component
 * Styled input with icon slot support
 */
export default function Input({
  label,
  className = '',
  ...props
}) {
  return (
    <div>
      {label && (
        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
          {label}
        </label>
      )}
      <input
        className={`pass-input w-full bg-input text-white placeholder-slate-600 rounded-xl px-4 py-3 text-base border border-white/5 transition-all duration-200 ${className}`}
        {...props}
      />
    </div>
  )
}

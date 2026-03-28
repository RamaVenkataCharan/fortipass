/**
 * FortiPass — Reusable Button Component
 * Variants: primary, secondary, danger, ghost
 */
export default function Button({
  children,
  variant = 'primary',
  className = '',
  disabled = false,
  ...props
}) {
  const variants = {
    primary: 'btn-primary text-bg font-bold',
    secondary: 'btn-secondary font-semibold',
    danger: 'bg-danger/10 text-danger border border-danger/20 hover:bg-danger/20 font-semibold',
    ghost: 'text-slate-400 hover:text-slate-200 hover:bg-white/5 font-medium',
  }

  return (
    <button
      className={`px-4 py-2 rounded-xl text-sm transition-all duration-200 ${variants[variant]} ${disabled ? 'opacity-40 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

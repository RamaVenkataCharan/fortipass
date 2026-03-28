/**
 * AuthLayout — Scaffold for future authentication pages
 * (Login, Register, Forgot Password)
 */
export default function AuthLayout({ children }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-bg px-4">
      <div className="cyber-grid" aria-hidden="true" />
      <div className="relative z-10 w-full max-w-[420px]">
        {children}
      </div>
    </div>
  )
}

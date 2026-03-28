/**
 * FortiPass — Providers Wrapper
 * Wraps application with all required context providers.
 * Add new providers here as the app scales.
 */
export default function Providers({ children }) {
  return (
    <>
      {children}
    </>
  )
}

import { useState, useEffect, useRef } from 'react'
import { checkBreach } from '@/features/security/services/breachService'
import { DEBOUNCE_MS } from '@/config/constants'

/**
 * useBreach — Custom hook for HIBP breach detection with debounce
 * Extracted from the monolith App.jsx
 */
export function useBreach(password) {
  const [breach, setBreach]               = useState(null)
  const [breachCount, setBreachCount]     = useState(0)
  const [breachLoading, setBreachLoading] = useState(false)
  const breachTimer = useRef(null)

  useEffect(() => {
    if (breachTimer.current) clearTimeout(breachTimer.current)
    if (!password) { setBreach(null); setBreachCount(0); return }

    setBreachLoading(true)
    breachTimer.current = setTimeout(async () => {
      const result = await checkBreach(password)
      setBreach(result.breached)
      setBreachCount(result.count)
      setBreachLoading(false)
    }, DEBOUNCE_MS)

    return () => clearTimeout(breachTimer.current)
  }, [password])

  return { breach, breachCount, breachLoading }
}

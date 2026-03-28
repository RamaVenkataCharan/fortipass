import { useState, useEffect, useRef } from 'react'
import { getAiRiskAssessment } from '@/features/security/utils/analyzer'
import { AI_DEBOUNCE_MS } from '@/config/constants'

export default function SecurityAuditor({ analysis, apiKey }) {
  const [assessment, setAssessment] = useState(null)
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState(null)
  const [prevScore, setPrevScore]   = useState(null)
  const timer = useRef(null)

  useEffect(() => {
    if (!apiKey || !analysis || analysis.score === prevScore) return

    // Clear on empty / no change
    if (timer.current) clearTimeout(timer.current)

    setLoading(true)
    setError(null)

    timer.current = setTimeout(async () => {
      try {
        const text = await getAiRiskAssessment(analysis, apiKey)
        setAssessment(text)
        setPrevScore(analysis.score)
      } catch (e) {
        setError(e.message)
        setAssessment(null)
      } finally {
        setLoading(false)
      }
    }, AI_DEBOUNCE_MS)

    return () => clearTimeout(timer.current)
  }, [analysis, apiKey]) // eslint-disable-line

  if (!apiKey) return null

  return (
    <div className="rounded-xl border border-accent/20 bg-accent/5 p-4 section-appear">
      <div className="flex items-center gap-2 mb-3">
        {/* Brain / AI icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15a2.25 2.25 0 01-.659 1.591l-1.591 1.591M19.8 15l-2.4-2.4M5 14.5a2.25 2.25 0 00-.659 1.591l1.591 1.591M5 14.5l2.4-2.4m9 7.5H7.8" />
        </svg>
        <span className="text-xs font-bold text-accent uppercase tracking-widest">AI Risk Assessment</span>
        <span className="ml-auto text-[10px] text-slate-600 font-mono">Gemini · metadata only</span>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <svg className="animate-spin w-3.5 h-3.5 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          Consulting security advisor…
        </div>
      )}

      {error && (
        <p className="text-xs text-danger/80">{error}</p>
      )}

      {assessment && !loading && (
        <p className="text-sm text-slate-300 leading-relaxed italic">
          "{assessment}"
        </p>
      )}

      {!loading && !error && !assessment && (
        <p className="text-xs text-slate-600">Type a password to receive an AI risk assessment.</p>
      )}
    </div>
  )
}

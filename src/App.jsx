import { useState, useEffect, useCallback, useRef } from 'react'
import { evaluatePassword } from './utils/evaluate'
import { checkBreach } from './utils/breach'
import { generatePassword } from './utils/generator'
import { useTheme } from './hooks/useTheme'
import PasswordInput from './components/PasswordInput'
import StrengthMeter from './components/StrengthMeter'
import CrackTime from './components/CrackTime'
import IssuesPanel from './components/IssuesPanel'
import RecommendationsPanel from './components/RecommendationsPanel'
import BreachStatus from './components/BreachStatus'
import PasswordGenerator from './components/PasswordGenerator'
import SecurityAuditor from './components/SecurityAuditor'
import ApiKeyPanel from './components/ApiKeyPanel'
import Toast from './components/Toast'
import Logo from './components/Logo'

const DEBOUNCE_MS = 350

export default function App() {
  const [theme, toggleTheme] = useTheme()

  const [password, setPassword]           = useState('')
  const [analysis, setAnalysis]           = useState(null)
  const [breach, setBreach]               = useState(null)
  const [breachCount, setBreachCount]     = useState(0)
  const [breachLoading, setBreachLoading] = useState(false)
  const [generatedPwd, setGeneratedPwd]   = useState('')
  const [toast, setToast]                 = useState(null)
  const [genOptions, setGenOptions]       = useState({ length: 16, includeSymbols: true, passphrase: false })
  const [apiKey, setApiKey]               = useState(
    () => sessionStorage.getItem('fortipass-gemini-key') || ''
  )
  const breachTimer = useRef(null)

  // Real-time strength evaluation
  useEffect(() => {
    if (!password) { setAnalysis(null); setBreach(null); setBreachCount(0); return }
    setAnalysis(evaluatePassword(password))
  }, [password])

  // Debounced HIBP breach check
  useEffect(() => {
    if (breachTimer.current) clearTimeout(breachTimer.current)
    if (!password) { setBreach(null); return }
    setBreachLoading(true)
    breachTimer.current = setTimeout(async () => {
      const result = await checkBreach(password)
      setBreach(result.breached)
      setBreachCount(result.count)
      setBreachLoading(false)
    }, DEBOUNCE_MS)
    return () => clearTimeout(breachTimer.current)
  }, [password])

  const handleGenerate = useCallback(() => {
    const pwd = generatePassword(genOptions)
    setGeneratedPwd(pwd)
    setPassword(pwd)
  }, [genOptions])

  const handleCopy = useCallback(async (text) => {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      showToast('✓ Copied to clipboard!', 'success')
    } catch {
      showToast('Failed to copy', 'error')
    }
  }, [])

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 2200)
  }

  return (
    <div className={`relative min-h-screen overflow-x-hidden flex flex-col items-center py-10 px-4 transition-colors duration-300 ${theme === 'dark' ? 'bg-bg' : 'bg-slate-100'}`}>
      {/* Cyber grid */}
      <div className="cyber-grid" aria-hidden="true" />

      {/* Radial blobs */}
      <div className="pointer-events-none fixed top-[-120px] left-[10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none fixed bottom-[-80px] right-[5%] w-[350px] h-[350px] rounded-full bg-accent/5 blur-3xl" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-[480px] flex flex-col gap-4">

        {/* Header row: Logo + Theme toggle */}
        <div className="relative flex items-start justify-center">
          <Logo />
          <button
            onClick={toggleTheme}
            className="absolute right-0 top-2 p-2 rounded-xl border border-white/8 bg-white/5 text-slate-400 hover:text-slate-200 hover:border-white/20 transition-all duration-200"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              /* Sun icon */
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              /* Moon icon */
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
              </svg>
            )}
          </button>
        </div>

        {/* Main analyzer card */}
        <div className={`glass-card rounded-2xl p-6 flex flex-col gap-5 section-appear ${theme === 'light' ? 'bg-white/80 border-slate-200' : ''}`}>

          <PasswordInput
            value={password}
            onChange={setPassword}
            onCopy={() => handleCopy(password)}
          />

          {password && analysis && (
            <div className="section-appear">
              <StrengthMeter analysis={analysis} />
              <CrackTime crackTime={analysis.crackTime} textColor={analysis.textColor} />
            </div>
          )}

          {password && analysis && analysis.issues.length > 0 && (
            <IssuesPanel issues={analysis.issues} />
          )}

          {password && analysis && analysis.suggestions.length > 0 && (
            <RecommendationsPanel suggestions={analysis.suggestions} />
          )}

          {/* AI Risk Assessment — only shown when key is set and password entered */}
          {password && analysis && (
            <SecurityAuditor analysis={analysis} apiKey={apiKey} />
          )}

          <BreachStatus loading={breachLoading} breach={breach} count={breachCount} active={!!password} />
        </div>

        {/* Password Generator */}
        <div className={`glass-card rounded-2xl p-6 section-appear ${theme === 'light' ? 'bg-white/80 border-slate-200' : ''}`}>
          <PasswordGenerator
            options={genOptions}
            setOptions={setGenOptions}
            onGenerate={handleGenerate}
            generatedPwd={generatedPwd}
            onCopy={() => handleCopy(generatedPwd)}
            onUsePassword={() => {
              if (generatedPwd) {
                setPassword(generatedPwd)
                showToast('Password loaded into analyzer', 'info')
              }
            }}
          />
        </div>

        {/* API Key panel */}
        <ApiKeyPanel apiKey={apiKey} setApiKey={setApiKey} />

        <p className="text-center text-xs text-slate-600 pb-2">
          FortiPass never stores or transmits your password. All analysis happens locally.
        </p>
      </div>

      {toast && <Toast msg={toast.msg} type={toast.type} />}
    </div>
  )
}

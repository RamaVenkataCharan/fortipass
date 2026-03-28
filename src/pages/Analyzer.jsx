import { useState, useCallback } from 'react'
import { useTheme } from '@/shared/hooks/useTheme'
import { TOAST_DURATION } from '@/config/constants'
import { copyToClipboard } from '@/shared/utils/helpers'

// Password domain
import { usePassword } from '@/features/password/hooks/usePassword'
import PasswordInput from '@/features/password/components/PasswordInput'
import StrengthMeter from '@/features/password/components/StrengthMeter'
import CrackTime from '@/features/password/components/CrackTime'
import PasswordGenerator from '@/features/password/components/PasswordGenerator'

// Security domain
import { useBreach } from '@/features/security/hooks/useBreach'
import IssuesPanel from '@/features/security/components/IssuesPanel'
import RecommendationsPanel from '@/features/security/components/RecommendationsPanel'
import BreachStatus from '@/features/security/components/BreachStatus'
import SecurityAuditor from '@/features/security/components/SecurityAuditor'
import ApiKeyPanel from '@/features/security/components/ApiKeyPanel'

// Shared
import Toast from '@/shared/components/Toast'

/**
 * Analyzer Page — Main password analysis interface
 * All business logic extracted from the old monolith App.jsx
 */
export default function Analyzer() {
  const [theme] = useTheme()
  const [toast, setToast] = useState(null)
  const [apiKey, setApiKey] = useState(
    () => sessionStorage.getItem('fortipass-gemini-key') || ''
  )

  // Domain hooks
  const {
    password, setPassword,
    analysis,
    generatedPwd,
    genOptions, setGenOptions,
    handleGenerate,
  } = usePassword()

  const { breach, breachCount, breachLoading } = useBreach(password)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), TOAST_DURATION)
  }

  const handleCopy = useCallback(async (text) => {
    if (!text) return
    const ok = await copyToClipboard(text)
    showToast(ok ? '✓ Copied to clipboard!' : 'Failed to copy', ok ? 'success' : 'error')
  }, [])

  return (
    <>
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

      {toast && <Toast msg={toast.msg} type={toast.type} />}
    </>
  )
}

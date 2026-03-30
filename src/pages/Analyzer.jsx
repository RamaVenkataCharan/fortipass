import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
}

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
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-6 w-full max-w-4xl mx-auto"
      >
        {/* Main analyzer card */}
        <motion.div 
          className={`glass-card rounded-2xl p-6 flex flex-col gap-5 ${theme === 'light' ? 'bg-white/90 border-slate-200 shadow-sm' : ''}`}
          layout
        >
          <PasswordInput
            value={password}
            onChange={setPassword}
            onCopy={() => handleCopy(password)}
          />

          <AnimatePresence mode="popLayout">
            {password && analysis && (
              <motion.div 
                key="strength-meter"
                variants={itemVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                layout
              >
                <StrengthMeter analysis={analysis} />
                <CrackTime crackTime={analysis.crackTime} textColor={analysis.textColor} />
              </motion.div>
            )}

            {password && analysis && analysis.issues.length > 0 && (
              <motion.div key="issues" variants={itemVariants} initial="hidden" animate="show" exit="exit" layout>
                <IssuesPanel issues={analysis.issues} />
              </motion.div>
            )}

            {password && analysis && analysis.suggestions.length > 0 && (
              <motion.div key="suggestions" variants={itemVariants} initial="hidden" animate="show" exit="exit" layout>
                <RecommendationsPanel suggestions={analysis.suggestions} />
              </motion.div>
            )}

            {/* AI Risk Assessment */}
            {password && analysis && (
              <motion.div key="auditor" variants={itemVariants} initial="hidden" animate="show" exit="exit" layout>
                <SecurityAuditor analysis={analysis} apiKey={apiKey} />
              </motion.div>
            )}
            
            {(password || breachLoading) && (
              <motion.div key="breach" variants={itemVariants} initial="hidden" animate="show" exit="exit" layout>
                <BreachStatus loading={breachLoading} breach={breach} count={breachCount} active={!!password} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Password Generator */}
        <motion.div 
          variants={itemVariants}
          className={`glass-card rounded-2xl p-6 ${theme === 'light' ? 'bg-white/90 border-slate-200 shadow-sm' : ''}`}
        >
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
        </motion.div>

        <motion.div variants={itemVariants}>
          <ApiKeyPanel apiKey={apiKey} setApiKey={setApiKey} />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <Toast msg={toast.msg} type={toast.type} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

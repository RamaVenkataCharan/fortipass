import { useState, useEffect, useCallback, useRef } from 'react'
import { evaluatePassword } from '@/features/password/utils/entropy'
import { generatePassword } from '@/features/password/services/passwordService'
import { DEBOUNCE_MS, DEFAULT_GEN_OPTIONS } from '@/config/constants'

/**
 * usePassword — Custom hook encapsulating all password state + logic
 * Extracted from the monolith App.jsx
 */
export function usePassword() {
  const [password, setPassword]       = useState('')
  const [analysis, setAnalysis]       = useState(null)
  const [generatedPwd, setGeneratedPwd] = useState('')
  const [genOptions, setGenOptions]   = useState(DEFAULT_GEN_OPTIONS)

  // Real-time strength evaluation
  useEffect(() => {
    if (!password) { setAnalysis(null); return }
    setAnalysis(evaluatePassword(password))
  }, [password])

  const handleGenerate = useCallback(() => {
    const pwd = generatePassword(genOptions)
    setGeneratedPwd(pwd)
    setPassword(pwd)
  }, [genOptions])

  return {
    password,
    setPassword,
    analysis,
    generatedPwd,
    setGeneratedPwd,
    genOptions,
    setGenOptions,
    handleGenerate,
  }
}

/**
 * Settings Page — API key management and app configuration
 */
import { useState } from 'react'
import { useTheme } from '@/shared/hooks/useTheme'
import ApiKeyPanel from '@/features/security/components/ApiKeyPanel'

export default function Settings() {
  const [theme] = useTheme()
  const [apiKey, setApiKey] = useState(
    () => sessionStorage.getItem('fortipass-gemini-key') || ''
  )

  return (
    <div className={`glass-card rounded-2xl p-6 flex flex-col gap-5 section-appear ${theme === 'light' ? 'bg-white/80 border-slate-200' : ''}`}>
      <h2 className="text-sm font-bold text-slate-200 uppercase tracking-widest">Settings</h2>
      <ApiKeyPanel apiKey={apiKey} setApiKey={setApiKey} />
    </div>
  )
}

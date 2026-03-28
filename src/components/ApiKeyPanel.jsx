import { useState } from 'react'

/**
 * Collapsible panel to enter / paste the Gemini API key.
 * Key is stored in sessionStorage only — cleared when tab closes.
 */
export default function ApiKeyPanel({ apiKey, setApiKey }) {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState(apiKey || '')
  const [visible, setVisible] = useState(false)

  const handleSave = () => {
    const trimmed = input.trim()
    setApiKey(trimmed)
    sessionStorage.setItem('fortipass-gemini-key', trimmed)
    setOpen(false)
  }

  const handleClear = () => {
    setInput('')
    setApiKey('')
    sessionStorage.removeItem('fortipass-gemini-key')
  }

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors duration-150"
      >
        <span className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className={`w-3.5 h-3.5 ${apiKey ? 'text-primary' : 'text-slate-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
          AI Auditor — Gemini API Key
          {apiKey && <span className="text-primary">✓ Active</span>}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="px-4 pb-4 flex flex-col gap-3 border-t border-white/5 pt-3 section-appear">
          <p className="text-xs text-slate-500 leading-relaxed">
            Enter your <a href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer" className="text-accent underline">Google AI Studio</a> key.
            Stored in <strong className="text-slate-400">sessionStorage only</strong> — cleared when you close the tab.
            Only zxcvbn metadata is sent — never the password.
          </p>

          <div className="relative flex items-center">
            <input
              type={visible ? 'text' : 'password'}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="AIza..."
              className="pass-input w-full bg-input text-white placeholder-slate-600 rounded-xl px-3 py-2.5 pr-10 text-sm border border-white/5"
              onKeyDown={e => e.key === 'Enter' && handleSave()}
              aria-label="Gemini API key"
            />
            <button
              type="button"
              onClick={() => setVisible(v => !v)}
              className="absolute right-3 text-slate-500 hover:text-slate-300 transition-colors"
              aria-label={visible ? 'Hide key' : 'Show key'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                {visible
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7A9.97 9.97 0 014.02 8.971m5.858.908A3 3 0 1114.12 14.12M21 21L3 3" />
                  : <><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" /><circle cx="12" cy="12" r="3" /></>
                }
              </svg>
            </button>
          </div>

          <div className="flex gap-2">
            <button onClick={handleSave} className="btn-primary flex-1 py-2 rounded-lg text-xs font-bold text-bg">
              Save Key
            </button>
            {apiKey && (
              <button onClick={handleClear} className="px-3 py-2 rounded-lg text-xs font-semibold bg-danger/10 text-danger border border-danger/20 hover:bg-danger/20 transition-all">
                Clear
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

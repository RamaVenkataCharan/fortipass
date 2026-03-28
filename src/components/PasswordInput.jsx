import { useState } from 'react'

export default function PasswordInput({ value, onChange, onCopy }) {
  const [visible, setVisible] = useState(false)

  return (
    <div>
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
        Enter Password
      </label>
      <div className="relative flex items-center">
        <input
          id="password-input"
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="Type your password..."
          autoComplete="new-password"
          spellCheck={false}
          className="pass-input w-full bg-input text-white placeholder-slate-600 rounded-xl px-4 py-3 pr-24 text-base border border-white/5 transition-all duration-200"
          style={{ fontFamily: visible ? 'Inter, monospace' : 'monospace', letterSpacing: visible ? 'normal' : '0.12em' }}
          aria-label="Password input field"
        />

        {/* Eye toggle */}
        <button
          type="button"
          onClick={() => setVisible(v => !v)}
          className="absolute right-12 text-slate-400 hover:text-primary transition-colors duration-150 p-1"
          aria-label={visible ? 'Hide password' : 'Show password'}
          title={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7A9.97 9.97 0 014.02 8.971m5.858.908A3 3 0 1114.12 14.12M21 21L3 3" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>

        {/* Copy button */}
        <button
          type="button"
          onClick={onCopy}
          disabled={!value}
          className="absolute right-3 text-slate-500 hover:text-accent disabled:opacity-30 transition-colors duration-150 p-1"
          aria-label="Copy password"
          title="Copy password"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
          </svg>
        </button>
      </div>

      {/* Length indicator */}
      {value && (
        <div className="flex justify-between mt-1.5 text-xs text-slate-600">
          <span>{value.length} characters</span>
          <span className={value.length >= 12 ? 'text-primary' : value.length >= 8 ? 'text-warning' : 'text-danger'}>
            {value.length < 8 ? 'Too short' : value.length < 12 ? 'Acceptable' : 'Good length ✓'}
          </span>
        </div>
      )}
    </div>
  )
}

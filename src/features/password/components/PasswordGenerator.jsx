import { useState } from 'react'

export default function PasswordGenerator({ options, setOptions, onGenerate, generatedPwd, onCopy, onUsePassword }) {
  const { length, includeSymbols, passphrase } = options

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-1">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <h2 className="text-sm font-bold text-slate-200 uppercase tracking-widest">Password Generator</h2>
      </div>

      {/* Passphrase toggle */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-400">Mode</span>
        <div className="flex rounded-lg overflow-hidden border border-white/8">
          <button
            onClick={() => setOptions(o => ({ ...o, passphrase: false }))}
            className={`px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${!passphrase ? 'bg-accent text-bg' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Random
          </button>
          <button
            onClick={() => setOptions(o => ({ ...o, passphrase: true }))}
            className={`px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${passphrase ? 'bg-accent text-bg' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Passphrase
          </button>
        </div>
      </div>

      {/* Length slider (only for random) */}
      {!passphrase && (
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Length</span>
            <span className="font-bold text-accent">{length}</span>
          </div>
          <input
            type="range"
            min={8}
            max={64}
            value={length}
            onChange={e => setOptions(o => ({ ...o, length: parseInt(e.target.value) }))}
            className="w-full"
            aria-label="Password length"
          />
          <div className="flex justify-between text-xs text-slate-600">
            <span>8</span>
            <span>64</span>
          </div>
        </div>
      )}

      {/* Symbols toggle */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-400">
          {passphrase ? 'Add number suffix' : 'Include symbols'}
        </span>
        <button
          onClick={() => setOptions(o => ({ ...o, includeSymbols: !o.includeSymbols }))}
          className={`relative w-10 h-5 rounded-full transition-all duration-300 ${includeSymbols ? 'bg-primary' : 'bg-slate-700'}`}
          role="switch"
          aria-checked={includeSymbols}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${includeSymbols ? 'translate-x-5' : 'translate-x-0'}`}
          />
        </button>
      </div>

      {/* Generate button */}
      <button
        onClick={onGenerate}
        className="btn-primary w-full py-3 rounded-xl font-bold text-sm text-bg flex items-center justify-center gap-2"
        aria-label="Generate secure password"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Generate Secure Password
      </button>

      {/* Generated password display */}
      {generatedPwd && (
        <div className="rounded-xl bg-input border border-white/5 px-4 py-3 flex items-center justify-between gap-2 section-appear">
          <span
            className="text-sm text-primary font-mono truncate flex-1 select-all"
            aria-label="Generated password"
          >
            {generatedPwd}
          </span>
          <div className="flex gap-1.5 shrink-0">
            {/* Copy */}
            <button
              onClick={onCopy}
              className="btn-secondary px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1"
              title="Copy generated password"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
              </svg>
              Copy
            </button>
            {/* Analyze */}
            <button
              onClick={onUsePassword}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-primary/15 text-primary border border-primary/30 hover:bg-primary/25 transition-all duration-150 flex items-center gap-1"
              title="Analyze this password"
            >
              Analyze
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

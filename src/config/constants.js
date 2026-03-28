/**
 * FortiPass — Application Constants
 * Centralized configuration values (no magic numbers in components)
 */

// Debounce timings (ms)
export const DEBOUNCE_MS = 350
export const AI_DEBOUNCE_MS = 800
export const TOAST_DURATION = 2200

// Password generator defaults
export const DEFAULT_GEN_OPTIONS = {
  length: 16,
  includeSymbols: true,
  passphrase: false,
}

// Password length thresholds
export const PASSWORD_LENGTH = {
  MIN: 8,
  RECOMMENDED: 12,
  MAX_GEN: 64,
  MIN_GEN: 8,
}

// Strength labels
export const STRENGTH_LABELS = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong']

// Strength color mappings
export const STRENGTH_META = [
  { label: 'Very Weak', color: 'bg-danger',  textColor: 'text-danger',  glow: 'shadow-glow-red' },
  { label: 'Weak',      color: 'bg-danger',  textColor: 'text-danger',  glow: 'shadow-glow-red' },
  { label: 'Fair',      color: 'bg-warning', textColor: 'text-warning', glow: '' },
  { label: 'Strong',    color: 'bg-primary', textColor: 'text-primary', glow: 'shadow-glow-green' },
  { label: 'Very Strong', color: 'bg-primary', textColor: 'text-primary', glow: 'shadow-glow-green' },
]

// Strength bar fill gradients
export const FILL_COLORS = {
  'Very Weak': 'linear-gradient(90deg, #EF4444, #b91c1c)',
  'Weak':      'linear-gradient(90deg, #EF4444, #f97316)',
  'Fair':      'linear-gradient(90deg, #FACC15, #f97316)',
  'Strong':    'linear-gradient(90deg, #22C55E, #16a34a)',
  'Very Strong': 'linear-gradient(90deg, #22C55E, #38BDF8)',
}

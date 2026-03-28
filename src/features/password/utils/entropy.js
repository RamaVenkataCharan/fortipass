import zxcvbn from 'zxcvbn'
import { STRENGTH_META } from '@/config/constants'

/**
 * Evaluate password strength using zxcvbn.
 * Returns normalized score 0-100, label, color, crackTime, suggestions, warnings.
 */
export function evaluatePassword(password) {
  if (!password) {
    return {
      score: 0,
      label: 'None',
      color: 'bg-gray-700',
      textColor: 'text-gray-500',
      percentage: 0,
      crackTime: '—',
      suggestions: [],
      warnings: [],
      issues: [],
    }
  }

  const result = zxcvbn(password)
  const score = result.score // 0-4

  const percentage = Math.max(10, score * 25)

  const meta = STRENGTH_META[score]

  // Crack time string
  const crackTime = result.crack_times_display.offline_slow_hashing_1e4_per_second

  // Collect issues
  const issues = []
  if (password.length < 8)  issues.push('Too short (minimum 8 characters)')
  if (password.length < 12) issues.push('Consider using at least 12 characters')
  if (/^[a-zA-Z]+$/.test(password)) issues.push('Letters only — add numbers or symbols')
  if (/^[0-9]+$/.test(password)) issues.push('Numbers only — too predictable')
  if (/(.)\\1{2,}/.test(password)) issues.push('Repeated characters detected')
  if (/(?:abc|123|qwerty|password|letmein|iloveyou|admin)/i.test(password))
    issues.push('Contains common pattern or dictionary word')
  if (password === password.toLowerCase() && /[a-z]/.test(password))
    issues.push('No uppercase letters')
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(password))
    issues.push('No special characters')

  const suggestions = [
    ...(result.feedback.suggestions || []),
    ...issues.map(i => suggestFix(i)),
  ].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i)

  return {
    score,
    label: meta.label,
    color: meta.color,
    textColor: meta.textColor,
    glow: meta.glow,
    percentage,
    crackTime,
    suggestions,
    warnings: result.feedback.warning ? [result.feedback.warning] : [],
    issues,
  }
}

function suggestFix(issue) {
  if (issue.includes('Too short')) return '✦ Use at least 8 characters'
  if (issue.includes('12 characters')) return '✦ Aim for 12+ characters for better security'
  if (issue.includes('Letters only')) return '✦ Mix in numbers and symbols (#, !, @)'
  if (issue.includes('Numbers only')) return '✦ Add letters and special characters'
  if (issue.includes('Repeated')) return '✦ Avoid repeating characters (aaa, 111)'
  if (issue.includes('common pattern')) return '✦ Avoid dictionary words and common patterns'
  if (issue.includes('uppercase')) return '✦ Include at least one uppercase letter (A–Z)'
  if (issue.includes('special')) return '✦ Add symbols like !, @, #, $, %'
  return null
}

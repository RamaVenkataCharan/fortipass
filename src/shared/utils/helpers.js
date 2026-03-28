/**
 * FortiPass — Shared Helpers
 * Reusable utility functions
 */

/**
 * Copy text to clipboard with error handling
 * @returns {Promise<boolean>} success status
 */
export async function copyToClipboard(text) {
  if (!text) return false
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

/**
 * Format large numbers (1000 → 1K, 1000000 → 1.0M)
 */
export function formatCount(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return n.toString()
}

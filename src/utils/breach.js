/**
 * Check password against HIBP using k-anonymity (SHA-1 via SubtleCrypto).
 * Returns { breached: bool, count: number }
 */
async function sha1Hex(str) {
  const msgBuffer = new TextEncoder().encode(str)
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer)
  const hashArray  = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase()
}

export async function checkBreach(password) {
  if (!password) return { breached: false, count: 0 }

  try {
    const hash   = await sha1Hex(password)
    const prefix = hash.slice(0, 5)
    const suffix = hash.slice(5)

    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      headers: { 'Add-Padding': 'true' },
    })

    if (!response.ok) throw new Error('HIBP API error')

    const text = await response.text()
    const lines = text.split('\n')

    for (const line of lines) {
      const [hashSuffix, count] = line.trim().split(':')
      if (hashSuffix === suffix) {
        return { breached: true, count: parseInt(count, 10) }
      }
    }

    return { breached: false, count: 0 }
  } catch {
    // Network error — return unknown
    return { breached: null, count: 0 }
  }
}

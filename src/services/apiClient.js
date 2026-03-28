/**
 * FortiPass — API Client
 * Shared fetch wrapper with error handling
 */

/**
 * GET request with error handling
 */
export async function apiGet(url, options = {}) {
  const response = await fetch(url, {
    method: 'GET',
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }

  return response
}

/**
 * POST JSON request with error handling
 */
export async function apiPost(url, body, options = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options.headers },
    body: JSON.stringify(body),
    ...options,
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.error?.message || `API error ${response.status}`)
  }

  return response.json()
}

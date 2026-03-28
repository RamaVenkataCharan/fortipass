/**
 * FortiPass — API Endpoints
 * All external URLs centralized here
 */

import { ENV } from '@/config/env'

export const ENDPOINTS = {
  HIBP_RANGE: (prefix) => `${ENV.HIBP_API_URL}/${prefix}`,
  GEMINI: (apiKey) => `${ENV.GEMINI_ENDPOINT}?key=${apiKey}`,
}

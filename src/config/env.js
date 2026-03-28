/**
 * FortiPass — Environment Configuration
 * Centralized access to environment variables and external API URLs
 */

export const ENV = {
  // Gemini AI API
  GEMINI_ENDPOINT:
    import.meta.env.VITE_GEMINI_ENDPOINT ||
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',

  // HIBP Breach API
  HIBP_API_URL:
    import.meta.env.VITE_HIBP_API_URL ||
    'https://api.pwnedpasswords.com/range',

  // App metadata
  APP_NAME: 'FortiPass',
  APP_VERSION: '1.0.0',
}

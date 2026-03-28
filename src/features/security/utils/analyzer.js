/**
 * FortiPass — AI Security Analyzer
 * Sends ONLY zxcvbn metadata to Gemini. Privacy-by-design.
 * The raw password is NEVER included.
 */

import { ENDPOINTS } from '@/services/endpoints'

const SYSTEM_INSTRUCTION = `You are a CISSP-certified security consultant and ethical hacker. 
You will receive a JSON object with password strength metadata — never the password itself.
Your task: write exactly 2 sentences as a "Risk Assessment":
1. Sentence 1: Explain the specific structural vulnerability (e.g., keyboard path, common word suffix, lack of entropy, character class gaps) from a hacker's perspective.
2. Sentence 2: Give one encouraging, actionable fix.
Rules:
- Do NOT ask for the raw password. Ever.
- Do NOT hallucinate patterns not present in the metadata.
- Keep it under 60 words total.
- Be professional but human. No bullet points.`

export async function getAiRiskAssessment(zxcvbnResult, apiKey) {
  if (!apiKey) throw new Error('No Gemini API key provided')
  if (!zxcvbnResult) return null

  // Build safe payload — metadata only, zero password info
  const safePayload = {
    score: zxcvbnResult.score,
    crackTime: zxcvbnResult.crackTime,
    warning: zxcvbnResult.warnings?.[0] || null,
    suggestions: zxcvbnResult.suggestions?.slice(0, 4) || [],
    detectedIssues: zxcvbnResult.issues?.slice(0, 4) || [],
  }

  const userPrompt = `Analyze this password strength metadata and write a 2-sentence Risk Assessment:\n${JSON.stringify(safePayload, null, 2)}`

  const body = {
    system_instruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
    contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: 120,
      topP: 0.9,
    },
  }

  const res = await fetch(ENDPOINTS.GEMINI(apiKey), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message || `Gemini API error ${res.status}`)
  }

  const data = await res.json()
  return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null
}

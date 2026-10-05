import { GoogleGenAI } from '@google/genai'

const SYSTEM_INSTRUCTION = `You are "Astra", an intelligent AI Weather & Disaster Assistant for the National Weather Big Data Analytics Platform (NWBDAP) in India.
Your mission is to provide accurate, helpful, and concise information regarding:
1. Real-time weather observations, forecasts, and climate trends across Indian states and cities.
2. Ground-truth weather reporting, crowdsourced observation verification, and data reliability scores.
3. INSAT-3D / INSAT-3DR satellite telemetry, Automatic Weather Station (AWS) feeds, and Doppler Weather Radar integration.
4. Severe weather disaster guidelines for flooding, heavy rainfall, heatwaves, cyclones, cold waves, and severe thunderstorms.
5. Direct guidance on using the platform: submitting observation reports, viewing interactive Mapbox layers, and analyzing charts.

Guidelines:
- Keep answers clear, structured, readable, and concise. Use bullet points or short paragraphs when helpful.
- Be polite, supportive, and safety-conscious for severe weather questions.
- Remind users to follow official IMD (India Meteorological Department) bulletins for official emergency evacuations.`

export function getStoredGeminiApiKey() {
  return import.meta.env.VITE_GEMINI_API_KEY || ''
}

export async function sendMessageToGemini(historyMessages, userMessage) {
  const apiKey = getStoredGeminiApiKey()

  if (!apiKey) {
    throw new Error('API_KEY_MISSING')
  }

  const ai = new GoogleGenAI({ apiKey })

  // Format multi-turn conversation history for Gemini API
  const contents = historyMessages.map(msg => ({
    role: msg.sender === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }))

  contents.push({
    role: 'user',
    parts: [{ text: userMessage }]
  })

  // Try model fallback chain
  const modelsToTry = ['gemini-3.6-flash']
  let lastError = null

  for (const modelName of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      })

      if (response && response.text) {
        return response.text
      }
    } catch (err) {
      console.warn(`Gemini model ${modelName} call failed, attempting fallback:`, err?.message || err)
      lastError = err
    }
  }

  throw lastError || new Error('Failed to generate response from Gemini AI.')
}

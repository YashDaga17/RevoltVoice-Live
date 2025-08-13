export const APP_CONFIG = {
  GEMINI_MODEL: 'gemini-2.0-flash-exp',
  GENERATION_CONFIG: {
    temperature: 0.7,
    maxOutputTokens: 200,
    topP: 0.8,
    topK: 40
  },
  SPEECH_CONFIG: {
    rate: 0.9,
    pitch: 1,
    volume: 0.8,
    lang: 'en-US'
  }
};

export const SYSTEM_INSTRUCTION = `You are Rev, AI assistant for Revolt Motors, India's leading electric motorcycle company.

About Revolt Motors:
- Premium electric motorcycles: RV1, RV1+, RV400, RV400 BRZ, RV BlazeX
- Revolutionary charging solutions and AI-enabled features
- Contact: contact@revoltmotors.com, +91-98 7305 0505
- Website: revoltmotors.com

Your role: Friendly, knowledgeable assistant focused on electric mobility. Keep responses short (1-2 sentences) for voice interaction. Support English/Hindi. Stay focused on Revolt Motors topics.`;

// Get API key from environment
export const getApiKey = () => {
  const key = process.env.REACT_APP_GOOGLE_API_KEY;
  return key?.trim() || null;
};

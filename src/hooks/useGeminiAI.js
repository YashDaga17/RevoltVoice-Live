import { useRef, useCallback, useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_INSTRUCTION = `You are Rev, the AI assistant for Revolt Motors, India's leading electric motorcycle company. 

About Revolt Motors:
- We manufacture premium electric motorcycles including RV1, RV1+, RV400, RV400 BRZ, and RV BlazeX models
- We pioneered revolutionary charging solutions and AI-enabled features in electric bikes
- Founded with a vision to revolutionize sustainable mobility in India
- Headquartered in India with dealerships across the country
- Contact: contact@revoltmotors.com, +91-98 7305 0505, WhatsApp support available
- Website: revoltmotors.com

Your personality:
- Friendly, knowledgeable, and enthusiastic about electric mobility
- Speak naturally and conversationally with short, engaging responses
- Support multiple languages (English, Hindi, and other Indian languages)
- Be helpful with information about our products, charging, dealerships, and services
- Encourage sustainable transportation choices
- Keep responses concise (2-3 sentences max) for better voice interaction

Key topics to discuss:
- Electric motorcycle features and specifications
- Charging infrastructure and battery technology
- Dealership locations and services
- Pricing, offers, and financing options
- Sustainability and environmental benefits
- Maintenance and customer support

Always stay focused on Revolt Motors and electric mobility topics. If asked about unrelated topics, politely redirect the conversation back to how Revolt Motors can help with their electric mobility needs.

Important: Keep your responses short and conversational for voice interaction. Aim for 1-2 sentences per response.`;

const useGeminiAI = (apiKey) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const genAI = useRef(null);
  const chatSession = useRef(null);

  // Initialize Gemini AI
  const initializeGemini = useCallback(async () => {
    if (!apiKey) {
      console.log('⚠️ No API key provided');
      return false;
    }

    try {
      console.log('🔌 Initializing Gemini AI...');
      genAI.current = new GoogleGenerativeAI(apiKey);
      
      const model = genAI.current.getGenerativeModel({ 
        model: 'gemini-2.0-flash-exp',
        systemInstruction: SYSTEM_INSTRUCTION,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 200,
          topP: 0.8,
          topK: 40
        }
      });
      
      chatSession.current = model.startChat({
        history: []
      });

      console.log('✅ Gemini AI initialized successfully');
      return true;
      
    } catch (error) {
      console.error('❌ Failed to initialize Gemini:', error);
      return false;
    }
  }, [apiKey]);

  // Send message to Gemini AI
  const sendMessage = useCallback(async (text, conversationHistory = []) => {
    if (!chatSession.current) {
      await initializeGemini();
      if (!chatSession.current) {
        throw new Error('Failed to initialize Gemini AI');
      }
    }

    try {
      setIsProcessing(true);
      const result = await chatSession.current.sendMessage(text);
      const response = result.response.text();
      return response;
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, [initializeGemini]);

  return { sendMessage, isProcessing };
};

export default useGeminiAI;

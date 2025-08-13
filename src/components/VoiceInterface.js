import React from 'react';
import VoiceInterfaceView from './VoiceInterfaceView';
import useConversation from '../hooks/useConversation';
import useGeminiAI from '../hooks/useGeminiAI';
import useSpeechRecognition from '../hooks/useSpeechRecognition';
import useTextToSpeech from '../hooks/useTextToSpeech';

export const VoiceInterface = () => {
  // Get API key from environment
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

  // Initialize hooks
  const { conversation, addMessage, clearConversation } = useConversation();
  const { sendMessage, isProcessing } = useGeminiAI(apiKey);
  const { 
    isListening, 
    transcribedText, 
    startListening, 
    stopListening, 
    speechSupported,
    speechError 
  } = useSpeechRecognition();
  const { 
    isSpeaking, 
    speak, 
    stopSpeaking, 
    speechSupported: ttsSupported 
  } = useTextToSpeech();

  // Check if all required services are available
  const isConnected = apiKey && speechSupported && ttsSupported;

  // Handle sending voice messages
  const handleVoiceMessage = async (text) => {
    if (!text.trim() || !isConnected) return;
    
    // Add user message to conversation
    addMessage({ role: 'user', content: text, timestamp: Date.now() });
    
    try {
      // Send to AI and get response
      const response = await sendMessage(text, conversation);
      
      // Add AI response to conversation
      addMessage({ role: 'assistant', content: response, timestamp: Date.now() });
      
      // Speak the response if not already speaking
      if (!isSpeaking) {
        speak(response);
      }
    } catch (error) {
      console.error('Error processing voice message:', error);
      const errorMessage = 'Sorry, I encountered an error processing your message.';
      addMessage({ role: 'assistant', content: errorMessage, timestamp: Date.now() });
      speak(errorMessage);
    }
  };

  // Handle text input
  const handleTextMessage = (text) => {
    handleVoiceMessage(text);
  };

  // Handle voice recognition result
  React.useEffect(() => {
    if (transcribedText && !isListening) {
      handleVoiceMessage(transcribedText);
    }
  }, [transcribedText, isListening]);

  // Get current status
  const getCurrentStatus = () => {
    if (!apiKey) return 'API key required';
    if (!speechSupported) return 'Speech not supported';
    if (!ttsSupported) return 'Text-to-speech not supported';
    if (isProcessing) return 'Processing...';
    if (isSpeaking) return 'Speaking';
    if (isListening) return 'Listening';
    return 'Ready';
  };

  // Handle interruption (stop speaking when user starts talking)
  const handleStartListening = () => {
    if (isSpeaking) {
      stopSpeaking();
    }
    startListening();
  };

  // Handle interrupt button - stop speaking immediately
  const handleInterrupt = () => {
    if (isSpeaking) {
      stopSpeaking();
    }
  };

  return (
    <VoiceInterfaceView
      // State props
      isConnected={isConnected}
      isProcessing={isProcessing}
      isListening={isListening}
      isSpeaking={isSpeaking}
      speechSupported={speechSupported}
      conversation={conversation}
      transcribedText={transcribedText}
      currentStatus={getCurrentStatus()}
      speechError={speechError}
      
      // Handler props
      onStartListening={handleStartListening}
      onStopListening={stopListening}
      onInterrupt={handleInterrupt}
      onSendMessage={handleTextMessage}
      onClearConversation={clearConversation}
      onStopSpeaking={stopSpeaking}
    />
  );
};

export default VoiceInterface;

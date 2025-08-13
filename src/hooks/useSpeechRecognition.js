import { useRef, useCallback, useState } from 'react';

const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);
  const isInitialized = useRef(false);

  // Initialize speech recognition
  const initializeSpeechRecognition = useCallback(() => {
    if (isInitialized.current || !('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      return isInitialized.current;
    }

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      Object.assign(recognitionRef.current, {
        continuous: false,
        interimResults: true,
        lang: 'en-US'
      });

      // Event handlers
      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setTranscribedText('');
        setError(null);
      };

      recognitionRef.current.onresult = (event) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setTranscribedText(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        setIsListening(false);
        if (event.error !== 'aborted') {
          setError(event.error === 'no-speech' ? 'No speech detected' : `Error: ${event.error}`);
        }
      };

      recognitionRef.current.onend = () => setIsListening(false);
      
      isInitialized.current = true;
      return true;
    } catch (err) {
      setError('Failed to initialize speech recognition');
      return false;
    }
  }, []);

  // Start listening for speech
  const startListening = useCallback(() => {
    if (!isInitialized.current && !initializeSpeechRecognition()) return false;
    
    try {
      if (recognitionRef.current && !isListening) {
        setError(null);
        recognitionRef.current.start();
        return true;
      }
    } catch (error) {
      setError('Failed to start voice recognition');
    }
    return false;
  }, [isListening, initializeSpeechRecognition]);

  // Stop listening
  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.abort();
      } catch (error) {
        // Ignore errors during abort
      }
      setIsListening(false);
    }
  }, [isListening]);

  // Get final transcript and clear
  const getFinalTranscript = useCallback(() => {
    const transcript = transcribedText.trim();
    setTranscribedText('');
    return transcript;
  }, [transcribedText]);

  // Cleanup function
  const cleanup = useCallback(() => {
    stopListening();
    setTranscribedText('');
    setError(null);
  }, [stopListening]);

  return {
    isListening,
    transcribedText,
    speechError: error,
    startListening,
    stopListening,
    getFinalTranscript,
    cleanup,
    speechSupported: 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window
  };
};

export default useSpeechRecognition;

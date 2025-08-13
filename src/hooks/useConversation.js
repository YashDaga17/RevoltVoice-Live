import { useState, useCallback } from 'react';

const useConversation = () => {
  const [conversation, setConversation] = useState([]);

  // Add message to conversation
  const addMessage = useCallback((message) => {
    setConversation(prev => [...prev, { 
      ...message,
      id: Date.now() + Math.random()
    }]);
  }, []);

  // Clear all messages
  const clearConversation = useCallback(() => setConversation([]), []);

  return { conversation, addMessage, clearConversation };
};

export default useConversation;

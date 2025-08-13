import React, { useState } from 'react';

const TextInput = ({ 
  isConnected, 
  isProcessing, 
  onSendMessage 
}) => {
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim() && !isProcessing) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isProcessing) {
      handleSend();
    }
  };

  return (
    <div className="flex gap-3 items-center">
      <input
        type="text"
        placeholder="Type your message here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={!isConnected || isProcessing}
        className="flex-1 p-3 border border-gray-600 rounded-full bg-gray-700 text-white text-base outline-none transition-all duration-300 focus:border-gray-400 focus:bg-gray-600 placeholder-gray-400 disabled:opacity-50"
      />
      <button
        onClick={handleSend}
        disabled={!isConnected || !inputText.trim() || isProcessing}
        className="px-6 py-3 border border-gray-500 rounded-full bg-white text-black font-bold cursor-pointer transition-all duration-300 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
};

export default TextInput;

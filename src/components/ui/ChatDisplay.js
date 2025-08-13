import React from 'react';

const ChatDisplay = ({ 
  conversation, 
  transcribedText, 
  currentStatus, 
  isProcessing 
}) => {
  return (
    <div className="flex-1 min-h-72 max-h-96 overflow-y-auto p-5 bg-gray-800 border border-gray-600 rounded-2xl mb-5 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
      {conversation.map((msg) => (
        <div key={msg.id} className={`mb-4 p-4 rounded-2xl relative ${
          msg.role === 'user' 
            ? 'bg-white text-black ml-20 text-right' 
            : msg.role === 'assistant'
            ? 'bg-gray-700 text-white mr-20'
            : 'bg-gray-600 text-gray-200 text-center italic mx-20'
        }`}>
          <div className="message-content">
            <strong className="block mb-1 text-sm opacity-80">
              {msg.role === 'user' ? 'You' : msg.role === 'assistant' ? 'Rev AI' : 'System'}:
            </strong>
            <p className="m-0 leading-relaxed">{msg.content}</p>
          </div>
          <span className="absolute -bottom-5 right-3 text-xs opacity-60">
            {new Date(msg.timestamp).toLocaleTimeString()}
          </span>
        </div>
      ))}
      
      {transcribedText && (
        <div className="text-center italic text-blue-400 p-3 bg-blue-900 border border-blue-700 rounded-xl mb-3">
          <strong> Voice Input:</strong> "{transcribedText}"
        </div>
      )}
      
      {(currentStatus || isProcessing) && (
        <div className="text-center italic text-gray-400 p-3 bg-gray-700 border border-gray-600 rounded-xl">
          {isProcessing ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-75"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-150"></div>
              <span className="ml-2">Processing...</span>
            </div>
          ) : currentStatus}
        </div>
      )}
    </div>
  );
};

export default ChatDisplay;

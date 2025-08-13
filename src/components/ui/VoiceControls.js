import React from 'react';

const VoiceControls = ({ 
  isListening, 
  isSpeaking, 
  isConnected, 
  isProcessing,
  onStartListening, 
  onStopListening, 
  onInterrupt 
}) => {
  return (
    <div className="flex justify-center items-center gap-5">
      {/* Microphone Button */}
      <button
        className={`w-20 h-20 rounded-full border-2 text-white text-3xl transition-all duration-300 shadow-lg flex items-center justify-center ${
          isListening 
            ? 'bg-red-600 border-red-500 animate-pulse' 
            : 'bg-gray-700 border-gray-500 hover:bg-gray-600 hover:border-gray-400'
        } ${!isConnected ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={isListening ? onStopListening : onStartListening}
        disabled={!isConnected || isProcessing}
      >
        {isListening ? (
          <div className="flex gap-1 items-center">
            <span className="w-1 h-5 bg-white rounded animate-bounce"></span>
            <span className="w-1 h-5 bg-white rounded animate-bounce delay-100"></span>
            <span className="w-1 h-5 bg-white rounded animate-bounce delay-200"></span>
          </div>
        ) : '🎤'}
      </button>
      
      {/* Interrupt Button */}
      {isSpeaking && (
        <button
          className="px-6 py-3 border border-red-500 rounded-full bg-red-600 text-white font-bold transition-all duration-300 hover:bg-red-700"
          onClick={onInterrupt}
        >
          Interrupt
        </button>
      )}
    </div>
  );
};

export default VoiceControls;

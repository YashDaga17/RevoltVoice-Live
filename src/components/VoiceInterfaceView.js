import React from 'react';
import StatusIndicator from './ui/StatusIndicator';
import ChatDisplay from './ui/ChatDisplay';
import VoiceControls from './ui/VoiceControls';
import TextInput from './ui/TextInput';

const VoiceInterfaceView = ({
  // State props
  isConnected,
  isProcessing,
  isListening,
  isSpeaking,
  speechSupported,
  conversation,
  transcribedText,
  currentStatus,
  speechError,
  // Handler props
  onStartListening,
  onStopListening,
  onInterrupt,
  onSendMessage
}) => {
  return (
    <div className="flex flex-col max-w-6xl w-full min-h-screen p-5 bg-gray-900 border border-gray-700 rounded-3xl shadow-2xl m-5">
      {/* Header */}
      <div className="flex justify-between items-center py-5 border-b border-gray-600 mb-5">
        <div className="logo-section">
          <h1 className="text-4xl font-bold m-0 text-white">RevoltVoice Live</h1>
          <div className="flex gap-3 mt-2">
            <span className="text-white font-bold text-xl">REVOLT</span>
            <span className="text-gray-400 font-bold text-xl">MOTORS</span>
          </div>
        </div>
        <StatusIndicator isConnected={isConnected} error={speechError} />
      </div>

      {/* Chat Display */}
      <ChatDisplay 
        conversation={conversation}
        transcribedText={transcribedText}
        currentStatus={currentStatus}
        isProcessing={isProcessing}
      />

      {/* Controls */}
      <div className="flex flex-col gap-5 p-5 bg-gray-800 border border-gray-600 rounded-2xl">
        <VoiceControls 
          isListening={isListening}
          isSpeaking={isSpeaking}
          isConnected={isConnected}
          isProcessing={isProcessing}
          onStartListening={onStartListening}
          onStopListening={onStopListening}
          onInterrupt={onInterrupt}
        />
        
        <TextInput 
          isConnected={isConnected}
          isProcessing={isProcessing}
          onSendMessage={onSendMessage}
        />
      </div>

      {/* Instructions */}
      <div className="text-center mt-5 p-5 bg-gray-800 border border-gray-600 rounded-2xl">
        <p className="m-1 text-gray-300 text-sm">Click microphone for voice conversation</p>
        <p className="m-1 text-gray-300 text-sm">Click "Interrupt" while Rev is speaking</p>
        <p className="m-1 text-gray-300 text-sm">Type messages directly</p>
        <p className="m-1 text-gray-400 text-xs mt-2">
          {speechSupported ? 'Voice recognition enabled' : 'Voice not available'}
        </p>
      </div>
    </div>
  );
};

export default VoiceInterfaceView;

import React from 'react';

const StatusIndicator = ({ isConnected, error }) => {
  const getStatus = () => {
    if (error) return { color: 'yellow', text: 'Warning' };
    if (isConnected) return { color: 'green', text: 'Connected to Gemini' };
    return { color: 'red', text: 'Disconnected' };
  };

  const status = getStatus();

  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium border-${status.color}-500 bg-${status.color}-900 text-${status.color}-100`}>
      <span className={`w-3 h-3 rounded-full bg-${status.color}-500 ${isConnected && !error ? 'animate-pulse' : ''}`}></span>
      {status.text}
    </div>
  );
};

export default StatusIndicator;

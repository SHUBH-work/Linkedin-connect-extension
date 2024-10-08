// src/FloatingButton.js

import React, { useEffect, useState } from 'react';

const FloatingButton = () => {
  const [connecting, setConnecting] = useState(false);

  const handleConnectAll = () => {
    setConnecting(true);
    // Send a message to content script to trigger connection requests
    chrome.runtime.sendMessage({ action: 'CONNECT_ALL' });
  };

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      if (message.status === 'completed') {
        setConnecting(false);
      }
    });
  }, []);

  return (
    <button
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '10px 20px',
        backgroundColor: '#0A66C2',
        color: 'white',
        borderRadius: '5px',
        cursor: 'pointer',
        zIndex: 9999,
      }}
      onClick={handleConnectAll}
      disabled={connecting}
    >
      {connecting ? 'Connecting...' : 'Connect with All'}
    </button>
  );
};

export default FloatingButton;

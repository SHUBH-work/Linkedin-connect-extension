// public/contentScript.js

import React from 'react';
import ReactDOM from 'react-dom';
import FloatingButton from 'components/floatingButton';

// Create a root div and append it to the body
const root = document.createElement('div');
root.id = 'linkedin-connector-root';
document.body.appendChild(root);

// Render the React component into the div
ReactDOM.render(<FloatingButton />, document.getElementById('linkedin-connector-root'));

// Listen for the connection request action
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'CONNECT_ALL') {
    connectAll();
  }
});

// Function to click all visible Connect buttons
function connectAll() {
  const connectButtons = document.querySelectorAll('button[aria-label^="Connect"]');
  let delay = 0;

  connectButtons.forEach((button, index) => {
    setTimeout(() => {
      button.click();
      if (index === connectButtons.length - 1) {
        chrome.runtime.sendMessage({ status: 'completed' });
      }
    }, delay);
    delay += Math.random() * (3000 - 1000) + 1000; // Delay between 1-3 seconds
  });

  if (connectButtons.length === 0) {
    alert('No Connect buttons found');
  }
}

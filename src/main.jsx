
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css'; // Mantenemos la importación del index.css principal

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

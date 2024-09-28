import React from 'react';
import ReactDOM from 'react-dom/client';
import MainApp from './App'; // Import the MainApp

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MainApp /> {/* Render MainApp instead of App */}
  </React.StrictMode>
);
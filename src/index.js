import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AppProvider } from './context';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    {/* Оборачиваем приложение в appProvider, чтобы
    получить доступ к данным в контексте */}
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);

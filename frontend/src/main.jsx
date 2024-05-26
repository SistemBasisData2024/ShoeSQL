import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Profile from './Profile.jsx';
import './index.css';
import { AuthProvider } from './AuthContext'; // Impor AuthProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* Bungkus komponen dengan AuthProvider */}
      <App />
    </AuthProvider>
  </React.StrictMode>,
);

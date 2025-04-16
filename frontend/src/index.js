import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss'
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ColorProvider } from './context/ColorContext.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ColorProvider>
          <App/>
        </ColorProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
reportWebVitals();

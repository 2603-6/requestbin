import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BinServiceContext } from './contexts/binServiceContext.ts';
import binService from './services/binService.ts';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BinServiceContext value={binService}>
      <App />
    </BinServiceContext>
  </StrictMode>,
);

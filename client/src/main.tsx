import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BinContext } from './contexts/binContext.tsx';
import fakeBinService from './services/fakeBinService.ts';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BinContext value={fakeBinService}>
      <App />
    </BinContext>
  </StrictMode>,
);

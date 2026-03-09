import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BinServiceContext } from './contexts/binServiceContext.ts';
import fakeBinService from './services/fakeBinService.ts';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BinServiceContext value={fakeBinService}>
      <App />
    </BinServiceContext>
  </StrictMode>,
);

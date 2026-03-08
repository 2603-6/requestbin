import { createContext, useContext } from 'react';
import type { BinProvider } from '../types';

export const BinContext = createContext<BinProvider | null>(null);

export const useBin: () => BinProvider = () => {
  const context = useContext(BinContext);
  if (!context) throw new Error('missing BinContext provider');
  return context;
};


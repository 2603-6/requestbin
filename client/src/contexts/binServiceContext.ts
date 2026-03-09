import { createContext, useContext } from 'react';
import type { BinProvider } from '../types';

export const BinServiceContext = createContext<BinProvider | null>(null);

export const useBinService: () => BinProvider = () => {
  const context = useContext(BinServiceContext);
  if (!context) throw new Error('missing BinServiceContext provider');
  return context;
};


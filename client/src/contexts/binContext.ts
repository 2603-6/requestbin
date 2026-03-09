import { createContext, useContext } from 'react';
import type { BinInfo } from '../types';

export const BinContext = createContext<BinInfo | null>(null);

export const useBin: () => BinInfo | null = () => {
  return useContext(BinContext);
};


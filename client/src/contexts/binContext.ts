import { createContext, useContext } from 'react';
import type { BinInfo } from '../types';

export const BinContext = createContext<BinInfo | null>(null);

export const useBin = () => {
  const bin = useContext(BinContext);
  if (bin === null) {
    throw new Error('Cannot use empty context');
  } else {
    return bin;
  }
};


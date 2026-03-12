import { type Context, createContext, useContext } from 'react';
import type { BinInfo } from '../types';

export const BinContext = createContext<BinInfo | null>(null);

export const useBin = () => {
  if (BinContext === null) {
    throw new Error('Cannot use empty context');
  } else {
    return useContext(BinContext as Context<BinInfo>);
  }
};


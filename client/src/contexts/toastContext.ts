import { createContext, useContext } from 'react';
import type { IToastProps } from '../types';

type ToastContextType = (props: IToastProps) => void;

export const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const toastContext = useContext(ToastContext);
  if (toastContext === null) {
    throw new Error('Cannot use empty context');
  }
  return toastContext;
};


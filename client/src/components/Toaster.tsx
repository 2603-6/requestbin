import type { CSSProperties, FC } from 'react';
import type { IconType } from 'react-icons';
import { FaCheckCircle, FaExclamationCircle, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';
import type { IToastProps, ToastType } from '../types';

export const Toaster: FC<IToastProps> = ({ messages }) => {

  const toastContainerStyle: CSSProperties = {
    display: 'grid',
    gap: '1vh',
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
  };

  
 
  const getToastStyle = (type: ToastType) => {
    const toastStyle: CSSProperties = {
      display: 'flex',
      maxInlineSize: '10rem',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.2rem 0.5rem',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      gap: '0.5rem',
    };

    let IconComponent: IconType | null =  null;
    switch (type) {
      case 'info':
        toastStyle.backgroundColor = 'rgba(50,100,255,0.5)';
        IconComponent = FaInfoCircle;
        break;
      case 'success':
        toastStyle.backgroundColor = 'rgba(50, 200, 0, 0.5)';
        IconComponent = FaCheckCircle;
        break;
      case 'warning':
        toastStyle.backgroundColor = 'rgba(255, 255, 0, 0.5)';
        IconComponent = FaExclamationTriangle;
        break;
      case 'error':
        toastStyle.backgroundColor = 'rgba(255, 0, 0, 0.5)';
        IconComponent = FaExclamationCircle;
        break;
    }
    return { style: toastStyle, Icon:IconComponent };
  };
  
  
  return (
    <div style={toastContainerStyle}>
      {messages.map(({ type, text }) => {
        const { style, Icon } = getToastStyle(type);
        return (
          <div style={style}>
            {Icon && <Icon/>}{text}
          </div>);
      } )}
    </div>
  );
};
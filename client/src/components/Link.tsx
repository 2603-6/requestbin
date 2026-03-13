import type { CSSProperties, FC } from 'react';
import { useToast } from '../contexts/toastContext.ts';
import { FaRegClipboard } from 'react-icons/fa6';

export const Link: FC<{ binUrl: string }> = ({ binUrl }) => {
  const showMessage = useToast();
  
  const clipboardStyle: CSSProperties = {
    backgroundColor: '#1a1a1a',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '0.25rem',
  };

  const copyLink = async (): Promise<void> => {
    await navigator.clipboard.writeText(binUrl);
    showMessage({ type: 'info', message: 'link copied!' });
  };

  return (
    <div>
      Requests are collected at:
      <br/>
      <div style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
        <a href={binUrl} target={'_blank'}>{binUrl}</a>
        <FaRegClipboard
          title={'Copy Link'}
          style={clipboardStyle}
          onClick={() => void copyLink()}
        />
      </div>
    </div>
  );
};

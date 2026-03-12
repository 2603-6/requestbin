import { useState, useEffect, type CSSProperties } from 'react';
import type { FC } from 'react';
import type { IRequestProps } from '../types';
import { useBinService } from '../contexts/binServiceContext.ts';
import { useBin } from '../contexts/binContext.ts';
import Request from './Request.tsx';
import { FaRegClipboard } from 'react-icons/fa6';

const clipboardStyle: CSSProperties = {
  backgroundColor: '#1a1a1a',
  border: 'none',
  cursor: 'pointer',
  padding: '0.5rem',
  borderRadius: '0.25rem',
};

const binStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '0 1rem 0 1rem',
  minWidth: '320px',
  minHeight: '100vh',

};

const Bin: FC = () => {
  const [requests, setRequests] = useState<IRequestProps[]>([]);
  const binService = useBinService();
  const bin = useBin();

  if (!bin) throw new Error('Cannot render without a bin!');

  // TODO: Fix this link
  const link: string = `https://ToBeFiguredOut.gov/bins/${bin.binId}`;

  const copyLink = async (): Promise<void> => {
    await navigator.clipboard.writeText(link);
  };

  useEffect(() => {
    const fetchRequests = async (binId: string) => {
      return await binService.fetchRequests(binId);
    };

    if (bin) {
      fetchRequests(bin.binId).then(( data ) => {
        setRequests(data);
      }).catch((e) => {
        console.error(e);
      });
    }

  }, [bin, bin?.binId, binService]);

  // add formatting to date to convert from epoch time to formatted date
  return (
    <div style={binStyle}>
      <h1>Bin:{bin.binId}</h1>
      <p>Total requests: {requests.length}</p>
      <div>
        Requests are collected at:
        <br/>
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
          <a href={link} target={'_blank'}>{link}</a>
          <FaRegClipboard
            title={'Copy Link'}
            // TODO: Probably want to not be using promise -> void so often
            style={clipboardStyle}
            onClick={() => void copyLink()}
          />
        </div>
      </div>

      {bin.capacity ? <p>Capacity:{bin.capacity}</p> : null}
      
      <div>
        {requests.map((request) => (
          <Request key={request.requestId} {...request} />
        ))}
      </div>
    </div>
  );
};

export default Bin;
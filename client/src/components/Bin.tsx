import { useState, useEffect, type CSSProperties } from 'react';
import type { FC } from 'react';
import type { IRequestProps } from '../types';
import { useBinService } from '../contexts/binServiceContext.ts';
import { useBin } from '../contexts/binContext.ts';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import Request from './Request.tsx';
import { FaRegClipboard } from 'react-icons/fa6';
import { parseRawRequest } from '../utils.ts';
import type { RawRequest } from '../types';

interface WebSocketSubscription {
  event: string;
  binName: string;
}

type WebSocketData = RawRequest | WebSocketSubscription | null;

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

  const link: string = `${binService.url}/bins/${bin.binName}`;

  // Web Socket Implementation
  // TODO: Fix this link
  const socketURL: string = binService.wsUrl;

  const {
    sendJsonMessage,
    lastJsonMessage,
    readyState,
  } = useWebSocket(socketURL, {
    share: false,
    shouldReconnect: () => true,
  });

  useEffect(() => {
    console.log('websocket connection changed to', readyState);
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({ binName: bin.binName });
    }
  }, [readyState, bin.binName, sendJsonMessage]);

  useEffect(() => {
    const addRequest = () => {
      const data = lastJsonMessage as WebSocketData;
      console.log('lastJsonMessage is', data);
      if (data === null || 'event' in data) return;
      setRequests((prev) => [parseRawRequest(data), ...prev]);
    };
    
    addRequest();
  }, [lastJsonMessage]);

  const copyLink = async (): Promise<void> => {
    await navigator.clipboard.writeText(link);
  };

  useEffect(() => {
    const fetchRequests = async (binName: string) => {
      return await binService.fetchRequests(binName);
    };

    if (bin) {
      fetchRequests(bin.binName).then(( data ) => {
        setRequests([...data].reverse());
      }).catch((e) => {
        console.error(e);
      });
    }

  }, [bin, bin?.binName, binService]);

  return (
    <div style={binStyle}>
      <h1>Bin: {bin.binName}</h1>
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

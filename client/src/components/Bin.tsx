import { useState, useEffect, type CSSProperties } from 'react';
import type { FC } from 'react';
import type { IRequestProps } from '../types';
import { useBinService } from '../contexts/binServiceContext.ts';
import { useBin } from '../contexts/binContext.ts';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import Request from './Request.tsx';
import { isRawRequest, parseRawRequest } from '../utils.ts';
import { Link } from './Link.tsx';



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


  // Web Socket Implementation

  const binUrl = `${binService.url}/bins/${bin.binName}`;
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(binService.wsUrl, {
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
      const data = lastJsonMessage;
      console.log('lastJsonMessage is', data);
      if (isRawRequest(data)) {
        setRequests((prev) => [parseRawRequest(data), ...prev ]);
      }
    };

    addRequest();
  }, [lastJsonMessage]);

  useEffect(() => {
    void binService
      .fetchRequests(bin.binName)
      .then((data) => {
        setRequests([...data].reverse());
      })
      .catch((error) => {
        console.error(error);
      });
  }, [bin.binName, binService]);

  return (
    <div style={binStyle}>
      <h1>Bin: {bin.binName}</h1>
      <p>Total requests: {requests.length}</p>

      <Link binUrl={binUrl}/>

      {bin.capacity ? <p>Capacity: {bin.capacity}</p> : null}

      {requests.map((request) => (
        <Request key={request.requestId} {...request} />
      ))}
    </div>
  );
};

export default Bin;

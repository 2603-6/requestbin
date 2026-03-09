import { useState, useEffect } from 'react';
import type { FC } from 'react';
import type { IRequestProps } from '../types';
import { useBinService } from '../contexts/binServiceContext.ts';
import { useBin } from '../contexts/binContext.ts';
import Request from './Request.tsx';

const Bin: FC = () => {
  const [requests, setRequests] = useState<IRequestProps[]>([]);
  const binService = useBinService();
  const bin = useBin();
  
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
  return  bin ? (
    <div className={'bin'}>
      <h1>Bin:{bin.binId}</h1>
      <p>Requests are collected at SOME_URL/{bin.binId}</p>
      
      {bin.capacity ? <p>Capacity:{bin.capacity}</p> : null}
      
      <div className={'requests'}>
        {requests.map((request) => (
          <Request key={request.requestId} {...request} />
        ))}
      </div>
    </div>
  ) : null;
};

export default Bin;
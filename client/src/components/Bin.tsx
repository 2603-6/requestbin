import { useState, useEffect } from 'react';
import type { FC } from 'react';
import type { IBinProps } from '../types';
import type { BinRequest } from '../types';
import { useBin } from '../contexts/binContext.tsx';

const Bin: FC<IBinProps> = ({ binId, capacity }) => {
  const [requests, setRequests] = useState<BinRequest[]>([]);
  const binService = useBin();
  
  useEffect(() => {
    const fetchRequests = async () => {
      const data = await binService.fetchRequests(binId);
      setRequests(data);
    };

    void fetchRequests();
  }, [binId, binService]);

  // add formatting to date to convert from epoch time to formatted date
  return (
    <div>
      <h1>Bin:{binId}</h1>
      <p>Requests are collected at SOME_URL/{binId}</p>
      {capacity ? <p>Capacity:{capacity}</p> : null }
      {requests.map((request) => (
        <div key={request.id}>
          <p>{request.http_method}</p>
          <p>{request.path} and query params here</p>
          <p>{request.date_stamp}</p>
          <p>Headers - add click event to expand</p>
          <p>Body - add click event to expand, don't show if empty</p>
        </div>
      ))}
    </div>
  );
};

export default Bin;
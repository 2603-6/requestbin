import type { FC } from 'react';
import type { IBinProps } from '../types';

const Bin: FC<IBinProps> = ({ binId, capacity, requests }) => {


  return (
    <div>
      <h1>Bin:{binId}</h1>
      <p>Requests are collected at SOME_URL/{binId}</p>
      {capacity ? <p>Capacity:{capacity}</p> : null }
      {requests.map((request) => (
        <p>RequestConnectionGoesHere {request.type}</p>
      ))}
    </div>
  );
};

export default Bin;
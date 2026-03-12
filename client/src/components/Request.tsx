import type { FC } from 'react';
import type { IRequestProps } from '../types/index.ts';
import { useState } from 'react';

const Row: FC<{ title: string; text: string; }> = ({ title, text }) => {
  const [isVisible, setVisible] = useState(false);
  
  return (
    <div onClick={() => setVisible(!isVisible)}>
      {title}
      {isVisible ? <p>{text}</p> : null}
    </div>
  );
};

const Request: FC<IRequestProps> = ({
  path, // includes query param in string
  type,
  timestamp,
  requestHeaders,
  requestBody,
  queryParams,
}) => {

  return (
    <div className={'request-card'}>
      <p>{type}</p>
      <p>{timestamp}</p>
      <p>{path}</p>
      {requestHeaders ? <Row title={'Headers'} text={requestHeaders}/> : null}
      {requestBody ? <Row title={'Body'} text={requestBody}/> : null}
      {queryParams ? <Row title={'Params'} text={queryParams}/> : null}
    </div>
  );
};

export default Request;

import type { FC } from 'react';
import type { IRequestProps } from '../types';
import { useState } from 'react';

const Row: FC<{ title: string; text: string; }> = ({ title, text }) => {
  const [isVisible, setVisible] = useState(false);
  
  return (
    <div className={'request-row'}>
      <button
        type={'button'}
        className={'request-row-toggle'}
        onClick={() => setVisible(!isVisible)}
      >
        <span>{title}</span>
        <span>{isVisible ? 'Hide' : 'Show'}</span>
      </button>
      {isVisible ? <pre className={'request-row-content'}>{text}</pre> : null}
    </div>
  );
};

const Request: FC<IRequestProps> = ({
  path,
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
      <pre className={'request-path'}>{path}</pre>
      {requestHeaders ? <Row title={'Headers'} text={requestHeaders}/> : null}
      {requestBody ? <Row title={'Body'} text={requestBody}/> : null}
      {queryParams ? <Row title={'Params'} text={queryParams}/> : null}
    </div>
  );
};

export default Request;

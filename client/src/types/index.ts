export type RequestType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'PATCH' | 'CONNECT' | 'HEAD' | 'TRACE' ;


export interface IRequestProps {
  requestId: number;
  requestHeaders: string;
  timestamp: string;
  route: string;
  type: RequestType;
}

export interface IBinProps {
  binId: number;
  capacity?: number
}

export interface BinRequest {
  id: string;
  date: number;
  headers: string
  contentLength: number;
  body: string;
  method: RequestType;
  path: string;
  query: string; 
}
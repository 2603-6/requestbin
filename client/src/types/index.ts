export type RequestType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'PATCH' | 'CONNECT' | 'HEAD' | 'TRACE' ;


export interface IRequestProps {
  requestId: number;
  requestHeaders: string;
  timestamp: string;
  route: string;
  type: RequestType;
}

export interface IBinProps {
  binId: string;
  capacity?: number
}

export interface BinRequest {
  id: number;
  bin_name: string;
  time_of_day: string;
  date_stamp: string;
  http_method: RequestType;
  body: string;
  headers: object;
  path: string;
}

export type BinInfo = {
  bin_name: string;
};
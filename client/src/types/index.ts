export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'PATCH' | 'CONNECT' | 'HEAD' | 'TRACE' ;

export interface IRequestProps {
  requestId: number;
  requestHeaders: string;
  requestBody?: string;
  queryParams?: string;
  timestamp: string;
  path: string;
  type: RequestMethod;
}

export interface RawRequest {
  id: number;
  bin_name: string;
  time_of_day: string;
  date_stamp: string;
  http_method: RequestMethod;
  body: string;
  headers: object;
  path: object;
  query_params: object;
}

export type RawBin = string;

export type BinInfo = {
  binName: string;
  capacity?: number;
};

export interface BinProvider {
  fetchBins: () => Promise<BinInfo[]>;
  createBin: (binName?: string) => Promise<BinInfo>;
  deleteBin: (binName: string) => Promise<void>;
  fetchRequests: (binName: string) => Promise<IRequestProps[]>;
  clearBin: (binName: string) => Promise<void>;
  wsUrl: string;
  url: string;
}

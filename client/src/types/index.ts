export type RequestType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'PATCH' | 'CONNECT' | 'HEAD' | 'TRACE' ;


export interface IRequestProps {
  requestId: number;
  requestHeaders: string;
  timestamp: string;
  route: string;
  type: RequestType;
}


export interface RawRequest {
  id: number;
  bin_name: string;
  time_of_day: string;
  date_stamp: string;
  http_method: RequestType;
  body: string;
  headers: object;
  path: string;
}

export interface RawBin {
  id: string;
}

export type BinInfo = {
  binId: string;
  capacity?: number;
};

export interface BinProvider {
  fetchBins: () => Promise<BinInfo[]>;
  createBin: (binName?: string) => Promise<BinInfo>;
  deleteBin: (binName: string) => Promise<void>;
  fetchRequests: (binName: string) => Promise<RawRequest[]>;
  clearBin: (binName: string) => Promise<void>;
}

export interface INavbarProps  {
  listening: boolean;
  toggleListening: () => void;
}
import type { BinInfo, IRequestProps, RawBin, RawRequest } from './types';

export const parseRawBin = (raw: RawBin): BinInfo => {
  return {
    binName: raw,
  } as BinInfo;
};

export const parseRawRequest = (raw: RawRequest): IRequestProps => {
  return {
    requestId: raw.id,
    requestHeaders: JSON.stringify(raw.headers),
    timestamp: `${raw.date_stamp} ${raw.time_of_day}`,
    path: JSON.stringify(raw.path),
    type: raw.http_method,
  };
};

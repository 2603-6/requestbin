import type { BinInfo, IRequestProps, RawBin, RawRequest } from './types';

const formatRequestValue = (value: unknown): string | undefined => {
  if (value === null || value === undefined) return undefined;
  if (typeof value === 'string') return value.trim() ? value : undefined;

  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return undefined;
    return JSON.stringify(value, null, 2);
  }

  return String(value);
};

export const parseRawBin = (raw: RawBin): BinInfo => {
  return {
    binName: raw,
  } as BinInfo;
};

export const parseRawRequest = (raw: RawRequest): IRequestProps => {
  return {
    requestId: raw.id,
    requestHeaders: formatRequestValue(raw.headers) ?? '{}',
    requestBody: formatRequestValue(raw.body),
    queryParams: formatRequestValue(raw.query_params),
    timestamp: `${raw.date_stamp} ${raw.time_of_day}`,
    path: formatRequestValue(raw.path) ?? '/',
    type: raw.http_method,
  };
};

export const isRawRequest = (obj: unknown): obj is RawRequest => {
  return obj !== null && typeof obj === 'object' && 'id' in obj;
};

import axios from 'axios';
import type { BinProvider, RawBin, RawRequest } from '../types';
import { parseRawBin, parseRawRequest } from '../utils.ts';

const BASE_URL = 'http://localhost:3001';
const BINS_URL = BASE_URL + '/bins';
const REQUESTS_URL = BASE_URL + '/requests';

const fetchRequests = async (binName: string) => {
  console.log(`fetching requests for bin ${binName}`);
  // The real route is /api/bins/:name/requests
  const response = await axios.get<RawRequest[]>(REQUESTS_URL + `?bin_name=${binName}`);
  return response.data.map(parseRawRequest);
};


const createBin = async (binName?: string) => {
  // The real route is /api/bins
  console.log(`creating bin ${binName}`);
  const response = await axios.post<RawBin>(BINS_URL, { bin_name: binName });
  return parseRawBin(response.data);
};

const fetchBins = async () => {
  // The real route is /api/bins
  console.log('fetching bins');
  const response = await axios.get<RawBin[]>(BINS_URL);
  console.log(response.data);
  return response.data.map(parseRawBin);
};


const deleteBin = async (binName: string) => {
  // The real route is /api/bins/:name
  console.log(`deleting bin ${binName}`);
  await axios.delete(BINS_URL + `/${binName}`);
};

// NOT IN MVP
// const deleteRequest = async (binName: string, requestId: number) => {
//   // The real route is ...
//   console.log(`deleting request ${requestId} from bin ${binName}`);
//   return await axios.delete(BASE_URL + '/requests', { data: { id: requestId } });
// };

const clearBin = async (binName: string) => {
  const requests = await fetchRequests(binName);
  await Promise.all(
    requests.map((request) => axios.delete(REQUESTS_URL + `/${request.requestId}`)),
  );
};


const fakeBinService: BinProvider = {
  fetchRequests,
  fetchBins,
  createBin,
  deleteBin,
  clearBin,
  // deleteRequest,
};

export default fakeBinService;
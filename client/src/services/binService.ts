import axios from 'axios';
import type { BinProvider, RawBin, RawRequest } from '../types';
import { parseRawBin, parseRawRequest } from '../utils.ts';

const BASE_URL = 'http://localhost:3000';
const BINS_URL = BASE_URL + '/bins';

const fetchRequests = async (binName: string) => {
  console.log(`fetching requests for bin ${binName}`);
  const response = await axios.get<RawRequest[]>(BINS_URL + `/${binName}/requests`);
  return response.data.map(parseRawRequest);
};


const createBin = async (binName?: string) => {
  console.log(`creating bin ${binName}`);
  const response = await axios.post<RawBin>(BINS_URL, { bin_name: binName });
  return parseRawBin(response.data);
};

const fetchBins = async () => {
  // The real route is /api/bins
  console.log('fetching bins');
  const response = await axios.get<{ bin_names: RawBin[] }>(BINS_URL);
  console.log(response.data);
  return response.data.bin_names.map(parseRawBin);
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
  console.log(`deleting all requests in ${binName}`);
  await axios.delete(BINS_URL + `/${binName}`);
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
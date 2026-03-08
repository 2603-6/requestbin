import axios from 'axios';
import type { BinInfo, BinProvider, BinRequest } from '../types';

const BASE_URL = 'http://localhost:3001';

const fetchRequests = async (binName: string) => {
  console.log(`fetching requests for bin ${binName}`);
  // The real route is /api/bins/:name/requests
  const response = await axios.get<BinRequest[]>(BASE_URL + '/requests' + `?bin_name=${binName}`);
  return response.data;
};

const createBin = async (binName?: string) => {
  // The real route is /api/bins
  console.log(`creating bin ${binName}`);
  const response = await axios.post<BinInfo>(BASE_URL + '/bins', { bin_name: binName });
  return response.data;
};

const fetchBins = async () => {
  // The real route is /api/bins
  console.log('fetching bins');
  const response = await axios.get<BinInfo[]>(BASE_URL + '/bins');
  return response.data;
};

const deleteBin = async (binName: string) => {
  // The real route is /api/bins/:name
  console.log(`deleting bin ${binName}`);
  void await axios.delete(BASE_URL + '/bins', { data: { bin_name: binName } });
};

// NOT IN MVP
// const deleteRequest = async (binName: string, requestId: number) => {
//   // The real route is ...
//   console.log(`deleting request ${requestId} from bin ${binName}`);
//   return await axios.delete(BASE_URL + '/requests', { data: { id: requestId } });
// };

const fakeBinService: BinProvider = {
  fetchRequests,
  fetchBins,
  createBin,
  deleteBin,
  // deleteRequest,
};

export default fakeBinService;
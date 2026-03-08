import axios from 'axios';
import type { BinInfo, BinRequest } from '../types';

const BASE_URL = 'http://localhost:3001';

const fetchRequests = async (binName: string) => {
  console.log(`fetching requests for bin ${binName}`);
  const response = await axios.get<BinRequest[]>(BASE_URL + '/requests');
  return response.data;
};

const createBin = async (binName?: string) => {
  return await axios.post<BinInfo>(BASE_URL + '/bins', { bin_name: binName });
};

const fetchBins = async () => {
  return await axios.get<BinInfo[]>(BASE_URL + '/bins');
};

const deleteBin = async (binName: string) => {
  return await axios.delete(BASE_URL + '/bins', { data: { bin_name: binName } });
};

const deleteRequest = async (binName: string, requestId: number) => {
  console.log(`deleting request ${requestId} from bin ${binName}`);
  return await axios.delete(BASE_URL + '/requests', { data: { id: requestId } });
};

export default {
  fetchRequests,
  fetchBins,
  createBin,
  deleteBin,
  deleteRequest,
};
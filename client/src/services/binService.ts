import axios from 'axios';
import type { BinProvider, RawBin, RawRequest } from '../types';
import { parseRawBin, parseRawRequest } from '../utils.ts';

// const BASE_URL = 'http://localhost:3000';
const BASE_URL = 'https://forkless-tamesha-unphlegmatically.ngrok-free.dev';
const BINS_URL = BASE_URL + '/api/bins';

const fetchRequests = async (binName: string) => {
  console.log(`fetching requests for bin ${binName}`);
  const response = await axios.get<RawRequest[]>(BINS_URL + `/${binName}/requests`);
  return response.data.map(parseRawRequest);
};


const createBin = async (binName?: string) => {
  console.log(`creating bin ${binName}`);
  const response = await axios.post<{ id: RawBin }>(BINS_URL, { bin_name: binName });
  return parseRawBin(response.data.id);
};

const fetchBins = async () => {
  console.log('fetching bins');
  const response = await axios.get<{ bin_names: RawBin[] }>(BINS_URL);
  console.log(response.data);
  return response.data.bin_names.map(parseRawBin);
};


const deleteBin = async (binName: string) => {
  console.log(`deleting bin ${binName}`);
  await axios.delete(BINS_URL + `/${binName}`);
};

const clearBin = async (binName: string) => {
  console.log(`deleting all requests in ${binName}`);
  await axios.delete(BINS_URL + `/${binName}/requests`);
};


const binService: BinProvider = {
  fetchRequests,
  fetchBins,
  createBin,
  deleteBin,
  clearBin,
};

export default binService;

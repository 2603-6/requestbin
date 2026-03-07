import axios from 'axios';
import type { BinRequest } from '../types';

const BASE_URL = 'http://localhost:3001';

const fetchRequests = async () => {
  const response = await axios.get<BinRequest[]>(BASE_URL + '/requests');
  return response.data;
};

export default {
  fetchRequests,
};
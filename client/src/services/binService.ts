import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

const fetchRequests = async () => {
  const response = await axios.get(BASE_URL + '/requests');
  return response.data;
};

export default {
  fetchRequests,
};
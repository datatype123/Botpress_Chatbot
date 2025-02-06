import axios from 'axios';
import CONFIG from '../config';

const apiService = axios.create({
  baseURL: CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Api-Token': CONFIG.SENDBIRD_API_TOKEN,
  },
});

export const loginUser = async (email) => {
  try {
    const response = await apiService.get(`/users/${email}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


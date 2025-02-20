import axios from 'axios';
import CONFIG from '../config';
import { insertUser } from '../database/insertDB';

const apiService = axios.create({
  baseURL: CONFIG.WEB_HOOK_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signupUser = async ( name, userId, profile ) => {
  try {

    const response = await apiService.post('/users', {
      name,
      profile,
      id: userId,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
import axios from 'axios';
import CONFIG from '../config';

/**
 * Axios instance with base configuration
 */
const apiService = axios.create({
  baseURL: CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Api-Token': CONFIG.SENDBIRD_API_TOKEN,
  },
});

/**
 * Registers a new user on Sendbird.
 * @param {string} userID - The user ID for registration.
 * @param {string} nickname - The nickname for the user.
 */
export const signupUser = async (userID, nickname) => {
  try {
    const response = await apiService.post('/users', {
      user_id: userID,
      nickname: nickname,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

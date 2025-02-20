import axios from 'axios';
import CONFIG from '../config';
import { getAllUsers, getItem, insertUser } from '../database/insertDB';
import { setUserKey } from '../redux/slice';
import { apiService } from './apiService';


const handleLoginUser = async (response,user_data) => {
  if (response["user"]["name"] === user_data["name"]) {
    const user_key = response["user"]["user_key"];
    insertUser(user_data["name"], user_key);
    return user_key;
  }
  
};

export const loginUser = async (nickname,user_id, dispatch) => {
  try {
    const storedUserKey = await getItem(nickname, 'user_key');
    console.log(storedUserKey)
    const response = await apiService(storedUserKey).get(`/users/me`);
    console.log(response.data);
    const apiUser = response.data;
    console.log(apiUser)

    // Check if API response matches input
    if (!apiUser || apiUser["user"]["id"] !== nickname) {
      console.error("asdlajsdajsdl")
      throw new Error('Nickname does not match API records.');
    }

    // Dispatch updated user_key if valid
    if (storedUserKey) {
      dispatch(setUserKey(storedUserKey));
    } else {
      console.error('dalksdhlasdlasjdl')
      throw new Error('User key not found in local storage.');
    }

      
    return apiUser;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

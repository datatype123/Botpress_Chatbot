import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from "react-native-flash-message";
import { loginActions } from '../redux/login';
import { apiService } from './apiService';

export const loginUser = async (nickname: string,userKey:any) => {
  try {
    // Lấy userKey từ AsyncStorage
    console.log("user_key",userKey);

    // Gọi API để xác thực userKey
    const response = await apiService(userKey).get(`/users/me`);
    const apiUser = response.data;

    // Kiểm tra nickname có khớp với API không
    if (!apiUser || apiUser.user.id !== nickname) {
      throw new Error('Nickname does not match API records.');
    }

    // Nếu userKey chưa tồn tại, lưu vào AsyncStorage
    if (!userKey) {
      userKey = apiUser.user.user_key;
      await AsyncStorage.setItem(`user_key_${nickname}`, userKey || '');
    }

    // Cập nhật userKey vào Redux store bằng loginActions

    return true; // Đăng nhập thành công
  } catch (error) {
    console.log('Error logging in user:', error);

    // Hiển thị thông báo lỗi cho người dùng
    showMessage({
      message: "Login failed",
      description:  "Unknown error occurred",
      type: "danger",
      icon: "auto",
      duration: 3000,
    });

    return false; // Đăng nhập thất bại
  }
};
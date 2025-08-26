import { useSelector } from "react-redux";
import { RootState } from "../store"; // Đảm bảo bạn đã định nghĩa RootState trong store.ts

// Selector để lấy nickname của người dùng
export const useNickname = () =>
  useSelector((state: RootState) => state.login.nickname);

// Selector để lấy userId của người dùng
export const useUserId = () =>
  useSelector((state: RootState) => state.login.userId);

// Selector để lấy userKey của người dùng
export const useUserKey = () =>
  useSelector((state: RootState) => state.login.userKey);

// Selector để lấy trạng thái loading của login
export const useIsLoading = () =>
  useSelector((state: RootState) => state.login.isLoading);

// Selector để lấy lỗi nếu có trong login
export const useLoginError = () =>
  useSelector((state: RootState) => state.login.error);
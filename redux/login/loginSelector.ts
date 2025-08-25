import { useSelector } from "react-redux";
import { RootState } from "../store"; // Đảm bảo bạn đã định nghĩa RootState trong store.ts

export const useNickname = () => useSelector((state: RootState) => state.login.nickname);
export const useUserId = () => useSelector((state: RootState) => state.login.userId);
export const useUserKey = () => useSelector((state: RootState) => state.login.userKey);
export const useIsLoading = () => useSelector((state: RootState) => state.login.isLoading);
export const useError = () => useSelector((state: RootState) => state.login.error);
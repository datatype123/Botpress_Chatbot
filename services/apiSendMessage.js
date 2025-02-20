import axios from "axios";
import { Alert } from "react-native";
import CONFIG from "../config";

export const apiSend = async (content, user_key,conv_id) => {
  const apiService = axios.create({
    baseURL: `${CONFIG.WEB_HOOK_URL}`,
    headers: {
      "x-user-key": user_key,
      "Authorization": `Bearer ${CONFIG.AUTH_TOKEN}`,
    },
  });

  const data = {
    payload: {
      text: content,
      type: "text",
    },
    conversationId: conv_id,
  };

  try {
    const response = await apiService.post("/messages", data);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 403) {
        Alert.alert(
          "Access Denied",
          "You are not in this conversation. Please check your access or contact support.",
        );
      }
    }
    // console.error("[X] Dead API send message:", error);
    throw error;
  }
};

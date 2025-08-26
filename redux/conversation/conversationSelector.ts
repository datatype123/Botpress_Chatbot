import { useSelector } from "react-redux";
import { RootState } from "../store"; // Đảm bảo bạn đã định nghĩa RootState trong store.ts

// Selector để lấy danh sách tất cả các cuộc trò chuyện
export const useConversations = () =>
  useSelector((state: RootState) => state.conversation.conversations);

// Selector để lấy cuộc trò chuyện đang được chọn
export const useSelectedConversationId = () =>
  useSelector((state: RootState) => state.conversation.selectedConversationId);

// Selector để lấy trạng thái loading của cuộc trò chuyện
export const useConversationLoading = () =>
  useSelector((state: RootState) => state.conversation.loading);

// Selector để lấy lỗi nếu có trong cuộc trò chuyện
export const useConversationError = () =>
  useSelector((state: RootState) => state.conversation.error);

// Selector để lấy một cuộc trò chuyện cụ thể theo ID
export const useConversationById = (conversationId: string) =>
  useSelector((state: RootState) =>
    state.conversation.conversations.find((conv) => conv.id === conversationId)
  );

// Selector để lấy danh sách tin nhắn của một cuộc trò chuyện cụ thể
export const useMessagesByConversationId = (conversationId: string) =>
  useSelector((state: RootState) => {
    const conversation = state.conversation.conversations.find(
      (conv) => conv.id === conversationId
    );
    return conversation ? conversation.messages : [];
  });

// Selector để lấy danh sách người tham gia của một cuộc trò chuyện cụ thể
export const useParticipantsByConversationId = (conversationId: string) =>
  useSelector((state: RootState) => {
    const conversation = state.conversation.conversations.find(
      (conv) => conv.id === conversationId
    );
    return conversation ? conversation.participants : [];
  });
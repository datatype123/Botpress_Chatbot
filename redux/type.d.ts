// Interface cho tin nhắn
export interface Message {
  id: string;
  sender: string;
  content: string;
  createdAt: string;
}

// Interface cho cuộc trò chuyện
export interface Conversation {
  createdAt: string;
  id: string;
  updatedAt: string;
  participants?: string[]; // Danh sách người tham gia (mảng các user ID)
  messages?: Message[]; // Danh sách tin nhắn trong cuộc trò chuyện
}

// Interface cho trạng thái của Conversation Slice
export interface ConversationState {
  conversations: Conversation[]; // Danh sách các cuộc trò chuyện
  selectedConversationId: string | null; // ID của cuộc trò chuyện đang được chọn
  error:string,
  loading:{ [key: string]: boolean };
}

// Interface cho trạng thái của Login Slice
export interface LoginState {
  nickname: string;
  userId: string;
  userKey: string;
  isLoading: boolean;
  error: string | null;
}

// Interface cho trạng thái của App Slice
export interface AppState {
  value: number;
  user_key: string;
  theme: string;
  bot_message: string;
  conversation_id: string;
}

// RootState: Kết hợp tất cả các slice trong Redux store
export interface RootState {
  app: AppState;
  login: LoginState;
  conversation: ConversationState;
}
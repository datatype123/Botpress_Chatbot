import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Conversation {
    id: string;
    createdAt: string;
    participants: string[]; // Danh sách người tham gia (mảng các user ID)
}

interface ConversationState {
    conversations: Conversation[]; // Danh sách các cuộc trò chuyện
    selectedConversationId: string | null; // ID của cuộc trò chuyện đang được chọn
}

const initialState: ConversationState = {
    conversations: [],
    selectedConversationId: null,
};

const conversationSlice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        // Thêm một cuộc trò chuyện mới
        addConversation(state, action: PayloadAction<Conversation>) {
            state.conversations.push(action.payload);
        },
        // Cập nhật thông tin một cuộc trò chuyện
        updateConversation(
            state,
            action: PayloadAction<{ id: string; updatedData: Partial<Conversation> }>
        ) {
            const { id, updatedData } = action.payload;
            const conversation = state.conversations.find((conv) => conv.id === id);
            if (conversation) {
                Object.assign(conversation, updatedData);
            }
        },
        // Xóa một cuộc trò chuyện
        deleteConversation(state, action: PayloadAction<string>) {
            state.conversations = state.conversations.filter(
                (conv) => conv.id !== action.payload
            );
        },
        // Chọn một cuộc trò chuyện
        selectConversation(state, action: PayloadAction<string>) {
            state.selectedConversationId = action.payload;
        },
        // Đặt lại trạng thái
        resetConversations(state) {
            state.conversations = [];
            state.selectedConversationId = null;
        },
    },
});

export const {
    addConversation,
    updateConversation,
    deleteConversation,
    selectConversation,
    resetConversations,
} = conversationSlice.actions;

export default conversationSlice.reducer;
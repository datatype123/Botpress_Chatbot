import { apiService } from './apiService';


export const getAllConversations = async (user_key) => {
    try {
        const response = await apiService(user_key).get('/conversations');
          
        return response.data.conversations;
    } catch (error) {
        console.error('Error fetching conversation:', error);
        throw error;
    }
};

export const createNewConversation = async (name_conversation,user_key)=>{
    try {
        const data = {
            "id":name_conversation
        }
        const response = await apiService(user_key).post('/conversations',data);
        return response.data;
    } catch (error) {
        // console.error('Error create conversation:',error);
        return "Conversation already existed";
        
    }
}
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0,
    user_key:'',
    theme:'',
    bot_message:'',
    conversation_id : '',
}

const appSlice = createSlice({
    name:'app',
    initialState,
    reducers:{
        increment(state) {
            state.value += 1;
        },
        decrement(state) {
            state.value -= 1;
        },
        setUserKey(state,action){
            state.user_key = action.payload;
        },
        setTheme(state,action){
            state.theme = action.payload;
        },
        setBotMessage(state,action){
            state.bot_message = action.payload;
        },
        setConversationId(state,action){
            state.conversation_id = action.payload;
        },
    }
})

export const {setUserKey,setTheme,increment,decrement,setBotMessage,setConversationId} = appSlice.actions;
export default appSlice.reducer;
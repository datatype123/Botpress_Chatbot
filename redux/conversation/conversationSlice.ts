import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { from, of } from "rxjs";
import { catchError, concatMap, map, mergeMap } from "rxjs/operators";
import { getAllConversations } from "../../services/apiConversations";
import { getHistoryMessage } from "../../services/apiGetMessage";
import { appActions } from "../slice";
import type { Conversation, ConversationState, Message } from '../type.d.ts';


const initialState: ConversationState = {
    conversations: [],
    selectedConversationId: null,
    error: '',
    loading: {
        fetchConversations: false,
        fetchHistoryConversation: false,
    },
};

const conversationSlice = createSlice({
    name: "conversation",
    initialState,
    reducers: {

        addConversation(state, action: PayloadAction<Conversation>) {
            state.conversations.push(action.payload);
        },

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
        fetchConversationsrequest(state, action: PayloadAction<string>) {
            console.log('feth data ')
        },

        fetchHistoryConversation(state, action: PayloadAction<{ conversationId: string, userKey: string }>) {
            const { conversationId, userKey } = action.payload;
            console.log("Fetch history message conversation")
        },

        deleteConversation(state, action: PayloadAction<string>) {
            state.conversations = state.conversations.filter(
                (conv) => conv.id !== action.payload
            );
        },

        selectConversation(state, action: PayloadAction<string>) {
            state.selectedConversationId = action.payload;
        },
        setConversations(state, action: PayloadAction<Conversation[]>) {
            console.log("Setting conversations in state:", action.payload);
            state.conversations = action.payload;
        },

        resetConversations(state) {
            state.conversations = [];
            state.selectedConversationId = null;
        },

        addMessageToConversation(
            state,
            action: PayloadAction<{ conversationId: string; message: Message }>
        ) {
            const { conversationId, message } = action.payload;
            const conversation = state.conversations.find(
                (conv) => conv.id === conversationId
            );
            // if (conversation) {
            //     conversation.messages.push(message);
            // }
        },

        deleteMessageFromConversation(
            state,
            action: PayloadAction<{ conversationId: string; messageId: string }>
        ) {
            const { conversationId, messageId } = action.payload;
            const conversation = state.conversations.find(
                (conv) => conv.id === conversationId
            );
            // if (conversation) {
            //     conversation.messages = conversation?.messages.filter(
            //         (msg) => msg.id !== messageId
            //     );
            // }
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
        setLoading(state, action: PayloadAction<{ type: string; value: boolean }>) {
            const { type, value } = action.payload;
            state.loading[type] = value;
        },
    },
});


export const fetchConversationsEpic = (action$: any) =>
  action$.pipe(
    ofType(conversationActions.fetchConversationsrequest.type),
    mergeMap((action: PayloadAction<string>) =>
      from(getAllConversations(action.payload)).pipe(
        mergeMap((response: Conversation[]) => {
          console.log("API response for fetchConversations:", response);
          return [
            conversationActions.setLoading({ type: 'fetchConversations', value: true }),
            conversationActions.setConversations(response),
            conversationActions.setLoading({ type: 'fetchConversations', value: false }),
          ];
        }),
        catchError((error) => of(
          conversationActions.setLoading({ type: 'fetchConversations', value: false }),
          conversationActions.setError(error.message || "Failed to fetch conversations")
        ))
      )
    )
  );



export const fetchHistoryConversation = (action$: any) =>
    action$.pipe(
        ofType(conversationActions.fetchHistoryConversation.type),
        concatMap((action: PayloadAction<{ conversationId: string, userKey: string }>) => {
            const { conversationId, userKey } = action.payload;
            console.log("Fetching history for conversationId:", conversationId, "with userKey:", userKey);
            return of(conversationActions.setLoading({ type: 'fetchHistoryConversation', value: true })).pipe(
                concatMap(() =>
                    from(getHistoryMessage(userKey, conversationId)).pipe(
                        map((response: any) => {

                            return appActions.setBotMessage({
                                conversationId,
                                messages: response,
                            });
                        }),
                        catchError((error) =>
                            of(
                                conversationActions.setError(error.message || "Failed to fetch history messages")
                            )
                        ),

                        concatMap(() =>
                            of(conversationActions.setLoading({ type: 'fetchHistoryConversation', value: false }))
                        )
                    )
                )
            );
        })
    );





export const conversationEpics = [fetchConversationsEpic,fetchHistoryConversation];
export const conversationActions = conversationSlice.actions;
export const conversationReducer = conversationSlice.reducer;
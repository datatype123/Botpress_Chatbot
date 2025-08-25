import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
    nickname: string;
    userId: string;
    userKey: string;
    isLoading: boolean;
    error: string | null;
}

const initialState: LoginState = {
    nickname: "",
    userId: "",
    userKey: "",
    isLoading: false,
    error: null,
};

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setNickname(state, action: PayloadAction<string>) {
            state.nickname = action.payload;
        },
        setUserId(state, action: PayloadAction<string>) {
            state.userId = action.payload;
        },
        setUserKey(state, action: PayloadAction<string>) {
            state.userKey = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
        resetLoginState(state) {
            state.nickname = "";
            state.userId = "";
            state.userKey = "";
            state.isLoading = false;
            state.error = null;
        },
    },
});

export const loginActions = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { catchError, concatMap, from, of } from "rxjs";
import { loginUser } from "../../services/apiLogin";
import type { LoginState } from "../type.d.ts";

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
        loginRequest(state, action: PayloadAction<{ nickname: string; userKey: string }>) {
            // Action để bắt đầu quá trình đăng nhập
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess(state, action: PayloadAction<string>) {
            // Action khi đăng nhập thành công
            state.isLoading = false;
            state.userKey = action.payload;
        },
        loginFailure(state, action: PayloadAction<string>) {
            // Action khi đăng nhập thất bại
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

// Epic xử lý logic đăng nhập
export const loginEpic = (action$: any) =>
    action$.pipe(
        ofType(loginActions.loginRequest.type), // Lắng nghe action loginRequest
        concatMap((action: PayloadAction<{ nickname: string; userKey: string }>) =>
            from(loginUser(action.payload.nickname, action.payload.userKey)).pipe(
                concatMap((response: any) => {
                    const userKey = response.userKey;

                    // Dispatch các action tuần tự
                    return of(
                        loginActions.setLoading(true), // Bắt đầu quá trình
                        loginActions.setUserKey(userKey), // Lưu userKey vào Redux store
                        // loginActions.loginSuccess(userKey), // Đăng nhập thành công
                        // loginActions.setLoading(false) // Kết thúc quá trình
                    );
                }),
                catchError((error) =>
                    of(
                        loginActions.setLoading(false), // Đảm bảo tắt trạng thái loading
                        loginActions.loginFailure(error.message || "Login failed") // Xử lý lỗi
                    )
                )
            )
        )
    );



export const loginEpics = [loginEpic];
export const loginActions = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
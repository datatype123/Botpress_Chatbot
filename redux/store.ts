import { configureStore } from '@reduxjs/toolkit';
import { loginReducer } from './login';
import appReducer from './slice';

const store = configureStore({
    reducer: {
        app: appReducer,
        login: loginReducer,
    },
});

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

export default store;
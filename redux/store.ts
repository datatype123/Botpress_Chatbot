import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './reducers'; // combineReducers của bạn
import rootEpics from './epics'; 
import { useSelector, TypedUseSelectorHook } from 'react-redux';

// Tạo Epic middleware
const epicMiddleware = createEpicMiddleware();

// Cấu hình redux-persist
const persistConfig = {
  key: 'root',              // key gốc để lưu state
  storage: AsyncStorage,    // AsyncStorage cho React Native
  whitelist: ['login'],     // Chỉ lưu slice 'login' (nơi có userKey), thêm slice khác nếu muốn
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Cấu hình store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // bắt buộc tắt vì redux-persist có dữ liệu không tuần tự
    }).concat(epicMiddleware),
});

// Chạy rootEpics
epicMiddleware.run(rootEpics);

// Tạo persistor để sử dụng với PersistGate
export const persistor = persistStore(store);

// Type cho RootState và Dispatch
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// Typed selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

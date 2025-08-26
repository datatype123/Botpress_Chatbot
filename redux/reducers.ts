import { combineReducers } from '@reduxjs/toolkit';
import {appReducer} from './slice'; // Import app slice reducer
import {loginReducer} from './login'; // Import login slice reducer
import {conversationReducer} from './conversation'; // Import conversation slice reducer

// Kết hợp tất cả các reducers
const rootReducer = combineReducers({
  app: appReducer,
  login: loginReducer,
  conversation: conversationReducer,
});

export default rootReducer;
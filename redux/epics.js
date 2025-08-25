import { ofType } from 'redux-observable';
import { map, mergeMap, catchError, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { setBotMessage, setConversationId } from './slice';

// Epic để xử lý việc lấy bot message từ API
export const fetchBotMessageEpic = (action$) =>
  action$.pipe(
    ofType('app/setBotMessage'), // Lắng nghe action setBotMessage
    mergeMap((action) =>
      ajax.getJSON(`/api/bot-message/${action.payload}`).pipe(
        map((response) => setBotMessage(response.message)), // Dispatch action mới với dữ liệu từ API
        catchError((error) => {
          console.error('Error fetching bot message:', error);
          return of(setBotMessage('Error fetching bot message')); // Xử lý lỗi
        })
      )
    )
  );

// Epic để xử lý việc thiết lập conversation ID
export const setConversationIdEpic = (action$) =>
  action$.pipe(
    ofType('app/setConversationId'), // Lắng nghe action setConversationId
    map((action) => {
      console.log('Conversation ID set:', action.payload);
      return { type: 'app/conversationIdLogged', payload: action.payload }; // Dispatch action mới để log
    })
  );

// Kết hợp tất cả các epics
export const rootEpic = (action$) =>
  mergeMap((action$) => [fetchBotMessageEpic(action$), setConversationIdEpic(action$)]);
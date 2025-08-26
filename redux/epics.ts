import { ofType,combineEpics } from 'redux-observable';
import { map, mergeMap, catchError, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {loginEpics} from './login';
import {conversationEpics} from './conversation';

const rootEpics = combineEpics(
  ...loginEpics,
  ...conversationEpics 
)


export default rootEpics;
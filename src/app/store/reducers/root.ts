import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { MessagesState, messagesReducer } from './messages';
import { UserState, userReducer } from './user';
import { ThreadsState, threadsReducer } from './threads';
import { AppState, appReducer } from './app';

export interface AmadeusState {
    app: AppState,
    messages: MessagesState,
    threads: ThreadsState,
    user: UserState
}

export const AmadeusReducers: ActionReducerMap<AmadeusState> = {
    app: appReducer,
    messages: messagesReducer,
    threads: threadsReducer,
    user: userReducer
};

export const selectAppState = createFeatureSelector<AmadeusState, AppState>('app');
export const selectMessagesState = createFeatureSelector<AmadeusState, MessagesState>('messages');
export const selectThreadsState = createFeatureSelector<AmadeusState, ThreadsState>('threads');
export const selectUserState = createFeatureSelector<AmadeusState, UserState>('user');
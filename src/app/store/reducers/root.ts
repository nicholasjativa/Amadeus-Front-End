import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { MessagesState, messagesReducer } from './messages';
import { UserState, userReducer } from './user';
import { ThreadsState, threadsReducer } from './threads';

export interface AmadeusState {
    messages: MessagesState,
    threads: ThreadsState,
    user: UserState
}

export const AmadeusReducers: ActionReducerMap<AmadeusState> = {
    messages: messagesReducer,
    threads: threadsReducer,
    user: userReducer
};

export const selectMessagesState = createFeatureSelector<AmadeusState, MessagesState>('messages');
export const selectThreadsState = createFeatureSelector<AmadeusState, ThreadsState>('threads');
export const selectUserState = createFeatureSelector<AmadeusState, UserState>('user');
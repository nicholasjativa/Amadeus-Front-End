import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { ConversationsState, conversationsReducer } from './conversation';
import { UserState, userReducer } from './user';
import { ThreadsState, threadsReducer } from './threads';
import { AppState, appReducer } from './app';

export interface AmadeusState {
    app: AppState,
    conversations: ConversationsState,
    threads: ThreadsState,
    user: UserState
}

export const AmadeusReducers: ActionReducerMap<AmadeusState> = {
    app: appReducer,
    conversations: conversationsReducer,
    threads: threadsReducer,
    user: userReducer
};

export const selectAppState = createFeatureSelector<AmadeusState, AppState>('app');
export const selectConversationsState = createFeatureSelector<AmadeusState, ConversationsState>('conversations');
export const selectThreadsState = createFeatureSelector<AmadeusState, ThreadsState>('threads');
export const selectUserState = createFeatureSelector<AmadeusState, UserState>('user');
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { ConversationsState, conversationsReducer } from './conversation';
import { UserState, userReducer } from './user';
import { ConversationPreviewState, conversationPreviewReducer } from './conversation-preview';
import { AppState, appReducer } from './app';

export interface AmadeusState {
    app: AppState,
    conversations: ConversationsState,
    conversationPreview: ConversationPreviewState,
    user: UserState
}

export const AmadeusReducers: ActionReducerMap<AmadeusState> = {
    app: appReducer,
    conversations: conversationsReducer,
    conversationPreview: conversationPreviewReducer,
    user: userReducer
};
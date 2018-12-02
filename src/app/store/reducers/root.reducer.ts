import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { MessagesState, messagesReducer } from './messages.reducer';

export interface AmadeusState {
    messages: MessagesState
}

export const reducers: ActionReducerMap<AmadeusState> = {
    messages: messagesReducer
};
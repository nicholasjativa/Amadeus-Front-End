import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { MessagesState, messagesReducer } from './messages';

export interface AmadeusState {
    messages: MessagesState
}

export const AmadeusReducers: ActionReducerMap<AmadeusState> = {
    messages: messagesReducer
};
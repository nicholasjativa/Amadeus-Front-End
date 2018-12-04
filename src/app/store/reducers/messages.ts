import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { MessageActionTypes } from '../action-types/messages';

export interface MessagesState {
    conversations: any[][],
    currentlySelectedConversation: any[],
    currentlySelectedConversationId: string,
    loaded: boolean,
    loading: boolean
}

export const initialState: MessagesState = {
    conversations: [],
    currentlySelectedConversation: [],
    currentlySelectedConversationId: "",
    loaded: false,
    loading: false
};

export function messagesReducer(state: MessagesState = initialState, action): MessagesState {

    switch(action.type) {
        
        case MessageActionTypes.LOAD_MESSAGES: {

            const currentlySelectedConversationId: string = action.payload;
            const loading: boolean = true;

            return { ...state, currentlySelectedConversationId, loading };
        }

        case MessageActionTypes.LOAD_MESSAGES_SUCCESS: {

            const currentlySelectedConversation: any[] = action.payload;
            const conversations: any[][] = [ ...state.conversations, currentlySelectedConversation ];
            const loading: boolean = false;
            const loaded: boolean = true;

            return { ...state, conversations, currentlySelectedConversation, loading, loaded };
        }

        default:
            return state;
    }
};

export const getConversations: Function = (state: MessagesState): any[] => state.conversations;
export const getCurrentConversation: Function = (state: MessagesState): any[] => state.currentlySelectedConversation;
export const getLoaded: Function = (state: MessagesState): boolean => state.loaded;
export const getLoading: Function = (state: MessagesState): boolean => state.loading;

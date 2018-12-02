import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { MessageActionTypes } from '../action-types/messages';

export interface MessagesState {
    conversations: any[][],
    currentConversation: any[],
    currentConversationId: string,
    loaded: boolean,
    loading: boolean,
    sidebar: []
}

export const initialState: MessagesState = {
    conversations: [],
    currentConversation: [],
    currentConversationId: "",
    loaded: false,
    loading: false,
    sidebar: []
};

export function messagesReducer(state: MessagesState = initialState, action): MessagesState {

    switch(action.type) {
        
        case MessageActionTypes.LOAD_MESSAGES: {

            const currentConversationId: string = action.payload;
            const loading: boolean = true;

            return { ...state, currentConversationId, loading };
        }

        case MessageActionTypes.LOAD_MESSAGES_SUCCESS: {

            const currentConversation: any[] = action.payload;
            const conversations: any[][] = [ ...state.conversations, currentConversation ];
            const loading: boolean = false;
            const loaded: boolean = true;

            return { ...state, conversations, currentConversation, loading, loaded };
        }

        default:
            return state;
    }
};

export const getConversations: Function = (state: MessagesState): any[] => state.conversations;
export const getCurrentConversation: Function = (state: MessagesState): any[] => state.currentConversation;
export const getLoaded: Function = (state: MessagesState): boolean => state.loaded;
export const getLoading: Function = (state: MessagesState): boolean => state.loading;
export const getSidebar: Function = (state: MessagesState): any[] => state.sidebar;

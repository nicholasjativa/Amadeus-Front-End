import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { MessageActionTypes } from '../action-types/messages';
import { Message } from '../../models/message';

export interface MessagesState {
    conversations: any[][],
    currentlySelectedConversation: Message[],
    currentlySelectedConversationPhoneNumber: string,
    loaded: boolean,
    loading: boolean
}

export const initialState: MessagesState = {
    conversations: [],
    currentlySelectedConversation: [],
    currentlySelectedConversationPhoneNumber: "",
    loaded: false,
    loading: false
};

export function messagesReducer(state: MessagesState = initialState, action): MessagesState {

    switch(action.type) {
        
        case MessageActionTypes.LOAD_MESSAGES_BY_THREAD: {

            const currentlySelectedConversationPhoneNumber: string = action.payload.address;
            const loading: boolean = true;

            return { ...state, currentlySelectedConversationPhoneNumber, loading };
        }

        case MessageActionTypes.LOAD_MESSAGES_BY_THREAD_SUCCESS: {

            const currentlySelectedConversation: Message[] = action.payload;
            const conversations: any[][] = [ ...state.conversations, currentlySelectedConversation ];
            const loading: boolean = false;
            const loaded: boolean = true;

            return { ...state, conversations, currentlySelectedConversation, loading, loaded };
        }

        default:
            return state;
    }
};

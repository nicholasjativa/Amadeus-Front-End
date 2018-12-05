import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { MessageActionTypes } from '../action-types/messages';
import { Message } from '../../models/message';
import { Conversation } from '../../models/conversation';
import { Conversations } from '../../models/conversations';

export interface MessagesState {
    conversations: Conversations,
    currentlySelectedConversation: Conversation,
    currentlySelectedConversationPhoneNumber: string,
    loaded: boolean,
    loading: boolean
}

export const initialState: MessagesState = {
    conversations: {},
    currentlySelectedConversation: {
        name: "",
        address: "",
        messages: []
    },
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

            const conversation: Conversation = action.payload;
            const currentlySelectedConversation: Conversation = conversation;
            const phoneNumber: string = conversation.address;
            let conversations: Conversations = { ...state.conversations };
            conversations[phoneNumber] = conversation;

            return { ...state, conversations, currentlySelectedConversation };
        }

        default:
            return state;
    }
};

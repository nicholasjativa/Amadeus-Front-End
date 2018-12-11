import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { MessageActionTypes } from '../action-types/messages';
import { Message } from '../../models/message';
import { Conversation } from '../../models/conversation';
import { Conversations } from '../../models/conversations';
import { AndroidMessagesActionTypes } from '../action-types/androidMessages';
import { AndroidMessage } from '../../models/androidMessage';
import { AmadeusMessageStatus } from '../../models/amadeusMessageStatus';

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

        case AndroidMessagesActionTypes.RECEIVED_ANDROID_MESSAGE: {

            const androidMessage: AndroidMessage = action.payload;
            const messagePhoneNumber: string = androidMessage.fromPhoneNumber;

            if (state.currentlySelectedConversationPhoneNumber === messagePhoneNumber) {
                // TODO add additional logic to add the incoming message to a conversation
                // in the conversations array IF that message is already cached (exists in the arr)
                let currentlySelectedConversation = state.currentlySelectedConversation;
                let currentMessages = state.currentlySelectedConversation.messages;
                currentlySelectedConversation.messages = [ ...currentMessages, androidMessage ];
                
                return { ...state, currentlySelectedConversation };
            }

            return state;
        }

        case AndroidMessagesActionTypes.RECEIVED_AMADEUS_MESSAGE_STATUS: {

            const amadeusMessage: AmadeusMessageStatus = action.payload;
            const messagePhoneNumber: string = amadeusMessage.fromPhoneNumber;

            if (state.currentlySelectedConversationPhoneNumber === messagePhoneNumber) {
                // TODO add additional logic to add the incoming message to a conversation
                // in the conversations array IF that message is already cached (exists in the arr)
                let currentlySelectedConversation = state.currentlySelectedConversation;
                let currentMessages = state.currentlySelectedConversation.messages;
                currentlySelectedConversation.messages = [ ...currentMessages, amadeusMessage ];

                return { ...state, currentlySelectedConversation };
            }

            return state;
        }

        default:
            return state;
    }
};

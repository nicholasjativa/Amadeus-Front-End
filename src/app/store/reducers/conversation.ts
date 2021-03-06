import { ConversationActionTypes } from '../action-types/conversation';
import { Conversation } from '../../models/conversation';
import { Conversations } from '../../models/conversations';
import { AndroidMessagesActionTypes } from '../action-types/androidMessages';
import { AndroidMessage } from '../../models/androidMessage';
import { AmadeusMessageStatus } from '../../models/amadeusMessageStatus';
import { createFeatureSelector } from '@ngrx/store';
import { AmadeusState } from './root';

export interface ConversationsState {
    conversations: Conversations,
    currentlySelectedConversation: Conversation,
    currentlySelectedConversationPhoneNumber: string,
    isEditingHeader: boolean,
    loaded: boolean,
    loading: boolean
}

export const initialState: ConversationsState = {
    conversations: {},
    currentlySelectedConversation: {
        name: '',
        address: '',
        messages: []
    },
    isEditingHeader: false,
    currentlySelectedConversationPhoneNumber: '',
    loaded: false,
    loading: false
};

export const selectConversationsState = createFeatureSelector<AmadeusState, ConversationsState>('conversations');

export function conversationsReducer(state: ConversationsState = initialState, action): ConversationsState {

    switch (action.type) {

        case ConversationActionTypes.CREATE_NEW_CONVERSATION: {

            return { ...state, isEditingHeader: true }
        }

        case ConversationActionTypes.UPDATE_NEW_CONVERSATION_WITH_INFO: {

            const name: string = action.payload.name;
            const address: string = action.payload.address;

            let conversations: Conversations = { ...state.conversations };
            delete conversations['BLANK_ADDRESS'];

            const newConversation: Conversation = {
                address,
                messages: [],
                name
            };
            conversations[address] = newConversation;

            return {
                ...state,
                isEditingHeader: false,
                conversations,
                currentlySelectedConversation: newConversation,
                currentlySelectedConversationPhoneNumber: address
            };
        }

        case ConversationActionTypes.LOAD_CONVERSATION_BY_CONVERSATION_PREVIEW: {

            const currentlySelectedConversationPhoneNumber: string = action.payload.address;
            const loading: boolean = true;

            return { ...state, currentlySelectedConversationPhoneNumber, loading };
        }

        case ConversationActionTypes.LOAD_CONVERSATION_BY_CONVERSATION_PREVIEW_SUCCESS: {

            const conversation: Conversation = action.payload;
            const currentlySelectedConversation: Conversation = conversation;
            const address: string = conversation.address;
            let conversations: Conversations = { ...state.conversations };
            conversations[address] = conversation;

            return { ...state, conversations, currentlySelectedConversation, loaded: true, loading: false };
        }

        case AndroidMessagesActionTypes.RECEIVED_ANDROID_MESSAGE: {

            const androidMessage: AndroidMessage = action.payload;
            const fromPhoneNumber: string = action.payload.fromPhoneNumber;
            const toPhoneNumber: string = action.payload.toPhoneNumber;

            if (state.currentlySelectedConversationPhoneNumber === fromPhoneNumber ||
                state.currentlySelectedConversationPhoneNumber === toPhoneNumber) {
                // TODO add additional logic to add the incoming message to a conversation
                // in the conversations array IF that message is already cached (exists in the arr)
                let currentlySelectedConversation = state.currentlySelectedConversation;
                let currentMessages = state.currentlySelectedConversation.messages;
                currentlySelectedConversation.messages = [...currentMessages, androidMessage];

                return { ...state, currentlySelectedConversation };
            } else if (
                (state.conversations[fromPhoneNumber] && (!state.conversations[toPhoneNumber] || state.conversations[toPhoneNumber].address !== fromPhoneNumber))
            ) {

                const existingConversation = state.conversations[fromPhoneNumber];
                const currentMessages = existingConversation.messages;
                existingConversation.messages = [...currentMessages, androidMessage];
                // TODO we should not be mutating the state directly like this
                return state;
            } else if (
                (state.conversations[toPhoneNumber] && (!state.conversations[fromPhoneNumber] || state.conversations[fromPhoneNumber].address !== toPhoneNumber))
            ) {

                const existingConversation = state.conversations[toPhoneNumber];
                const currentMessages = existingConversation.messages;
                existingConversation.messages = [...currentMessages, androidMessage];
                // TODO we should not be mutating the state directly like this
                return state;
            }

            return state;
        }

        case AndroidMessagesActionTypes.RECEIVED_AMADEUS_MESSAGE_STATUS: {

            const amadeusMessage: AmadeusMessageStatus = action.payload;
            const toPhoneNumber: string = amadeusMessage.toPhoneNumber;

            if (state.currentlySelectedConversationPhoneNumber === toPhoneNumber) {
                // TODO add additional logic to add the incoming message to a conversation
                // in the conversations array IF that message is already cached (exists in the arr)
                let currentlySelectedConversation = state.currentlySelectedConversation;
                let currentMessages = state.currentlySelectedConversation.messages;
                currentlySelectedConversation.messages = [...currentMessages, amadeusMessage];

                return { ...state, currentlySelectedConversation };
            } else if (state.conversations[toPhoneNumber]) {

                let existingConversation = state.conversations[toPhoneNumber];
                let currentMessages = existingConversation.messages;
                existingConversation.messages = [...currentMessages, amadeusMessage];
                // TODO we should not be mutating the state directly like this
                return state;
            }

            return state;
        }

        default:
            return state;
    }
};

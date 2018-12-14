import { Action } from '@ngrx/store';
import { ConversationActionTypes } from '../action-types/conversation';
import { Conversation } from '../../models/conversation';
import { Thread } from '../../models/thread';

export class LoadConversationByThread implements Action {
    public readonly type: string = ConversationActionTypes.LOAD_CONVERSATION_BY_THREAD;

    constructor(public payload: Thread) {
    }
} 

export class LoadConversationByThreadSuccess implements Action {
    public readonly type: string = ConversationActionTypes.LOAD_CONVERSATION_BY_THREAD_SUCCESS;

    constructor(public payload: Conversation) {
    }

}

export class LoadConversationByThreadError implements Action {
    public readonly type: string = ConversationActionTypes.LOAD_CONVERSATION_BY_THREAD_ERROR;

}
import { Action } from '@ngrx/store';
import { ConversationActionTypes } from '../action-types/conversation';
import { Conversation } from '../../models/conversation';
import { ConversationPreview } from '../../models/conversation-preview';

export class CreateNewConversation implements Action {
    public readonly type: string = ConversationActionTypes.CREATE_NEW_CONVERSATION;

    constructor() {
    }
}

export class LoadConversationByConversationPreview implements Action {
    public readonly type: string = ConversationActionTypes.LOAD_CONVERSATION_BY_CONVERSATION_PREVIEW;

    constructor(public payload: ConversationPreview) {
    }
} 

export class LoadConversationByConversationPreviewSuccess implements Action {
    public readonly type: string = ConversationActionTypes.LOAD_CONVERSATION_BY_CONVERSATION_PREVIEW_SUCCESS;

    constructor(public payload: Conversation) {
    }

}

export class LoadConversationByConversationPreviewError implements Action {
    public readonly type: string = ConversationActionTypes.LOAD_CONVERSATION_BY_CONVERSATION_PREVIEW_ERROR;

}
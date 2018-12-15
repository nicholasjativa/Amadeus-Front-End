import { Action } from '@ngrx/store';
import { ConversationPreviewActionTypes } from '../action-types/conversation-preview';
import { ConversationPreview } from '../../models/conversation-preview';

export class LoadAllConversationPreviews implements Action {
    public readonly type: string = ConversationPreviewActionTypes.LOAD_ALL_CONVERSATION_PREVIEWS;

    constructor() {}
}

export class LoadAllConversationPreviewsSuccess implements Action {
    public readonly type: string = ConversationPreviewActionTypes.LOAD_ALL_CONVERSATION_PREVIEWS_SUCCESS;

    constructor(public payload: any) {}
}

export class LoadAllConversationPreviewsError implements Action {
    public readonly type: string = ConversationPreviewActionTypes.LOAD_ALL_CONVERSATION_PREVIEWS_ERROR;
    
    constructor(public payload: any) {}
}

export class ReceivedConversationPreview implements Action {
    public readonly type: string = ConversationPreviewActionTypes.RECEIVED_CONVERSATION_PREVIEW;

    constructor(public payload: ConversationPreview) {
    }
}

export class SetCurrentlySelectedConversationPreview implements Action {
    public readonly type: string = ConversationPreviewActionTypes.SET_CURRENTLY_SELECTED_CONVERSATION_PREVIEW;

    constructor(public payload: ConversationPreview) {
    }
}
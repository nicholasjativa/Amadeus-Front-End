import { Action } from '@ngrx/store';
import { MessageActionTypes } from '../action-types/messages';

export class LoadMessagesById implements Action {
    public readonly type: string = MessageActionTypes.LOAD_MESSAGES;

    constructor(payload: string) {
    }
} 

export class LoadMessagesByIdSuccess implements Action {
    public readonly type: string = MessageActionTypes.LOAD_MESSAGES_SUCCESS;

}

export class LoadMessagesByIdError implements Action {
    public readonly type: string = MessageActionTypes.LOAD_MESSAGES_ERROR;

}
import { Action } from '@ngrx/store';
import { MessageActionTypes } from '../action-types/messages.action-types';

export class LoadMessagesByIdAction implements Action {
    public readonly type: string = MessageActionTypes.LOAD_MESSAGES;

    constructor(payload: string) {
    }
} 

export class LoadMessagesByIdSuccessAction implements Action {
    public readonly type: string = MessageActionTypes.LOAD_MESSAGES_SUCCESS;

}

export class LoadMessagesByIdErrorAction implements Action {
    public readonly type: string = MessageActionTypes.LOAD_MESSAGES_ERROR;

}
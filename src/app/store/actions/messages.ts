import { Action } from '@ngrx/store';
import { MessageActionTypes } from '../action-types/messages';
import { Message } from '../../models/message';

export class LoadMessagesByThread implements Action {
    public readonly type: string = MessageActionTypes.LOAD_MESSAGES_BY_THREAD;

    constructor(public payload: string) {
    }
} 

export class LoadMessagesByThreadSuccess implements Action {
    public readonly type: string = MessageActionTypes.LOAD_MESSAGES_BY_THREAD_SUCCESS;

    constructor(public payload: Message[]) {
    }

}

export class LoadMessagesByThreadError implements Action {
    public readonly type: string = MessageActionTypes.LOAD_MESSAGES_BY_THREAD_ERROR;

}
import { Action } from '@ngrx/store';
import { MessageActionTypes } from '../action-types/messages';

export class LoadMessagesbyPhoneNumber implements Action {
    public readonly type: string = MessageActionTypes.LOAD_MESSAGES_BY_PHONE_NUMBER;

    constructor(payload: string) {
    }
} 

export class LoadMessagesbyPhoneNumberSuccess implements Action {
    public readonly type: string = MessageActionTypes.LOAD_MESSAGES_BY_PHONE_NUMBER_SUCCESS;

}

export class LoadMessagesbyPhoneNumberError implements Action {
    public readonly type: string = MessageActionTypes.LOAD_MESSAGES_BY_PHONE_NUMBER_ERROR;

}
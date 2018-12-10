import { Action } from '@ngrx/store';
import { AndroidMessagesActionTypes } from '../action-types/androidMessages';
import { AndroidMessage } from '../../models/androidMessage';

export class ReceivedAndroidMessage implements Action {
    public readonly type: string = AndroidMessagesActionTypes.RECEIVED_ANDROID_MESSAGE;

    constructor(public payload: AndroidMessage) {
    }
}
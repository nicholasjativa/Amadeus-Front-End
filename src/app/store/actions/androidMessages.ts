import { Action } from '@ngrx/store';
import { AndroidMessagesActionTypes } from '../action-types/androidMessages';
import { AndroidMessage } from '../../models/androidMessage';
import { AmadeusMessageStatus } from '../../models/amadeusMessageStatus';

export class ReceivedAndroidMessage implements Action {
    public readonly type: string = AndroidMessagesActionTypes.RECEIVED_ANDROID_MESSAGE;

    constructor(public payload: AndroidMessage) {
    }
}

export class ReceivedAmadeusMessageStatus implements Action {
    public readonly type: string = AndroidMessagesActionTypes.RECEIVED_AMADEUS_MESSAGE_STATUS;

    constructor(public payload: AmadeusMessageStatus) {
    }
}

export class AndroidReceivedAmadeusMessage implements Action {
    public readonly type: string = AndroidMessagesActionTypes.ANDROID_RECEIVED_AMADEUS_MESSAGE;

    constructor(public payload: AmadeusMessageStatus) {
    }
}
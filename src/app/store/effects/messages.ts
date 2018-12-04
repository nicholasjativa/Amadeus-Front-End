import { Injectable } from "@angular/core";
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { MessageActionTypes } from '../action-types/messages';


@Injectable()
export class MessagesEffects {

    constructor(
        private actions$: Actions
    ) {
    }

    @Effect()
    public loadMessagesByPhoneNumber: Observable<Action> = this.actions$
        .ofType<any>(MessageActionTypes.LOAD_MESSAGES_BY_PHONE_NUMBER)
        .map(action => action.payload)
        .switchMap((phoneNumber) => {
            console.log(phoneNumber);
            return [];
        });
}
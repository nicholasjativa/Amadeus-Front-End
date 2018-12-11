import { Injectable } from "@angular/core";
import { MessagesService } from '../../shared/services/messages.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AndroidMessagesActionTypes } from '../action-types/androidMessages';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { AmadeusMessage } from '../../models/amadeusMessage';
import * as AndroidMessagesActions from '../actions/androidMessages';

@Injectable()
export class AndroidMessagesEffects {

    constructor(private actions$: Actions, private ms: MessagesService) {
    }

    @Effect()
    public sendAmadeusMessage: Observable<Action> = this.actions$
        .pipe(
            ofType<any>(AndroidMessagesActionTypes.SEND_AMADEUS_MESSAGE),
            map(action => action.payload),
            switchMap((message: AmadeusMessage) => {
                
                return this.ms.sendMessageToServer(message)
                    .pipe(
                      map(res => new AndroidMessagesActions.SendAmadeusMessageSuccess(res)),
                      catchError(err => [new AndroidMessagesActions.SendAmadeusMessageError(err)])
                    );
            })
        );
}
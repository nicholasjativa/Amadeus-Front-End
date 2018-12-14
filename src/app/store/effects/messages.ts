import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action, Store, select } from '@ngrx/store';
import { MessageActionTypes } from '../action-types/messages';
import * as MessageActions from '../actions/messages';
import { MessagesService } from '../../shared/services/messages.service';
import { Thread } from '../../models/thread';
import { Message } from '../../models/message';
import { Conversation } from '../../models/conversation';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AmadeusState, selectMessagesState } from '../reducers/root';
import { MessagesState } from '../reducers/messages';


@Injectable()
export class MessagesEffects {

    constructor(
        private actions$: Actions,
        private messagesService: MessagesService,
        private store$: Store<AmadeusState>
    ) {
    }

    @Effect()
    public loadMessagesByThread: Observable<Action> = this.actions$
        .pipe(
            ofType<any>(MessageActionTypes.LOAD_MESSAGES_BY_THREAD),
            map(action => action.payload),
            withLatestFrom(this.store$.pipe(select(selectMessagesState))),
            switchMap(([payload, state]) => {

                const phoneNumber: string = payload.address;
                const existingConversation = state.conversations[phoneNumber];

                if (!existingConversation) {
                    
                    return this.messagesService.getMessages(phoneNumber)
                    .pipe(
                        map((conversation: Conversation) => new MessageActions.LoadMessagesByThreadSuccess(conversation))
                    );

                } else {
                    return [new MessageActions.LoadMessagesByThreadSuccess(existingConversation)];
                }
                
            })

        );
}
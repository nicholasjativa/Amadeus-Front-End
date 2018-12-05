import { Injectable } from "@angular/core";
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { MessageActionTypes } from '../action-types/messages';
import * as MessageActions from '../actions/messages';
import { MessagesService } from '../../shared/services/messages.service';
import { Thread } from '../../models/thread';
import { Message } from '../../models/message';
import { Conversation } from '../../models/conversation';


@Injectable()
export class MessagesEffects {

    constructor(
        private actions$: Actions,
        private messagesService: MessagesService
    ) {
    }

    @Effect()
    public loadMessagesByThread: Observable<Action> = this.actions$
        .ofType<any>(MessageActionTypes.LOAD_MESSAGES_BY_THREAD)
        .map(action => action.payload)
        .switchMap((thread: Thread) => {
            
            const phoneNumber: string = thread.address;

            return this.messagesService.getMessages(phoneNumber)
                .map((conversation: Conversation) => new MessageActions.LoadMessagesByThreadSuccess(conversation));
        });
}
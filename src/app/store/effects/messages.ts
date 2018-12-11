import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { MessageActionTypes } from '../action-types/messages';
import * as MessageActions from '../actions/messages';
import { MessagesService } from '../../shared/services/messages.service';
import { Thread } from '../../models/thread';
import { Message } from '../../models/message';
import { Conversation } from '../../models/conversation';
import { map, switchMap } from 'rxjs/operators';


@Injectable()
export class MessagesEffects {

    constructor(
        private actions$: Actions,
        private messagesService: MessagesService
    ) {
    }

    @Effect()
    public loadMessagesByThread: Observable<Action> = this.actions$
        .pipe(
            ofType<any>(MessageActionTypes.LOAD_MESSAGES_BY_THREAD),
            map(action => action.payload),
            switchMap((thread: Thread) => {
            
                const phoneNumber: string = thread.address;
    
                return this.messagesService.getMessages(phoneNumber)
                    .pipe(
                        map((conversation: Conversation) => new MessageActions.LoadMessagesByThreadSuccess(conversation))
                    );
            })
        );
}
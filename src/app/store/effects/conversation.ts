import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action, Store, select } from '@ngrx/store';
import { ConversationActionTypes } from '../action-types/conversation';
import * as ConversationActions from '../actions/conversation';
import { MessagesService } from '../../shared/services/messages.service';
import { Thread } from '../../models/thread';
import { Message } from '../../models/message';
import { Conversation } from '../../models/conversation';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AmadeusState, selectConversationsState } from '../reducers/root';
import { ConversationsState } from '../reducers/conversation';


@Injectable()
export class ConversationsEffects {

    constructor(
        private actions$: Actions,
        private messagesService: MessagesService,
        private store$: Store<AmadeusState>
    ) {
    }

    @Effect()
    public loadMessagesByThread: Observable<Action> = this.actions$
        .pipe(
            ofType<any>(ConversationActionTypes.LOAD_CONVERSATION_BY_THREAD),
            map(action => action.payload),
            withLatestFrom(this.store$.pipe(select(selectConversationsState))),
            switchMap(([payload, state]) => {

                const phoneNumber: string = payload.address;
                const existingConversation = state.conversations[phoneNumber];

                if (!existingConversation) {
                    
                    return this.messagesService.getMessages(phoneNumber)
                    .pipe(
                        map((conversation: Conversation) => new ConversationActions.LoadConversationByThreadSuccess(conversation))
                    );

                } else {
                    return [new ConversationActions.LoadConversationByThreadSuccess(existingConversation)];
                }
                
            })

        );
}
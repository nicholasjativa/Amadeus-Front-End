import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action, Store, select } from '@ngrx/store';
import { ConversationActionTypes } from '../action-types/conversation';
import * as ConversationActions from '../actions/conversation';
import { ConversationService } from '../../shared/services/conversation.service';
import { ConversationPreview } from '../../models/conversation-preview';
import { Message } from '../../models/message';
import { Conversation } from '../../models/conversation';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AmadeusState, selectConversationsState } from '../reducers/root';
import { ConversationsState } from '../reducers/conversation';


@Injectable()
export class ConversationsEffects {

    constructor(
        private actions$: Actions,
        private cs: ConversationService,
        private store$: Store<AmadeusState>
    ) {
    }

    @Effect()
    public loadConversationByConversationPreview: Observable<Action> = this.actions$
        .pipe(
            ofType<any>(ConversationActionTypes.LOAD_CONVERSATION_BY_CONVERSATION_PREVIEW),
            map(action => action.payload),
            withLatestFrom(this.store$.pipe(select(selectConversationsState))),
            switchMap(([payload, state]) => {

                const phoneNumber: string = payload.address;
                const existingConversation = state.conversations[phoneNumber];

                if (!existingConversation) {
                    
                    return this.cs.getConversationByPhoneNumber(phoneNumber)
                    .pipe(
                        map((conversation: Conversation) => new ConversationActions.LoadConversationByConversationPreviewSuccess(conversation))
                    );

                } else {
                    return [new ConversationActions.LoadConversationByConversationPreviewSuccess(existingConversation)];
                }
                
            })

        );
}
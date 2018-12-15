import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action, Store, select } from '@ngrx/store';
import { ConversationActionTypes } from '../action-types/conversation';
import * as ConversationActions from '../actions/conversation';
import * as ConversationPreviewActions from '../actions/conversation-preview';
import { ConversationService } from '../../shared/services/conversation.service';
import { Conversation } from '../../models/conversation';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AmadeusState, selectConversationsState } from '../reducers/root';
import { ConversationPreview } from '../../models/conversation-preview';


@Injectable()
export class ConversationsEffects {

    constructor(
        private actions$: Actions,
        private cs: ConversationService,
        private store$: Store<AmadeusState>
    ) {
    }

    @Effect()
    public createNewConversation: Observable<Action> = this.actions$
        .pipe(
            ofType<any>(ConversationActionTypes.CREATE_NEW_CONVERSATION),
            switchMap(() => {
                
                const blankPreview: ConversationPreview = {
                    address: '',
                    body: '',
                    name: 'New Message',
                    timestamp: '',
                    timeString: ''
                };

                return [new ConversationPreviewActions.AddBlankConversationPreview(blankPreview)];
            })
        )

    @Effect()
    public loadConversationByConversationPreview: Observable<Action> = this.actions$
        .pipe(
            ofType<any>(ConversationActionTypes.LOAD_CONVERSATION_BY_CONVERSATION_PREVIEW),
            map(action => action.payload),
            withLatestFrom(this.store$.pipe(select(selectConversationsState))),
            switchMap(([payload, state]) => {

                const phoneNumber: string = payload.address;
                const existingConversation = state.conversations[phoneNumber];

                if (!phoneNumber) {
                    
                    // this must be a 'New Message' that the user is creating
                    const blankConversation: Conversation = {
                        address: '',
                        messages: [],
                        name: ''
                    };

                    return [new ConversationActions.LoadConversationByConversationPreviewSuccess(blankConversation)];
                }

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
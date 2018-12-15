import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ConversationPreviewActionTypes } from '../action-types/conversation-preview';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { ThreadsService } from '../../shared/services/threads.service';
import * as ConversationActions from '../actions/conversation';
import * as ConversationPreviewActions from '../actions/conversation-preview';
import { Thread } from '../../models/thread';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class ConversationPreviewEffects {

    constructor(
        private actions$: Actions,
        private threads: ThreadsService
    ) {
    }

    @Effect()
    public loadAllConversationPreviews: Observable<Action> = this.actions$
        .pipe(
            ofType<any>(ConversationPreviewActionTypes.LOAD_ALL_CONVERSATION_PREVIEWS),
            switchMap(() => {

                return this.threads.getThreads()
                    .pipe(
                        map((threads: Thread[]) => {

                            return new ConversationPreviewActions.LoadAllConversationPreviewsSuccess(threads);
                        }),
                        catchError((error) => {
    
                            return [new ConversationPreviewActions.LoadAllConversationPreviewsError(error)]
                        })
                    );
                    
            })
        );

    @Effect()
    public setCurrentlySelectedThread: Observable<Action> = this.actions$
        .pipe(
            ofType<any>(ConversationPreviewActionTypes.SET_CURRENTLY_SELECTED_CONVERSATION_PREVIEW),
            map(action => action.payload),
            switchMap((thread: Thread) => {

                return [new ConversationActions.LoadConversationByThread(thread)];
            })
        );
}
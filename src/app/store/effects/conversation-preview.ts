import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ConversationPreviewActionTypes } from '../action-types/conversation-preview';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { ConversationPreviewService } from '../../shared/services/conversation-preview.service';
import * as ConversationActions from '../actions/conversation';
import * as ConversationPreviewActions from '../actions/conversation-preview';
import { ConversationPreview } from '../../models/conversation-preview';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class ConversationPreviewEffects {

    constructor(
        private actions$: Actions,
        private conversationPreviewService: ConversationPreviewService
    ) {
    }

    @Effect()
    public loadAllConversationPreviews: Observable<Action> = this.actions$
        .pipe(
            ofType<any>(ConversationPreviewActionTypes.LOAD_ALL_CONVERSATION_PREVIEWS),
            switchMap(() => {

                return this.conversationPreviewService.getConversationPreviews()
                    .pipe(
                        map((previews: ConversationPreview[]) => {

                            return new ConversationPreviewActions.LoadAllConversationPreviewsSuccess(previews);
                        }),
                        catchError((error) => {
    
                            return [new ConversationPreviewActions.LoadAllConversationPreviewsError(error)]
                        })
                    );
                    
            })
        );

    @Effect()
    public setCurrentlySelectedConversationPreview: Observable<Action> = this.actions$
        .pipe(
            ofType<any>(ConversationPreviewActionTypes.SET_CURRENTLY_SELECTED_CONVERSATION_PREVIEW),
            map(action => action.payload),
            switchMap((preview: ConversationPreview) => {

                return [new ConversationActions.LoadConversationByConversationPreview(preview)];
            })
        );
}
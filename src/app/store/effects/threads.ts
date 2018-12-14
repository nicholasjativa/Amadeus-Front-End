import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ThreadsActionTypes } from '../action-types/threads';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { ThreadsService } from '../../shared/services/threads.service';
import * as ConversationActions from '../actions/conversation';
import * as ThreadsActions from '../actions/threads';
import { Thread } from '../../models/thread';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class ThreadsEffects {

    constructor(
        private actions$: Actions,
        private threads: ThreadsService
    ) {
    }

    @Effect()
    public loadAllThreads: Observable<Action> = this.actions$
        .pipe(
            ofType<any>(ThreadsActionTypes.LOAD_ALL_THREADS),
            switchMap(() => {

                return this.threads.getThreads()
                    .pipe(
                        map((threads: Thread[]) => {

                            return new ThreadsActions.LoadAllThreadsSuccess(threads);
                        }),
                        catchError((error) => {
    
                            return [new ThreadsActions.LoadAllThreadsError(error)]
                        })
                    );
                    
            })
        );

    @Effect()
    public setCurrentlySelectedThread: Observable<Action> = this.actions$
        .pipe(
            ofType<any>(ThreadsActionTypes.SET_CURRENTLY_SELECTED_THREAD),
            map(action => action.payload),
            switchMap((thread: Thread) => {

                return [new ConversationActions.LoadConversationByThread(thread)];
            })
        );
}
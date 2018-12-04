import { Injectable } from "@angular/core";
import { Actions, Effect } from '@ngrx/effects';
import { ThreadsActionTypes } from '../action-types/threads';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { ThreadsService } from '../../shared/services/threads.service';
import * as ThreadsActions from '../actions/threads';
import { Thread } from '../../models/thread';

@Injectable()
export class ThreadsEffects {

    constructor(
        private actions$: Actions,
        private threads: ThreadsService
    ) {
    }

    @Effect()
    public loadAllThreads: Observable<Action> = this.actions$
        .ofType<any>(ThreadsActionTypes.LOAD_ALL_THREADS)
        .switchMap(() => {

            return this.threads.getThreads()
                .map((threads: Thread[]) => {

                    return new ThreadsActions.LoadAllThreadsSuccess(threads);
                })
                .catch((error) => {

                    return [new ThreadsActions.LoadAllThreadsError(error)]
                });
        });
}
import { Injectable } from "@angular/core";
import { Actions, Effect } from '@ngrx/effects';
import { AppActionTypes } from '../action-types/app';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { WebsocketService } from '../../shared/services/websocket.service';


@Injectable()
export class AppEffects {

    constructor(
        private actions$: Actions,
        private wss: WebsocketService
    ) {
    }

    @Effect()
    public openWebSocketConnection: Observable<Action> = this.actions$
        .ofType<any>(AppActionTypes.OPEN_WEBSOCKET_CONNECTION)
        .switchMap(() => {
            
            this.wss.initSocket();
            return [];
        });
}
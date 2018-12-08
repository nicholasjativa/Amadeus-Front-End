import { Action } from '@ngrx/store';
import { AppActionTypes } from '../action-types/app';

export class OpenWebSocketConnection implements Action {
    public readonly type: string = AppActionTypes.OPEN_WEBSOCKET_CONNECTION;
}

export class OpenWebSocketConnectionSuccess implements Action {
    public readonly type: string = AppActionTypes.OPEN_WEBSOCKET_CONNECTION_SUCCESS;
}

export class OpenWebSocketConnectionError implements Action {
    public readonly type: string = AppActionTypes.OPEN_WEBSOCKET_CONNECTION_ERROR;
}
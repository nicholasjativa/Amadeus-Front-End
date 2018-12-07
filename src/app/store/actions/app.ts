import { Action } from '@ngrx/store';
import { AppActionTypes } from '../action-types/app';

export class WebSocketConnectionOpen implements Action {
    public readonly type: string = AppActionTypes.WEBSOCKET_CONNECTION_OPEN;
}

export class WebSocketConnectionOpenSuccess implements Action {
    public readonly type: string = AppActionTypes.WEBSOCKET_CONNECTION_OPEN_SUCCESS;
}

export class WebSocketConnectionOpenError implements Action {
    public readonly type: string = AppActionTypes.WEBSOCKET_CONNECTION_OPEN_ERROR;
}
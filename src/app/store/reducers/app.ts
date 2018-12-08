import { AppActionTypes } from '../action-types/app';

export interface AppState {
    socket: SocketIOClient.Socket,
    socketConnecting: boolean,
    socketConnected: boolean
}

export const initialState: AppState = {
    socket: undefined,
    socketConnecting: false,
    socketConnected: true
}

export function appReducer(state: AppState = initialState, action) {

    switch (action.type) {

        case AppActionTypes.OPEN_WEBSOCKET_CONNECTION_SUCCESS: {

            const socket: SocketIOClient.Socket = action.payload.socket;

            return { ...state, socket }
        }
    }
}
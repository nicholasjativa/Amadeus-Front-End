import { AppActionTypes } from '../action-types/app';
import { AmadeusState } from './root';
import { createFeatureSelector } from '@ngrx/store';

export interface AppState {
    socket: SocketIOClient.Socket,
    socketConnecting: boolean,
    socketConnected: boolean
}

export const initialState: AppState = {
    socket: undefined,
    socketConnecting: false,
    socketConnected: false
}

export const selectAppState = createFeatureSelector<AmadeusState, AppState>('app');

export function appReducer(state: AppState = initialState, action) {

    switch (action.type) {

        case AppActionTypes.OPEN_WEBSOCKET_CONNECTION_SUCCESS: {

            // const socket: SocketIOClient.Socket = action.payload.socket;

            return { ...state, socketConnecting: false, socketConnected: true }
        }

        case AppActionTypes.OPEN_WEBSOCKET_CONNECTION_ERROR: {

            return { ...state, socketConnecting: false, socketConnected: false }
        }

        default:

            return state;
    }
}
import { Action } from '@ngrx/store';
import { ThreadsActionTypes } from '../action-types/threads';
import { Thread } from '../../models/thread';

export interface ThreadsState {
    threads: Thread[],
    currentlySelectedThreadId: string,
    loaded: boolean,
    loading: boolean
}

export const initialState: ThreadsState = {
    threads: [],
    currentlySelectedThreadId: "",
    loaded: false,
    loading: false
};

export function threadsReducer(state: ThreadsState = initialState, action): ThreadsState {

    switch(action.type) {

        case ThreadsActionTypes.LOAD_ALL_THREADS: {

            return { ...state, loaded: false, loading: true };
        }

        case ThreadsActionTypes.LOAD_ALL_THREADS_SUCCESS: {

            const threads: Thread[] = action.payload;

            return { ...state, threads, loaded: true, loading: false }
        }
    }
}
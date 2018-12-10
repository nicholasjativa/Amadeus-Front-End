import { Action } from '@ngrx/store';
import { ThreadsActionTypes } from '../action-types/threads';
import { Thread } from '../../models/thread';

export interface ThreadsState {
    threads: Thread[],
    currentlySelectedThread: Thread,
    loaded: boolean,
    loading: boolean
}

export const initialState: ThreadsState = {
    threads: [],
    currentlySelectedThread: undefined,
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

        case ThreadsActionTypes.RECEIVED_THREAD_MESSAGE: {
            // this case may not be needed, depending on whether we let
            // other actions (which give us this info) perform the updating of the sidebar

            const preview: Thread = action.payload;
            // we may want to use an object for state.threads for easier access
            let threads = state.threads;
            let pos = threads.findIndex((thread: Thread) => thread.address === preview.address);

            if (pos > -1) {
                threads.splice(pos, 1, preview);
            } else {
                threads.unshift(preview);
            }

            return { ...state, threads };
        }

        case ThreadsActionTypes.SET_CURRENTLY_SELECTED_THREAD: {

            const thread: Thread = action.payload;
            const currentlySelectedThread: Thread = thread;
            
            return { ...state, currentlySelectedThread };
        }

        default:
            
            return state;
    }
}
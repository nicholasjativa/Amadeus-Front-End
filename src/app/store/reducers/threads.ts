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

    switch (action.type) {

        case ThreadsActionTypes.LOAD_ALL_THREADS: {

            return { ...state, loaded: false, loading: true };
        }

        case ThreadsActionTypes.LOAD_ALL_THREADS_SUCCESS: {

            // TODO adding the timeString in the reducer (as opposed to an effect)
            // may not be practice; research
            const threads: Thread[] = action.payload;
            addTimeString(threads);

            return { ...state, threads, loaded: true, loading: false }
        }

        case ThreadsActionTypes.RECEIVED_THREAD_MESSAGE: {
            // this case may not be needed, depending on whether we let
            // other actions (which give us this info) perform the updating of the sidebar

            const preview: Thread = action.payload;
            addTimeString([preview]);
            // we may want to use an object for state.threads for easier access
            let threads = state.threads;
            let pos = threads.findIndex((thread: Thread) => thread.address === preview.address);

            if (pos > -1) {
                threads.splice(pos, 1);
                threads.unshift(preview);
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

const addTimeString = (threads: Thread[]) => {
    const now: Date = new Date();
    const temp: Date = new Date();
    const temp1: Date = new Date();

    const oneWeekAgo: Date = new Date(temp1.setDate(temp1.getDate() - 7));
    const yesterday: Date = new Date(temp.setDate(temp.getDate() - 1));

    threads.forEach(thread => {

        const timestamp: number = parseInt(thread.timestamp);
        const date: Date = new Date(timestamp);

        if (now.toDateString() === date.toDateString()) {
            thread['timeString'] = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else if (yesterday.toDateString() === date.toDateString()) {
            thread['timeString'] = 'Yesterday';
        } else if (oneWeekAgo.getTime() > date.getTime()) {
            thread['timeString'] = date.toLocaleDateString([], { month: '2-digit', day: '2-digit', year: '2-digit' });
        } else {
            thread['timeString'] = date.toLocaleDateString([], { weekday: 'long' });
        }
    });
}
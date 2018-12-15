import { Action } from '@ngrx/store';
import { ConversationPreviewActionTypes } from '../action-types/conversation-preview';
import { Thread } from '../../models/thread';

export interface ConversationPreviewState {
    threads: Thread[],
    currentlySelectedThread: Thread,
    loaded: boolean,
    loading: boolean
}

export const initialState: ConversationPreviewState = {
    threads: [],
    currentlySelectedThread: undefined,
    loaded: false,
    loading: false
};

export function conversationPreviewReducer(state: ConversationPreviewState = initialState, action): ConversationPreviewState {

    switch (action.type) {

        case ConversationPreviewActionTypes.LOAD_ALL_CONVERSATION_PREVIEWS: {

            return { ...state, loaded: false, loading: true };
        }

        case ConversationPreviewActionTypes.LOAD_ALL_CONVERSATION_PREVIEWS_SUCCESS: {

            // TODO adding the timeString in the reducer (as opposed to an effect)
            // may not be practice; research
            const threads: Thread[] = action.payload;
            addTimeString(threads);

            return { ...state, threads, loaded: true, loading: false }
        }

        case ConversationPreviewActionTypes.RECEIVED_CONVERSATION_PREVIEW: {
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

        case ConversationPreviewActionTypes.SET_CURRENTLY_SELECTED_CONVERSATION_PREVIEW: {

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
            thread.timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else if (yesterday.toDateString() === date.toDateString()) {
            thread.timeString = 'Yesterday';
        } else if (oneWeekAgo.getTime() > date.getTime()) {
            thread.timeString = date.toLocaleDateString([], { month: '2-digit', day: '2-digit', year: '2-digit' });
        } else {
            thread.timeString = date.toLocaleDateString([], { weekday: 'long' });
        }
    });
}
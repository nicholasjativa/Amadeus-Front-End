import { ConversationPreviewActionTypes } from '../action-types/conversation-preview';
import { ConversationPreview } from '../../models/conversation-preview';

export interface ConversationPreviewState {
    conversationPreviews: ConversationPreview[],
    currentlySelectedConversationPreview: ConversationPreview,
    loaded: boolean,
    loading: boolean
}

export const initialState: ConversationPreviewState = {
    conversationPreviews: [],
    currentlySelectedConversationPreview: undefined,
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
            const conversationPreviews: ConversationPreview[] = action.payload;
            addTimeString(conversationPreviews);

            return { ...state, conversationPreviews, loaded: true, loading: false }
        }

        case ConversationPreviewActionTypes.RECEIVED_CONVERSATION_PREVIEW: {
            // this case may not be needed, depending on whether we let
            // other actions (which give us this info) perform the updating of the sidebar

            const preview: ConversationPreview = action.payload;
            addTimeString([preview]);
            // we may want to use an object for state.conversationPreviews for easier access
            let conversationPreviews = state.conversationPreviews;
            let pos = conversationPreviews.findIndex((conversationPreview: ConversationPreview) => conversationPreview.address === preview.address);

            if (pos > -1) {
                conversationPreviews.splice(pos, 1);
                conversationPreviews.unshift(preview);
            } else {
                conversationPreviews.unshift(preview);
            }

            return { ...state, conversationPreviews };
        }

        case ConversationPreviewActionTypes.SET_CURRENTLY_SELECTED_CONVERSATION_PREVIEW: {

            const conversationPreview: ConversationPreview = action.payload;
            const currentlySelectedConversationPreview: ConversationPreview = conversationPreview;

            return { ...state, currentlySelectedConversationPreview };
        }

        default:

            return state;
    }
}

const addTimeString = (conversationPreviews: ConversationPreview[]) => {
    const now: Date = new Date();
    const temp: Date = new Date();
    const temp1: Date = new Date();

    const oneWeekAgo: Date = new Date(temp1.setDate(temp1.getDate() - 7));
    const yesterday: Date = new Date(temp.setDate(temp.getDate() - 1));

    conversationPreviews.forEach(preview => {

        const timestamp: number = parseInt(preview.timestamp);
        const date: Date = new Date(timestamp);

        if (now.toDateString() === date.toDateString()) {
            preview.timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else if (yesterday.toDateString() === date.toDateString()) {
            preview.timeString = 'Yesterday';
        } else if (oneWeekAgo.getTime() > date.getTime()) {
            preview.timeString = date.toLocaleDateString([], { month: '2-digit', day: '2-digit', year: '2-digit' });
        } else {
            preview.timeString = date.toLocaleDateString([], { weekday: 'long' });
        }
    });
}
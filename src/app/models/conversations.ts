import { Conversation } from './conversation';

export interface Conversations {
    [address: string]: Conversation;
}
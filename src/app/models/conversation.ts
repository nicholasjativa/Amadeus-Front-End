import { Message } from './message';

export interface Conversation {
    name: string;
    messages: Message[],
    address: string
}
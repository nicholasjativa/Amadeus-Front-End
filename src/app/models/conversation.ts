import { Message } from './message';
import { AndroidMessage } from './androidMessage';

export interface Conversation {
    name: string;
    messages: (Message | AndroidMessage)[], // TODO see if this needs to be modified to only accept one
    address: string
}
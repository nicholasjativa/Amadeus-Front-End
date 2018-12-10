import { Message } from './message';
import { AndroidMessage } from './androidMessage';
import { AmadeusMessageStatus } from './amadeusMessageStatus';

export interface Conversation {
    name: string;
    messages: (Message | AndroidMessage | AmadeusMessageStatus)[], // TODO see if this needs to be modified to only accept one
    address: string
}
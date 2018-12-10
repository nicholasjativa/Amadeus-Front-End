import { Action } from '@ngrx/store';
import { ThreadsActionTypes } from '../action-types/threads';
import { Thread } from '../../models/thread';

export class LoadAllThreads implements Action {
    public readonly type: string = ThreadsActionTypes.LOAD_ALL_THREADS;

    constructor() {}
}

export class LoadAllThreadsSuccess implements Action {
    public readonly type: string = ThreadsActionTypes.LOAD_ALL_THREADS_SUCCESS;

    constructor(public payload: any) {}
}

export class LoadAllThreadsError implements Action {
    public readonly type: string = ThreadsActionTypes.LOAD_ALL_THREADS_ERROR;
    
    constructor(public payload: any) {}
}

export class ReceivedThreadMessage implements Action {
    public readonly type: string = ThreadsActionTypes.RECEIVED_THREAD_MESSAGE;

    constructor(public payload: Thread) {
    }
}
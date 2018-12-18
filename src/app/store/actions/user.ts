import { Action } from '@ngrx/store';
import { UserActionTypes } from '../action-types/user';
import { User } from '../../models/user';

export class UserSignIn implements Action {
    public readonly type: string = UserActionTypes.SIGN_IN;

    constructor(public payload: { emailAddress: string, password: string }) {}
}

export class UserSignInSuccess implements Action {
    public readonly type: string = UserActionTypes.SIGN_IN_SUCCESS;

    constructor(public payload: User) {}
}

export class UserSignInError implements Action {
    public readonly type: string = UserActionTypes.SIGN_IN_ERROR;

    constructor(public payload: {}) {}
}

export class AttemptUserAuth implements Action {
    public readonly type: string = UserActionTypes.ATTEMPT_AUTH

    constructor() {}
}
import { Action } from '@ngrx/store';
import { UserActionTypes } from '../action-types/user';
import { User } from '../../models/user';
import { AccountCreationData } from 'src/app/models/accountCreationData';

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

export class CreateNewAccount implements Action {
    public readonly type: string = UserActionTypes.CREATE_NEW_ACCOUNT;

    constructor(public payload: AccountCreationData) {}
}

export class CreateNewAccountSuccess implements Action {
    public readonly type: string = UserActionTypes.CREATE_NEW_ACCOUNT_SUCCESS;
}

export class CreateNewAccountError implements Action {
    public readonly type: string = UserActionTypes.CREATE_NEW_ACCOUNT_ERROR;

    constructor(public payload: any) {}
}
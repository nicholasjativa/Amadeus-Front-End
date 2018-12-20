import { UserActionTypes } from '../action-types/user';
import { User } from '../../models/user';

export interface UserState {
    accountCreationLoading: boolean;
    accountCreationSuccess: boolean;
    accountCreationError: boolean;
    isAuthenticated: boolean;
    user: User;
}

export const initialState: UserState = {
    accountCreationLoading: false,
    accountCreationSuccess: false,
    accountCreationError: false,
    isAuthenticated: false,
    user: { id: undefined, emailAddress: "", phoneNumber: "" }
};

export function userReducer(state: UserState = initialState, action): UserState {

    switch(action.type) {

        case UserActionTypes.SIGN_IN_SUCCESS: {

            return {
                ...state,
                isAuthenticated: true,
                user: {
                    emailAddress: action.payload.emailAddress,
                    id: action.payload.id,
                    phoneNumber: '6313360360' // TODO this needs to come from the login endpoint
                }
            }
        }

        case UserActionTypes.CREATE_NEW_ACCOUNT: {

            return { ...state, accountCreationLoading: true }
        }

        case UserActionTypes.CREATE_NEW_ACCOUNT_SUCCESS: {

            return { ...state, accountCreationLoading: false, accountCreationSuccess: true }
        }

        default:
        
            return state;
    }
}
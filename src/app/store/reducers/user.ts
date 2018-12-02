import { UserActionTypes } from '../action-types/user';
import { User } from '../../models/user';

export interface UserState {
    isAuthenticated: boolean;
    user: User | null;
}

export const initialState: UserState = {
    isAuthenticated: false,
    user: null
};

export function userReducer(state: UserState = initialState, action): UserState {

    switch(action.type) {

        case UserActionTypes.SIGN_IN_SUCCESS: {

            return {
                ...state,
                isAuthenticated: true,
                user: {
                    emailAddress: action.payload.emailAddress,
                    id: action.payload.id
                }
            }
        }

        default:
        
            return state;
    }
}
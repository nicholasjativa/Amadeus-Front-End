import { UserActionTypes } from '../action-types/user';
import { User } from '../../models/user';

export interface UserState {
    isAuthenticated: boolean;
    user: User;
}

export const initialState: UserState = {
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

        default:
        
            return state;
    }
}
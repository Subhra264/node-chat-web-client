import { Reducer } from "redux";
import { AUTHENTICATE_USER, SIGN_OUT, Action, UserAction } from "../actions/User.actions";

const initialUserState = null;

const UserReducer: Reducer<string | null, Action> = (state: null | string = initialUserState, action: Action) => {
    switch(action.type) {
        case AUTHENTICATE_USER: 
            return (action as UserAction).payload;
        case SIGN_OUT: 
            return null;
        default:
            return state;
    }
}

export default UserReducer;
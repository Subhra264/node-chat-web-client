import { Reducer } from "redux";
import { MANAGE_USER, Action, UserAction } from "../actions/User.actions";

const initialUserState = null;

const UserReducer: Reducer<string | null, Action> = (state: null | string = initialUserState, action: Action) => {
    switch(action.type) {
        case MANAGE_USER: 
            return (action as UserAction).payload;
        default:
            return state;
    }
}

export default UserReducer;
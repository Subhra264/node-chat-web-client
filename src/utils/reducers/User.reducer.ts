import { AUTHENTICATE_USER, SIGN_OUT } from "../actions/User.actions";

const initialUserState = null;

export default function UserReducer(state: null | string = initialUserState, action: any) {
    switch(action.type) {
        case AUTHENTICATE_USER: 
            return action.payload;
        case SIGN_OUT: 
            return null;
        default:
            return state;
    }
}
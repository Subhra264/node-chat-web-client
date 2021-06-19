export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
export const SIGN_OUT = 'SIGN_OUT';

export interface Action {
    type: string;
}

export interface UserAction extends Action{
    payload: string;
}

export function authenticateUser(payload: string): UserAction {
    return {
        type: AUTHENTICATE_USER,
        payload
    };
}

export function signOut(): Action {
    return {
        type: SIGN_OUT,
    };
}
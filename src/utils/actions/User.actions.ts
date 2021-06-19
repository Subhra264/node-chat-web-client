export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
export const SIGN_OUT = 'SIGN_OUT';

export function authenticateUser(payload: string) {
    return {
        type: AUTHENTICATE_USER,
        payload
    };
}

export function signOut() {
    return {
        type: SIGN_OUT
    };
}
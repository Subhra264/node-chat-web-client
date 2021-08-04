export const MANAGE_USER = 'MANAGE_USER';
// export const SIGN_OUT = 'SIGN_OUT';

export interface Action {
    type: string;
}

export interface UserAction extends Action{
    payload: string | null;
}

export function manageUser(payload: string | null): UserAction {
    return {
        type: MANAGE_USER,
        payload
    };
}

// export function signOut(): Action {
//     manageUser(null);
//     return {
//         type: 'SIGN_OUT',
//     };
// }
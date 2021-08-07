import { User } from "../reducers/User.reducer";

export const MANAGE_USER = 'MANAGE_USER';

export interface Action {
    type: string;
}

export interface UserAction extends Action{
    payload: User | null;
}

export function manageUser(payload: User | null): UserAction {
    return {
        type: MANAGE_USER,
        payload
    };
}

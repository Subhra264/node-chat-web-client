import { Reducer } from 'redux';
import { MANAGE_USER, Action, UserAction } from '../actions/User.actions';

export interface User {
  userId: string;
  username: string;
  accessToken?: string;
}

const initialUserState = null;

const UserReducer: Reducer<User | null, Action> = (
  state: null | User = initialUserState,
  action: Action,
) => {
  switch (action.type) {
    case MANAGE_USER:
      return (action as UserAction).payload;
    default:
      return state;
  }
};

export default UserReducer;

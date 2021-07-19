import { User } from 'src/app/models/user';
import { UserActions, UserActionTypes } from '../actions/user.actions';

export const userFeatureKey = 'user';

export interface UserState {
  loggedIn: boolean;
  user: User;
}

export const initialUserState: UserState = {
  loggedIn: false,
  user: undefined
};

export function userReducer(state = initialUserState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionTypes.LoginAction:
      return {
        loggedIn: true,
        user: action.payload.user
      };

      case UserActionTypes.LogoutAction:
      return {
        loggedIn: false,
        user: undefined
      };
    default: return state;
  }
}


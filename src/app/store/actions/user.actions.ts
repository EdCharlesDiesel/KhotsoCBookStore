import { User } from '../../models/user';

import { Action } from '@ngrx/store';

export enum UserActionTypes {
  LoginAction = '[Login] Login Sucessfull',
  LogoutAction = '[Logout] Logout Sucessfull'
}

export class Login implements Action {
  readonly type = UserActionTypes.LoginAction;
  constructor(public payload: {user: User}) { }
}

export class Logout implements Action {
  readonly type = UserActionTypes.LogoutAction;
}

export type UserActions = Login | Logout;

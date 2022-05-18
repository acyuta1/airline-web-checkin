import {Action} from "@ngrx/store";

export const LOGIN_COMPLETE = 'LOGIN_COMPLETE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';


export class LoginComplete implements Action {
  public readonly type = LOGIN_COMPLETE;
  constructor(public payload: {email: string, idToken: string, isAdmin: boolean}) {
  }
}

export class LogoutRequest implements Action {
  public readonly type = LOGOUT_REQUEST;
  constructor() {
  }
}
export type AuthActions = LoginComplete | LogoutRequest;

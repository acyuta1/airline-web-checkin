import firebase from "firebase/compat";
import * as AuthActions from "./auth.actions";
import {User} from "../../shared/models/User";

export interface State {
  user: User;
}

const initialState: State = {
  user: null,
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.LOGIN_COMPLETE:
      let user = {...state.user}
      user.email = action.payload.email;
      user.token = action.payload.idToken;
      user.isAdmin = action.payload.isAdmin;
      return {
        ...state,
        user: user
      }

    case AuthActions.LOGOUT_REQUEST:
      return {
        ...state,
        user: null
      }
    default:
      return state;
  }
}

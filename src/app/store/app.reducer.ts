import * as fromPassengerList from "../passenger/store/passenger.reducer";
import * as fromSeatList from "../flight/flight/store/seats.reducer";
import * as fromAuth from "../auth/store/auth.reducer";
import {ActionReducerMap} from "@ngrx/store";

export interface AppState {
  passengers: fromPassengerList.State;
  seats: fromSeatList.State;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  passengers: fromPassengerList.passengerListReducer,
  seats: fromSeatList.seatsReducer,
  auth: fromAuth.authReducer
}

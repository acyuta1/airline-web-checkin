import * as FlightActions from "./flight.actions";
import {UPDATE_SERVICES} from "./flight.actions";
import {Flight} from "../../../shared/models/Flight";

export interface State {
  flight: Flight;
}

const initialState: State = {
  flight: null
}

export function flightReducer(state = initialState, action: FlightActions.FlightActions) {
  switch (action.type) {
    case FlightActions.SET_FLIGHT:
      return {
        ...state,
        flight: action.payload.flight
      }

    case UPDATE_SERVICES:
      let flight = {...state.flight, services: action.payload.services};
      return {
        ...state,
        flight: flight
      }
    default: {
      return state;
    }
  }
}

import {Action} from "@ngrx/store";
import {Passenger} from "../../../shared/models/Passenger";
import {Seat} from "../../../shared/models/Seat";
import {Flight} from "../../../shared/models/Flight";

export const SET_FLIGHT = 'SET_FLIGHT';
export const UPDATE_SERVICES = 'UPDATE_SERVICES';

export class SetFlight implements Action {
  public readonly type = SET_FLIGHT;
  constructor(public payload: {flight: Flight}) {
  }
}

export class UpdateServices implements Action {
  public readonly type = UPDATE_SERVICES;
  constructor(public payload: {services: string[]}) {
  }
}

export type FlightActions = SetFlight | UpdateServices;

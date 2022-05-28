import {Action} from "@ngrx/store";
import {Passenger} from "../../shared/models/Passenger";

export const CHECK_IN_PASSENGER = 'CHECK_IN_PASSENGER';
export const CHECK_OUT_PASSENGER = 'CHECK_OUT_PASSENGER';
export const EDIT_ANCILLARY = 'EDIT_ANCILLARY';
export const ADD_MEAL = 'ADD_MEAL';
export const ADD_PASSENGER = 'ADD_PASSENGER';
export const REPLACE_PASSENGERS = 'REPLACE_PASSENGERS';
export const UPDATE_MANDATORY = 'UPDATE_MANDATORY';

export class CheckInPassenger implements Action {
  public readonly type = CHECK_IN_PASSENGER;
  constructor(public payload: {seatNumber: string, passengerId: number, selectedFlight: string}) {
  }
}

export class CheckOutPassenger implements Action {
  public readonly type = CHECK_OUT_PASSENGER;
  constructor(public payload: {passengerId: number}) {
  }
}

export class EditAncillary implements Action {
  public readonly type = EDIT_ANCILLARY;
  constructor(public payload: {passengerId: number, lounge: boolean, cabin: boolean}) {
  }
}

export class AddMeal implements Action {
  public readonly type = ADD_MEAL;
  constructor(public payload: {passengerId: number}) {
  }
}

export class AddPassenger implements Action {
  public readonly type = ADD_PASSENGER;
  constructor(public payload: {passenger: Passenger}) {
  }
}

export class ReplacePassengers implements Action {
  public readonly type = REPLACE_PASSENGERS;
  constructor(public payload: {passengers: Passenger[]}) {
  }
}

export class UpdatePassenger implements Action {
  public readonly type = UPDATE_MANDATORY;
  constructor(public payload: {passenger: Passenger}) {
  }
}

export type PassengerActions = CheckInPassenger | CheckOutPassenger | EditAncillary | AddMeal | AddPassenger | ReplacePassengers | UpdatePassenger;

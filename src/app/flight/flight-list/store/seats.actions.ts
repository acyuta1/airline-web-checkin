import {Action} from "@ngrx/store";
import {Passenger} from "../../../shared/models/Passenger";
import {Seat} from "../../../shared/models/Seat";

export const CHECK_IN_SEAT = 'CHECK_IN_SEAT';
export const CHECK_OUT_SEAT = 'CHECK_OUT_SEAT';
export const SET_SEATS = 'SET_SEATS';
export const UPDATE_SEAT = 'UPDATE_SEAT';

export class CheckInSeat implements Action {
  public readonly type = CHECK_IN_SEAT;
  constructor(public payload: {seatNumber: string, passenger: Passenger}) {
  }
}

export class CheckOutSeat implements Action {
  public readonly type = CHECK_OUT_SEAT;
  constructor(public payload: {seatNumber: string}) {
  }
}

export class SetSeats implements Action {
  public readonly type = SET_SEATS;
  constructor(public payload: {seats: Seat[]}) {
  }
}

export class UpdateSeat implements Action {
  public readonly type = UPDATE_SEAT;
  constructor(public payload: {seat: Seat}) {
  }
}
export type SeatActions = CheckInSeat | CheckOutSeat | SetSeats | UpdateSeat;

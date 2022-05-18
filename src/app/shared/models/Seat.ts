import {Passenger} from "./Passenger";

export class Seat {
  constructor(
    public seatsId: string = null,
    public flightId: number,
    public seatNo: number,
    public allocationSummary: {seatAlpha: string},
    public A: {num: string, allocated: boolean, wheelChair: boolean, allocatedTo: string, specialMeals: boolean, allocatedPassenger: Passenger},
    public B: {num: string, allocated: boolean, wheelChair: boolean, allocatedTo: string, specialMeals: boolean, allocatedPassenger: Passenger},
    public C: {num: string, allocated: boolean, wheelChair: boolean, allocatedTo: string, specialMeals: boolean, allocatedPassenger: Passenger},
    public D: {num: string, allocated: boolean, wheelChair: boolean, allocatedTo: string, specialMeals: boolean, allocatedPassenger: Passenger},
    public E: {num: string, allocated: boolean, wheelChair: boolean, allocatedTo: string, specialMeals: boolean, allocatedPassenger: Passenger},
    public F: {num: string, allocated: boolean, wheelChair: boolean, allocatedTo: string, specialMeals: boolean, allocatedPassenger: Passenger},
  ) {
  }
}

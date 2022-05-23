import {Seat} from "../../../shared/models/Seat";
import * as SeatActions from "./seats.actions";
import {Passenger} from "../../../shared/models/Passenger";

export interface State {
  seats: Seat[];
}

const initialState: State = {
  seats: getSeats()
}

export function seatsReducer(state = initialState, action: SeatActions.SeatActions) {
  switch (action.type) {
    case SeatActions.CHECK_IN_SEAT:
      return {
        ...state,
        seats: setSeat(action.payload.seatNumber.charAt(0), state, action.payload.seatNumber, action.payload.passenger)
      }
    case SeatActions.CHECK_OUT_SEAT:
      return {
        ...state,
        seats: setSeat(action.payload.seatNumber.charAt(0), state, action.payload.seatNumber, null)
      }
    case SeatActions.SET_SEATS:
      return {
        ...state,
        seats: [...action.payload.seats]
      }
    case SeatActions.UPDATE_SEAT:
      let seats = state.seats;
      let existingSeat = {
        ...seats.find(seat => seat.seatNo === action.payload.seat.seatNo && seat.seatsId === action.payload.seat.seatsId)
      };
      let seatsCopy = [...seats];
      seatsCopy = seatsCopy
        .map(seat => {
          if (seat.seatNo === existingSeat.seatNo) {
            return existingSeat;
          }
          return seat;
        })

      return {
        ...state,
        seats: seatsCopy
      }
    default: {
      return state;
    }
  }
}

function setSeat(seatId: string, state: State, seatNumber: string, passenger: Passenger): Seat[] {
  let filteredSeat = state.seats
    .filter((seat: Seat) => {
      if (seat[seatId].num === seatNumber) {
        return true;
      }
      return false;
    })
  if (filteredSeat.length > 0) {
    let seatRow = filteredSeat[0];
    let updatedSeat = {
      ...seatRow,
    }

    let seat = {...updatedSeat[seatId]};
    let isAllocated = passenger === null;
    if (!isAllocated) {
      seat.allocated = true;
      seat.allocatedTo = passenger.id;
      let seatAlpha = "";
      if (updatedSeat.allocationSummary?.seatAlpha) {
        seatAlpha = updatedSeat.allocationSummary.seatAlpha + "_" + seat.num;
      } else {
        seatAlpha = seat.num;
      }
      updatedSeat.allocationSummary = {seatAlpha: seatAlpha}
      seat.allocatedPassenger = passenger;
    } else {
      seat.allocated = null;
      seat.allocatedTo = null;

      let seatAlpha = updatedSeat.allocationSummary.seatAlpha;
      console.log("This is a test", seatId, seat)
      seatAlpha = seatAlpha.split("_")
        .filter(s => s !== seat.num).join("_")
      updatedSeat.allocationSummary = seatAlpha ? {seatAlpha: seatAlpha} : null;
      seat.allocatedPassenger = null;
    }
    updatedSeat[seatId] = seat;
    let updatedSeats = [...state.seats];
    updatedSeats = updatedSeats.map(
      s => {
        if (s[seatId].num === seatNumber) {
          s = updatedSeat
        }
        return s;
      }
    )
    return updatedSeats;
  }
}

function getSeats(): Seat[] {
  var seats: Seat[] = [];
  for (var i: number = 1; i < 16; i++) {
    let flight =
      new Seat(
        null,
        null,
        i,
        null,
        {
          num: `A${i}`,
          allocated: null,
          allocatedTo: null,
          wheelChair: false,
          specialMeals: false,
          allocatedPassenger: null
        }, {
          num: `B${i}`,
          allocated: null,
          allocatedTo: null,
          wheelChair: false,
          specialMeals: false,
          allocatedPassenger: null
        }, {
          num: `C${i}`,
          allocated: null,
          allocatedTo: null,
          wheelChair: false,
          specialMeals: false,
          allocatedPassenger: null
        }, {
          num: `D${i}`,
          allocated: null,
          allocatedTo: null,
          wheelChair: false,
          specialMeals: false,
          allocatedPassenger: null
        }, {
          num: `E${i}`,
          allocated: null,
          allocatedTo: null,
          wheelChair: false,
          specialMeals: false,
          allocatedPassenger: null
        }, {
          num: `F${i}`,
          allocated: null,
          allocatedTo: null,
          wheelChair: false,
          specialMeals: false,
          allocatedPassenger: null
        });
    seats.push(flight);
  }
  return seats;
}

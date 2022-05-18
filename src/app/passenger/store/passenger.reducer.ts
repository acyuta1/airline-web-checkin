import {Passenger, Preference} from "../../shared/models/Passenger";
import * as PassengerActions from "./passenger.actions";
import * as random_name from "node-random-name";

export interface State {
  passengers: Passenger[];
}

const initialState: State = {
  passengers: getPassengers()
}

export function passengerListReducer(state = initialState, action: PassengerActions.PassengerActions) {
  switch (action.type) {
    case PassengerActions.CHECK_IN_PASSENGER:
      let filteredPassenger = state.passengers
        .filter(p => p.id === action.payload.passengerId);

      if (filteredPassenger.length > 0) {
        let passenger = filteredPassenger[0];

        if (!passenger.allocatedSeat) {

          const updatedPassenger = {
            ...passenger,
            allocatedSeat: `${action.payload.selectedFlight}//${action.payload.seatNumber}`
          }
          let updatedPassengers = [...state.passengers];
          updatedPassengers = updatedPassengers.map(
            p => {
              if (p.id === updatedPassenger.id) {
                return updatedPassenger;
              }
              return p;
            }
          )
          return {
            ...state,
            passengers: updatedPassengers
          }
        }
      }
      return state;

    case PassengerActions.CHECK_OUT_PASSENGER:
      let passenger = state.passengers[action.payload.passengerId - 1];
      const updatedPassenger = {...passenger, allocatedSeat: null}
      let updatedPassengers = [...state.passengers];

      updatedPassengers = updatedPassengers.map(
        p => {
          if (p.id === updatedPassenger.id) {
            return updatedPassenger;
          }
          return p;
        }
      )
      return {
        ...state,
        passengers: updatedPassengers
      }
    case PassengerActions.EDIT_ANCILLARY:
      var selectedPassenger = {...state.passengers[action.payload.passengerId - 1]};

      selectedPassenger.ancillary = {lounge: action.payload.lounge, cabin: action.payload.cabin}

      var passengers = [...state.passengers];
      passengers = passengers.map(
        p => {
          if (p.id === selectedPassenger.id) {
            return selectedPassenger;
          }
          return p;
        }
      )
      return {
        ...state,
        passengers: passengers
      }

    case PassengerActions.ADD_MEAL:
      var selectedPassenger = {...state.passengers[action.payload.passengerId - 1]};
      selectedPassenger.specialMeals = true;

      var passengers = [...state.passengers];
      passengers = passengers.map(
        p => {
          if (p.id === selectedPassenger.id) {
            return selectedPassenger;
          }
          return p;
        }
      )
      return {
        ...state,
        passengers: passengers
      }

    case PassengerActions.ADD_PASSENGER:
      var passengers = [...state.passengers];
      let id = passengers.length + 1;
      let newPassenger = {...action.payload.passenger, id: id};
      passengers.push(newPassenger);

      console.log(passengers);
      return {
        ...state,
        passengers: passengers
      }
    case PassengerActions.REPLACE_PASSENGERS:
      var passengers = [...state.passengers];
      var existingPassengers = [ ...action.payload.passengers]

      existingPassengers.forEach(p => {
        passengers = passengers.map(i => {
          if (p.id === i.id) {
            let x = {...p};
            if (i.specialMeals) {
              x.specialMeals = true;
            }
            if (i.ancillary) {
              x.ancillary = i.ancillary;
            }
            return x;
          }
          return i;
        })
      })

      console.log(passengers);

      return {
        ...state,
        passengers: passengers
      }
    default: {
      return state;
    }
  }
}

function getPassengers(): Passenger[] {
  let passengers: Passenger[] = [];
  for (var i: number = 1; i <= 25; i++) {
    let preference = Preference.NORMAL;
    if (i % 5 === 0) {

      preference = ((Math.random() * 100) > 50) ? Preference.WHEELCHAIR : Preference.WITH_INFANT;
    }
    let ancillary = null;
    if (i % 7 === 0) {
      ancillary = {lounge: true, cabin: true};
    }
    passengers.push(new Passenger(i, random_name({random: Math.random}), preference, null, ancillary));
  }
  return passengers;
}

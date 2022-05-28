import {Passenger, Preference} from "../../shared/models/Passenger";
import * as PassengerActions from "./passenger.actions";
import * as random_name from "node-random-name";
import * as random_date from "random-date-generator";
import * as custom_id from "custom-id";

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


      return {
        ...state,
        passengers: passengers
      }
    case PassengerActions.UPDATE_MANDATORY:
      var passengers = [...state.passengers];

      var payloadPassenger = { ...passengers.find(p => p.id === action.payload.passenger.id) }

      console.log(payloadPassenger)
      passengers = passengers.map(p => {
        if (p.id === action.payload.passenger.id) {
          return action.payload.passenger;
        } return p;
      })

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
    let startDate = new Date(1990, 1, 1);
    let endDate = new Date(2021, 12, 31);
    let passenger = new Passenger(i, random_name({random: Math.random}), random_date.getRandomDateInRange(startDate, endDate) , custom_id({randomLength: 3}) ,preference, null, ancillary);

    if (i%2===0 && i%3===0) {
      passenger.DoB = null;
    } else if(i%2===0 && i%5===0) {
      passenger.aadharNumber = null;
    }
    passengers.push(passenger);
  }
  return passengers;
}

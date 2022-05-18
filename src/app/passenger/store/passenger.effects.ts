import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as PassengerActions from "../store/passenger.actions";
import {switchMap, withLatestFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import {environment} from "../../../environments/environment";
import {Seat} from "../../shared/models/Seat";
import {Passenger} from "../../shared/models/Passenger";
import {UpdateSeat} from "../../flight/flight/store/seats.actions";

@Injectable()
export class PassengerEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {
  }

  @Effect({dispatch: false})
  updateSeatAfterMealAllocation =
    this.actions$.pipe(
      ofType(PassengerActions.ADD_MEAL),
      withLatestFrom(this.store.select('passengers')),
      switchMap(([actionData, passengerState]) => {

        let passengerId: string = actionData['payload']['passengerId'];
        let passenger = passengerState.passengers.find(p => p.id == Number.parseInt(passengerId));

        console.log(passenger);
        if (passenger.allocatedSeat) {
          let seatArr = passenger.allocatedSeat.split("//");
          let flightId = seatArr[0];
          let seatNum = seatArr[1];
          let seatNumStr = seatNum.charAt(1);
          let seat: Seat;
          this.store.select('seats')
            .subscribe(state => {
              seat = state.seats.find(s => s.seatNo == Number.parseInt(seatNumStr));
            });
          let copySeatRow = {...seat};
          let copySeat = {...seat[seatNum[0]]};

          copySeat.specialMeals = true;
          let allocatedPassengerCopy = {...copySeat.allocatedPassenger}
          allocatedPassengerCopy.specialMeals = true;
          copySeat.allocatedPassenger = allocatedPassengerCopy;
          copySeatRow[seatNum[0]] = copySeat;

          this.store.dispatch(new UpdateSeat({seat: copySeatRow}));

          return this.http.put(`${environment.firebaseDb}/flights/${flightId}/seats/${seat.seatsId}/${seat.seatNo - 1}.json`,
            copySeatRow);
        }
        return new Promise(() => console.log());
      })
    );

  @Effect({dispatch: false})
  updateSeatAfterAncillaryAllocation =
    this.actions$.pipe(
      ofType(PassengerActions.EDIT_ANCILLARY),
      withLatestFrom(this.store.select('passengers')),
      switchMap(([actionData, passengerState]) => {

        let passengerId: string = actionData['payload']['passengerId'];
        let passenger: Passenger = passengerState.passengers.find(p => p.id == Number.parseInt(passengerId));
        console.log(passenger);
        if (passenger.ancillary && passenger.allocatedSeat) {
          let seatArr = passenger.allocatedSeat.split("//");
          let flightId = seatArr[0];
          let seatNum = seatArr[1];
          let seatNumStr = seatNum.charAt(1);
          let seat: Seat;
          this.store.select('seats')
            .subscribe(state => {
              seat = state.seats.find(s => s.seatNo == Number.parseInt(seatNumStr));
            });
          let copySeatRow = {...seat};
          let copySeat = {...seat[seatNum[0]]};

          copySeat.ancillary = passenger.ancillary;
          copySeatRow[seatNum[0]] = copySeat;

          this.store.dispatch(new UpdateSeat({seat: copySeatRow}));
          return this.http.put(`${environment.firebaseDb}/flights/${flightId}/seats/${seat.seatsId}/${seat.seatNo - 1}.json`,
            copySeatRow);
        }
        return new Promise(() => console.log());
      })
    );

  // @Effect({dispatch: false})
  // checkoutSeat = this.actions$.pipe(ofType(SeatActions.CHECK_OUT_SEAT),
  //   withLatestFrom(this.store.select('seats')),
  //   switchMap(([actionData, seatsState]) => {
  //     let seatNum: string = actionData['payload']['seatNumber'];
  //     let seatNumStr = seatNum.charAt(1);
  //     let seat = seatsState.seats.find(s => s.seatNo == Number.parseInt(seatNumStr));
  //     let idToken;
  //     this.store.select('auth')
  //       .subscribe(auth => idToken = auth.user.token);
  //     return this.http.put(`${environment.firebaseDb}/flights/${seat.flightId}/seats/${seat.seatsId}/${seat.seatNo - 1}.json`,
  //       seat);
  //   })
  // );

}

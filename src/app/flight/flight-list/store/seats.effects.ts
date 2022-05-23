import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as SeatActions from "./seats.actions";
import {switchMap, withLatestFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import * as fromApp from "../../../store/app.reducer";
import {environment} from "../../../../environments/environment";

@Injectable()
export class SeatsEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {
  }

  @Effect({dispatch: false})
  setSeat =
    this.actions$.pipe(
      ofType(SeatActions.CHECK_IN_SEAT),
      withLatestFrom(this.store.select('seats')),
      switchMap(([actionData, seatsState]) => {
        let seatNum: string = actionData['payload']['seatNumber'];
        let seatNumStr = seatNum.charAt(1);
        let seat = seatsState.seats.find(s => s.seatNo == Number.parseInt(seatNumStr));
        let idToken;
        this.store.select('auth')
          .subscribe(auth => idToken = auth.user.token);
        return this.http.put(`${environment.firebaseDb}/flights/${seat.flightId}/seats/${seat.seatsId}/${seat.seatNo - 1}.json`,
          seat);
      })
    );

  @Effect({dispatch: false})
  checkoutSeat = this.actions$.pipe(ofType(SeatActions.CHECK_OUT_SEAT),
    withLatestFrom(this.store.select('seats')),
    switchMap(([actionData, seatsState]) => {
      let seatNum: string = actionData['payload']['seatNumber'];
      let seatNumStr = seatNum.charAt(1);
      let seat = seatsState.seats.find(s => s.seatNo == Number.parseInt(seatNumStr));
      let idToken;
      this.store.select('auth')
        .subscribe(auth => idToken = auth.user.token);
      return this.http.put(`${environment.firebaseDb}/flights/${seat.flightId}/seats/${seat.seatsId}/${seat.seatNo - 1}.json`,
        seat);
    })
  );

}

import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as FlightActions from "./flight.actions";
import {switchMap, withLatestFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import * as fromApp from "../../../store/app.reducer";
import {environment} from "../../../../environments/environment";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {Flight} from "../../../shared/models/Flight";

@Injectable()
export class FlightEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>,
    private db: AngularFireDatabase
  ) {
  }

  @Effect({dispatch: false})
  setSeat =
    this.actions$.pipe(
      ofType(FlightActions.UPDATE_SERVICES),
      withLatestFrom(this.store.select('flight')),
      switchMap(([actionData, flightState]) => {
        let flight = flightState.flight;
        let fightList = this.db.list(`flights`)
        this.http.get(`${environment.firebaseDb}/flights/flight-list.json`)
          .subscribe(res => {
           let id =  Object.keys(res)[0]
             this.http.put(`${environment.firebaseDb}/flights/flight-list/${id}/flightList/${flight.id - 1}/services.json`, {services: flight.services})
               .subscribe(x => console.log(x))
          })

        return  this.db.list(`flights/flight-list`).valueChanges()
        // return this.http.put(`${environment.firebaseDb}/flights/flight-list/-N2kZfew1lnwX4uMlmgg/flightList/${flight.id - 1}/services.json`, {services: flight.services});
      })
    );
}

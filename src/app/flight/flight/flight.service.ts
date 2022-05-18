import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import {Seat} from "../../shared/models/Seat";
import {SetSeats} from "./store/seats.actions";

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private http: HttpClient, private store: Store<fromApp.AppState>) { }

  commitSeatsToDB(flightId: number, idToken: string): string {
    let id: string;
    this.http.get(`${environment.firebaseDb}/flights/${flightId}/seats.json`) // attach seats.json?auth=${idToken}
      .subscribe((res: Seat[]) => {
        if (!res) {
          let s: Seat[] = getSeats(flightId);
          this.http.post(`${environment.firebaseDb}/flights/${flightId}/seats.json`,
            s)
            .subscribe((res: string) => {
              id = res;
              s = s.map(i => {
                i.seatsId = id['name'];
                return i;
              });
              console.log(id);
              this.store.dispatch(new SetSeats({seats: s}));
            })
        }
        else
        {
          id = Object.keys(res)[0];
          let s = res[id];
          s = s.map(i => {
            i.seatsId = id;
            return i;
          });
          console.log(s)
          this.store.dispatch(new SetSeats({seats: s}));
        }
      })
    return id;
  }
}

function getSeats(flightId: number): Seat[] {
  var seats: Seat[] = [];
  for (var i: number = 1; i < 16; i++) {
    let flight =
      new Seat(
        null,
        flightId,
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

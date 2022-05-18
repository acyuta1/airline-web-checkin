import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {AddMeal, EditAncillary, ReplacePassengers} from "../store/passenger.actions";
import {AssignAncillaryPopupComponent} from "./assign-ancillary-popup/assign-ancillary-popup.component";
import {Passenger} from "../../shared/models/Passenger";
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import {SuccessComponent} from "../../shared/popup/success/success.component";
import {HttpClient} from "@angular/common/http";
import {Seat} from "../../shared/models/Seat";

@Injectable({
  providedIn: 'root'
})
export class PassengerService {

  checkInRequestInitiated = new Subject<{ passengerId: number }>();
  dialogRef: any;

  constructor(private dialog: MatDialog, private store: Store<fromApp.AppState>, private http: HttpClient) {
  }

  editAncillary(passenger: Passenger) {
    this.dialogRef = this.dialog.open(AssignAncillaryPopupComponent, {
      width: '445px',
      data: {
        header: 'Success',
        lounge: passenger.ancillary?.lounge,
        cabin: passenger.ancillary?.cabin,
        onConfirm: () => this.dialog.closeAll()
      },
      disableClose: true
    });
    this.dialogRef.afterClosed().subscribe((result) => {
      if (result?.res) {
        let ancillaryValues: string[] = result.res;
        if (ancillaryValues.length > 0) {
          this.store.dispatch(new EditAncillary({
            passengerId: passenger.id,
            lounge: ancillaryValues.includes("lounge"),
            cabin: ancillaryValues.includes('cabin')
          }));
        }
      }
    });
  }

  addSpecialMeal(passenger: Passenger) {
    this.store.dispatch(new AddMeal({passengerId: passenger.id}));
    this.dialogRef = this.dialog.open(SuccessComponent, {
      width: '445px',
      data: {
        header: 'Success',
        message: `Successfully Added Special Meal to Passenger - ${passenger.fullName}`,
        onConfirm: () => this.dialog.closeAll()
      },
      disableClose: true
    });
    this.dialogRef.afterClosed().subscribe(() => {
    });
  }

  passengerSync(seats: Seat[]) {
    let passengers: Passenger[] = [];
    seats.forEach(i => {
      if (i.allocationSummary) {
        let existingPassenger = i[i.allocationSummary.seatAlpha[0]]?.allocatedPassenger;
        if (existingPassenger) {
          passengers.push(new Passenger(existingPassenger.id, existingPassenger.fullName, existingPassenger.preference, `${i.flightId}//${i.allocationSummary.seatAlpha}`, existingPassenger.ancillary, existingPassenger.specialMeals))
        }
      }
    })

    if (passengers.length > 0) {
      this.store.dispatch(new ReplacePassengers({passengers: passengers}));
    }
  }
}

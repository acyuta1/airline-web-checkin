import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {AddMeal, EditAncillary, ReplacePassengers} from "../store/passenger.actions";
import {AssignAncillaryPopupComponent} from "./assign-ancillary-popup/assign-ancillary-popup.component";
import {Passenger, Preference} from "../../shared/models/Passenger";
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import {SuccessComponent} from "../../shared/popup/success/success.component";
import {HttpClient} from "@angular/common/http";
import {Seat} from "../../shared/models/Seat";
import * as random_date from "random-date-generator";
import * as custom_id from "custom-id";

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
        let allocationSummaryList = i.allocationSummary.seatAlpha.split("_");
        console.log("allocationSummaryList", allocationSummaryList)
        allocationSummaryList.forEach(alloS => {
          let existingPassenger = i[alloS[0]]?.allocatedPassenger;
          if (existingPassenger) {
            let startDate = new Date(1990, 1, 1);
            let endDate = new Date(2021, 12, 31);

            passengers.push(new Passenger(existingPassenger.id, existingPassenger.fullName, random_date.getRandomDateInRange(startDate, endDate),custom_id({}), existingPassenger.preference, `${i.flightId}//${alloS}`, existingPassenger.ancillary, existingPassenger.specialMeals))
          }
        })
      }
    })

    if (passengers.length > 0) {
      this.store.dispatch(new ReplacePassengers({passengers: passengers}));
    }
  }
}

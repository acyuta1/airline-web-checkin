import {Component} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";
import {ICellRendererParams} from "ag-grid-community";
import {MatDialog} from "@angular/material/dialog";
import {AllocateSeatPopupComponent} from "../allocate-seat-popup/allocate-seat-popup.component";
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import {CheckInPassenger, CheckOutPassenger} from "../../passenger/store/passenger.actions";
import {CheckInSeat, CheckOutSeat} from "./store/seats.actions";
import {padStartWidthZeros} from "ag-grid-community/dist/lib/utils/number";
import {Passenger} from "../../shared/models/Passenger";
import {HttpClient} from "@angular/common/http";
import {Seat} from "../../shared/models/Seat";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'total-value-component',
  template: `
    <div [ngStyle]="{'background-color': specialMeal ? 'pink' : ancillary ? 'aqua' : isAllocated ? 'yellow': '#aaffaa'}">
    <span>
      <span>{{ cellValue }}</span
      >&nbsp;
      <div style="display: inline-block">
      <button mat-stroked-button [ngStyle]="{'background-color': isWheelChair? 'lightblue': isInfant ? 'orange' : 'white'}" (click)="checkIn()" *ngIf="!isAllocated">Check-In</button>
      <button mat-stroked-button [ngStyle]="{'background-color': isWheelChair? 'lightblue':'white'}" (click)="checkOut()" *ngIf="isAllocated">Check-Out</button>
              <img mat-card-image src="../../../assets/meal.png" alt="Photo of a Shiba Inu" style="height: 200px; width: 200px">

        </div>
    </span>
    </div>
  `,
})
export class SeatRenderer implements ICellRendererAngularComp {
  public cellValue!: string;
  dialogRef: any;
  isWheelChair: boolean = false;
  isAllocated: boolean = false;
  allocatedTo: Passenger = null;
  api: any;
  selectedFlight: string;
  passengerId: number;
  seatsId: string;
  seat: Seat;
  specialMeal: boolean;
  ancillary: boolean;
  isInfant: boolean;
  public constructor(private dialog: MatDialog, private store: Store<fromApp.AppState>, private http: HttpClient) {
  }

  agInit(params: ICellRendererParams): void {
    this.seat = params.data;
    this.seatsId = params.data.seatsId;
    this.cellValue = this.getValueToDisplay(params);
    this.isAllocated = params.data[this.cellValue.charAt(0)].allocated;
    this.allocatedTo = params.data[this.cellValue.charAt(0)].allocatedPassenger;
    if (this.allocatedTo) {
      this.store.select('passengers')
        .subscribe((state) => {
          let foundPassenger = state.passengers.find(passenger => passenger.id === this.allocatedTo.id);
          if(foundPassenger.specialMeals) {
            this.specialMeal = true;
          }
          if (foundPassenger.ancillary) {
            this.ancillary = true;
          }
        })

    }
    this.api = params.api;
    this.selectedFlight = params['flightName'];
    this.passengerId = this.selectedFlight ? null : Number.parseInt(localStorage.getItem('passengerId'));
    this.selectedFlight = params['flightName'] ? params['flightName'] : 'AIRBUS_NATIONAL';
    if (['C3', 'C4', 'D3', 'D4'].includes(this.cellValue)) {
      this.isWheelChair = true;
    }
    if (['C5', 'C6', 'D5', 'D6'].includes(this.cellValue)) {
      this.isInfant = true;
    }
  }

  refresh(params: ICellRendererParams) {
    this.cellValue = this.getValueToDisplay(params);
    return true;
  }

  checkIn() {
    this.showSeatAllocation(`Seat Allocation in progress`);
  }

  checkOut() {
    this.store.dispatch(new CheckOutSeat({seatNumber: this.cellValue}));
    this.store.dispatch(new CheckOutPassenger({passengerId: this.allocatedTo.id}))
  }

  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value.num;
  }

  showSeatAllocation(message: string) {
    this.dialogRef = this.dialog.open(AllocateSeatPopupComponent, {
      width: '445px',
      data: {
        header: 'Success',
        text: message,
        isWheelChair: this.isWheelChair,
        isInfant: this.isInfant,
        seatNumber: this.cellValue,
        passengerId: this.passengerId,
        onConfirm: () => this.dialog.closeAll()
      },
      disableClose: true
    });
    this.dialogRef.afterClosed().subscribe((result) => {
      if (result?.res) {
        let allocationDetails = result.res;
        if (allocationDetails.seatNumber && allocationDetails.passenger) {
          this.store.dispatch(new CheckInPassenger({
            seatNumber: allocationDetails.seatNumber,
            passengerId: allocationDetails.passenger.id,
            selectedFlight: this.selectedFlight
          }));
          this.store.dispatch(new CheckInSeat({
            seatNumber: allocationDetails.seatNumber,
            passenger: allocationDetails.passenger
          }))
        }
      }
    });
  }
}

import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Passenger, Preference} from "../../shared/models/Passenger";
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer"
import {Observable} from "rxjs";

@Component({
  selector: 'app-allocate-seat-popup',
  templateUrl: './allocate-seat-popup.component.html',
  styleUrls: ['./allocate-seat-popup.component.scss']
})
export class AllocateSeatPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data,
              private store: Store<fromApp.AppState>) {
  }

  allocateSeatForm: FormGroup;
  passengers: Observable<{ passengers: Passenger[] }>;

  ngOnInit(): void {
    this.allocateSeatForm = new FormGroup({
      'passenger': new FormControl(null, [Validators.required])
    })

    this.passengers = this.store.select('passengers');
  }

  close() {
    this.allocateSeatForm.reset();
    this.dialogRef.close({res: ''});
  }

  onAllocateSubmit() {
    this.dialogRef.close({
      res: {
        seatNumber: this.data.seatNumber,
        passenger: this.allocateSeatForm.get('passenger').value
      }
    });
  }

  getPassengerByPreference(passengers: Passenger[]) {
    if (this.data.passengerId) {
      return passengers.filter(p => p.id === this.data.passengerId);
    }
    let unallocatedPassengers =
      passengers.filter(p => !p.allocatedSeat);
    if (this.data.isWheelChair) {
      return unallocatedPassengers.filter(p =>  [Preference.WHEELCHAIR].includes(p.preference));
    } else if (this.data.isInfant) {
      return unallocatedPassengers.filter(p =>  [Preference.WITH_INFANT].includes(p.preference));
    } else {
      return unallocatedPassengers;
    }
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import {ActivatedRoute, Router} from "@angular/router";
import {Passenger, Preference} from "../../shared/models/Passenger";
import {Observable} from "rxjs";
import {PassengerService} from "./passenger.service";
import {MatDialog} from "@angular/material/dialog";
import {SuccessComponent} from "../../shared/popup/success/success.component";
import {
  UpdateMandatoryFieldsPopupComponent
} from "./update-mandatory-fields-popup/update-mandatory-fields-popup.component";
import * as moment from "moment/moment";
import {UpdatePassenger} from "../store/passenger.actions";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.scss']
})
export class PassengerComponent implements OnInit {

  @Input() passengerId: number;
  isSeatMapVisible: boolean = false;
  passengers: Observable<{ passengers: Passenger[] }>;
  dialogRef: any;
  passenger: Passenger = null;
  constructor(private dialog: MatDialog,
              private store: Store<fromApp.AppState>,
              private router: Router,
              private activedRoute: ActivatedRoute,
              private passengerService: PassengerService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.passengers = this.store.select('passengers');
    this.activedRoute
      .params
      .subscribe((params) => {
        this.passengerId = params.passengerId;

        this.passengers
          .subscribe((s) => {
            this.passenger = s.passengers.find(p => p.id == this.passengerId);
          })
      })
  }

  getPreference(preference: Preference) {
    return preference === 1 ? 'Wheel-Chair' : preference === 2 ? 'With Infant' : 'Regular';
  }

  onCheckInRequest() {
    localStorage.setItem('passengerId', this.passengerId.toString());
    this.isSeatMapVisible = true;
  }

  onAncillaryRequest() {
    this.passengerService.editAncillary(this.passenger);
  }

  onMealRequest() {
    this.passengerService.addSpecialMeal(this.passenger);
  }

  isMandatoryMissing() {
    return !this.passenger.DoB || !this.passenger.aadharNumber;
  }

  onMandatoryUpdate() {
    this.dialogRef = this.dialog.open(UpdateMandatoryFieldsPopupComponent, {
      width: '445px',
      data: {
        passenger: this.passenger,
        header: 'Success',
        message: `Successfully Updated Mandatory Fields of Passenger - ${this.passenger.fullName}`,
        onConfirm: () => this.dialog.closeAll()
      },
      disableClose: true
    });
    this.dialogRef.afterClosed().subscribe((res) => {
      if (res.res.dob && res.res.aadhar) {
        this.store.dispatch(new UpdatePassenger({passenger: {
          ...this.passenger,
            DoB: res.res.dob,
            aadharNumber: res.res.aadhar
        }}))
        this.openSnackBar('Successfully updated Mandatory fields!', 'close')
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}

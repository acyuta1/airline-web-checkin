import {Component, Inject, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromApp from "../../../store/app.reducer";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import * as moment from "moment";
import {checkIfPastDate} from "../../../flight/filter/filter.component";

@Component({
  selector: 'app-update-mandatory-fields-popup',
  templateUrl: './update-mandatory-fields-popup.component.html',
  styleUrls: ['./update-mandatory-fields-popup.component.scss']
})
export class UpdateMandatoryFieldsPopupComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>,
              public dialogRef: MatDialogRef<any>,
              private _formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data) { }

  updatePassengerInfoForm: FormGroup;
  isAadharPresent: boolean = false;

  ngOnInit(): void {
    this.updatePassengerInfoForm = this._formBuilder.group({
      'aadhar': ['', [Validators.required, checkIfAadharIsValid]],
      'selectedDate': ['', [Validators.required, checkIfFutureDate]],
    })

    if (this.data.passenger.aadharNumber) {
      this.isAadharPresent = true;
      console.log(this.isAadharPresent)
      this.updatePassengerInfoForm.setValue({'aadhar': this.data.passenger.aadharNumber, 'selectedDate' : ''});
    } else {
      this.updatePassengerInfoForm.setValue({'aadhar': '', 'selectedDate' : this.data.passenger.DoB});
    }

  }

  onPassengerInfoUpdate() {
    let res = {}
    if (this.isAadharPresent) {
      res['dob'] = this.updatePassengerInfoForm.get('selectedDate').value
      res['aadhar'] = this.data.passenger.aadharNumber
    } else {
      res['dob'] = this.data.passenger.DoB
      res['aadhar'] = this.updatePassengerInfoForm.get('aadhar').value
    }
    this.dialogRef.close({
      res: res
    });
  }

  close() {
    console.log(this.updatePassengerInfoForm)
    this.updatePassengerInfoForm.reset()
    this.dialogRef.close({res: ''});
  }
}

export function checkIfFutureDate(c: AbstractControl) {
  const selectedDate = moment(c.parent?.get('selectedDate')?.value);
  return selectedDate.isAfter(moment()) ? { futureDateSelected : true }: null;
}

export function checkIfAadharIsValid(c: AbstractControl) {
  console.log(c.value);
  const aadharValue: string = c.value;
  return aadharValue?.length !== 12 ? { incorrentAadharLength : true }: null;
}


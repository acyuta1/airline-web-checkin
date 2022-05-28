import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import * as fromApp from "../../../store/app.reducer";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AddPassenger} from "../../../passenger/store/passenger.actions";
import {Passenger, Preference} from "../../../shared/models/Passenger";
import {checkIfPastDate} from "../../../flight/filter/filter.component";
import * as custom_id from "custom-id";
import {
  checkIfAadharIsValid,
  checkIfFutureDate
} from "../../../passenger/passenger/update-mandatory-fields-popup/update-mandatory-fields-popup.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-passenger-popup',
  templateUrl: './add-passenger-popup.component.html',
  styleUrls: ['./add-passenger-popup.component.scss']
})
export class AddPassengerPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data,
              private store: Store<fromApp.AppState>,
              private _formBuilder: FormBuilder,
              private _snackBar: MatSnackBar) {
  }
  mealSelected: boolean = false;
  addPassengerForm: FormGroup;
  preferences: string[] = ['wheelChair', 'regular', 'withInfant'];
  ngOnInit(): void {
    this.addPassengerForm = this._formBuilder.group({
      'fullName': ['', Validators.required],
      'aadhar': ['', [Validators.required, checkIfAadharIsValid]],
      'selectedDate': ['', [Validators.required, checkIfFutureDate]],
      preference: ['', Validators.required],
      ancillaryLounge: false,
      ancillaryCabin: false,
      specialMeal: false,
    })
  }

  close() {
    this.addPassengerForm.reset();
    this.dialogRef.close();
  }

  onCheckBoxChange(event: any) {
    const selectedAncillary = (this.addPassengerForm.controls.ancillary as FormArray);
    console.log(selectedAncillary);
    if (event.target.checked) {
      selectedAncillary.push(new FormControl(event.target.value));
    } else {
      const index = selectedAncillary.controls
        .findIndex(x => x.value === event.target.value);
      selectedAncillary.removeAt(index);
    }
  }

  changeSpecialMeal(event: any) {

  }

  onPassengerAdd() {
    var preference = null;
    console.log(this.addPassengerForm);
    switch (this.addPassengerForm.value.preference) {
      case 'wheelChair':
        preference = Preference.WHEELCHAIR;
        break;
      case 'withInfant':
        preference = Preference.WITH_INFANT;
        break;
      default:
        preference = Preference.NORMAL;
    }
    if (this.addPassengerForm.get('fullName').value) {
      var passenger =
        new Passenger(null, this.addPassengerForm.get('fullName').value, this.addPassengerForm.value.selectedDate, this.addPassengerForm.value.aadhar ,preference, null, {
          lounge: this.addPassengerForm.value.ancillaryLounge,
          cabin: this.addPassengerForm.value.ancillaryCabin
        }, this.addPassengerForm.value.specialMeal)
      this.store.dispatch(new AddPassenger({passenger: passenger}))
      this.openSnackBar(`Successfully Added a new passenger with name: ${passenger.fullName}`, 'close')
    }

    this.dialogRef.close({
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}

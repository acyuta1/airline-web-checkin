import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import * as fromApp from "../../../store/app.reducer";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {AddPassenger} from "../../../passenger/store/passenger.actions";
import {Passenger, Preference} from "../../../shared/models/Passenger";

@Component({
  selector: 'app-add-passenger-popup',
  templateUrl: './add-passenger-popup.component.html',
  styleUrls: ['./add-passenger-popup.component.scss']
})
export class AddPassengerPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data,
              private store: Store<fromApp.AppState>) {
  }
  mealSelected: boolean = false;
  addPassengerForm: FormGroup;
  preferences: string[] = ['wheelChair', 'regular', 'withInfant'];
  ngOnInit(): void {
    this.addPassengerForm = new FormGroup({
      'fullName': new FormControl('', [Validators.required]),
      'ancillary':  new FormArray([]),
      'preference': new FormControl('', [Validators.required]),
      'specialMeal': new FormControl(false )
    })
  }

  close() {
    this.dialogRef.close({res: ''});
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
    switch (this.addPassengerForm.get('preference').value) {
      case 'wheelChair':
        preference = Preference.WHEELCHAIR;
        break;
      case 'withInfant':
        preference = Preference.WITH_INFANT;
        break;
      default:
        preference = Preference.NORMAL;
    }
    let ancillaryValues: string[] = this.addPassengerForm.get('ancillary').value;
    var passenger =
      new Passenger(null, this.addPassengerForm.get('fullName').value, preference, null, {lounge: ancillaryValues.includes('lounge'), cabin: ancillaryValues.includes('cabin')}, this.mealSelected)
    this.store.dispatch(new AddPassenger({passenger: passenger}))

    this.dialogRef.close({
    });
  }
}

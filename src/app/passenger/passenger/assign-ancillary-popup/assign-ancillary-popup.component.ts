import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormArray, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-assign-ancillary-popup',
  templateUrl: './assign-ancillary-popup.component.html',
  styleUrls: ['./assign-ancillary-popup.component.scss']
})
export class AssignAncillaryPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data) {

    this.editAncillaryForm = new FormGroup({
      'ancillary': new FormArray([])
    })
  }

  editAncillaryForm: FormGroup;

  ngOnInit(): void {
  }

  close() {
    this.editAncillaryForm.reset();
    this.dialogRef.close();
  }

  onCheckBoxChange(event: any) {
    const selectedAncillary = (this.editAncillaryForm.controls.ancillary as FormArray);
    if (event.target.checked) {
      selectedAncillary.push(new FormControl(event.target.value));
    } else {
      const index = selectedAncillary.controls
        .findIndex(x => x.value === event.target.value);
      selectedAncillary.removeAt(index);
    }
  }

  onAncillaryEditSubmit() {
    this.dialogRef.close({
      res: this.editAncillaryForm.get('ancillary').value
    });
  }
}

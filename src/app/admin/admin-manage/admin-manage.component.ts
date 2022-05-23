import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {AllocateSeatPopupComponent} from "../../flight/allocate-seat-popup/allocate-seat-popup.component";
import {CheckInPassenger} from "../../passenger/store/passenger.actions";
import {CheckInSeat} from "../../flight/flight-list/store/seats.actions";
import {MatDialog} from "@angular/material/dialog";
import {AddPassengerPopupComponent} from "./add-passenger-popup/add-passenger-popup.component";

@Component({
  selector: 'app-admin-manage',
  templateUrl: './admin-manage.component.html',
  styleUrls: ['./admin-manage.component.scss']
})
export class AdminManageComponent implements OnInit {

  isSeatMapVisible: Boolean = false;
  dialogRef: any;
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {

  }

  showSeatAllocation() {
    this.dialogRef = this.dialog.open(AddPassengerPopupComponent, {
      width: '445px',
      data: {
        header: 'Success',
        onConfirm: () => this.dialog.closeAll()
      },
      disableClose: true
    });
    this.dialogRef.afterClosed().subscribe((result) => {
    });
  }


}

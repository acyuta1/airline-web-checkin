import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassengerListComponent } from './passenger-list/passenger-list.component';
import {AgGridModule} from "ag-grid-angular";
import { PassengerComponent } from './passenger/passenger.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {FlightModule} from "../flight/flight.module";
import { AssignAncillaryPopupComponent } from './passenger/assign-ancillary-popup/assign-ancillary-popup.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import { UpdateMandatoryFieldsPopupComponent } from './passenger/update-mandatory-fields-popup/update-mandatory-fields-popup.component';
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSnackBarModule} from "@angular/material/snack-bar";



@NgModule({
  declarations: [
    PassengerListComponent,
    PassengerComponent,
    AssignAncillaryPopupComponent,
    UpdateMandatoryFieldsPopupComponent
  ],
  imports: [
    CommonModule,
    AgGridModule,
    MatCardModule,
    MatButtonModule,
    FlightModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSnackBarModule
  ]
})
export class PassengerModule { }

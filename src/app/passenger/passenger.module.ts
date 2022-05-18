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



@NgModule({
  declarations: [
    PassengerListComponent,
    PassengerComponent,
    AssignAncillaryPopupComponent
  ],
  imports: [
    CommonModule,
    AgGridModule,
    MatCardModule,
    MatButtonModule,
    FlightModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    FormsModule
  ]
})
export class PassengerModule { }

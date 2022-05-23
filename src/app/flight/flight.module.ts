import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FlightComponent} from "./flight/flight.component";
import {SeatRenderer} from "./flight/seat.renderer";
import {AgGridModule} from "ag-grid-angular";
import {FlightListComponent} from "./flight-list/flight-list.component";
import {FilterComponent} from "./filter/filter.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {NgxMatDatetimePickerModule} from "@angular-material-components/datetime-picker";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatIconModule} from "@angular/material/icon";
import {AllocateSeatPopupComponent} from "./allocate-seat-popup/allocate-seat-popup.component";
import {MatDividerModule} from "@angular/material/divider";
import { FlightServicesComponent } from './flight-services/flight-services.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { InFlightServicesComponent } from './in-flight-services/in-flight-services.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatCheckboxModule} from "@angular/material/checkbox";



@NgModule({
  declarations: [
    FlightComponent,
    SeatRenderer,
    FlightListComponent,
    FilterComponent,
    AllocateSeatPopupComponent,
    FlightServicesComponent,
    InFlightServicesComponent
  ],
    exports: [
        FlightListComponent,
        FilterComponent,
        FlightComponent
    ],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatDatetimePickerModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    CommonModule,
    AgGridModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDividerModule,
    MatSlideToggleModule,
    FormsModule,
    MatStepperModule,
    MatCheckboxModule,
  ]
})
export class FlightModule { }

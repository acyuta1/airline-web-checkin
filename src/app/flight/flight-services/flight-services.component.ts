import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import {Flight} from "../../shared/models/Flight";
import {UpdateServices} from "../flight/store/flight.actions";
import {SuccessComponent} from "../../shared/popup/success/success.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Location} from "@angular/common";

@Component({
  selector: 'app-flight-services',
  templateUrl: './flight-services.component.html',
  styleUrls: ['./flight-services.component.scss']
})
export class FlightServicesComponent implements OnInit {
  checked: boolean;
  dialogRef: any;
  options = { 'lobbyAccess': false,  'cabinAccess': false, 'specialMeals': false}

  selectedServices: string[] = [];

  flight: Flight = null;
  flightId: number;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private store: Store<fromApp.AppState>,
              private dialog: MatDialog,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route
      .params
      .subscribe((p) => this.flightId = p["flightId"]);

    this.store
      .select('flight')
      .subscribe((state) => {
        this.flight = state.flight;

        this.selectedServices = this.flight.services ? [...this.flight.services['services'] ? this.flight.services['services'] : this.flight.services] : [];
        console.log(this.selectedServices)
        this.initSelectedServices();
      })
  }


  onChange() {
    let keys = Object.keys(this.options)

    keys.forEach(k => {
      if (this.options[k] && !this.selectedServices.includes(k)) {
        console.log(this.selectedServices)
          this.selectedServices.push(k);
      } else if (!this.options[k] && this.selectedServices.includes(k)) {
        this.selectedServices = this.selectedServices.filter(s => {
          return s !== k;
        })
      }
    })
  }

  private initSelectedServices() {
    let keys = Object.keys(this.options);
    console.log(this.selectedServices)
    this.selectedServices
      .forEach(s => {
        if (keys.includes(s)) {
          this.options[s] = true;
        }
      })
  }

  onSave() {
    this.store.dispatch(new UpdateServices({services: this.selectedServices}));
    this.openSnackBar(`Successfully updated In-Flight Services of Flight ${this.flight.name}`, 'close')
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  redirectToDashboard() {
    this.location.back();
  }
}

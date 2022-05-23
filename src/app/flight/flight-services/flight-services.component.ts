import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import {Flight} from "../../shared/models/Flight";
import {UpdateServices} from "../flight/store/flight.actions";
import {SuccessComponent} from "../../shared/popup/success/success.component";
import {MatDialog} from "@angular/material/dialog";

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

  constructor(private route: ActivatedRoute, private store: Store<fromApp.AppState>, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route
      .params
      .subscribe((p) => this.flightId = p["flightId"]);

    this.store
      .select('flight')
      .subscribe((state) => {
        this.flight = state.flight;

        this.selectedServices = this.flight.services ? this.flight.services : [];

        this.initSelectedServices();
      })
  }


  onChange() {
    let keys = Object.keys(this.options)

    keys.forEach(k => {
      if (this.options[k] && !this.selectedServices.includes(k)) {
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
    this.selectedServices
      .forEach(s => {
        if (keys.includes(s)) {
          this.options[s] = true;
        }
      })
  }

  onSave() {
    this.store.dispatch(new UpdateServices({services: this.selectedServices}));
    this.dialogRef = this.dialog.open(SuccessComponent, {
      width: '445px',
      data: {
        header: 'Success',
        message: `Successfully Updated Services`,
        onConfirm: () => this.dialog.closeAll()
      },
      disableClose: true
    });
    this.dialogRef.afterClosed().subscribe(() => {
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {Flight} from "../../shared/models/Flight";
import {FlightListService} from "./flight-list.service";
import {ColDef, ColumnApi, GridApi, GridReadyEvent} from "ag-grid-community";
import {ButtonCellRendererComponent} from "../../shared/ag-grid/button-cell-renderer/button-cell-renderer.component";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import {SetFlight} from "../flight/store/flight.actions";

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss']
})
export class FlightListComponent implements OnInit {
  private gridApi!: GridApi;
  private gridColumnApi!: ColumnApi;
  flights: Flight[];
  rowData = [];
  columnDefs: ColDef[] = [
    {field: 'name'},
    {field: 'fromCity'},
    {field: 'toCity'},
    {field: 'date'},
    {field: 'time'},
    {field: 'services',
    valueFormatter: servicesFormatter,
    minWidth: 150},
    {
      field: 'Select Flight',
      cellRenderer: 'btnCellRenderer',
      cellRendererParams: {
        clicked: (flight) => {
          this.onFlightSelect(flight);
        }
      },
    },
  ];

  public defaultColDef: ColDef = {
    resizable: true,
  };

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  frameworkComponents;

  constructor(private flightListService: FlightListService, private router: Router, private store: Store<fromApp.AppState>) {
    this.frameworkComponents = {
      btnCellRenderer: ButtonCellRendererComponent,
    };
  }

  ngOnInit(): void {
    this.flightListService.fetchFlights
      .subscribe((flight) => {
        this.flightListService.generateFlights(flight);
      })

    // this.flightListService.generateFlightsGeneric();

    this.flightListService.flightsAdded
      .subscribe((flights: Flight[]) => {
        this.flights = flights;
      })
  }

  private onFlightSelect(flight) {
    localStorage.removeItem('passengerId');
    this.store.dispatch(new SetFlight({flight: flight}));
    this.router.navigate(['dashboard'], {queryParams: {flightId: flight.id, flightName: flight.name}})
  }
}

function servicesFormatter(params) {
  let finalServices = 'Yet To be Assigned';
  if (params.value) {
    let services: string[] = params.value.services;
    return services.join(", ")
  }
  return 'Yet To be Assigned by Admin';
}

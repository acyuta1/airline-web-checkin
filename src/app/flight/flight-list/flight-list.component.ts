import {Component, OnInit} from '@angular/core';
import {Flight} from "../../shared/models/Flight";
import {FlightListService} from "./flight-list.service";
import {ColDef, ColumnApi, GridApi, GridReadyEvent} from "ag-grid-community";
import {ButtonCellRendererComponent} from "../../shared/ag-grid/button-cell-renderer/button-cell-renderer.component";
import {Router} from "@angular/router";

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

  constructor(private flightListService: FlightListService, private router: Router) {
    this.frameworkComponents = {
      btnCellRenderer: ButtonCellRendererComponent,
    };
  }

  ngOnInit(): void {
    this.flightListService.fetchFlights
      .subscribe((flight) => {
        this.flightListService.generateFlights(flight);
      })

    this.flightListService.flightsAdded
      .subscribe((flightList) => {
        this.flights = flightList;
      })
  }

  private onFlightSelect(flight) {
    localStorage.removeItem('passengerId');
    this.router.navigate(['flights', flight.id], {queryParams: {flightName: flight.name}})
  }
}

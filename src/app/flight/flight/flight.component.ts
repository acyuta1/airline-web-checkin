import {Component, Input, OnInit} from '@angular/core';
import {ColDef, ColumnApi, GridApi, GridReadyEvent} from "ag-grid-community";
import {Seat} from "../../shared/models/Seat";
import {SeatRenderer} from "./seat.renderer";
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {PassengerService} from "../../passenger/passenger/passenger.service";
import {FlightService} from "./flight.service";
import { map, tap, take } from 'rxjs/operators';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss']
})
export class FlightComponent implements OnInit {
  private gridApi!: GridApi;
  private gridColumnApi!: ColumnApi;
  @Input() passengerId: number;
  idToken: string;
  seats: Observable<{ seats: Seat[] }>;
  flightId: number;
  seatsId: string;
  constructor(private store: Store<fromApp.AppState>,
              private router: Router,
              private route: ActivatedRoute,
              private flightService: FlightService,
              private passengerService: PassengerService) {
  }

  columnDefs: ColDef[] = [
    {
      field: 'Window', maxWidth: 100
    },
    {
      field: 'A', cellStyle: {
        backgroundColor: '#aaffaa', // light green
      },
      cellRenderer: SeatRenderer, cellRendererParams: {
        flightName: this.route.snapshot.queryParamMap.get('flightName'),
      }
    },
    {
      field: 'B', cellStyle: {
        backgroundColor: '#aaffaa', // light green
      }, cellRenderer: SeatRenderer, cellRendererParams: {
        flightName: this.route.snapshot.queryParamMap.get('flightName'),
      }
    },
    {
      field: 'C', cellStyle: {
        backgroundColor: '#aaffaa', // light green
      }, cellRenderer: SeatRenderer, cellRendererParams: {
        flightName: this.route.snapshot.queryParamMap.get('flightName'),
      }
    },
    {
      field: '', minWidth: 200
    },
    {
      field: 'D', cellStyle: {
        backgroundColor: '#aaffaa', // light green
      }, cellRenderer: SeatRenderer, cellRendererParams: {
        flightName: this.route.snapshot.queryParamMap.get('flightName'),
      }
    },
    {
      field: 'E', cellStyle: {
        backgroundColor: '#aaffaa', // light green
      }, cellRenderer: SeatRenderer, cellRendererParams: {
        flightName: this.route.snapshot.queryParamMap.get('flightName'),
      }
    },
    {
      field: 'F', cellStyle: {
        backgroundColor: '#aaffaa', // light green
      }, cellRenderer: SeatRenderer, cellRendererParams: {
        flightName: this.route.snapshot.queryParamMap.get('flightName'),
      }
    },
    {
      field: 'Window', maxWidth: 100
    },
  ];

  frameworkComponents;

  ngOnInit(): void {
    this.frameworkComponents = {};
    let x = this.store.select('auth')
    x.subscribe(i => this.idToken = i.user.token);
    this.route
      .params
      .subscribe((p) => this.flightId = p.flightId);
    if (!this.flightId) {
      this.flightId = 1;
    }
    // this.seatsId = this.flightService.commitSeatsToDB(this.flightId);
    this.seats = this.store.select('seats');

    // this.store.select('seats').subscribe((s) => this.passengerService.passengerSync(s.seats))
  }

  public defaultColDef: ColDef = {
    resizable: true,
  };

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  toPassengers() {
    this.router.navigate(['passengers'])
  }
}

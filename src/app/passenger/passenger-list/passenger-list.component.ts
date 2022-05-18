import {Component, OnInit} from '@angular/core';
import {ColDef, ColumnApi, GridApi, GridReadyEvent, RowNode} from "ag-grid-community";
import {Observable} from "rxjs";
import {Passenger} from "../../shared/models/Passenger";
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import {ButtonCellRendererComponent} from "../../shared/ag-grid/button-cell-renderer/button-cell-renderer.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-passenger-list',
  templateUrl: './passenger-list.component.html',
  styleUrls: ['./passenger-list.component.scss']
})
export class PassengerListComponent implements OnInit {

  private gridApi!: GridApi;
  private gridColumnApi!: ColumnApi;
  frameworkComponents;

  passengers: Observable<{ passengers: Passenger[] }>;

  constructor(private store: Store<fromApp.AppState>, private router: Router) {
    this.frameworkComponents = {
      btnCellRenderer: ButtonCellRendererComponent,
    };
  }

  ngOnInit(): void {
    this.frameworkComponents = {};
    this.passengers = this.store.select('passengers');
  }

  columnDefs: ColDef[] = [
    {
      field: 'fullName',
    },
    {
      field: 'preference',
      valueFormatter: preferenceFormatter,
      filter: 'preferenceFilter'
    },
    {
      field: 'allocatedSeat',
      valueFormatter: allocatedSeatFormatter
    },
    {
      field: 'ancillary',
      valueFormatter: ancillaryFormatter
    },
    {
      field: 'specialMeals',
      valueFormatter: specialMealFormatter
    },
    {
      field: 'Details',
      cellRenderer: ButtonCellRendererComponent,
      cellRendererParams: {
        clicked: (passenger) => {
          this.onPassengerSelect(passenger);
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

  private onPassengerSelect(passenger) {
    this.router.navigate(['passengers', passenger.id])
  }

  externalFilterChanged(newValue: string) {
    preference = newValue;
    this.gridApi.onFilterChanged();
  }

  isExternalFilterPresent(): boolean {
    return preference !== 'everyone';
  }
  doesExternalFilterPass(node: RowNode): boolean {
    if (preference.includes("ancillary")) {
      let ancillaryFilter = preference.split("_")[1];

      switch (ancillaryFilter) {
        case 'lounge': {
          return  node.data.ancillary?.lounge === true;
        }
        case 'cabin': {
          return  node.data.ancillary?.cabin === true;
        }
        default:
          return true;
      }
    } else {
      switch (preference) {
        case 'wheelChair':
          return node.data.preference === 1;
        case 'withInfant':
          return node.data.preference === 2;
        case 'meal':
          return node.data.specialMeals === true;
        default:
          return true;
      }
    }
  }
}
var preference = 'everyone';
function ancillaryFormatter(params) {
  if (params.value) {
    return `Lounge: ${params.value.lounge ? 'Yes' : 'No'} & Cabin: ${params.value.cabin ? 'Yes' : 'No'}`;
  }
  return 'N/A';
}

function allocatedSeatFormatter(params) {
  return params.value ? params.value : 'Check-In Pending';
}

function preferenceFormatter(params) {
  return params.value === 1 ? 'Wheel-Chair' : params.value === 2 ? 'With Infant' : 'Regular';
}

function specialMealFormatter(params) {
  return params.value === true ? 'Yes' : 'No';
}

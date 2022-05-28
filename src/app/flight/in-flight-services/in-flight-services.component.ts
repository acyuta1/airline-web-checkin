import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import {Passenger} from "../../shared/models/Passenger";
import {PassengerService} from "../../passenger/passenger/passenger.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EditAncillary} from "../../passenger/store/passenger.actions";
import {Observable} from "rxjs";
import {Flight} from "../../shared/models/Flight";
import {Location} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-in-flight-services',
  templateUrl: './in-flight-services.component.html',
  styleUrls: ['./in-flight-services.component.scss']
})
export class InFlightServicesComponent implements OnInit {

  selectPassengerGroup: FormGroup;
  assignAncillaryGroup: FormGroup;

  constructor(private store: Store<fromApp.AppState>,
              private passengerService: PassengerService,
              private _formBuilder: FormBuilder,
              private location: Location,
              private _snackBar: MatSnackBar) {
  }

  filteredPassengers: Passenger[] = [];
  flight: Observable<{ flight: Flight }>;
  services: string[] = []

  ngOnInit(): void {
    this.selectPassengerGroup = this._formBuilder.group({
      passenger: ['', Validators.required],
    });

    this.assignAncillaryGroup = this._formBuilder.group({
      ancillaryLounge: false,
      ancillaryCabin: false,
      specialMeal: false,
    });
    this.store.select('passengers')
      .subscribe(state => {
        this.filteredPassengers = state.passengers.filter(s => s.allocatedSeat)
      })

    this.store.select('flight')
      .subscribe(flightStore => {
        this.services.push(...flightStore.flight.services['services'])
      })
  }

  onNext() {
    let id = this.selectPassengerGroup.get('passenger').value
    let passenger = this.filteredPassengers
      .find(p => p.id === id);

    let p = {...passenger}

    p.ancillary = {
      lounge: this.assignAncillaryGroup.get('ancillaryLounge').value,
      cabin: this.assignAncillaryGroup.get('ancillaryCabin').value
    }
    p.specialMeals = this.assignAncillaryGroup.get('specialMeal').value

    if (p.ancillary.cabin || p.ancillary.lounge) {
      this.store.dispatch(new EditAncillary({
        passengerId: passenger.id,
        lounge: p.ancillary?.lounge,
        cabin: p.ancillary?.cabin
      }));

      this.openSnackBar(`Assigned Ancillary for ${passenger.fullName}`,'close')
    }
    if (this.assignAncillaryGroup.get('specialMeal').value) {
      this.passengerService.addSpecialMeal(p);
      this.openSnackBar(`Assigned Special Meals for ${passenger.fullName}`,'close')
    }
  }

  redirectToDashboard() {
    this.location.back();
  }

  checkIfSelected() {
    return !this.assignAncillaryGroup.get('ancillaryLounge').value && !this.assignAncillaryGroup.get('ancillaryCabin').value && !this.assignAncillaryGroup.get('specialMeal').value;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}

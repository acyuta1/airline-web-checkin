import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import {Seat} from "../../shared/models/Seat";
import {Passenger} from "../../shared/models/Passenger";
import {PassengerService} from "../../passenger/passenger/passenger.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {EditAncillary} from "../../passenger/store/passenger.actions";

@Component({
  selector: 'app-in-flight-services',
  templateUrl: './in-flight-services.component.html',
  styleUrls: ['./in-flight-services.component.scss']
})
export class InFlightServicesComponent implements OnInit {

  selectPassengerGroup: FormGroup;
  assignAncillaryGroup: FormGroup;

  constructor(private store: Store<fromApp.AppState>, private passengerService: PassengerService, private _formBuilder: FormBuilder) { }
  filteredPassengers: Passenger[] = [];

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

    this.store.dispatch(new EditAncillary({
      passengerId: passenger.id,
      lounge: p.ancillary?.lounge,
      cabin: p.ancillary?.cabin
    }));
    this.passengerService.addSpecialMeal(p);
  }
}

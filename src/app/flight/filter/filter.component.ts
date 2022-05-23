import {Component, OnInit} from '@angular/core';
import {ColDef} from "ag-grid-community";
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {City} from "../../shared/models/City";
import {FlightListService} from "../flight-list/flight-list.service";
import { CITIES } from "../../app,constants";
import * as moment from "moment";
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  searchFlightFormGroup: FormGroup;
  cities: City[];

  constructor(private flightListService: FlightListService) {
  }

  ngOnInit(): void {
    this.searchFlightFormGroup = new FormGroup({
      'fromCity': new FormControl('', Validators.required),
      'toCity': new FormControl('', [Validators.required, checkIfSameCitySelected]),
      'selectedDate': new FormControl('', [Validators.required, checkIfPastDate]),
    })

    this.onSearchFlightSubmitGeneric();

    this.cities = CITIES
  }

  columnDefs: ColDef[] = [
    {field: 'id'}
  ]
  picker: any;

  onSearchFlightSubmit() {
    const flightFilter = {
      fromCity: this.searchFlightFormGroup.get('fromCity').value,
      toCity: this.searchFlightFormGroup.get('toCity').value,
      selectedDate: this.searchFlightFormGroup.get('selectedDate').value,
    }

    this.flightListService.onFetchFlights(flightFilter);
  }
  validateDates(c: AbstractControl){
    const fromCity = c.get('fromCity');
    const toCity = c.get('toCity');

    return fromCity === toCity;
  }

  getFormattedCity(city: City) {
    return `${city.name}, ${city.state}, ${city.country}`
  }

  onSearchFlightSubmitGeneric() {
    this.flightListService.flightsAdded.next(this.flightListService.generateFlightsGeneric());
  }
}

export function checkIfSameCitySelected (c: AbstractControl) {
  const fromCity = c.parent?.get('fromCity')?.value;
  const toCity = c.parent?.get('toCity')?.value;

  return fromCity === toCity ? { sameCitySelected: true } : null;
}

export function checkIfPastDate(c: AbstractControl) {
  const selectedDate = moment(c.parent?.get('selectedDate')?.value);
  return selectedDate.isBefore(moment().subtract({d: 1})) ? { pastDateSelected : true }: null;
}

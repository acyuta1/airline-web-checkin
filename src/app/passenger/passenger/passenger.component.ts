import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import {ActivatedRoute, Router} from "@angular/router";
import {Passenger, Preference} from "../../shared/models/Passenger";
import {Observable} from "rxjs";
import {PassengerService} from "./passenger.service";

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.scss']
})
export class PassengerComponent implements OnInit {

  @Input() passengerId: number;
  isSeatMapVisible: boolean = false;
  passengers: Observable<{ passengers: Passenger[] }>;

  passenger: Passenger = null;
  constructor(private store: Store<fromApp.AppState>,
              private router: Router,
              private activedRoute: ActivatedRoute,
              private passengerService: PassengerService) { }

  ngOnInit(): void {

    this.passengers = this.store.select('passengers');
    this.activedRoute
      .params
      .subscribe((params) => {
        this.passengerId = params.passengerId;

        this.passengers
          .subscribe((s) => {
            this.passenger = s.passengers.find(p => p.id == this.passengerId);
          })
      })
  }

  getPreference(preference: Preference) {
    return preference === 1 ? 'Wheel-Chair' : preference === 2 ? 'With Infant' : 'Regular';
  }

  onCheckInRequest() {
    localStorage.setItem('passengerId', this.passengerId.toString());
    this.isSeatMapVisible = true;
  }

  onAncillaryRequest() {
    this.passengerService.editAncillary(this.passenger);
  }

  onMealRequest() {
    this.passengerService.addSpecialMeal(this.passenger);
  }
}

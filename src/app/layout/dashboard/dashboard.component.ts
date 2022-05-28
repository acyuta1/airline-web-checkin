import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CommandJsonPathException} from "@angular/cli/utilities/json-schema";
import {AuthService} from "../../auth/auth.service";
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import {PassengerService} from "../../passenger/passenger/passenger.service";
import {FlightService} from "../../flight/flight/flight.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromApp.AppState>,
              private passengerService: PassengerService,
              private location: Location,
              private flightService: FlightService) { }

  options = [
    {
      title: 'Flight Services',
      isAdmin: true,
      value: 'flightServices',
      img: "assets/flight-services.png",
      subtitle: 'As an Admin, you can assign special utilities to a flight like Lobby Access, Cabin Access, Meals, etc. These can later be provided to passengers on need basis.'
    },
    {
      title: 'Passengers',
      isAdmin: true,
      value: 'passengers',
      img: "assets/passengers.png",
      subtitle: 'As an Admin, you can 1. Look at the passengers list, 2. Filter by missing mandatory fields, 3. Add a New Passenger'
    },
    {
      title: 'Check In',
      isAdmin: false,
      value: 'seatMap',
      img: "assets/seat-map.png",
      subtitle: 'As an airline staff, you can check in and check out passengers'
    },
    {
      title: 'In Flight Services',
      isAdmin: false,
      value: 'inFlight',
      img: "assets/in-flight-services.png",
      subtitle: 'As an airline staff, you can assign available flight specific utilities to passengers. Note: A passenger must be checked in first.'
    },
  ];

  isAdmin: boolean = false;

  flightInfo: {flightId: string, flightName: string};

  ngOnInit(): void {

    this.route
      .queryParams
      .subscribe((qParams) => {
        this.flightInfo = {
          flightId: qParams.flightId,
          flightName: qParams.flightName
        }
        this.flightService.commitSeatsToDB(Number.parseInt(this.flightInfo.flightId));
      })

    this.store.select('auth')
      .subscribe((state) => {
        this.isAdmin = state.user?.isAdmin ? state.user?.isAdmin : false;
      })

    this.store.select('seats').subscribe((s) => this.passengerService.passengerSync(s.seats))
  }

  onSelect(seatMap: string) {
    switch (seatMap) {
      case 'seatMap':
        this.router.navigate(['flights', this.flightInfo.flightId], {queryParams: {flightId: this.flightInfo.flightId, flightName: this.flightInfo.flightName}});
        break;
      case 'passengers':
        this.router.navigate(['passengers']);
        break;

      case 'flightServices':
        this.router.navigate(['flights',this.flightInfo.flightId,'services'])
        break;
      case 'inFlight':
        this.router.navigate(['flights',this.flightInfo.flightId,'in-flight-services'])
    }

  }

  filteredOptions(options: { title: string; isAdmin: boolean; value: string, img: string, subtitle: string }[]) {
    return options.filter(option => option.isAdmin === this.isAdmin);
  }

  redirectToDashboard() {
    this.location.back();
  }
}

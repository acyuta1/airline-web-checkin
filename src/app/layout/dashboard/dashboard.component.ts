import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CommandJsonPathException} from "@angular/cli/utilities/json-schema";
import {AuthService} from "../../auth/auth.service";
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import {PassengerService} from "../../passenger/passenger/passenger.service";
import {FlightService} from "../../flight/flight/flight.service";

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
              private flightService: FlightService) { }

  options: {
    title: string,
    isAdmin: boolean,
    value: string,
    img: string
  }[] = [
    {title: 'Flight Services', isAdmin: true, value: 'flightServices', img: "https://www.springwise.com/wp-content/uploads/2016/01/SeatSwappr-P2P-plane-seat-exchange-US.jpg"},
    {title: 'Passengers', isAdmin: true, value: 'passengers', img: "https://image.shutterstock.com/image-vector/airplane-passengers-sitting-on-chairs-260nw-2031737984.jpg"},
    {title: 'Check In', isAdmin: false, value: 'seatMap', img: "https://img.cheapair.com/uploads/2015/06/seat-assignment-1-300x297.jpg"},
    {title: 'In Flight Services', isAdmin: false, value: 'inFlight', img: "https://www.senecacollege.ca/content/dam/projects/seneca/Program-2018/fls_top.jpg"},
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
        this.isAdmin = state.user.isAdmin;
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

  filteredOptions(options: { title: string; isAdmin: boolean; value: string, img: string }[]) {
    return options.filter(option => option.isAdmin === this.isAdmin);
  }
}

import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {Flight} from "../../shared/models/Flight";
import {DateTime} from 'luxon';
import {adjectives, colors, uniqueNamesGenerator} from "unique-names-generator";
import {CITIES} from "../../app,constants";
import * as moment from "moment";

@Injectable({providedIn: "root"})
export class FlightListService {

  public constructor() {
  }

  fetchFlights = new Subject<any>();

  fetchFlightsGeneric = new Subject<any>();

  flightsAdded = new Subject<Flight[]>();

  onFetchFlights(flight: { fromCity: string, toCity: string, selectedDate: Date }) {
    this.fetchFlights.next(flight);
  }


  generateFlights(filter) {
    let flights = this.flightGenerate({
      fromCity: filter.fromCity,
      toCity: filter.toCity,
      selectedDate: filter.selectedDate,
      all: false
    });
    this.flightsAdded.next(flights);
  }

  generateFlightsGeneric() {
    let flights = this.flightGenerate({fromCity: null, toCity: null, selectedDate: null, all: true});
    this.flightsAdded.next(flights);
  }

  private flightGenerate(filter: { fromCity: string, toCity: string, selectedDate: any, all: boolean }): Flight[] {
    var flights: Flight[] = [];
    let timeDiff = 10;
    let noCities = 5;
    if (filter.all) {
      filter.selectedDate = moment().format('l');
      noCities = 21;
      let {fromCity, toCity} = this.getCities();
      let flight =
        new Flight(1, 'AIRBUS_NATIONAL', fromCity, toCity, filter.selectedDate, DateTime.now().toLocaleString(DateTime.TIME_24_SIMPLE));
      flights.push(flight);
    } else {
      let flight =
        new Flight(1, 'AIRBUS_NATIONAL', filter.fromCity, filter.toCity, moment(filter.selectedDate).format("l"), DateTime.now().toLocaleString(DateTime.TIME_24_SIMPLE));
      flights.push(flight);
    }
    for (var i: number = 2; i < noCities; i++) {
      if (filter.all) {
        let {fromCity, toCity} = this.getCities();
        filter.fromCity = fromCity;
        filter.toCity = toCity;
        filter.selectedDate = moment().format('l');
      }
      let time = DateTime.now().plus({minutes: timeDiff}).toLocaleString(DateTime.TIME_24_SIMPLE);
      const uniqueName = `AIRBUS ${uniqueNamesGenerator({dictionaries: [adjectives, colors], length: 2})}`;
      let flight =
        new Flight(i, uniqueName, filter.fromCity, filter.toCity, moment(filter.selectedDate).format("l"), time);
      flights.push(flight);

      timeDiff += 10;
    }
    return flights;
  }

  private randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  private getCities() {
    const randomFromCity = this.randomIntFromInterval(0, 9)
    var randomToCity = this.randomIntFromInterval(0, 9)
    while (randomFromCity === randomToCity) {
      randomToCity = this.randomIntFromInterval(0, 9);
    }

    return {fromCity: CITIES[randomFromCity].name, toCity: CITIES[randomToCity].name}
  }
}

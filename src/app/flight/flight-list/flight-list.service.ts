import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {Flight} from "../../shared/models/Flight";
import {DateTime} from 'luxon';
import {adjectives, colors, uniqueNamesGenerator} from "unique-names-generator";
import {CITIES} from "../../app,constants";
import * as moment from "moment";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Injectable({providedIn: "root"})
export class FlightListService {

  public constructor(private http: HttpClient, private db: AngularFireDatabase) {
  }

  fetchFlights = new Subject<any>();

  fetchFlightsGeneric = new Subject<any>();

  flightsAdded = new Subject<Flight[]>();

  onFetchFlights(flight: { fromCity: string, toCity: string, selectedDate: Date }) {
    let filteredFlights: Flight[] = [];
      this.db.list('flights/flight-list')
      .valueChanges()
      .subscribe(list => {
        filteredFlights = list[0]['flightList'].filter(l => {
          return l.fromCity === flight.fromCity && l.toCity === flight.toCity
        })
        console.log(filteredFlights)
        let clone = [ ...filteredFlights ];
        clone = clone.map(f => {
          f.date = moment(flight.selectedDate).format('l');
          return f;
        })
        this.flightsAdded.next(clone);
      })

    return filteredFlights;
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

    return this.flightGenerate({fromCity: null, toCity: null, selectedDate: null, all: true});
  }

  private flightGenerate(filter: { fromCity: string, toCity: string, selectedDate: any, all: boolean }): Flight[] {
    console.log("called")
    let fetchedFlights: Flight[] = [];
    // console.log(this.db.list('flights/flight-list').query.ref)
    // // this.db.list('flights/flight-list').valueChanges()
    // //   .subscribe((list: Flight[]) => {
    // //     if (list.length === 0) {
    // //       fetchedFlights = this.initializeFlights(filter);
    // //       this.flightsAdded.next(fetchedFlights)
    // //     } else if ((filter === null || filter.fromCity === null) && list.length > 0) {
    // //       this.flightsAdded.next(list);
    // //     } else if (filter?.fromCity) {
    // //       fetchedFlights = this.initializeFlights(filter);
    // //       this.flightsAdded.next(fetchedFlights)
    // //     }
    // //
    // //     return fetchedFlights;
    // //   })
    this.http.get(`${environment.firebaseDb}/flights/flight-list.json`)
      .subscribe((res) => {
        if ((filter === null || filter.fromCity === null) && res && Object.keys(res).length > 0) {
          const id = Object.keys(res)[0];
          fetchedFlights = res[id]["flightList"]
          this.flightsAdded.next(fetchedFlights);
        } else if (filter?.fromCity) {
          fetchedFlights = this.initializeFlights(filter);
          this.flightsAdded.next(fetchedFlights)
        } else {
          fetchedFlights = this.initializeFlights(filter);
          this.flightsAdded.next(fetchedFlights)
        }

        return fetchedFlights;
      });
    return fetchedFlights;

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

  private initializeFlights(filter: { fromCity: string, toCity: string, selectedDate: any, all: boolean }) {
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

    // let flightList = this.db.list('flights/flight-list')
    // flightList.push(flights);
    this.http.post(`${environment.firebaseDb}/flights/flight-list.json`, {flightList: flights})
      .subscribe((res) => console.log(res));
    return flights;
  }
}

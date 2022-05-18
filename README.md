# AirlineProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

* The Project is modularized into appropriate sections (flight, auth, passengers, etc).
* The project uses Stores to keep maintain a state wherever required.
* Firebase's Realtime DB is utilized to store seat information.
* AgGrid is used extensively to tabularize data as well as for the creation of seat maps.

### i. Authentication:

* Two ways to login:
  * Social Login in Google
  * Login using Username and Password (only admin account is available for now):
    * Username: admin@mt-airline.com
    * password: admin

### ii. Flights:

* Filtering is possible based on cities and date.
* Every flight has a seat map, to check in and check out passengers
* The seat maps are color coded.

### iii. Passengers:

* Possible Activities:
  * Checking in a Passenger
  * Assigning special meals
  * Assigning Ancillary services

### iv. Admin

* Creation of a Passenger

In detail explanation along with screenshots is provided in demo.pdf


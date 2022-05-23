import {RouterModule, Routes} from "@angular/router";
import {LandingPageComponent} from "./layout/landing-page/landing-page.component";
import {NgModule} from "@angular/core";
import {FlightComponent} from "./flight/flight/flight.component";
import {FlightListComponent} from "./flight/flight-list/flight-list.component";
import {PassengerListComponent} from "./passenger/passenger-list/passenger-list.component";
import {PassengerComponent} from "./passenger/passenger/passenger.component";
import {AuthGuard} from "./auth/auth.guard";
import {AuthComponent} from "./auth/auth/auth.component";
import {AdminManageComponent} from "./admin/admin-manage/admin-manage.component";
import {DashboardComponent} from "./layout/dashboard/dashboard.component";
import {FlightServicesComponent} from "./flight/flight-services/flight-services.component";
import {InFlightServicesComponent} from "./flight/in-flight-services/in-flight-services.component";

const routes: Routes = [

  {
    path: "auth",
    component: AuthComponent,
    pathMatch: 'full'
  },
  {
    path: "",
    component: LandingPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "manage",
    component: AdminManageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "flights",
    canActivate: [AuthGuard],
    children: [
      {
        path: ':flightId',
        children: [
          {
            path: '',
            component: FlightComponent,
          },
          {
            path: 'services',
            component: FlightServicesComponent,
            pathMatch: 'full'
          },
          {
            path: 'in-flight-services',
            component: InFlightServicesComponent,
            pathMatch: 'full'
          }
        ]
      },
      {
        path: "", component: FlightListComponent, pathMatch: 'full'
      }
    ]
  },
  {
    path: "passengers",
    canActivate: [AuthGuard],
    children: [
      {
        path: ':passengerId',
        component: PassengerComponent,
        pathMatch: 'full'
      },
      {
        path: "", component: PassengerListComponent, pathMatch: 'full'
      }
    ]
  }
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./header/header.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {AuthModule} from "../auth/auth.module";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {FlightModule} from "../flight/flight.module";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {MatCardModule} from "@angular/material/card";

@NgModule({
  declarations: [
    HeaderComponent,
    LandingPageComponent,
    DashboardComponent
  ],
    exports: [
        HeaderComponent,
    ],
  imports: [
    CommonModule,
    MatToolbarModule,
    AuthModule,
    FlightModule,
    RouterModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class LayoutModule { }

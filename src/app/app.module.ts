import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {AppRoutingModule} from "./app-routing.module";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {HttpClientModule} from "@angular/common/http";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AgGridModule} from "ag-grid-angular";
import {ButtonCellRendererComponent} from './shared/ag-grid/button-cell-renderer/button-cell-renderer.component';
import {StoreModule} from "@ngrx/store";
import * as fromApp from "./store/app.reducer"
import {FlightModule} from "./flight/flight.module";
import {AuthModule} from "./auth/auth.module";
import {LayoutModule} from "./layout/layout.module";
import {PassengerModule} from "./passenger/passenger.module";
import {MatButtonModule} from "@angular/material/button";
import {SuccessComponent} from './shared/popup/success/success.component';
import {AdminModule} from "./admin/admin.module";
import {EffectsModule} from "@ngrx/effects";
import {SeatsEffects} from "./flight/flight-list/store/seats.effects";
import {PassengerEffects} from "./passenger/store/passenger.effects";
import {FlightEffects} from "./flight/flight/store/flight.effects";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    ButtonCellRendererComponent,
    SuccessComponent,
  ],
  imports: [
    FlightModule,
    AuthModule,
    BrowserModule,
    AdminModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
    AngularFireAuthModule,
    NgbModule,
    AgGridModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([SeatsEffects, PassengerEffects, FlightEffects]),
    LayoutModule,
    PassengerModule,
    MatButtonModule,
    CommonModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

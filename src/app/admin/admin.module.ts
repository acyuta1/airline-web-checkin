import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminManageComponent } from './admin-manage/admin-manage.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { AddPassengerPopupComponent } from './admin-manage/add-passenger-popup/add-passenger-popup.component';



@NgModule({
  declarations: [
    AdminManageComponent,
    AddPassengerPopupComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class AdminModule { }

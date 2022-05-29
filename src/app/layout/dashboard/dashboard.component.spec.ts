import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import {AppRoutingModule} from "../../app-routing.module";
import {StoreModule} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import {PassengerModule} from "../../passenger/passenger.module";
import {HttpClientModule} from "@angular/common/http";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [AppRoutingModule,
        StoreModule.forRoot(fromApp.appReducer),PassengerModule,HttpClientModule]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(DashboardComponent);

        component = fixture.componentInstance;

        debugElement = fixture.debugElement;

        htmlElement = debugElement.nativeElement;

      });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`Dashboard options must be equal to 4 witout filtering`, () => {
    expect(component.options.length).toEqual(4);
  });

  it(`Dashboard options must be equal to 2 post filtering`, () => {
    component.isAdmin = true;
    expect(component.filteredOptions(component.options).filter(i => i.isAdmin).length).toEqual(2);
  });

  it(`should contain Flight Services and Passengers in dashboard options for Admin`, () => {
    component.isAdmin = true;
    let filteredOptions = component.filteredOptions(component.options)
      .filter(i => i.title === 'Flight Services' || i.title === 'Passengers');
    expect(filteredOptions.length).toEqual(2);
  });

  it(`should contain Check In and In Flight Services in dashboard options for Airline Staff`, () => {
    component.isAdmin = false;
    let filteredOptions = component.filteredOptions(component.options)
      .filter(i => i.title === 'Check In' || i.title === 'In Flight Services');
    expect(filteredOptions.length).toEqual(2);
  });

  it(`should call the redirectToDashboard method`, () => {
    fixture.detectChanges();
    spyOn(component, 'redirectToDashboard')
    htmlElement = fixture.debugElement.query(By.css('.back-class')).nativeElement;
    htmlElement.click();
    expect(component.redirectToDashboard).toHaveBeenCalledTimes(1);
  });

  it(`should call the onselect method`, () => {
    fixture.detectChanges();
    spyOn(component, 'onSelect')
    htmlElement = fixture.debugElement.query(By.css('button')).nativeElement;
    htmlElement.click();
    expect(component.onSelect).toHaveBeenCalledTimes(1);
  });
});

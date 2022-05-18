import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPassengerPopupComponent } from './add-passenger-popup.component';

describe('AddPassengerPopupComponent', () => {
  let component: AddPassengerPopupComponent;
  let fixture: ComponentFixture<AddPassengerPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPassengerPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPassengerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

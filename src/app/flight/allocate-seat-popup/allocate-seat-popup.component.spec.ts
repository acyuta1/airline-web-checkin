import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocateSeatPopupComponent } from './allocate-seat-popup.component';

describe('AllocateSeatPopupComponent', () => {
  let component: AllocateSeatPopupComponent;
  let fixture: ComponentFixture<AllocateSeatPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllocateSeatPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocateSeatPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

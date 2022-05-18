import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignAncillaryPopupComponent } from './assign-ancillary-popup.component';

describe('AssignAncillaryPopupComponent', () => {
  let component: AssignAncillaryPopupComponent;
  let fixture: ComponentFixture<AssignAncillaryPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignAncillaryPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignAncillaryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMandatoryFieldsPopupComponent } from './update-mandatory-fields-popup.component';

describe('UpdateMandatoryFieldsPopupComponent', () => {
  let component: UpdateMandatoryFieldsPopupComponent;
  let fixture: ComponentFixture<UpdateMandatoryFieldsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMandatoryFieldsPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMandatoryFieldsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

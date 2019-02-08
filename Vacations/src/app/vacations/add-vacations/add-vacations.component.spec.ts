import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVacationsComponent } from './add-vacations.component';

describe('AddVacationsComponent', () => {
  let component: AddVacationsComponent;
  let fixture: ComponentFixture<AddVacationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVacationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVacationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

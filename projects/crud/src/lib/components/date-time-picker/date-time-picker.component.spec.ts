import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DateTimePickerComponent } from './date-time-picker.component';

describe('DateTimePickerComponent', () => {
  let component: DateTimePickerComponent;
  let fixture: ComponentFixture<DateTimePickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DateTimePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

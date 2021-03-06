import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment_ from 'moment';
import { AmazingTimePickerService } from 'amazing-time-picker';
const moment = moment_;

@Component({
  selector: 'ng-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent implements OnInit {
  @Input() formGroup;
  @Input() config;
  public selectedTime = new FormControl('');
  constructor(private atp: AmazingTimePickerService) { }

  ngOnInit() {
  }

  openTimePicker(time) {
    this.setTimes(time)
  }

  setTimes(initial_time) {
    const amazingTimePicker = this.atp.open({
      time: initial_time,
      changeToMinutes: true
    });
    const ctrl = this.formGroup.get([this.config.name]);
    ctrl.setValue(initial_time);
    amazingTimePicker.afterClose().subscribe(time => {
      time += ':00';
      ctrl.setValue(time);
      this.selectedTime.setValue(time);
    });
  }

}

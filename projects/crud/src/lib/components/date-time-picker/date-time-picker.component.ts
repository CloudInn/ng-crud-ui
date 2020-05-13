import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment_ from 'moment';
const moment = moment_;

@Component({
  selector: 'ng-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.css']
})
export class DateTimePickerComponent implements OnInit {
  @Input() formGroup;
  @Input() config;
  public selectedMoment = new FormControl(null);
  constructor() { }

  ngOnInit() {
    this.selectedMoment.valueChanges.subscribe(res => {
      const momentValue = moment(res).format('YYYY-MM-DD HH:mm:ssZ');
      this.setValue(momentValue);
    });
  }

  setValue(value) {
    const ctrl = this.formGroup.get([this.config.name]);
    ctrl.setValue(value);
  }

}

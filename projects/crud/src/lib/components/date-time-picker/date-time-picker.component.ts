import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
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
  public selectedMoment = new UntypedFormControl(null);
  constructor() { }

  ngOnInit() {
    this.selectedMoment.valueChanges.subscribe(res => {
      // mat-datepicker has no time component, so this is date-only now; the null guard matches
      // it emitting null when the field is cleared.
      if (res) {
        const momentValue = moment(res).format('YYYY-MM-DD');
        this.setValue(momentValue);
      }
    });
  }

  setValue(value) {
    const ctrl = this.formGroup.get([this.config.name]);
    ctrl.setValue(value);
  }

}

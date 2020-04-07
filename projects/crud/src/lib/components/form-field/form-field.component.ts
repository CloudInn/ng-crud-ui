import { Component, OnChanges, Input, SimpleChanges, OnInit } from '@angular/core';
import { FormGroup, FormControlName } from '@angular/forms';
import { Observable, Subject, config } from 'rxjs';
import { Metadata, FieldConfig } from '../../models/metadata';

@Component({
  selector: 'ng-crud-form-field',
  templateUrl: './form-field.component.html',
  exportAs: 'ngcrudui-form-field',
  styleUrls: ['./form-field.component.css']
})
export class FormFieldComponent implements OnChanges, OnInit {

  @Input() formGroup: FormGroup;
  @Input() forcedSearchParams: any = [];
  @Input() config: FieldConfig;
  @Input() choices = [];
  @Input() reset: Subject<any>;
  type = 'text';
  filteredOptions: Observable<any[]>;
  foreign_model?: Metadata;

  get f() { return this.formGroup.controls; }

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.formGroup.get(this.config.name) !== null) {
      this.formGroup.get(this.config.name).valueChanges.subscribe(res => {
        if (this.config.touching) {
          if (res == this.config.touching.field_value) {
            this.formGroup.get(this.config.touching.field).setValue(this.config.touching.change_value);
          }
        }
      });
    }
  }

  ngOnInit() {
    if (this.config.defaultValue || this.config.defaultValue == 0) {
      this.formGroup.patchValue({
        [this.config.name]: this.config.defaultValue
      });
    }
  }
}

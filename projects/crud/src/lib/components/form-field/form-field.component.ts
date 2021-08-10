import { Component, OnChanges, Input, SimpleChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControlName, FormControl } from '@angular/forms';
import { Observable, Subject, config } from 'rxjs';
import { Metadata, FieldConfig } from '../../models/metadata';

@Component({
  selector: 'ng-crud-form-field',
  templateUrl: './form-field.component.html',
  exportAs: 'ngcrudui-form-field',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements OnChanges, OnInit {

  @Input() formGroup: FormGroup;
  @Input() mode: string;
  @Input() forcedSearchParams: any = [];
  @Input() config: FieldConfig;
  @Input() choices = [];
  @Input() reset: Subject<any>;
  @Output() elementDeleted = new EventEmitter();
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

  deleteAttachment(event) {
    this.elementDeleted.next({ ...event });
  }

  ngOnInit() {
    if (this.mode !== 'edit') {
      if (this.config.defaultValue || this.config.defaultValue == 0) {
        this.formGroup.patchValue({
          [this.config.name]: this.config.defaultValue
        });
      }
    }
    if (this.config.hasErrorWhen) {
      this.formGroup.get(this.config.hasErrorWhen.field_name).valueChanges.subscribe(() => {
        this.formGroup.get(this.config.name).setErrors({ [this.config.hasErrorWhen.error]: true });
        this.formGroup.get(this.config.name).markAsTouched();
        this.formGroup.updateValueAndValidity();
      });
    }
  }
  checkValidity() {
    if (this.formGroup.get(this.config.name) !== null) {
      if (this.mode === 'edit' || this.mode === 'create') {
        this.formGroup.get(this.config.name).setValidators(this.config.validators);
      } else {
        this.formGroup.get(this.config.name).clearValidators();
      }
      this.formGroup.updateValueAndValidity();
    }
  }

}

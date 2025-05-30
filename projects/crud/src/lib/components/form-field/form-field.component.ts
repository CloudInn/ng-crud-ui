import { Component, OnChanges, Input, SimpleChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControlName, FormControl } from '@angular/forms';
import { Observable, Subject, config } from 'rxjs';
import { Metadata, FieldConfig, ErrorMessage } from '../../models/metadata';

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
        if (this.config.type === 'number' && res === '') {
          this.formGroup.get(this.config.name).setValue(null, { emitEvent: false });
        }
        if (this.config.touching) {
          if (res == this.config.touching.field_value) {
            this.formGroup.get(this.config.touching.field).setValue(this.config.touching.change_value);
          }
        }
        this.checkValidity();
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
    if (this.config.hasErrorWhen?.length) {
      this.config.hasErrorWhen.forEach(field => {
        this.formGroup.get(field.field_name).valueChanges.subscribe((val) => {
          const control =  this.formGroup.get(this.config.name);
          if ((!val || val === '' ) && control.hasError(field.error)) {
            delete control?.errors[field.error];
            if (Object.keys(control.errors)?.length === 0) {
              control.setErrors(null);
            }
          } else if (!control.value) {
            control.setErrors({ [field.error]: true });
            control.markAsTouched();
          }
          this.formGroup.updateValueAndValidity();
        });
      });
    }
  }
  checkValidity() {
    if (this.formGroup?.get(this.config.name) !== null) {
      if (this.mode === 'edit' || this.mode === 'create') {
        this.formGroup?.get(this.config.name)?.setValidators(this.config.validators);
      } else {
        this.formGroup.get(this.config.name)?.clearValidators();
      }
      this.formGroup.updateValueAndValidity();
    }
  }

  getFieldErrorMessage(type: string) {
    let errorMessage: ErrorMessage;
    if (this.config?.errorMessages?.length) {
      errorMessage = this.config.errorMessages.find(error => error.type === type);
    }
    return errorMessage ? errorMessage.message : errorMessage;
  }
}

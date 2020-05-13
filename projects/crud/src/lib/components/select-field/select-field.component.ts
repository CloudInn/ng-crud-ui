import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldConfig, SelectControlConfig } from '../../models/metadata';
import { config } from 'rxjs';


@Component({
  selector: 'ng-crud-select-field',
  exportAs: 'ngcrudui-select-field',
  styles: ['.form-field-wrapper{margin-right:  24px}'],
  template: `
    <mat-form-field [formGroup]="formGroup" style="width: 90%;">
        <mat-label>{{ config.label }}</mat-label>
        <mat-select [formControlName]="config.name">
            <mat-option *ngFor="let c of controlConfig?.choices" [value]="c['id']">
                {{ c["description"] }}
            </mat-option>
            <mat-error *ngIf="f[config.name].hasError('required') && (f[config.name].dirty || f[config.name].touched)">this
            field is required</mat-error>
        </mat-select>
    </mat-form-field>
  `
})
export class SelectFieldComponent implements OnInit, OnChanges {

  @Input() formGroup: FormGroup;
  @Input() config: FieldConfig;
  controlConfig: SelectControlConfig;

  get f() { return this.formGroup.controls; }

  constructor() { }
  ngOnChanges() {
    const ctrl = this.formGroup.get(this.config.name);
    if (ctrl && this.config.resolveValueFrom) {
      this.formGroup.patchValue({
        [this.config.name]: ctrl.value[this.config.resolveValueFrom]
      });
    }
  }
  ngOnInit() {
    this.controlConfig = this.config.control as SelectControlConfig;

    if (this.controlConfig.choices) {
      const all_option = this.controlConfig.choices.find(el => el.id === 'All');
      if (all_option && this.formGroup.get(this.config.name) !== null) {
        this.formGroup.get(this.config.name).setValue(all_option.id);
      }
    }
  }
}

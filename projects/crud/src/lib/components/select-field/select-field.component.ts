import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldConfig, SelectControlConfig } from '../../models/metadata';


@Component({
  selector: 'ng-crud-select-field',
  exportAs: 'ngcrudui-select-field',
  styles: ['.form-field-wrapper{margin-right:  24px}'],
  template: `
    <mat-form-field [formGroup]="formGroup">
        <mat-label>{{ config.label }}</mat-label>
        <mat-select [formControlName]="config.name">
            <mat-option *ngFor="let c of controlConfig?.choices" [value]="c['value']">
                {{ c["label"] }}
            </mat-option>
            <mat-error *ngIf="f[config.name].hasError('required') && (f[config.name].dirty || f[config.name].touched)">this
            field is required</mat-error>
        </mat-select>
    </mat-form-field>
  `
})
export class SelectFieldComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() config: FieldConfig;
  controlConfig: SelectControlConfig;

  get f() { return this.formGroup.controls; }

  constructor() { }

  ngOnInit() {
    this.controlConfig = this.config.control as SelectControlConfig;
    if (this.controlConfig.choices) {
      const all_option = this.controlConfig.choices.find(el => el.value === 'All');
      if (all_option) {
        this.formGroup.get(this.config.name).setValue(all_option.value);
      }
    }
  }
}

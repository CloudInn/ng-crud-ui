import { Component, Input } from '@angular/core';
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
            <mat-option></mat-option>
            <mat-option [value]="c.value" *ngFor="let c of controlConfig.choices">
                {{ c.label }}
            </mat-option>
        </mat-select>
    </mat-form-field>
  `
})
export class SelectField  {

  @Input() formGroup: FormGroup;
  @Input() config: FieldConfig;
  controlConfig: SelectControlConfig;

  constructor() {

  }

  ngOnInit() {
      this.controlConfig = this.config.control as SelectControlConfig;
  }


}

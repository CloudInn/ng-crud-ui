import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldConfig, SelectControlConfig } from '../../models/metadata';
import { config } from 'rxjs';


@Component({
  selector: 'ng-crud-select-field',
  exportAs: 'ngcrudui-select-field',
  styleUrls: ['./select-field.component.scss'],
  template: `
    <mat-form-field [formGroup]="formGroup" >
        <mat-label>{{ config.label }}</mat-label>
        <mat-select attr.data-cy="{{config.label | getSelector}}-field" [multiple]="controlConfig.multiple" id="{{config?.name}}-field" panelClass="SelectClass" disableOptionCentering='true' 
        [required]="formGroup.controls[config.name].hasError('required')" [formControlName]="config.name">
            <mat-option *ngFor="let c of controlConfig?.choices" [value]="c['id']" id="{{c?.id}}-option">
                {{ c["description"] }}
            </mat-option>
        </mat-select>
        <mat-error *ngIf="f[config.name].hasError('required') && (f[config.name].dirty || f[config.name].touched)">this
            field is required</mat-error>
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

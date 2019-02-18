import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldConfig, SelectControlConfig } from '../../models/metadata';
import { PermissionsService } from '../../services/permissions.service';
import { PermissionType } from '../../models/permissions';


@Component({
  selector: 'ng-crud-select-field',
  exportAs: 'ngcrudui-select-field',
  styles: ['.form-field-wrapper{margin-right:  24px}'],
  template: `
    <mat-form-field [formGroup]="formGroup">
        <mat-label>{{ config.label }}</mat-label>
        <mat-select [formControlName]="config.name"
          [disabled]="!permissionsService.
          checkPermission(config?.permissions, mode === 'edit' ? permissionTypeEnum.update : permissionTypeEnum.read)">
            <mat-option></mat-option>
            <mat-option *ngFor="let c of controlConfig?.choices" [value]="c['value']">
                {{ c["label"] }}
            </mat-option>
        </mat-select>
    </mat-form-field>
  `
})
export class SelectFieldComponent implements OnInit  {

  @Input() formGroup: FormGroup;
  @Input() config: FieldConfig;
  @Input() mode: string;
  controlConfig: SelectControlConfig;
  permissionTypeEnum = PermissionType;

  constructor(public permissionsService: PermissionsService) { }

  ngOnInit() {
      this.controlConfig = this.config.control as SelectControlConfig;
  }
}

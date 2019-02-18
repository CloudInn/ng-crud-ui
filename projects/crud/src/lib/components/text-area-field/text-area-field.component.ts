import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldConfig, TextAreaControlConfig } from '../../models/metadata';
import { PermissionType } from '../../models/permissions';
import { PermissionsService } from '../../services/permissions.service';


@Component({
  selector: 'ng-crud-text-area-field',
  exportAs: 'ngcrudui-text-area-field',
  styles: ['.form-field-wrapper{margin-right:  24px}'],
  template: `<mat-form-field [formGroup]="formGroup">
      <mat-label>{{ config.label }}</mat-label>
      <textarea matInput matTextareaAutosize [formControlName]="config.name"
[readonly]="!permissionsService.checkPermission(config?.permissions, mode === 'edit' ? permissionTypeEnum.update : permissionTypeEnum.read)"
      [rows]="controlConfig?.rowSpan || 1"></textarea>
    </mat-form-field>
  `
})
export class TextAreaFieldComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() config: FieldConfig;
  @Input() mode: string;
  controlConfig: TextAreaControlConfig;
  permissionTypeEnum = PermissionType;

  constructor(public permissionsService: PermissionsService) {

  }

  ngOnInit() {
      this.controlConfig = this.config.control as TextAreaControlConfig;
  }

}

import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormControlName } from '@angular/forms';
import { Observable } from 'rxjs';
import { Metadata, FieldConfig } from '../../models/metadata';
import { PermissionType } from '../../models/permissions';
import { PermissionsService } from '../../services/permissions.service';

@Component({
  selector: 'ng-crud-form-field',
  templateUrl: './form-field.component.html',
  exportAs: 'ngcrudui-form-field',
  styles: ['.form-field-wrapper{margin-right:  24px}']
})
export class FormFieldComponent implements OnChanges {

  @Input() formGroup: FormGroup;
  @Input() forcedSearchParams: any = [];
  @Input() config: FieldConfig;
  @Input() choices = [];
  type = 'text';
  filteredOptions: Observable<any[]>;
  foreign_model?: Metadata;
  permissionTypeEnum = PermissionType;

  constructor(public permissionsService: PermissionsService) {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

}

import { PermissionType } from './../../models/permissions';
import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

import { FormService } from '../../services/form.service';
import { FieldConfig, FormSetControlConfig } from '../../models/metadata';
import { PermissionsService } from '../../services/permissions.service';

@Component({
  selector: 'ng-crud-formset',
  templateUrl: './formset.component.html',
  styleUrls: ['./formset.component.scss'],
  exportAs: 'ngcrudui-formset'
})
export class FormsetComponent implements OnChanges {

  @Input() formGroup: FormGroup;
  @Input() config: FieldConfig;
  @Input() mode: string;
  control: FormSetControlConfig;
  formArray: FormArray = new FormArray([]);
  choices = {};
  permissionTypeEnum = PermissionType;

  constructor(
    private formService: FormService,
    public permissionsService: PermissionsService,
    ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.config.firstChange) {
      this.control = this.config.control as FormSetControlConfig;
      this.formArray = this.formGroup.get(this.config.name) as FormArray;
    }
  }

  addForm() {
    const formGroup = this.formService.create(this.control.fields);
    this.formArray.push(formGroup);
  }

  trackByFn(index) {
    return index;
  }

}

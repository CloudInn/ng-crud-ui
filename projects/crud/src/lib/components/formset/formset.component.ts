import { Component, OnChanges, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

import { FormService } from '../../services/form.service';
import { FieldConfig, FormSetControlConfig } from '../../models/metadata';

@Component({
  standalone: false,
  selector: 'ng-crud-formset',
  templateUrl: './formset.component.html',
  styleUrls: ['./formset.component.scss'],
  exportAs: 'ngcrudui-formset'
})
export class FormsetComponent implements OnChanges {

  @Input() formGroup: FormGroup;
  @Input() config: FieldConfig;
  @Input() mode;
  control: FormSetControlConfig;
  subControl: FormSetControlConfig;
  formArray: FormArray = new FormArray([]);
  choices = {};

  constructor(private formService: FormService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.control = this.config.control as FormSetControlConfig;
    if (this.formGroup.get(this.config.name) !== null) {
      this.formArray = this.formGroup.get(this.config.name) as FormArray;
    }
    const hidden_field = this.getHiddenField();
    const group = this.formArray.controls[0] as FormGroup;
    if (group && hidden_field) {
      if (hidden_field?.equalsTo) {
        group.controls[hidden_field.name].patchValue(this.formGroup.get(hidden_field.equalsTo).value);
      }
      hidden_field.defaultValue = group.controls[hidden_field.name].value;
    }
  }
  getHiddenField(): FieldConfig {
    return this.control.fields.find(f => !f.isEditable && !f.isHidden);
  }

  addForm() {
    let formGroup;
    if(this.control.subFields) {
       formGroup = this.formService.create(this.control.subFields);
    } else {
     formGroup = this.formService.create(this.control.fields);
    }
    const hidden_field = this.getHiddenField();
    if(hidden_field) {
      formGroup.controls[hidden_field.name]?.patchValue(null);
    }
    this.formArray.push(formGroup);

  }

  delete(index) {
    this.formArray.removeAt(index);
  }

  trackByFn(index) {
    return index;
  }
}

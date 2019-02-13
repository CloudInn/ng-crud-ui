import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

import { FormService } from '../../services/form.service';
import { FieldConfig, FormSetControlConfig } from '../../models/metadata';

@Component({
  selector: 'ng-crud-formset',
  templateUrl: './formset.component.html',
  styleUrls: ['./formset.component.scss'],
  exportAs: 'ngcrudui-formset'
})
export class FormsetComponent implements OnChanges {

  @Input() formGroup: FormGroup;
  @Input() config: FieldConfig;
  control: FormSetControlConfig;
  formArray: FormArray = new FormArray([]);
  choices = {};

  constructor(private formService: FormService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.config.firstChange) {
      this.formArray = this.formGroup.get(this.config.name) as FormArray;
      this.control = this.config.control as FormSetControlConfig;
    }
  }

  addForm() {
    this.formArray.controls.push(this.formService.create(this.control.fields));
  }
}

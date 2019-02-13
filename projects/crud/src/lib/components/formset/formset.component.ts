import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

import { Registry } from '../../services/registry.service';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { FieldConfig, Metadata } from '../../models/metadata';
import { FormSetControlConfig } from 'crud/crud';

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

  constructor(private api: ApiService, private reg: Registry, private formService: FormService) {
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

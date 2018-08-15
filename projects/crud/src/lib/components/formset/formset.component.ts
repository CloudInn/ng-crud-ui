import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

import { Registry } from '../../services/registry.service';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { Field } from '../../forms';
import { FormsetConfig, Metadata } from '../../models/metadata';

@Component({
  selector: 'ng-crud-formset',
  templateUrl: './formset.component.html',
  styleUrls: ['./formset.component.scss'],
  exportAs: 'ngcrudui-formset'
})
export class FormsetComponent implements OnChanges {

  @Input() formGroup: FormGroup;
  @Input() config: FormsetConfig;
  formArray: FormArray = new FormArray([]);
  choices = {};

  constructor(private api: ApiService, private reg: Registry, private formService: FormService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.config.firstChange) {
      this.formArray = this.formGroup.get(this.config.name) as FormArray;
      // for (const field of changes.config.control.currentValue.fields) {
      //   if (field['control_type'] === 'foreign_key') {
      //     this.getChoices(field);
      //   }
      // }
    }
  }

  addForm() {
    this.formArray.controls.push(this.formService.create(this.config.fields));
  }

  getChoices(field: Field) {
    const path = field.foreign_model_path.split('.');
    // const model = this.reg.getModel(path[0], path[1], path[2]);
    // this.api.fetch(model.api, {}).subscribe(res => {
    //   this.choices[field.key] = res;
    //   console.log(this.choices);
    // });
  }
}

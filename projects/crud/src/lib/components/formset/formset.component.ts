import { Component, OnChanges, Input, SimpleChanges, SimpleChange } from '@angular/core';
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
  @Input() mode;
  control: FormSetControlConfig;
  formArray: FormArray = new FormArray([]);
  choices = {};

  constructor(private formService: FormService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.control = this.config.control as FormSetControlConfig;
    if (this.formGroup.get(this.config.name) !== null) {
      this.formArray = this.formGroup.get(this.config.name) as FormArray;
    }
  }

  addForm() {
    const formGroup = this.formService.create(this.control.fields);
    this.formArray.push(formGroup);
  }

delete(index){
  console.log(index);
  this.formArray.removeAt(index)
}

  trackByFn(index) {
    return index;
  }
}

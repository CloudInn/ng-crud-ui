import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { Field } from '../../forms';
import { FormsetConfigValue, FieldConfig } from '../../models/metadata';

@Component({
  selector: 'ng-crud-formset',
  templateUrl: './formset.component.html',
  styleUrls: ['./formset.component.scss'],
  exportAs: 'ngcrudui-formset'
})
export class FormsetComponent implements OnChanges {

  @Input() formGroup: FormGroup;
  @Input() config: FormsetConfigValue;
  @Input() mode: string;
  formArray: FormArray = new FormArray([]);
  simpleFormGroup = new FormGroup({});
  choices = {};

  constructor(private formService: FormService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.config.firstChange && changes.mode.firstChange) {
      // this.formArray = this.formGroup.get(this.config.name) as FormArray;
      this.simpleFormGroup.addControl(this.config.name, new FormArray([]));
      this.formArray = this.simpleFormGroup.get(this.config.name) as FormArray;
      if (changes.mode.currentValue === 'edit') {
        if (!this.config.values) {
          return;
        } else if (this.config.values && this.config.values.length !== 0) {
          this.config.values.forEach(v => {
            this.populateData(v, this.config.fields);
          });
        }
      }
    }
  }

  populateData(value, fields: FieldConfig[]) {
    const fg = this.formService.create(this.config.fields);
    fields.forEach(f => {
      if (fg.get(f.name)) {
        fg.get(f.name).setValue(value[f.name]);
      } else {
        // @todo handle error
      }
    });
    this.formArray.controls.push(fg);
    this.addToService();
  }

  addForm() {
    const fg = this.formService.create(this.config.fields);
    this.formArray.controls.push(fg);
    this.addToService();
  }

  addToService() {
    for (let i = 0; i < this.formService.formSets.length; i++) {
      if (this.formService.formSets[i].name === this.config.name) {
        this.formService.formSets.splice(i, 1);
      }
    }
    this.formService.formSets.push(
      {
        groups: this.formArray.controls,
        name: this.config.name,
      }
    );
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

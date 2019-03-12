import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

import { FormService } from '../../services/form.service';
import { FieldConfig, FormSetControlConfig, ForeignKeyControlConfig } from '../../models/metadata';
import { ApiService } from '../../services/api.service';

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

  constructor(private formService: FormService, private api: ApiService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.config.firstChange) {
      this.control = this.config.control as FormSetControlConfig;
      this.formArray = this.formGroup.get(this.config.name) as FormArray;
      this.fetchForeignKeysInitialChoices()
    }
  }

  addForm() {
    const formGroup = this.formService.create(this.control.fields);
    this.formArray.push(formGroup);
  }

  trackByFn(index) {
    return index;
  }

  fetchForeignKeysInitialChoices() {
    // get already selected values (ids) to ensure they are fetched in
    // the api
    let foreignKeys = this.control.fields.filter(f => f.type == 'foreignKey');
    for (let field of foreignKeys) {
      // for each foregin key, get the selected values
      let ids = [];
      for (let row of this.formArray.value) {
        if (row[field.name]) {
          ids.push(row[field.name]);
        }
      }
      // prepare endpoint url
      let control = field.control as ForeignKeyControlConfig;
      console.log(field.name)
      console.log(control.metadata);
      let url = `${control.metadata.api}`;
      if (ids.length > 0) {
        url += '?ids=' + ids.join(',');
      }
      this.api.fetch(url).subscribe(res => {
        // append the result to the choices map, the key is the field name
        this.choices[field.name] = res;
        console.log(this.choices);
      });
    }

  }
}

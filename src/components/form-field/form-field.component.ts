import { Component, OnChanges, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { ApiService, Registry, Model } from '../../services';
import { Field } from '../../forms';

@Component({
  selector: 'ngcrudui-form-field',
  templateUrl: './form-field.component.html'
})
export class FormFieldComponent implements OnChanges {

  @Input() form: AbstractControl;
  @Input() forcedSearchParams: any = [];
  @Input() field: Field;
  choices = [];
  foreign_model?: Model;

  constructor(private api: ApiService, private reg: Registry) {
  }

  ngOnChanges() {
    if (this.field.control_type === 'foreign_key') {
      const path = this.field.foreign_model_path.split('.');
      this.foreign_model = this.reg.getModel(path[0], path[1], path[2]);
      this.api.fetch(`${this.foreign_model.api}`, []).subscribe(res => {
        this.choices = res;
      });
    }
  }
}

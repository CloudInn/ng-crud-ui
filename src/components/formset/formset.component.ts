import { Component, OnChanges, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { ApiService, Registry, Model, FormService } from '../../services';
import { Field } from '../../forms';

@Component({
  selector: 'ngcrudui-formset',
  templateUrl: './formset.component.html'
})
export class FormsetComponent implements OnChanges {

  @Input() form: FormGroup;
  @Input() model: Model;
  @Input() formarray: FormArray;
  @Input() config: Field;

  constructor(private api: ApiService, private reg: Registry, private formService: FormService) {
  }

  ngOnChanges() {
  }
}

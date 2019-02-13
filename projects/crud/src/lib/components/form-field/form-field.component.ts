import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Metadata, FieldConfig } from '../../models/metadata';

@Component({
  selector: 'ng-crud-form-field',
  templateUrl: './form-field.component.html',
  exportAs: 'ngcrudui-form-field',
  styles: ['.form-field-wrapper{margin-right:  24px}']
})
export class FormFieldComponent implements OnChanges {

  @Input() formGroup: FormGroup;
  @Input() forcedSearchParams: any = [];
  @Input() config: FieldConfig;
  @Input() choices = [];
  type = 'text';
  filteredOptions: Observable<any[]>;
  foreign_model?: Metadata;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

}

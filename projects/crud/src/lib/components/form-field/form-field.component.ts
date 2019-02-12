import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { Registry } from '../../services/registry.service';
import { ApiService } from '../../services/api.service';
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

  constructor(private dialog: MatDialog, private api: ApiService, private reg: Registry) {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

}

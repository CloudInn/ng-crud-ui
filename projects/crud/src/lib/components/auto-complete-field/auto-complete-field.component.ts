import { Component, OnChanges, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, of as observableOf } from 'rxjs';
import { startWith, map} from 'rxjs/operators';

import { Registry } from '../../services/registry.service';
import { ApiService } from '../../services/api.service';
import { Metadata, FieldConfig } from '../../models/metadata';

@Component({
  selector: 'ng-crud-autocomplete',
  templateUrl: './auto-complete-field.component.html',
  exportAs: 'ngcrudui-autocomplete'
})
export class AutoCompleteFieldComponent implements OnChanges {

  @Input() field: FieldConfig;
  @Input() foreign_model: Metadata;
  @Input() form: FormGroup;
  @Input() metadata: Metadata;
  @Input() choices: any[] = [];
  @Input() forcedSearchParams: any;
  dataSource: any[] = new Array();
  searchParams: {};
  filteredOptions: Observable<any[]>;
  ctrl: FormControl;

  constructor(private api: ApiService, private reg: Registry) {
  }

   ngOnChanges() {
     if (!this.foreign_model) {
       return;
     }
      this.searchParams = {page: 1};
      this.ctrl = this.form.get(this.field.name) as FormControl;
      console.log('foreign key value', this.ctrl.value);
      this.filteredOptions = observableOf(this.choices);
      this.filteredOptions = this.ctrl.valueChanges.pipe(
        startWith(''),
        map((val: string) => this.filter(val))
      );
      // this.api.fetch(this.model.api, this.searchParams).subscribe(res => {
      //   this.dataSource.push(res['results']);
      // });
   }

   filter(text: string): any[] {
    return this.choices.filter(option => {
      console.log(text);
      const val = option[this.foreign_model.externalNameField];
      return val ? val.toLowerCase().indexOf(text.toLowerCase()) === 0 : false;
    });
   }

   valueFormatter(data: any): string {
      return `(${data[this.metadata.externalValueField]}) ${data[this.metadata.externalNameField]}`;
    }

  displayWith(foreign_model: Metadata) {
    return (item: any): string => {
      return item[foreign_model.externalNameField];
    };
  }
}

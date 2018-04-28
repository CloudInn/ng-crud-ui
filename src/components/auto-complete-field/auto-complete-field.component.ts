import { Component, OnChanges, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import 'rxjs/add/observable/of';
import { ApiService, Registry, Model } from '../../services';
import { Field } from '../../forms';

@Component({
  selector: 'ngcrudui-autocomplete',
  templateUrl: './auto-complete-field.component.html'
})
export class AutoCompleteFieldComponent implements OnChanges {

  @Input() model: Model;
  @Input() field: Field;
  @Input() foreign_model: Model;
  @Input() form: FormGroup;
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
      this.ctrl = this.form.get(this.field.key) as FormControl;
      console.log('foreign key value', this.ctrl.value);
      this.filteredOptions = Observable.of(this.choices);
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
      const val = option[this.foreign_model.external_name_field];
      return val ? val.toLowerCase().indexOf(text.toLowerCase()) === 0 : false;
    });
   }

   valueFormatter(data: any): string {
      return `(${data[this.model.external_value_field]}) ${data[this.model.external_name_field]}`;
    }

  displayWith(foreign_model) {
    return (item: any): string => {
      return item[foreign_model.external_name_field];
    };
  }
}

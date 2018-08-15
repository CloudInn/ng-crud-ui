import { Component, OnChanges, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map, startWith, debounceTime, distinctUntilChanged, switchMap, take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { Registry } from '../../services/registry.service';
import { ApiService } from '../../services/api.service';
import { FieldConfig, Metadata } from '../../models/metadata';
import { ListingDialogComponent } from '../../containers/listing-dialog/listing-dialog.component';

@Component({
  selector: 'ng-crud-foreign-key-field',
  templateUrl: './foreign-key-field.component.html'
})
export class ForeignKeyFieldComponent implements OnChanges {

  @Input() formGroup: FormGroup;
  @Input() forcedSearchParams: any = [];
  @Input() config: FieldConfig;
  @Input() initialChoices: any[];
  // choices = [];
  filteredOptions: Observable<any[]>;

  constructor(private api: ApiService, private dialog: MatDialog) {
    this.displayFn = this.displayFn.bind(this);
  }

  //   ngOnInit() {
  //   }

  ngOnChanges() {
    if (!this.formGroup) {
      return;
    }
    if (!this.initialChoices) {
      this.fetch();
    }
    const ctrl = this.formGroup.get(this.config.name);
    this.filteredOptions = ctrl.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(val => this._filter(val || null))
    );
  }

  fetch() {
    this.api.fetch(`${this.config.control.metadata.api}`, []).subscribe(res => {
      this.filteredOptions = of(res);
    });
  }

  displayFn(option) {
    let result = null;
    this.filteredOptions.pipe(take(1)).forEach(items => {
      const item = items.filter(i => i['id'] === option)[0];
      if (item) {
        result = item[this.config.control.metadata.externalNameField];
      }
    });
    return result;
    // for (const c of this.choices) {
    //   if (c['id'] === option) {
    //     return c[this.config.control.metadata.externalNameField];
    //   }
    // }
  }

  _filter(value: string): Observable<any[]> {
    console.log('called filter', value);
    if ((typeof value) !== 'string') {
      return new Observable();
    }
    const filterValue = value ? value.toLowerCase() : null;
    const params = {};
    params[this.config.control.metadata.externalNameField] = filterValue;
    return this.api.fetch(`${this.config.control.metadata.api}`, params).pipe(
      map(res => {
        console.log(res);
          // this.filteredOptions = of(res);
          return res;
      })
    );
    // return this.choices.filter(option => option.code.toLowerCase().indexOf(filterValue) === 0);
  }

  openListingDialog() {
    const ref = this.dialog.open(ListingDialogComponent, {
      width: '90%',
      height: '90%',
      data: {
        viewConfig: this.config.control.viewConfig,
        // metadata: this.foreign_model,
      }
    });
    ref.afterClosed().subscribe(value => {
      if (value) {
        this.formGroup.get(this.config.name).setValue(value);
      }
    });
  }

  removeSelection() {
    this.formGroup.get(this.config.name).setValue(null);
  }
}

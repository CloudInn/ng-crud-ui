import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { FormControl, AbstractControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { Registry } from '../../services/registry.service';
import { ApiService } from '../../services/api.service';
import { Metadata, FieldConfig } from '../../models/metadata';
import { ListingDialogComponent } from '../../containers/listing-dialog/listing-dialog.component';


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
  private modelPath: string[] = [];

  constructor(private dialog: MatDialog, private api: ApiService, private reg: Registry) {
    this.displayFn = this.displayFn.bind(this);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.config.control && this.config.control.type === 'foreignKey') {
      // FOREIGN_MODEL = this.foreign_model;
      // if (this.choices) {
      //   this.filteredOptions = of(this.choices);
      // }
      // this.api.fetch(`${this.foreign_model.api}`, []).subscribe(res => {
      //   this.choices = res;
      //   CHOICES = res;
      // });
      this.foreign_model = this.config.control.metadata;
      const ctrl = this.formGroup.get(this.config.name);
      this.filteredOptions = ctrl.valueChanges.pipe(
        startWith(''),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(val => this._filter(val || null))
      );
      // if (this.form.value[this.field.key]) {
      //   console.log('setting ctrl value', this.form.value[this.field.key]);
      //   ctrl.setValue(this.form.value[this.field.key]);
      // }
    } else if (this.config.control && this.config.control.type === 'select') {
      this.type = this.config.control.type;
      this.choices = this.config.control.choices;
    }

    this.type = this.config.control && this.config.control.type ? this.config.control.type : 'text';
  }

  getFormControl(field_name: string): FormControl {
    return this.formGroup.get(field_name) as FormControl;
  }

  displayFn(option) {
    for (const c of this.choices) {
      if (c['id'] === option) {
        return c[this.foreign_model.externalNameField];
      }
    }
    // return option ? option.code : option;
  }

  _filter(value: string): Observable<any[]> {
    if ((typeof value) !== 'string') {
      return new Observable();
    }
    const filterValue = value ? value.toLowerCase() : null;
    const params = {};
    params[this.foreign_model.externalNameField] = filterValue;
    return this.api.fetch(`${this.foreign_model.api}`, params).pipe(
      map(res => {
          this.choices = res;
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
}

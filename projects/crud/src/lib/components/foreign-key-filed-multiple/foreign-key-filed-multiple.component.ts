import { Component, OnInit, ElementRef, ViewChild, Input, OnChanges } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject, of } from 'rxjs';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { startWith, map } from 'rxjs/operators';
import { FieldConfig, ForeignKeyControlConfig } from '../../models/metadata';
import { HttpParams } from '@angular/common/http';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'ng-foreign-key-filed-multiple',
  templateUrl: './foreign-key-filed-multiple.component.html',
  styleUrls: ['./foreign-key-filed-multiple.component.css']
})
export class ForeignKeyFiledMultipleComponent implements OnInit, OnChanges {

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filtered: Observable<any[]>;
  selected_results: string[] = [];
  results: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput', { static: false }) fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  @Input() formGroup: FormGroup;
  @Input() mode: string;
  @Input() config: FieldConfig;
  @Input() reset: Subject<any>;
  controlConfig: ForeignKeyControlConfig = null;
  _underlyingCtrl = new FormControl(null);

  constructor(private api: ApiService) { this.displayFn = this.displayFn.bind(this); }

  ngOnInit() {
    this.filtered = this._underlyingCtrl.valueChanges.pipe(
      startWith(null),
      map((elem: string | null) => elem ? this._search(elem) : this.results.slice()));
  }

  ngOnChanges() {

    if (!this.formGroup) {
      return;
    }
    if (this.reset) {
      this.reset.subscribe(res => {
        if (res.reset) {
          this.removeSelection();
        }
      });
    }
    this.controlConfig = this.config.control as ForeignKeyControlConfig;
    if (this.formGroup.get(this.config.name)) {
      let ctrl;
      if (this.mode === 'search' && this.config.keyOnSearch) {
        ctrl = this.formGroup.get([this.config.keyOnSearch]) as FormControl;
      } else {
        ctrl = this.formGroup.get([this.config.name]) as FormControl;
      }
      if (ctrl.value !== null) {
        this._setControlValue(ctrl.value);
        this._underlyingCtrl.setValue(ctrl.value);
      }
      this._underlyingCtrl.valueChanges.subscribe(value => {
        if ((typeof value) === 'string') {
          this._filter(value).subscribe(res => {
            if (res.results) {
              const keys = this.controlConfig.metadata.search_key;
              let value = res.results[keys[0]]; // search_key is an array of keys
              for (let i = 1; i < keys.length; i++) {
                value = value[keys[i]];
              }
              this.filtered = of(value);
            } else {
              this.filtered = of(res);
            }
          });
        }
      });
    }
    this.fetch();
  }

  fetch() {
    const url = `${this.controlConfig.metadata.api}`;
    this.api.fetch(url).subscribe(res => {
      if (res.results) {
        const keys = this.controlConfig.metadata.search_key;
        if (keys) {
          let value = res.results[keys[0]]; // search_key is an array of keys
          for (let i = 1; i < keys.length; i++) {
            value = value[keys[i]];
          }
          this.filtered = of(value);
        }
      } else {
        this.filtered = of(res);
      }
    });
  }

  removeSelection() {
    this._underlyingCtrl.setValue(null);
    this.selected_results = [];
  }

  _filter(value: string): Observable<any> {
    let params = new HttpParams();
    if (this.controlConfig.metadata.filter && value !== '') {
      params = params.append(`filter{${this.controlConfig.metadata.searchParam}}`, value.toLowerCase());
    }
    return this.api.fetch(`${this.controlConfig.metadata.api}`, params).pipe(
      map(res => {
        return res;
      })
    );
  }

  _setControlValue(value: any) {
    let ctrl;
    if (this.mode === 'search' && this.config.keyOnSearch) {
      ctrl = this.formGroup.get([this.config.keyOnSearch]);
    } else {
      ctrl = this.formGroup.get([this.config.name]);
    }
    const values = [];
    if (value !== null && value !== '') {
      value.forEach(val => {
        values.push(val);
      });
      this.selected_results = [...value];
      if (this.mode === 'search' && this.config.keyOnSearch) {
        const new_values = values.map(val => {
          return val[this.config.resolveValueFrom];
        });
        const string_values = new_values.join('|');
        ctrl.setValue(string_values);
      } else {
        ctrl.setValue(values);
      }
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our elem
    if ((value || '').trim()) {
      this.selected_results.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(elem: string): void {
    const index = this.selected_results.indexOf(elem);

    if (index >= 0) {
      this.selected_results.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selected_results.push(event.option.value);
    this.fruitInput.nativeElement.value = '';
    this._setControlValue(this.selected_results);
  }

  displayFn(option) {
    return option ? option.name ?
      option.name : this.config.displayFrom ?
        option[this.config.displayFrom[0]] : option.id : null;
  }
  private _search(value: string): string[] {
    if (value && typeof (value) === 'string') {
      const filterValue = value.toLowerCase();
      return this.results.filter(elem => elem.toLowerCase().indexOf(filterValue) === 0);
    }
  }
}

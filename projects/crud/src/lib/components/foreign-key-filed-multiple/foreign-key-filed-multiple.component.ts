import { Component, OnInit, ElementRef, ViewChild, Input, OnChanges } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject, of } from 'rxjs';
import { MatAutocomplete, MatChipInputEvent, MatAutocompleteSelectedEvent, MatDialog } from '@angular/material';
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

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  @Input() formGroup: FormGroup;
  @Input() config: FieldConfig;
  @Input() reset: Subject<any>;
  controlConfig: ForeignKeyControlConfig = null;
  _underlyingCtrl = new FormControl(null);

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.filtered = this._underlyingCtrl.valueChanges.pipe(
      startWith(null),
      map((elem: string | null) => elem ? this._search(elem) : this.results.slice()));
  }

  ngOnChanges() {

    if (!this.formGroup) {
      return;
    }
    this.reset.subscribe(res => {
      if (res.reset) {
        this.removeSelection();
      }
    });
    this.controlConfig = this.config.control as ForeignKeyControlConfig;
    const ctrl = this.formGroup.get([this.config.name]) as FormControl;
    this._underlyingCtrl.valueChanges.subscribe(value => {
      if ((typeof value) === 'string') {
        this._filter(value).subscribe(res => {
          if (res.results) {
            const keys = this.controlConfig.metadata.filter_key;
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
    this.fetch();
    this._setControlValue(this.selected_results.length > 0 ? this.selected_results : null);
  }

  fetch() {
    const url = `${this.controlConfig.metadata.api}`;
    this.api.fetch(url).subscribe(res => {
      if (res.results) {
        const keys = this.controlConfig.metadata.filter_key;
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

  removeSelection() {
    this._underlyingCtrl.setValue(null);
    this.selected_results = [];
  }

  _filter(value: string): Observable<any> {
    let params = new HttpParams();
    if (this.controlConfig.metadata.filter && value !== '') {
      params = params.append(`filter{${this.controlConfig.metadata.externalNameField}}`, value.toLowerCase());
    }
    return this.api.fetch(`${this.controlConfig.metadata.api}`, params).pipe(
      map(res => {
        return res;
      })
    );
  }

  _setControlValue(value: any) {
    const ctrl = this.formGroup.get([this.config.name]);
    if (this.config.resolveValueFrom) {
      const resolvedControl = this.formGroup.get([this.config.resolveValueFrom]);
      resolvedControl.setValue(value);
    }

    ctrl.setValue(value);
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
    this.selected_results.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this._setControlValue(this.selected_results);
  }

  private _search(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.results.filter(elem => elem.toLowerCase().indexOf(filterValue) === 0);
  }
}

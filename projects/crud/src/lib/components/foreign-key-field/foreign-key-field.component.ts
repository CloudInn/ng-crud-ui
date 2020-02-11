import { Component, OnChanges, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { ApiService } from '../../services/api.service';
import { FieldConfig, ForeignKeyControlConfig } from '../../models/metadata';
import { ListingDialogComponent } from '../../containers/listing-dialog/listing-dialog.component';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'ng-crud-foreign-key-field',
  exportAs: 'ngcrudui-foreign-key',
  templateUrl: './foreign-key-field.component.html',
  styles: ['.input_icon{color: rgba(165, 151, 151, 0.87);height: 16px !important;cursor: pointer;margin-left: -20px;}']
})
export class ForeignKeyFieldComponent implements OnChanges {

  @Input() formGroup: FormGroup;
  @Input() forcedSearchParams: any = [];
  @Input() config: FieldConfig;
  @Input() initialChoices: any[];
  @Input() reset: Subject<any>;
  controlConfig: ForeignKeyControlConfig = null;
  availableOptions: Observable<any[]>;
  _underlyingCtrl = new FormControl(null);

  constructor(private api: ApiService, private dialog: MatDialog) {
    this.displayFn = this.displayFn.bind(this);
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
            this.availableOptions = of(value);
          } else {
            this.availableOptions = of(res);
          }
        });
      } else if (value != null) {
        this._setControlValue(value[this.controlConfig.metadata.externalValueField]);
      } else {
        this._setControlValue(null);
      }
    });
    if (!this.initialChoices) {
      if (ctrl.value) {
        this.fetchById(ctrl.value);
      } else {
        this.fetch();
      }
    }

  }

  fetchById(id: number | string = null) {
    let url = `${this.controlConfig.metadata.api}`;
    if (id != null) {
      url += `/${id}`;
    }
    this.api.fetch(url).subscribe(res => {
      this.availableOptions = of([res]);
      this._underlyingCtrl.setValue(res);
    });
  }

  fetch() {
    const url = `${this.controlConfig.metadata.api}`;
    this.api.fetch(url).subscribe(res => {
      this.availableOptions = of(res);
    });
  }

  displayFn(option) {
    if (option == null) {
      return;
    }
    if (this.controlConfig.metadata.filter_key) {
      const keys = this.controlConfig.metadata.filter_key;
      let value = option[this.controlConfig.metadata.optionName][keys[0]]; // search_key is an array of keys
      for (let i = 1; i < keys.length; i++) {
        value = value[keys[i]];
      }
      return value;
    } else {
      return option[this.controlConfig.metadata.optionName];
    }
  }

  _filter(value: string): Observable<any> {
    const filterValue = value ? value : '';
    let params = new HttpParams();
    if (this.controlConfig.metadata.filter) {
      params = params.append(`filter{${this.controlConfig.metadata.externalNameField}}`, filterValue.toLowerCase());
    } else {
      params = params.append(this.controlConfig.metadata.externalNameField, filterValue.toLowerCase());
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

  openListingDialog(event) {
    const ref = this.dialog.open(ListingDialogComponent, {
      width: '90%',
      height: '90%',
      data: {
        viewConfig: this.controlConfig.viewConfig,
      }
    });
    ref.afterClosed().subscribe(result => {
      if (result && result.value) {
        this.availableOptions = of(result.dataSource);
        this._underlyingCtrl.setValue(result.value);
      }
    });
  }

  removeSelection() {
    this._underlyingCtrl.setValue(null);
  }
}

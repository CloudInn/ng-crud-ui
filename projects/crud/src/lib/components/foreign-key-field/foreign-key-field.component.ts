import { Component, OnChanges, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable ,  of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { ApiService } from '../../services/api.service';
import { FieldConfig, ForeignKeyControlConfig } from '../../models/metadata';
import { ListingDialogComponent } from '../../containers/listing-dialog/listing-dialog.component';

@Component({
  selector: 'ng-crud-foreign-key-field',
  exportAs: 'ngcrudui-foreign-key',
  templateUrl: './foreign-key-field.component.html'
})
export class ForeignKeyFieldComponent implements OnChanges {

  @Input() formGroup: FormGroup;
  @Input() forcedSearchParams: any = [];
  @Input() config: FieldConfig;
  @Input() initialChoices: any[];
  @Input() mode: string;
  controlConfig: ForeignKeyControlConfig = null;
  availableOptions: Observable<any[]>;
  _underlyingCtrl = new FormControl(null);

  constructor(private api: ApiService, private dialog: MatDialog) {
    this.displayFn = this.displayFn.bind(this);
  }

  ngOnChanges() {
    if (!this.formGroup || !this.controlConfig) {
      return;
    }
    this.controlConfig = this.config.control as ForeignKeyControlConfig;
    const ctrl = this.formGroup.get(this.config.name) as FormControl;
    this._underlyingCtrl.valueChanges.subscribe(value => {
      if ((typeof value) === 'string') {
        this._filter(value).subscribe(res => {
          this.availableOptions = of(res);
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
    if (option == null ) {
      return;
    }
    return option[this.controlConfig.metadata.externalNameField];
  }

  _filter(value: string): Observable<any[]> {
    const filterValue = value ? value : '';
    const params = {};
    params[this.controlConfig.metadata.externalNameField] = filterValue;
    return this.api.fetch(`${this.controlConfig.metadata.api}`, params).pipe(
      map(res => {
        return res;
      })
    );
  }

  _setControlValue(value: any) {
    const ctrl = this.formGroup.get(this.config.name);
    if (this.config.resolveValueFrom) {
      const resolvedControl = this.formGroup.get(this.config.resolveValueFrom);
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
      if (result.value) {
        this.availableOptions = of(result.dataSource);
        this._underlyingCtrl.setValue(result.value);
      }
    });
  }

  removeSelection() {
    this._underlyingCtrl.setValue(null);
  }
}

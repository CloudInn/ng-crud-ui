import { Component, OnChanges, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable ,  of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

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
  availableOptions: Observable<any[]>;
  _underlyingCtrl = new FormControl(null);

  constructor(private api: ApiService, private dialog: MatDialog) {
    this.displayFn = this.displayFn.bind(this);
  }

  ngOnChanges() {
    if (!this.formGroup) {
      return;
    }
    const ctrl = this.formGroup.get(this.config.name) as FormControl;
    this._underlyingCtrl.valueChanges.subscribe(res => {
      if ((typeof res) === 'string') {
        this._filter(res).subscribe(res => {
          this.availableOptions = of(res);
        });
      } else if (res != null) {
        this._setControlValue(res[this.config.control.metadata.externalValueField]);
      } else {
        this._setControlValue(null);
      }
    });
    if (!this.initialChoices) {
      if(ctrl.value) {
        this.fetchById(ctrl.value);
      } else {
        this.fetch();
      }
    }
    
  }

  fetchById(id: number | string = null) {
    let url = `${this.config.control.metadata.api}`
    if (id != null) {
      url += `/${id}`
    }
    this.api.fetch(url).subscribe(res => {
      this.availableOptions = of([res]);
      this._underlyingCtrl.setValue(res);
    });
  }

  fetch() {
    let url = `${this.config.control.metadata.api}`
    this.api.fetch(url).subscribe(res => {
      this.availableOptions = of(res);
    });
  }

  displayFn(option) {
    if (option == null ) return;
    return option[this.config.control.metadata.externalNameField];
  }

  _filter(value: string): Observable<any[]> {
    const filterValue = value ? value : '';
    const params = {};
    params[this.config.control.metadata.externalNameField] = filterValue;
    return this.api.fetch(`${this.config.control.metadata.api}`, params).pipe(
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
        viewConfig: this.config.control.viewConfig,
      }
    });
    ref.afterClosed().subscribe(value => {
      if (value) {
        this.formGroup.get(this.config.name).setValue(value);
      }
    });
  }

  removeSelection() {
    this._underlyingCtrl.setValue(null);
  }
}

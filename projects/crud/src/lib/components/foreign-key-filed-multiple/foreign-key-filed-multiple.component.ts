import { Component, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { FieldConfig, ForeignKeyControlConfig } from '../../models/metadata';
import { HttpParams } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ListingDialogComponent } from '../../containers/listing-dialog/listing-dialog.component';

@Component({
  standalone: false,
  selector: 'ng-foreign-key-filed-multiple',
  templateUrl: './foreign-key-filed-multiple.component.html',
  styleUrls: ['./foreign-key-filed-multiple.component.css']
})
export class ForeignKeyFiledMultipleComponent implements OnChanges {

  visible = true;
  options$ = new BehaviorSubject<any[]>([]);
  selectedOptions = [];

  @Input() formGroup: FormGroup;
  @Input() mode: string;
  @Input() config: FieldConfig;
  @Input() reset: Subject<any>;
  controlConfig: ForeignKeyControlConfig = null;
  _underlyingCtrl = new FormControl(null);
  currentControl: FormControl;

  constructor(private api: ApiService, private dialog: MatDialog) { }


  ngOnChanges(): void {
    if (!this.formGroup) {
      return;
    }
    if (this.reset) {
      this.reset.subscribe(res => {
        if (res.reset) {
          this.selectedOptions = [];
        }
      });
    }
    this.controlConfig = this.config.control as ForeignKeyControlConfig;

    if (this.formGroup.get(this.config.name) || this.formGroup.get([this.config.keyOnSearch])) {
      if (this.mode === 'search' && this.config.keyOnSearch) {
        this.currentControl = this.formGroup.get([this.config.keyOnSearch]) as FormControl;
      } else {
        this.currentControl = this.formGroup.get([this.config.name]) as FormControl;
      }
    }
    this.fetch();
  }

  fetch(value?: string): void {
    const apiUrl = this.controlConfig.metadata.api;
    let params = new HttpParams();
    if (this.controlConfig.metadata.includeParams) {
      this.controlConfig.metadata.queryParams.forEach((field) => {
        params = params.append('include[]', field);
      });
    }
    if (this.controlConfig.metadata.filter && value && value !== '') {
      params = params.append(`filter{${this.controlConfig.metadata.searchParam}.icontains}`, value.toLowerCase());
    }
    this.api.fetch(apiUrl, params).subscribe(response => {
      if (response.results) {
        const keys = this.controlConfig.metadata.filter_key;
        if (keys) {
          let valueByKey = response.results[keys[0]]; // search_key is an array of keys
          for (let i = 1; i < keys.length; i++) {
            valueByKey = valueByKey[keys[i]];
          }
          this.options$.next(valueByKey);
        }
      } else {
        this.options$.next(response);
      }
      let defaultVal = this.currentControl?.value;
      if (defaultVal) {
        if (!Array.isArray(defaultVal)) {
          defaultVal = [defaultVal];
        }
        defaultVal = defaultVal.map(val => val[this.config.resolveValueFrom] ? val[this.config.resolveValueFrom] : val);
        this.setFormControlValue(defaultVal);
      }
    });
  }

  selected(event): void {
    this.setFormControlValue([...event]);
  }

  openListingDialog(event: Event) {
    event.stopPropagation();
    const ref = this.dialog.open(ListingDialogComponent, {
      width: '90%',
      height: '90%',
      data: {
        viewConfig: { ...this.controlConfig.viewConfig, dialog_mode: true },
      },
      disableClose: false
    });
    ref.afterClosed().subscribe(result => {
      if (result && result.value) {
        const selectedFromPopUp = result.value[this.config.resolveValueFrom];
        this.setFormControlValue([...this.selectedOptions, selectedFromPopUp]);
      }
    });
  }

  setFormControlValue(value: unknown[]): void {
    this.selectedOptions = value;
    this._underlyingCtrl.setValue(value);
    this.currentControl.setValue(this.selectedOptions.map(option => {
      return { [this.config.resolveValueFrom]: option };
    }
    ));
  }
}

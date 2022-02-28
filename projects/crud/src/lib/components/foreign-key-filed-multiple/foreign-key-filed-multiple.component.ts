import { Component, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { FieldConfig, ForeignKeyControlConfig } from '../../models/metadata';
import { HttpParams } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ListingDialogComponent } from '../../containers/listing-dialog/listing-dialog.component';

@Component({
  selector: 'ng-foreign-key-filed-multiple',
  templateUrl: './foreign-key-filed-multiple.component.html',
  styleUrls: ['./foreign-key-filed-multiple.component.css']
})
export class ForeignKeyFiledMultipleComponent implements OnChanges {

  visible = true;
  options$ = new Subject<any[]>();
  selectedOptions = [];

  @Input() formGroup: FormGroup;
  @Input() mode: string;
  @Input() config: FieldConfig;
  @Input() reset: Subject<any>;
  controlConfig: ForeignKeyControlConfig = null;
  _underlyingCtrl = new FormControl(null);

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

    if (this.formGroup.get(this.config.name)) {
      let ctrl;
      if (this.mode === 'search' && this.config.keyOnSearch) {
        ctrl = this.formGroup.get([this.config.keyOnSearch]) as FormControl;
      } else {
        ctrl = this.formGroup.get([this.config.name]) as FormControl;
      }
      if (ctrl.value !== null) {
        this.selectedOptions.push(ctrl.value);
        this._underlyingCtrl.setValue([ctrl.value]);
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
    });
  }

  selected(event): void {
    this.selectedOptions = [...event];
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
        this._underlyingCtrl.setValue([selectedFromPopUp]);
        this.selectedOptions.push(selectedFromPopUp);
      }
    });
  }
}

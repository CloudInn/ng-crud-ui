import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ApiService, Registry } from '../../services';

import { FieldType, Field } from '../../forms';

@Component({
  selector: 'ngcrudui-formset',
  templateUrl: './formset.component.html'
})
export class FormsetComponent implements OnChanges {

    @Input() appName: string;
    @Input() modelName: string;
    @Input() label: string;
    @Input() internalNgModel: any = null;
    model: any;
    fieldType: typeof FieldType = FieldType;
    fields: Field[] = [];
    choices = {};
    @Output() onSubmit = new EventEmitter<any>();

    constructor(private api: ApiService,
                private reg: Registry) {}

    ngOnChanges() {
        if (!this.appName || !this.modelName) {
            return;
        }
        this.model = this.reg.getModel(this.appName, this.modelName).model;
        this.fields = this.model.fields;

        this.model.fields.filter(f => f.type === FieldType.ForeignKey).map(f => {
            this.api.fetch(`${f.foreign_model.api}`, []).subscribe(res => {
                this.choices[f.key] = res;
            });
        });
        const api = `${this.model.api}`;
        if (this.internalNgModel != null) {
            return;
        }
        this.api.fetch(api, {}).subscribe(res => {
            if (res.length === 0) {
                this.internalNgModel = [this.model.fields.reduce((m, f) => {
                    m[f.key] = null;
                    return m;
                }, {})];
            } else {
                this.internalNgModel = res;
            }
        }, err => {
            this.internalNgModel = [this.model.fields.reduce((m, f) => {
                m[f.key] = null;
                return m;
            }, {})];
        });
    }

    _onAdd() {
        this.internalNgModel.push(this.model.fields.reduce((m, f) => {
            m[f.key] = null;
            return m;
        }, {}));
    }

    _onSubmit() {
        this.onSubmit.emit(this.internalNgModel);
    }

}

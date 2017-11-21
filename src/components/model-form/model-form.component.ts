import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ApiService, Registry } from '../../services';

import { FieldType, Field } from '../../forms';

@Component({
  selector: 'ngcrudui-model-form',
  templateUrl: './model-form.component.html'
})
export class ModelFormComponent implements OnChanges {

    @Input() module: string;
    @Input() appName: string;
    @Input() modelName: string;
    @Input() mode = 'search';
    @Input() id: number = null;;
    ngModel: any = {};
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
        if (this.model === 'search') {
            this.fields = this.model.fields.filter(f => f.is_searchable === true);
        } else {
            this.fields = this.model.fields;
        }

        this.model.fields.filter(f => f.type === FieldType.ForeignKey).map(f => {
            this.api.fetch(`${f.foreign_model.api}`, []).subscribe(res => {
                this.choices[f.key] = res;
            });
        });
        if (this.mode === 'edit') {
            const api = `${this.model.api}${this.id}`;
            this.api.fetch(api, {}).subscribe(res => {
                this.ngModel = res;
            });
        } else {
            this.ngModel = this.model.fields.reduce((m, f) => {
                m[f.key] = null;
                return m;
            }, {});
        }
    }

    _onSubmit() {
        this.onSubmit.emit(this.ngModel);
    }

}

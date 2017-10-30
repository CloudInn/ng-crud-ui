import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ApiService, Registry } from '../../services';

import { FieldType, Field } from '../../base-model.model';

@Component({
  selector: 'ngcrudui-model-form',
  templateUrl: './model-form.component.html'
})
export class ModelFormComponent implements OnInit {

    @Input() appName: string;
    @Input() modelName: string;
    @Input() id: number;
    ngModel: any = {};
    model: any;
    fieldType: typeof FieldType = FieldType;
    editableFields: Field[] = [];

    constructor(private api: ApiService,
                private reg: Registry,
    ) {
    }

   ngOnInit() {
        this.model = this.reg.getModel(this.appName, this.modelName).model;
        this.editableFields = this.model.fields.filter(f => f.is_editable === true);
        this.ngModel = this.model.getModel();
        if (this.id) {
            this.api.fetch(`${this.model.api}${this.id}/`, []).subscribe(res => {
                this.ngModel = res;
            });
        }
   }

}

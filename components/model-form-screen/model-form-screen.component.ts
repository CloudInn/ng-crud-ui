import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ApiService, Registry } from '../../services';

import { FieldType, Field } from '../../forms';

@Component({
  selector: 'ngcrudui-model-form-screen',
  templateUrl: './model-form-screen.component.html'
})
export class ModelFormScreenComponent implements OnInit {

    private module: string;
    private appName: string;
    private modelName: string;
    private id: any = null;
    mode = 'create';
    ngModel: any = {};
    model: any;
    fieldType: typeof FieldType = FieldType;
    editableFields: Field[] = [];
    choices = {};

    constructor(private api: ApiService,
                private reg: Registry,
                private router: Router,
                private route: ActivatedRoute,
                private snackbar: MatSnackBar,
    ) {}

    ngOnInit() {
        this.route.parent.params.subscribe(params => {
            this.module = params['module'];
            this.appName = params['app'];
        });
        this.route.params.subscribe(params => {
            this.modelName = params['model_name'];
            this.model = this.reg.getModel(this.appName, this.modelName).model;
            this.id = params['id'];
            if (this.id != null && this.id !== 'new') {
                this.mode = 'edit';
            }
        });
   }

    onSubmit(e) {
        let req: Observable<any> = null;
        if (this.mode === 'edit') {
            req = this.api.put(this.model.api + this.id + '/', e);
        } else {
            req = this.api.post(this.model.api, e);
        }
        req.subscribe(res => {
            this.snackbar.open('Saved Successfully', 'Dismiss');
            this.router.navigate([this.module, this.appName, this.modelName]);
        }, err => {
            this.snackbar.open('Failed to save', 'Dismiss');
        });
   }

}

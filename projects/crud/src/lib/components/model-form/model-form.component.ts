import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { FieldConfig, FormSetControlConfig } from '../../models/metadata';
import { FormViewer } from '../../models/views';
import { HttpParams } from '@angular/common/http';

@Component({
    selector: 'ng-crud-model-form',
    templateUrl: './model-form.component.html',
    styleUrls: ['./model-form.component.scss'],
    exportAs: 'ngcrudui-model-form'
})
export class ModelFormComponent implements OnInit {

    @Input() viewConfig: FormViewer;
    @Input() mode = 'search';
    @Input() id?: number | 'new' = null;
    @Output() submit = new EventEmitter<any>();
    formGroup: FormGroup = new FormGroup({});
    formsets: FieldConfig[] = [];
    is_ready = false;
    controlsConfig: FieldConfig[] = [];
    actions: {};
    submitButtonText = 'Search';
    _visibleControls: FieldConfig[] = [];

    constructor(
        private api: ApiService,
        private formService: FormService,
    ) {

    }
    ngOnInit() {
        this.controlsConfig = this.viewConfig.controls;
        this._visibleControls = this.controlsConfig.filter(c => c.isHidden !== true);
        this.formGroup = this.formService.create(this.controlsConfig);
        // Separate the formset fields to their object, so that they can be rendered
        // beneath the main controls.
        this.formsets = this.viewConfig.controls.filter(field => field.type === 'formset');

        if (this.id === 'new') {
            this.mode = 'create';
            this.submitButtonText = 'Create';
            this.is_ready = true;
        } else if (this.id != null) {
            this.mode = 'edit';
            this.submitButtonText = 'Update';
            this.actions = this.viewConfig.actions;
            const params = this.populateParams();
            this.api.fetch(this.viewConfig.metadata.api + this.id, params).subscribe(data => {
                this.controlsConfig.forEach(c => {
                    const ctrl = this.formGroup.get(c.name);
                    if (c.type === 'formset') {
                        // set values of the formset rows
                        const controlConfig = c.control as FormSetControlConfig;
                        const formArray = ctrl as FormArray;
                        for (let i = 0; i < data[c.name].length; i++) {
                            const fg = this.formService.create(controlConfig.fields);
                            fg.setValue(data[c.name][i]);
                            formArray.setControl(i, fg);
                        }
                    }
                    if (c.resolveValueFrom && ctrl !== null) {
                        ctrl.setValue(data[c.resolveValueFrom]);
                        return;
                    }
                    if (ctrl !== null) {
                        if (this.viewConfig.search_key) {
                            const new_data = data[this.viewConfig.search_key];
                            ctrl.setValue(new_data[c.name]);
                            this.setDefaults(c.name, new_data[c.name]);
                        } else {
                            ctrl.setValue(data[c.name]);
                        }
                    }
                });
                this.is_ready = true;
            });
        } else {
            this.is_ready = true;
        }
    }
    setDefaults(name, value) {
        this._visibleControls.forEach(ctrl => {
            if (ctrl.name === name) {
                let finalArray;
                if (ctrl.listFrom && Array.isArray(value)) {
                    finalArray = value.map((obj) => {
                        return obj[ctrl.listFrom];
                    });
                    ctrl.defaultValue = finalArray[0];
                } else {
                    ctrl.defaultValue = value;
                }
            }
        });
    }

    populateParams() {
        let searchParams = new HttpParams();
        if (this.viewConfig.metadata.includeParams) {
            this.viewConfig.metadata.queryParams.forEach((field) => {
                searchParams = searchParams.append('include[]', field);
            });
        }
        return searchParams;
    }

    _onSubmit() {
        if (this.mode === 'create') {
            this.api.post(this.viewConfig.metadata.api, this.formGroup.value).subscribe(res => {
                console.log(res);
            });
        } else if (this.mode === 'edit') {
            this.api.put(`${this.viewConfig.metadata.api}/${this.id}/`, this.formGroup.value).subscribe(res => {
                console.log(res);
            });
        } else {
            this.viewConfig.controls.map(ctrl => {
                if (ctrl.type === 'date') {
                    const today_time = new Date().getHours();
                    if (this.formGroup.get(ctrl.name).value !== null) {
                        const date = new Date(this.formGroup.get(ctrl.name).value);
                        date.setHours(today_time);
                        const date_string = date.toISOString();
                        this.formGroup.get(ctrl.name).setValue(
                            date_string.slice(0, date_string.indexOf('T')));
                    }
                }
            });
            const contains_ctrl = this.viewConfig.controls.filter(ctrl => ctrl.iContains);
            this.submit.emit({ ...this.formGroup.value, iContains: contains_ctrl });

        }
    }
    _onReset() {
        this.formGroup.reset();
        this.submit.emit({ reset: true });
    }

}

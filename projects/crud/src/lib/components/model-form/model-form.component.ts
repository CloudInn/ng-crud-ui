import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { FieldConfig } from '../../models/metadata';
import { FormViewer } from '../../models/views';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'ng-crud-model-form',
    templateUrl: './model-form.component.html',
    styleUrls: ['./model-form.component.scss'],
    exportAs: 'ngcrudui-model-form'
})
export class ModelFormComponent implements OnInit {

    @Input() viewConfig: FormViewer;
    @Input() mode = 'search';
    @Input() id = null;
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
        private router: Router
    ) {

    }
    ngOnInit() {
        this.controlsConfig = this.viewConfig.controls;
        this._visibleControls = this.controlsConfig.filter(c => c.isHidden !== true);
        this.formGroup = this.formService.create(this.controlsConfig);
        // Separate the formset fields to their object, so that they can be rendered
        // beneath the main controls.
        this.formsets = this.viewConfig.controls.filter(field => field.type === 'formset');
        this.is_ready = true;
        if (this.id === 'new') {
            this.mode = 'create';
            this.submitButtonText = 'Create';
            this.formGroup = this.formService.create(this.controlsConfig);
        } else if (this.id !== null) {
            this.mode = 'edit';
            this.submitButtonText = 'Update';
            this.actions = this.viewConfig.actions;
            const params = this.populateParams();
            this.api.fetch(this.viewConfig.metadata.api + this.id, params).subscribe(data => {
                let data_modified = data;
                if (this.viewConfig.search_key) {
                    data_modified = data[this.viewConfig.search_key];
                }
                this.formGroup = this.formService.update(this.controlsConfig, data_modified);
            });
        }
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

    getFormErrors() {
        Object.keys(this.formGroup.controls).forEach(key => {
            const controlErrors: ValidationErrors = this.formGroup.get(key).errors;
            if (controlErrors != null) {
                Object.keys(controlErrors).forEach(keyError => {
                    this.formGroup.get(key).markAsTouched();
                });
            }
        });
    }
    saveAndEdit() {
        this.is_ready = false;
        this._onSubmit().subscribe(res => {
            let id;
            if (this.viewConfig.search_key) {
                id = res[this.viewConfig.search_key].id;
            }
            const url = this.router.url;
            this.router.navigate([`${url.substr(0, url.indexOf(this.id))}/${id}`]);
            this.is_ready = true;
        });
    }
    saveAndAdd() {
        this.is_ready = false;
        this._onSubmit().subscribe(res => {
            this.is_ready = true;
            this.formGroup = this.formService.create(this.controlsConfig);
            const url = this.router.url;
            this.router.navigate([`${url.substr(0, url.indexOf(this.id))}/new`]);
        });
    }
    save() {
        this.is_ready = false;
        this._onSubmit().subscribe(res => {
            this.is_ready = true;
            const url = this.router.url;
            this.router.navigate([url.substr(0, url.indexOf(this.id))]);
        });
    }
    _onSubmit() {
        if (this.formGroup.valid) {
            if (this.mode === 'create') {
                return this.api.post(this.viewConfig.metadata.api, this.formGroup.value);
            } else if (this.mode === 'edit') {
                return this.api.put(`${this.viewConfig.metadata.api}/${this.id}/`, this.formGroup.value);
            } else {
                this.viewConfig.controls.map(ctrl => {
                    if (ctrl.type === 'date') {
                        const today_time = new Date().getHours();
                        if (this.formGroup.get([ctrl.name]).value !== null) {
                            const date = new Date(this.formGroup.get([ctrl.name]).value);
                            date.setHours(today_time);
                            const date_string = date.toISOString();
                            this.formGroup.get([ctrl.name]).setValue(
                                date_string.slice(0, date_string.indexOf('T')));
                        }
                    }
                });
                const contains_ctrl = this.viewConfig.controls.filter(ctrl => ctrl.iContains);
                this.submit.emit({ ...this.formGroup.value, iContains: contains_ctrl });

            }
        } else {
            this.getFormErrors();
        }

    }
    _onReset() {
        this.formGroup.reset();
        this.submit.emit({ reset: true });
    }

}

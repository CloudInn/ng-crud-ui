import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';

import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { FieldConfig } from '../../models/metadata';
import { FormViewer } from '../../models/views';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IframeModalComponent } from '../../components/iframe-modal/iframe-modal.component';

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
    disabled = false;

    constructor(
        private api: ApiService,
        private formService: FormService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
        private router: Router
    ) {

    }
    ngOnInit() {
        this.controlsConfig = this.viewConfig.controls;
        this._visibleControls = this.controlsConfig.filter(c => c.isHidden !== true);
        this.formGroup = this.formService.create(this.controlsConfig, this.mode);
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
                if (this.viewConfig.metadata.search_key) {
                    data_modified = data[this.viewConfig.metadata.search_key];
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
            if (this.formGroup.get(key) !== null) {
                const controlErrors: ValidationErrors = this.formGroup.get(key).errors;
                if (controlErrors != null) {
                    Object.keys(controlErrors).forEach(keyError => {
                        this.formGroup.get(key).markAsTouched();
                    });
                }
            }
        });
        const formSet = this.viewConfig.controls.find(el => el.type === 'formset');
        const formArray = this.formGroup.get(formSet.name) as FormArray;
        formArray.controls.forEach((fg: FormGroup) => {
            Object.keys(fg.controls).forEach(k => {
                const controlErrors = fg.get(k).errors;
                if (controlErrors !== null) {
                    fg.get(k).markAsTouched();
                }
            });
        });
        this.formGroup.updateValueAndValidity();
    }
    onAction(link) {
        console.log(link);
        switch (link.action) {
            case 'iframe':
                this.openIframe(link);
                break;
            case 'request':
                this.api.post(link.api + this.id + '/' + link.params, link.body).subscribe(res => {
                    this._snackBar.open(res['message'], '', {
                        duration: 2000,
                        panelClass: 'success'
                    });
                    const url = this.router.url;
                    this.router.navigate([url.substr(0, url.indexOf(this.id))]);
                }, err => {
                    this._snackBar.open(err.error.error, '', {
                        duration: 2000,
                        panelClass: 'others-bar'
                    });
                });
                break;
        }
    }
    openIframe(link) {
        this.dialog.open(IframeModalComponent, {
            height: '95vh',
            width: '100vw',
            data: {
                'src': `${link.api}${this.id}/${link.params}`,
                'title': link.name,
                'color': 'grey'
            }
        });
    }
    saveAndEdit(res) {
        this.is_ready = false;
        let id;
        if (this.viewConfig.metadata.search_key) {
            id = res[this.viewConfig.metadata.search_key].id;
        }
        const url = this.router.url;
        this.router.navigate([`${url.substr(0, url.indexOf(this.id))}/${id}`]);
        if (this.mode === 'edit') {
            this.is_ready = true;
        }
    }
    saveAndAdd() {
        this.is_ready = false;
        if (this.mode === 'create') {
            this.is_ready = true;
        }
        this.formGroup = this.formService.create(this.controlsConfig);
        const url = this.router.url;
        this.router.navigate([`${url.substr(0, url.indexOf(this.id))}/new`]);
    }
    save() {
        this.is_ready = false;
        const url = this.router.url;
        this.router.navigate([url.substr(0, url.indexOf(this.id))]);
    }
    _onSubmit(action_type?) {
        if (this.formGroup.valid) {
            this.disabled = true;
            if (this.mode === 'create') {
                this.api.post(this.viewConfig.metadata.api, this.formGroup.value).subscribe(res => {
                    this.performAction(action_type, res);
                    this.disabled = false;
                    this.openSnackBar(`Your ${this.viewConfig.metadata.label} is created successfully`, 'success');
                }, (error) => {
                    this.disabled = false;
                    this.openSnackBar('Please review your data and try again!', 'error');
                });
            } else if (this.mode === 'edit') {
                this.controlsConfig.forEach(ctrl => {
                    ctrl.control['fields'].forEach(el => {
                        if (el.type === 'foreignKey') {
                            if (this.formGroup.get(el.name) !== null && this.formGroup.get(el.name).value !== null) {
                                this.formGroup.get(el.name).patchValue(this.formGroup.get(el.name).value[el.resolveValueFrom]);
                                this.formGroup.updateValueAndValidity();
                            }
                        }
                    });

                });
                this.api.put(`${this.viewConfig.metadata.api}${this.id}/`, this.formGroup.value).subscribe(res => {
                    this.performAction(action_type, res);
                    this.disabled = false;
                    this.openSnackBar(`Your ${this.viewConfig.metadata.label} is updated successfully`, 'success');
                }, (error) => {
                    this.disabled = false;
                    this.openSnackBar('Please review your data and try again!', 'error');
                });
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
    performAction(type, res) {
        switch (type) {
            case 'saveAndEdit':
                this.saveAndEdit(res);
                break;
            case 'saveAndAdd':
                this.saveAndAdd();
                break;
            case 'save':
                this.save();
        }
    }
    _onReset() {
        this.formGroup.reset();
        this.submit.emit({ reset: true });
    }

    openSnackBar(message: string, type: string) {
        this._snackBar.open(message, '', {
            duration: 2000,
            panelClass: type === 'success' ? ['success-bar'] : ['others-bar']
        });
    }

}

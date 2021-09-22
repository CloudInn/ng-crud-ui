import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';

import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { FieldConfig, FieldSetControlConfig } from '../../models/metadata';
import { FormViewer } from '../../models/views';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IframeModalComponent } from '../../components/iframe-modal/iframe-modal.component';
import { SearchDialogComponent } from '../../containers/search-dialog/search-dialog.component';

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
    initialLoading = false;
    fileUrl;
    fileName;
    openedInaialog: boolean;
    response: any;
    constructor(
        private api: ApiService,
        private formService: FormService,
        private _snackBar: MatSnackBar,
        private dialog: MatDialog,
        private router: Router,
        private creationDialogRef: MatDialogRef<SearchDialogComponent>,
    ) {

    }
    ngOnInit() {
        this.openedInaialog = this.viewConfig?.metadata?.isDialog;
        this.controlsConfig = this.viewConfig.controls;
        this._visibleControls = this.controlsConfig.filter(c => c.isHidden !== true);
        this.formGroup = this.formService.create(this.controlsConfig, this.mode);
        // Separate the formset fields to their object, so that they can be rendered
        // beneath the main controls.
        this.formsets = this.viewConfig.controls.filter(field => field.type === 'formset');
        this.is_ready = true;
        if (this.id === 'add') {
            this.mode = 'create';
            this.submitButtonText = 'Create';
            this.formGroup = this.formService.create(this.controlsConfig);
        } else if (this.id !== null) {
            this.mode = 'edit';
            this.initialLoading = true;
            this.submitButtonText = 'Update';
            this.actions = this.viewConfig.actions;
            this.editForm(this.id, 'openPage');
        }
    }
    editForm(id, state?) {
        const params = this.populateParams();
        this.api.fetch(this.viewConfig.metadata.api + id, params).subscribe(data => {
            let data_modified = { ...data };
            this.initialLoading = false;
            if (this.viewConfig.metadata.search_key) {
                data_modified = data[this.viewConfig.metadata.search_key];
            }
            this.formGroup = this.formService.update(this.controlsConfig, data_modified);
            if (!state) {
                this.openSnackBar(`Your ${this.viewConfig.metadata.label} is created successfully`, 'success');
            }
        }, err => {
            this.displayError(err.error);
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
        if (formSet) {
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
    }

    onAction(link) {
        switch (link.action) {
            case 'iframe':
                this.openIframe(link);
                break;
            case 'request':
                this.fileName = `Profile${this.id}.${link.fileType}`;
                this.api[link.type](link.api + this.id + '/' + link.params, link.body).subscribe(res => {
                    if (link.type === 'download') {
                        var downloadURL = window.URL.createObjectURL(res);
                        var a = document.createElement('a');
                        a.href = downloadURL;
                        a.download = `${this.id}.${link.fileType}`;
                        a.click();
                    } else {
                        this._snackBar.open(res['message'], '', {
                            duration: 2000,
                            panelClass: 'success'
                        });
                        const url = this.router.url;
                        this.router.navigate([url.substr(0, url.indexOf(this.id))]);
                    }
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
    saveAndEdit() {
        this.is_ready = false;
        const url = this.router.url;
        if (this.mode === 'edit') {
            this.is_ready = true;
            this.editForm(this.id);
        } else {
            this.initialLoading = false;
            this.router.navigate([`${url.substr(0, url.indexOf('add'))}/${this.id}`]);
        }
    }
    saveAndAdd() {
        this.is_ready = false;
        if (this.mode === 'create') {
            this.is_ready = true;
        }
        this.formGroup = this.formService.create(this.controlsConfig);
        const url = this.router.url;
        this.router.navigate([`${url.substr(0, url.indexOf(this.id))}/add`]);
        this.initialLoading = false;
    }
    save() {
        this.is_ready = false;
        if (!this.openedInaialog) {
            const url = this.router.url;
            this.router.navigate([url.substr(0, url.indexOf(this.id))]);
        }

    }

    isEmptyObject(obj) {
        return Object.keys(obj).every(x => {
            return obj[x] === '' || obj[x] == null;
        });
    }
    removeEmptyFormsets() {
        this.formsets.forEach(formset => {
            const formsetName = formset.name;
            this.formGroup.value[formsetName] = this.formGroup.value[formsetName].filter(item => {
                return this.isEmptyObject(item) ? null : item;
            });
        });
    }

    _onSubmit(action_type?) {
        this.initialLoading = true;
        if (this.formGroup.valid) {
            this.disabled = true;
            this.changeFieldsBeforeSending();
            this.removeEmptyFormsets();
            if (this.mode === 'create' || this.openedInaialog) {
                this.api.post(this.viewConfig.metadata.api, this.formGroup.value).subscribe(res => {
                    this.disabled = false;
                    this.id = res[this.viewConfig.metadata.search_key].id;
                    this.response = res[this.viewConfig.metadata.search_key];
                    this.handlePostSubmit(action_type, res);
                }, (error) => {
                    this.initialLoading = false;
                    this.disabled = false;
                    this.displayError(error.error);
                });
            } else if (this.mode === 'edit') {
                this.api.put(`${this.viewConfig.metadata.api}${this.id}/`, this.formGroup.value).subscribe(res => {
                    this.handlePostSubmit(action_type, res);
                    this.disabled = false;
                }, (error) => {
                    this.initialLoading = false;
                    this.disabled = false;
                    this.displayError(error.error);
                });
            } else {
                this.initialLoading = false;
                const contains_ctrl = this.viewConfig.controls.filter(ctrl => ctrl.iContains);
                this.submit.emit({ ...this.formGroup.value, iContains: contains_ctrl });
            }
        } else {
            this.initialLoading = false;
            this.getFormErrors();
        }
    }

    changeFieldsBeforeSending() {
        this.controlsConfig.forEach(ctrl => {
            if (ctrl.type === 'fieldset') {
                ctrl.control['fields'].forEach(f => {
                    this.checkForirgnKey(f);
                    this.modifyDateFields(f);
                });
            } else {
                this.checkForirgnKey(ctrl);
                this.modifyDateFields(ctrl);
            }
        });
    }

    modifyDateFields(ctrl) {
        if (ctrl.type === 'date') {
            const today_time = new Date().getHours();
            if (this.formGroup.get([ctrl.name]).value !== null) {
                const date = new Date(this.formGroup.get([ctrl.name]).value);
                date.setHours(today_time);
                const date_string = date.toISOString();
                this.formGroup.get([ctrl.name]).patchValue(
                    date_string.slice(0, date_string.indexOf('T')));
                this.formGroup.updateValueAndValidity();
            }
        }
    }

    handlePostSubmit(action_type, res) {
        const fieldWithPostSubmit = this.checkForPostSubmit();
        if (fieldWithPostSubmit.length > 0) {
            fieldWithPostSubmit.forEach(f => {
                if (this.formGroup.get(f.name).value) {
                    this.applyPostSubmit(
                        f,
                        res[this.viewConfig.metadata.search_key].id,
                        { action_type: action_type });
                } else {
                    this.performAction(action_type);
                }
            });
        } else {
            this.performAction(action_type);
        }
        if (this.openedInaialog) {
            this.creationDialogRef.close(this.response);
        }
    }

    checkForirgnKey(ctrl) {
        if (ctrl.type === 'foreignKey' || ctrl.type === 'foreignKey_multiple') {
            this.updateForiegnKeyField(ctrl);
        }
    }
    elementDeleted(event) {
        this.applyPostSubmit(event.config, this.id, { elemId: event.fileId });
    }
    applyPostSubmit(field: FieldConfig, id: string, options?) {
        field.postSubmitHookActions.forEach(action => {
            if (action.type === 'POST' && !options.elemId) {
                this.api.post(`${this.viewConfig.metadata.api}${id}${action.apiUrl}`,
                    this.formGroup.get(field.name).value, field.name).subscribe(res => {
                        this.editForm(id);
                        if (options.action_type) {
                            this.performAction(options.action_type);
                        }
                    }, err => {
                        this.initialLoading = false;
                        this.displayError(err.error);
                        this.editForm(id);
                    });
            } else if (action.type === 'DELETE' && options.elemId) {
                this.initialLoading = true;
                this.api.delete(`${this.viewConfig.metadata.api}${id}${action.apiUrl}`, options.elemId).subscribe(res => {
                    this.editForm(id);
                }, err => {
                    this.displayError(err.error);
                    this.initialLoading = false
                });
            }
        });
    }

    displayError(error) {
        console.log(error)
        if (error) {
            this.openSnackBar(`${error.non_field_errors[0]}`, 'error');
        } else {
            this.openSnackBar('Please review your data and try again!', 'error');
        }
    }

    checkForPostSubmit() {
        let fields: FieldConfig[] = new Array();
        this.controlsConfig.forEach(config => {
            if (config.type === 'fieldset') {
                const ctrl = config.control as FieldSetControlConfig;
                fields = ctrl.fields.filter(f => f.postSubmitHookActions);
            } else {
                if (config.postSubmitHookActions) {
                    fields.push(config);
                }
            }
        });
        return fields;
    }

    updateForiegnKeyField(element) {
        if (this.formGroup.get(element.name) !== null &&
            this.formGroup.get(element.name).value !== null &&
            typeof (this.formGroup.get(element.name).value) !== 'string'
            && typeof (this.formGroup.get(element.name).value) !== 'number') {
            this.formGroup.get(element.name).patchValue(this.formGroup.get(element.name).value[element.resolveValueFrom]);
            this.formGroup.updateValueAndValidity();
        }
    }
    performAction(type) {
        switch (type) {
            case 'saveAndEdit':
                this.saveAndEdit();
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
            duration: 5000,
            panelClass: type === 'success' ? ['success-bar'] : ['others-bar']
        });
    }
    getStyles(link) {
        if (link.style) {
            return JSON.parse(link.style);
        }
    }
}

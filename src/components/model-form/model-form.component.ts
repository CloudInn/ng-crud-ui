import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ApiService, Registry, FormService, Model } from '../../services';

import { FieldType, Field, AutoCompleteField } from '../../forms';

@Component({
  selector: 'ngcrudui-model-form',
  templateUrl: './model-form.component.html'
})
export class ModelFormComponent implements OnChanges {

    @Input() moduleName: string;
    @Input() appName: string;
    @Input() modelName: string;
    @Input() mode = 'search';
    @Input() id: number = null;
    ngModel: any = {};
    model: Model;
    fieldType: typeof FieldType = FieldType;
    AutoCompleteField: typeof AutoCompleteField = AutoCompleteField;
    fields: Field[] = [];
    choices = {};
    @Output() onSubmit = new EventEmitter<any>();
    form: FormGroup = new FormGroup({});
    formset: FormArray = new FormArray([]);
    formsets: FormArray[] = new Array<FormArray>();
    is_ready = false;

    constructor(
        private api: ApiService,
        private reg: Registry,
        private formService: FormService,
    ) {

    }

    ngOnChanges() {
        if (!this.appName || !this.modelName || !this.moduleName) {
            return;
        }
        this.model = this.reg.getModel(this.moduleName, this.appName, this.modelName);
        if (this.mode === 'search') {
            this.fields = this.model.fields.filter((f: Field) => !(f.is_searchable === false));
            this.buildForm(null);
        } else if (this.mode === 'edit') {
            // edit mode
            const api = `${this.model.api}${this.id}/`;
            // remove the uneditable fields
            this.fields = this.model.fields.filter(f => {
                return !(f.is_editable === false);
            });
            this.api.fetch(api, {}).subscribe(res => {
                this.buildForm(res);
            });
        } else {
            this.buildForm(null);
        }

        // if (this.model.form_type === 'formset') {
        //     this.formset = this.formService.toFormArray(this.fields, []);
        // } else {
        //     this.form = this.formService.toFormGroup(this.fields);
        // }
    }

    _onSubmit() {
        this.onSubmit.emit(this.ngModel);
    }

    buildForm(values: any) {
        if (values !== null) {
            this.fields.map(f => {
                f._value = values[f.key];
                return f;
            });
        }
        this.form = this.formService.toFormGroup(this.fields);
        // Check if the model has formsets, render them beneath the main form
        if (this.mode !== 'search' && this.model.formsets) {
            for (const formset of this.model.formsets) {
                const fs = this.formService.toFormArray(formset.fields, values[formset.key]);
                this.formsets.push(fs);
                this.form.addControl(formset.key, fs);
            }
        }
        this.is_ready = true;
    }

}

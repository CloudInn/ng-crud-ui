import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { Observable ,  BehaviorSubject } from 'rxjs';

import { ApiService } from '../../services/api.service';
import { Registry } from '../../services/registry.service';
import { FormService } from '../../services/form.service';
import { FieldType, Field, AutoCompleteField } from '../../forms';
import { Metadata, FieldConfig } from '../../models/metadata';
import { FormViewer } from '../../models/views';

@Component({
  selector: 'ng-crud-model-form',
  templateUrl: './model-form.component.html',
  styleUrls: ['./model-form.component.scss'],
  exportAs: 'ngcrudui-model-form'
})
export class ModelFormComponent implements OnInit {

    @Input() viewConfig: FormViewer;
    @Input() mode = 'search';
    @Input() id: number | string = null;
    ngModel: any = {};
    metadata: Metadata;
    fieldType: typeof FieldType = FieldType;
    AutoCompleteField: typeof AutoCompleteField = AutoCompleteField;
    fields: Field[] = [];
    choices = {};
    @Output() submit = new EventEmitter<any>();
    form: FormGroup = new FormGroup({});
    formset: FormArray = new FormArray([]);
    formsets: FormArray[] = new Array<FormArray>();
    is_ready = false;
    controlsConfig: FieldConfig[] = [];
    actions: {};
    submitButtonText = 'Search';

    constructor(
        private api: ApiService,
        private reg: Registry,
        private formService: FormService,
    ) {

    }

    ngOnInit() {
        // if (this.mode === 'search') {
        //     console.log(this.viewConfig.controls);
        //     this.controlsConfig = this.viewConfig.controls.filter(c => c.isSearchable === true);
        // } else {
        //     this.controlsConfig = this.viewConfig.controls;
        // }
        this.controlsConfig = this.viewConfig.controls;
        this.form = this.formService.create(this.controlsConfig);
        // attach formsets to the main form group
        this.viewConfig.formsets.forEach(c => {
            // const formArray = this.formService.createFormArray(c);
            this.form.addControl(c.name, new FormArray([]));
        });
        this.is_ready = true;
        if (this.id === 'new') {
            this.mode = 'create';
        }

        if (this.mode !== 'search') {
            this.submitButtonText = 'Create';
        }
        
        if(this.id && this.id !== 'new') {
            this.mode = 'edit';
            this.submitButtonText = 'Update';
            this.actions = this.viewConfig.actions;
            this.api.fetch(this.viewConfig.metadata.api + '/' + this.id).subscribe(data => {
                // this.form.setValue(data);
                Object.keys(this.form.controls).forEach(c => {
                    // this.form.setValue({[c]: data[c]}, {onlySelf: true});

                    const ctrl = this.form.get(c);
                    if (ctrl instanceof FormArray) {
                        const formsetConfig = this.viewConfig.formsets.filter(f => f.name === c)[0];
                        for (let i = 0; i < data[c].length; i++) {
                            const fg = this.formService.create(formsetConfig.fields);
                            (ctrl as FormArray).setControl(i, fg);
                            // ctrl.controls.push(ctrl.controls[0]);
                        }
                    }
                    ctrl.setValue(data[c]);
                });

            });
        }
    }

    _onSubmit() {
        if ( this.mode === 'create') {
            this.api.post(this.viewConfig.metadata.api, this.form.value).subscribe(res => {
                console.log(res);
            });
        } else if (this.mode === 'edit') {
            this.api.put(`${this.viewConfig.metadata.api}${this.id}/`, this.form.value).subscribe(res => {
                console.log(res);
            });
        } else {
            this.submit.emit(this.form.value);
        }
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
        // if (this.mode !== 'search' && this.model.formsets) {
        //     for (const formset of this.model.formsets) {
        //         const fs = this.formService.toFormArray(formset.fields, values[formset.key]);
        //         this.formsets.push(fs);
        //         this.form.addControl(formset.key, fs);
        //     }
        // }
        this.is_ready = true;
    }

}

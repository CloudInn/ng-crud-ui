import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { FieldConfig, FormSetControlConfig, FormsetConfigValue, FormSetsData } from '../../models/metadata';
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
    @Input() id?: number | 'new' = null;
    @Output() submit = new EventEmitter<any>();
    formGroup: FormGroup = new FormGroup({});
    formsets: FormArray[] = new Array<FormArray>();
    is_ready = false;
    controlsConfig: FieldConfig[] = [];
    actions: {};
    submitButtonText = 'Search';
    _visibleControls: FieldConfig[] = [];
    formArray: FormArray;
    formSetConfig: FormSetsData = {
        sets: [],
    };

    constructor(
        private api: ApiService,
        private formService: FormService,
    ) {

    }

    ngOnInit() {
        this.formService.formSets = [];
        this.controlsConfig = this.viewConfig.controls;
        this._visibleControls = this.controlsConfig.filter(c => c.isHidden !== true);
        this.formGroup = this.formService.create(this.controlsConfig);
        // attach formsets to the main form group
        this.viewConfig.formsets.forEach(c => {
            // this.formArray = this.formService.createFormArray(c);
            this.formSetConfig.sets.push(c as FormsetConfigValue);
            // this.formGroup.addControl(c.name, new FormArray([]));
        });
        if (this.id === 'new') {
            this.mode = 'create';
            this.formSetConfig.mode = 'create';
            this.submitButtonText = 'Create';
            this.is_ready = true;
        } else if (this.id != null) {
            this.mode = 'edit';
            this.formSetConfig.mode = 'edit';
            this.submitButtonText = 'Update';
            this.actions = this.viewConfig.actions;
            this.api.fetch(this.viewConfig.metadata.api + '/' + this.id).subscribe(data => {
                this.formSetConfig.sets.forEach(s => {
                    if (data && data[s.name]) {
                        s.values = data[s.name];
                    }
                });
                this.controlsConfig.forEach(c => {
                    const cotnrolConfig = c.control as FormSetControlConfig;
                    const ctrl = this.formGroup.get(c.name);
                    if (c.type === 'formset') {
                        const fa = ctrl as FormArray;
                        for (let i = 0; i < data[c.name].length; i++) {
                            const fg = this.formService.create(cotnrolConfig.fields);
                            fa.setControl(i, fg);
                            // ctrl.controls.push(ctrl.controls[0]);
                        }
                    }
                    if (c.resolveValueFrom) {
                        ctrl.setValue(data[c.resolveValueFrom]);
                        return;
                    }
                    ctrl.setValue(data[c.name]);
                });
                this.is_ready = true;
            });
        } else {
            this.is_ready = true;
        }
    }

    _onSubmit() {
        if ( this.mode === 'create') {
            const req = {...this.formGroup.value};
            this.viewConfig.formsets.forEach(c => {
                const set = this.formService.formSets.filter(s => s.name === c.name)[0];
                req[c.name] = [];
                if (set) {
                    const groups = set.groups as FormGroup[];
                    groups.forEach(g => {
                        req[c.name].push(g.value);
                    });
                }
            });
            this.api.post(this.viewConfig.metadata.api, req).subscribe(res => {
                console.log(res);
            });
        } else if (this.mode === 'edit') {
            const req = {...this.formGroup.value};
            this.viewConfig.formsets.forEach(c => {
                const groups = this.formService.formSets.filter(s => s.name === c.name)[0].groups as FormGroup[];
                req[c.name] = [];
                groups.forEach(g => {
                    req[c.name].push(g.value);
                });
            });
            this.api.put(`${this.viewConfig.metadata.api}/${this.id}/`, req).subscribe(res => {
                console.log(res);
            });
        } else {
            this.submit.emit(this.formGroup.value);
        }
    }

}

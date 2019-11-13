import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { FieldConfig, FormSetControlConfig } from '../../models/metadata';
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
            this.api.fetch(this.viewConfig.metadata.api + '/' + this.id).subscribe(data => {
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
            this.api.post(this.viewConfig.metadata.api, this.formGroup.value).subscribe(res => {
                console.log(res);
            });
        } else if (this.mode === 'edit') {
            this.api.put(`${this.viewConfig.metadata.api}/${this.id}/`, this.formGroup.value).subscribe(res => {
                console.log(res);
            });
        } else {
            console.log(this.formGroup.value)
            this.submit.emit(this.formGroup.value);
        }
    }
    _onReset(){
        this.formGroup.reset();
    }

}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Registry } from '../../services/registry.service';
import { FormService } from '../../services/form.service';
import { FieldType, AutoCompleteField } from '../../forms';
var ModelFormComponent = /** @class */ (function () {
    function ModelFormComponent(api, reg, formService) {
        this.api = api;
        this.reg = reg;
        this.formService = formService;
        this.mode = 'search';
        this.id = null;
        this.ngModel = {};
        this.fieldType = FieldType;
        this.AutoCompleteField = AutoCompleteField;
        this.fields = [];
        this.choices = {};
        this.submit = new EventEmitter();
        this.form = new FormGroup({});
        this.formset = new FormArray([]);
        this.formsets = new Array();
        this.is_ready = false;
    }
    /**
     * @return {?}
     */
    ModelFormComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        if (!this.appName || !this.modelName || !this.moduleName) {
            return;
        }
        this.form = this.reg.forms[this.modelName];
        console.log(this.form);
        // this.model = this.reg.getModel(this.moduleName, this.appName, this.modelName);
        // if (this.mode === 'search') {
        //     this.fields = this.model.fields.filter((f: Field) => !(f.is_searchable === false));
        //     this.buildForm(null);
        // } else if (this.mode === 'edit') {
        //     // edit mode
        //     const api = `${this.model.api}${this.id}/`;
        //     // remove the uneditable fields
        //     this.fields = this.model.fields.filter(f => {
        //         return !(f.is_editable === false);
        //     });
        //     this.api.fetch(api, {}).subscribe(res => {
        //         this.buildForm(res);
        //     });
        // } else {
        //     this.buildForm(null);
        // }
        // // if (this.model.form_type === 'formset') {
        // //     this.formset = this.formService.toFormArray(this.fields, []);
        // // } else {
        // //     this.form = this.formService.toFormGroup(this.fields);
        // // }
    };
    /**
     * @return {?}
     */
    ModelFormComponent.prototype._onSubmit = /**
     * @return {?}
     */
    function () {
        this.submit.emit(this.form.value);
    };
    /**
     * @param {?} values
     * @return {?}
     */
    ModelFormComponent.prototype.buildForm = /**
     * @param {?} values
     * @return {?}
     */
    function (values) {
        if (values !== null) {
            this.fields.map(function (f) {
                f._value = values[f.key];
                return f;
            });
        }
        this.form = this.formService.toFormGroup(this.fields);
        // Check if the model has formsets, render them beneath the main form
        if (this.mode !== 'search' && this.model.formsets) {
            try {
                for (var _a = tslib_1.__values(this.model.formsets), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var formset = _b.value;
                    var /** @type {?} */ fs = this.formService.toFormArray(formset.fields, values[formset.key]);
                    this.formsets.push(fs);
                    this.form.addControl(formset.key, fs);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        this.is_ready = true;
        var e_1, _c;
    };
    ModelFormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ng-crud-model-form',
                    template: "<!-- <mat-progress-bar *ngIf=\"isLoading\" mode=\"query\"></mat-progress-bar> -->\n\n<ng-template [ngIf]=\"is_ready\">\n    <!-- <div class=\"form-container\"> -->\n    <div class=\"row\">\n        <ng-container *ngFor=\"let field of fields\">\n            <ng-crud-form-field  [form]=\"form\" [field]=\"field\"></ng-crud-form-field>\n        </ng-container>\n    </div>\n\n\n    <div *ngFor=\"let formarray of formsets; let i=index\">\n        <mat-divider></mat-divider>\n        <ng-crud-formset  [model]=\"model\" [config]=\"model.formsets[i]\"  [formarray]=\"formarray\" [form]=\"form\"></ng-crud-formset>        \n    </div>\n\n    <div class=\"row\">\n        <button mat-raised-button color=\"primary\" class=\"submit-button\" (click)=\"_onSubmit()\">\n            <span *ngIf=\"mode === 'search'\">Search</span>\n            <span *ngIf=\"mode === 'create'\">Create</span>\n            <span *ngIf=\"mode === 'edit'\">Update</span>\n        </button>\n    </div>\n</ng-template>",
                    styles: [".row{display:flex;flex:1 1 auto;flex-flow:row wrap}.submit-button{align-self:flex-end}"],
                    exportAs: 'ngcrudui-model-form'
                },] },
    ];
    /** @nocollapse */
    ModelFormComponent.ctorParameters = function () { return [
        { type: ApiService },
        { type: Registry },
        { type: FormService }
    ]; };
    ModelFormComponent.propDecorators = {
        moduleName: [{ type: Input }],
        appName: [{ type: Input }],
        modelName: [{ type: Input }],
        mode: [{ type: Input }],
        id: [{ type: Input }],
        submit: [{ type: Output }]
    };
    return ModelFormComponent;
}());
export { ModelFormComponent };
function ModelFormComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    ModelFormComponent.prototype.moduleName;
    /** @type {?} */
    ModelFormComponent.prototype.appName;
    /** @type {?} */
    ModelFormComponent.prototype.modelName;
    /** @type {?} */
    ModelFormComponent.prototype.mode;
    /** @type {?} */
    ModelFormComponent.prototype.id;
    /** @type {?} */
    ModelFormComponent.prototype.ngModel;
    /** @type {?} */
    ModelFormComponent.prototype.model;
    /** @type {?} */
    ModelFormComponent.prototype.fieldType;
    /** @type {?} */
    ModelFormComponent.prototype.AutoCompleteField;
    /** @type {?} */
    ModelFormComponent.prototype.fields;
    /** @type {?} */
    ModelFormComponent.prototype.choices;
    /** @type {?} */
    ModelFormComponent.prototype.submit;
    /** @type {?} */
    ModelFormComponent.prototype.form;
    /** @type {?} */
    ModelFormComponent.prototype.formset;
    /** @type {?} */
    ModelFormComponent.prototype.formsets;
    /** @type {?} */
    ModelFormComponent.prototype.is_ready;
    /** @type {?} */
    ModelFormComponent.prototype.api;
    /** @type {?} */
    ModelFormComponent.prototype.reg;
    /** @type {?} */
    ModelFormComponent.prototype.formService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwtZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9jcnVkLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbW9kZWwtZm9ybS9tb2RlbC1mb3JtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWEsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEYsT0FBTyxFQUFtQixTQUFTLEVBQTRCLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSWpHLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFFM0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzFELE9BQU8sRUFBRSxTQUFTLEVBQVMsaUJBQWlCLEVBQUUsTUFBTSxhQUFhLENBQUM7O0lBa0Q5RCw0QkFDWSxLQUNBLEtBQ0E7UUFGQSxRQUFHLEdBQUgsR0FBRztRQUNILFFBQUcsR0FBSCxHQUFHO1FBQ0gsZ0JBQVcsR0FBWCxXQUFXO29CQWpCUCxRQUFRO2tCQUNGLElBQUk7dUJBQ1gsRUFBRTt5QkFFYSxTQUFTO2lDQUNPLGlCQUFpQjtzQkFDN0MsRUFBRTt1QkFDVixFQUFFO3NCQUNPLElBQUksWUFBWSxFQUFPO29CQUN4QixJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUM7dUJBQ2QsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDO3dCQUNkLElBQUksS0FBSyxFQUFhO3dCQUNuQyxLQUFLO0tBUWY7Ozs7SUFFRCx3Q0FBVzs7O0lBQVg7UUFDSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDdkQsTUFBTSxDQUFDO1NBQ1Y7UUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0F3QjFCOzs7O0lBRUQsc0NBQVM7OztJQUFUO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNyQzs7Ozs7SUFFRCxzQ0FBUzs7OztJQUFULFVBQVUsTUFBVztRQUNqQixFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUM7Z0JBQ2IsQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN6QixNQUFNLENBQUMsQ0FBQyxDQUFDO2FBQ1osQ0FBQyxDQUFDO1NBQ047UUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7UUFFdEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOztnQkFDaEQsR0FBRyxDQUFDLENBQWtCLElBQUEsS0FBQSxpQkFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQSxnQkFBQTtvQkFBcEMsSUFBTSxPQUFPLFdBQUE7b0JBQ2QscUJBQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUM3RSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztpQkFDekM7Ozs7Ozs7OztTQUNKO1FBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7O0tBQ3hCOztnQkE1R0osU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRSw2OUJBdUJHO29CQUNiLE1BQU0sRUFBRSxDQUFDLHdGQUF3RixDQUFDO29CQUNsRyxRQUFRLEVBQUUscUJBQXFCO2lCQUNoQzs7OztnQkFsQ1EsVUFBVTtnQkFDVixRQUFRO2dCQUVSLFdBQVc7Ozs2QkFrQ2YsS0FBSzswQkFDTCxLQUFLOzRCQUNMLEtBQUs7dUJBQ0wsS0FBSztxQkFDTCxLQUFLO3lCQU9MLE1BQU07OzZCQXJEWDs7U0F3Q2Esa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkNoYW5nZXMsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBGb3JtR3JvdXAsIEZvcm1CdWlsZGVyLCBGb3JtQ29udHJvbCwgRm9ybUFycmF5IH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlICwgIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVnaXN0cnkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9yZWdpc3RyeS5zZXJ2aWNlJztcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi4vLi4vc2NyZWVucyc7XG5pbXBvcnQgeyBGb3JtU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2Zvcm0uc2VydmljZSc7XG5pbXBvcnQgeyBGaWVsZFR5cGUsIEZpZWxkLCBBdXRvQ29tcGxldGVGaWVsZCB9IGZyb20gJy4uLy4uL2Zvcm1zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctY3J1ZC1tb2RlbC1mb3JtJyxcbiAgdGVtcGxhdGU6IGA8IS0tIDxtYXQtcHJvZ3Jlc3MtYmFyICpuZ0lmPVwiaXNMb2FkaW5nXCIgbW9kZT1cInF1ZXJ5XCI+PC9tYXQtcHJvZ3Jlc3MtYmFyPiAtLT5cblxuPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImlzX3JlYWR5XCI+XG4gICAgPCEtLSA8ZGl2IGNsYXNzPVwiZm9ybS1jb250YWluZXJcIj4gLS0+XG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBmaWVsZCBvZiBmaWVsZHNcIj5cbiAgICAgICAgICAgIDxuZy1jcnVkLWZvcm0tZmllbGQgIFtmb3JtXT1cImZvcm1cIiBbZmllbGRdPVwiZmllbGRcIj48L25nLWNydWQtZm9ybS1maWVsZD5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9kaXY+XG5cblxuICAgIDxkaXYgKm5nRm9yPVwibGV0IGZvcm1hcnJheSBvZiBmb3Jtc2V0czsgbGV0IGk9aW5kZXhcIj5cbiAgICAgICAgPG1hdC1kaXZpZGVyPjwvbWF0LWRpdmlkZXI+XG4gICAgICAgIDxuZy1jcnVkLWZvcm1zZXQgIFttb2RlbF09XCJtb2RlbFwiIFtjb25maWddPVwibW9kZWwuZm9ybXNldHNbaV1cIiAgW2Zvcm1hcnJheV09XCJmb3JtYXJyYXlcIiBbZm9ybV09XCJmb3JtXCI+PC9uZy1jcnVkLWZvcm1zZXQ+ICAgICAgICBcbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgPGJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvbiBjb2xvcj1cInByaW1hcnlcIiBjbGFzcz1cInN1Ym1pdC1idXR0b25cIiAoY2xpY2spPVwiX29uU3VibWl0KClcIj5cbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwibW9kZSA9PT0gJ3NlYXJjaCdcIj5TZWFyY2g8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiAqbmdJZj1cIm1vZGUgPT09ICdjcmVhdGUnXCI+Q3JlYXRlPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJtb2RlID09PSAnZWRpdCdcIj5VcGRhdGU8L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5gLFxuICBzdHlsZXM6IFtgLnJvd3tkaXNwbGF5OmZsZXg7ZmxleDoxIDEgYXV0bztmbGV4LWZsb3c6cm93IHdyYXB9LnN1Ym1pdC1idXR0b257YWxpZ24tc2VsZjpmbGV4LWVuZH1gXSxcbiAgZXhwb3J0QXM6ICduZ2NydWR1aS1tb2RlbC1mb3JtJ1xufSlcbmV4cG9ydCBjbGFzcyBNb2RlbEZvcm1Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gICAgQElucHV0KCkgbW9kdWxlTmFtZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGFwcE5hbWU6IHN0cmluZztcbiAgICBASW5wdXQoKSBtb2RlbE5hbWU6IHN0cmluZztcbiAgICBASW5wdXQoKSBtb2RlID0gJ3NlYXJjaCc7XG4gICAgQElucHV0KCkgaWQ6IG51bWJlciA9IG51bGw7XG4gICAgbmdNb2RlbDogYW55ID0ge307XG4gICAgbW9kZWw6IE1vZGVsO1xuICAgIGZpZWxkVHlwZTogdHlwZW9mIEZpZWxkVHlwZSA9IEZpZWxkVHlwZTtcbiAgICBBdXRvQ29tcGxldGVGaWVsZDogdHlwZW9mIEF1dG9Db21wbGV0ZUZpZWxkID0gQXV0b0NvbXBsZXRlRmllbGQ7XG4gICAgZmllbGRzOiBGaWVsZFtdID0gW107XG4gICAgY2hvaWNlcyA9IHt9O1xuICAgIEBPdXRwdXQoKSBzdWJtaXQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICBmb3JtOiBGb3JtR3JvdXAgPSBuZXcgRm9ybUdyb3VwKHt9KTtcbiAgICBmb3Jtc2V0OiBGb3JtQXJyYXkgPSBuZXcgRm9ybUFycmF5KFtdKTtcbiAgICBmb3Jtc2V0czogRm9ybUFycmF5W10gPSBuZXcgQXJyYXk8Rm9ybUFycmF5PigpO1xuICAgIGlzX3JlYWR5ID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBhcGk6IEFwaVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgcmVnOiBSZWdpc3RyeSxcbiAgICAgICAgcHJpdmF0ZSBmb3JtU2VydmljZTogRm9ybVNlcnZpY2UsXG4gICAgKSB7XG5cbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmFwcE5hbWUgfHwgIXRoaXMubW9kZWxOYW1lIHx8ICF0aGlzLm1vZHVsZU5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZvcm0gPSB0aGlzLnJlZy5mb3Jtc1t0aGlzLm1vZGVsTmFtZV07XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZm9ybSk7XG4gICAgICAgIC8vIHRoaXMubW9kZWwgPSB0aGlzLnJlZy5nZXRNb2RlbCh0aGlzLm1vZHVsZU5hbWUsIHRoaXMuYXBwTmFtZSwgdGhpcy5tb2RlbE5hbWUpO1xuICAgICAgICAvLyBpZiAodGhpcy5tb2RlID09PSAnc2VhcmNoJykge1xuICAgICAgICAvLyAgICAgdGhpcy5maWVsZHMgPSB0aGlzLm1vZGVsLmZpZWxkcy5maWx0ZXIoKGY6IEZpZWxkKSA9PiAhKGYuaXNfc2VhcmNoYWJsZSA9PT0gZmFsc2UpKTtcbiAgICAgICAgLy8gICAgIHRoaXMuYnVpbGRGb3JtKG51bGwpO1xuICAgICAgICAvLyB9IGVsc2UgaWYgKHRoaXMubW9kZSA9PT0gJ2VkaXQnKSB7XG4gICAgICAgIC8vICAgICAvLyBlZGl0IG1vZGVcbiAgICAgICAgLy8gICAgIGNvbnN0IGFwaSA9IGAke3RoaXMubW9kZWwuYXBpfSR7dGhpcy5pZH0vYDtcbiAgICAgICAgLy8gICAgIC8vIHJlbW92ZSB0aGUgdW5lZGl0YWJsZSBmaWVsZHNcbiAgICAgICAgLy8gICAgIHRoaXMuZmllbGRzID0gdGhpcy5tb2RlbC5maWVsZHMuZmlsdGVyKGYgPT4ge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiAhKGYuaXNfZWRpdGFibGUgPT09IGZhbHNlKTtcbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvLyAgICAgdGhpcy5hcGkuZmV0Y2goYXBpLCB7fSkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5idWlsZEZvcm0ocmVzKTtcbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgdGhpcy5idWlsZEZvcm0obnVsbCk7XG4gICAgICAgIC8vIH1cblxuICAgICAgICAvLyAvLyBpZiAodGhpcy5tb2RlbC5mb3JtX3R5cGUgPT09ICdmb3Jtc2V0Jykge1xuICAgICAgICAvLyAvLyAgICAgdGhpcy5mb3Jtc2V0ID0gdGhpcy5mb3JtU2VydmljZS50b0Zvcm1BcnJheSh0aGlzLmZpZWxkcywgW10pO1xuICAgICAgICAvLyAvLyB9IGVsc2Uge1xuICAgICAgICAvLyAvLyAgICAgdGhpcy5mb3JtID0gdGhpcy5mb3JtU2VydmljZS50b0Zvcm1Hcm91cCh0aGlzLmZpZWxkcyk7XG4gICAgICAgIC8vIC8vIH1cbiAgICB9XG5cbiAgICBfb25TdWJtaXQoKSB7XG4gICAgICAgIHRoaXMuc3VibWl0LmVtaXQodGhpcy5mb3JtLnZhbHVlKTtcbiAgICB9XG5cbiAgICBidWlsZEZvcm0odmFsdWVzOiBhbnkpIHtcbiAgICAgICAgaWYgKHZhbHVlcyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5maWVsZHMubWFwKGYgPT4ge1xuICAgICAgICAgICAgICAgIGYuX3ZhbHVlID0gdmFsdWVzW2Yua2V5XTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZm9ybSA9IHRoaXMuZm9ybVNlcnZpY2UudG9Gb3JtR3JvdXAodGhpcy5maWVsZHMpO1xuICAgICAgICAvLyBDaGVjayBpZiB0aGUgbW9kZWwgaGFzIGZvcm1zZXRzLCByZW5kZXIgdGhlbSBiZW5lYXRoIHRoZSBtYWluIGZvcm1cbiAgICAgICAgaWYgKHRoaXMubW9kZSAhPT0gJ3NlYXJjaCcgJiYgdGhpcy5tb2RlbC5mb3Jtc2V0cykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBmb3Jtc2V0IG9mIHRoaXMubW9kZWwuZm9ybXNldHMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmcyA9IHRoaXMuZm9ybVNlcnZpY2UudG9Gb3JtQXJyYXkoZm9ybXNldC5maWVsZHMsIHZhbHVlc1tmb3Jtc2V0LmtleV0pO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9ybXNldHMucHVzaChmcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtLmFkZENvbnRyb2woZm9ybXNldC5rZXksIGZzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzX3JlYWR5ID0gdHJ1ZTtcbiAgICB9XG5cbn1cbiJdfQ==
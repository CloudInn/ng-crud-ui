/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Model } from '../../screens';
import { Registry } from '../../services/registry.service';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { Field } from '../../forms';
var FormsetComponent = /** @class */ (function () {
    function FormsetComponent(api, reg, formService) {
        this.api = api;
        this.reg = reg;
        this.formService = formService;
        this.choices = {};
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    FormsetComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["config"].firstChange) {
            try {
                for (var _a = tslib_1.__values(changes["config"].currentValue.fields), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var field = _b.value;
                    if (field['control_type'] === 'foreign_key') {
                        this.getChoices(field);
                    }
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
        var e_1, _c;
    };
    /**
     * @return {?}
     */
    FormsetComponent.prototype.addForm = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ ctrl = this.formService.toFormGroup(this.config.fields);
        this.formarray.push(ctrl);
    };
    /**
     * @param {?} field
     * @return {?}
     */
    FormsetComponent.prototype.getChoices = /**
     * @param {?} field
     * @return {?}
     */
    function (field) {
        var _this = this;
        var /** @type {?} */ path = field.foreign_model_path.split('.');
        var /** @type {?} */ model = this.reg.getModel(path[0], path[1], path[2]);
        this.api.fetch(model.api, {}).subscribe(function (res) {
            _this.choices[field.key] = res;
            console.log(_this.choices);
        });
    };
    FormsetComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ng-crud-formset',
                    template: "<div [formGroup]=\"form\" *ngIf=\"formarray\" class=\"formset\">\n    <div class=\"row\">\n        <h4> {{ config.label }}</h4>\n        <span class=\"spacer\"></span>\n        <button mat-icon-button (click)=\"addForm()\">\n            <mat-icon>add_circle</mat-icon>\n        </button>\n    </div>\n    <div [formArrayName]=\"config.key\">\n        <mat-grid-list gutterSize=\"12\" [cols]=\"config.fields.length\" rowHeight=\"60\"  *ngFor=\"let ctrl of formarray.controls; let i=index\" [formGroupName]=\"i\">\n            <mat-grid-tile  *ngFor=\"let f of config.fields\">\n                {{ f. key }}\n                <ng-crud-form-field [choices]=\"choices[f.key]\" [form]=\"ctrl\" [field]=\"f\"></ng-crud-form-field>\n            </mat-grid-tile>\n        </mat-grid-list>\n    </div>\n</div>",
                    styles: [".formset{padding-top:12px}.row{display:flex;flex:1 1 auto}.spacer{flex:1 1 auto}"],
                    exportAs: 'ngcrudui-formset'
                },] },
    ];
    /** @nocollapse */
    FormsetComponent.ctorParameters = function () { return [
        { type: ApiService },
        { type: Registry },
        { type: FormService }
    ]; };
    FormsetComponent.propDecorators = {
        form: [{ type: Input }],
        model: [{ type: Input }],
        formarray: [{ type: Input }],
        config: [{ type: Input }]
    };
    return FormsetComponent;
}());
export { FormsetComponent };
function FormsetComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    FormsetComponent.prototype.form;
    /** @type {?} */
    FormsetComponent.prototype.model;
    /** @type {?} */
    FormsetComponent.prototype.formarray;
    /** @type {?} */
    FormsetComponent.prototype.config;
    /** @type {?} */
    FormsetComponent.prototype.choices;
    /** @type {?} */
    FormsetComponent.prototype.api;
    /** @type {?} */
    FormsetComponent.prototype.reg;
    /** @type {?} */
    FormsetComponent.prototype.formService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXNldC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9jcnVkLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZm9ybXNldC9mb3Jtc2V0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWEsS0FBSyxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUMzRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXRELE9BQU8sRUFBRyxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzNELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDMUQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGFBQWEsQ0FBQzs7SUFnQ2xDLDBCQUFvQixHQUFlLEVBQVUsR0FBYSxFQUFVLFdBQXdCO1FBQXhFLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFVO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7dUJBRmxGLEVBQUU7S0FHWDs7Ozs7SUFFRCxzQ0FBVzs7OztJQUFYLFVBQVksT0FBc0I7UUFDaEMsRUFBRSxDQUFDLENBQUMsT0FBTyxXQUFRLFdBQVcsQ0FBQyxDQUFDLENBQUM7O2dCQUMvQixHQUFHLENBQUMsQ0FBZ0IsSUFBQSxLQUFBLGlCQUFBLE9BQU8sV0FBUSxZQUFZLENBQUMsTUFBTSxDQUFBLGdCQUFBO29CQUFqRCxJQUFNLEtBQUssV0FBQTtvQkFDZCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEtBQUssYUFBYSxDQUFDLENBQUMsQ0FBQzt3QkFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDeEI7aUJBQ0Y7Ozs7Ozs7OztTQUNGOztLQUNGOzs7O0lBRUQsa0NBQU87OztJQUFQO1FBQ0UscUJBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDM0I7Ozs7O0lBRUQscUNBQVU7Ozs7SUFBVixVQUFXLEtBQVk7UUFBdkIsaUJBT0M7UUFOQyxxQkFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqRCxxQkFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUc7WUFDekMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzNCLENBQUMsQ0FBQztLQUNKOztnQkF2REYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFFBQVEsRUFBRSxpeUJBZ0JMO29CQUNMLE1BQU0sRUFBRSxDQUFDLGtGQUFrRixDQUFDO29CQUM1RixRQUFRLEVBQUUsa0JBQWtCO2lCQUM3Qjs7OztnQkF6QlEsVUFBVTtnQkFEVixRQUFRO2dCQUVSLFdBQVc7Ozt1QkEyQmpCLEtBQUs7d0JBQ0wsS0FBSzs0QkFDTCxLQUFLO3lCQUNMLEtBQUs7OzJCQXBDUjs7U0ErQmEsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkNoYW5nZXMsIElucHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1BcnJheSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgIE1vZGVsIH0gZnJvbSAnLi4vLi4vc2NyZWVucyc7XG5pbXBvcnQgeyBSZWdpc3RyeSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3JlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEZvcm1TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZm9ybS5zZXJ2aWNlJztcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi4vLi4vZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy1jcnVkLWZvcm1zZXQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgW2Zvcm1Hcm91cF09XCJmb3JtXCIgKm5nSWY9XCJmb3JtYXJyYXlcIiBjbGFzcz1cImZvcm1zZXRcIj5cbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgIDxoND4ge3sgY29uZmlnLmxhYmVsIH19PC9oND5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJzcGFjZXJcIj48L3NwYW4+XG4gICAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIChjbGljayk9XCJhZGRGb3JtKClcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbj5hZGRfY2lyY2xlPC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBbZm9ybUFycmF5TmFtZV09XCJjb25maWcua2V5XCI+XG4gICAgICAgIDxtYXQtZ3JpZC1saXN0IGd1dHRlclNpemU9XCIxMlwiIFtjb2xzXT1cImNvbmZpZy5maWVsZHMubGVuZ3RoXCIgcm93SGVpZ2h0PVwiNjBcIiAgKm5nRm9yPVwibGV0IGN0cmwgb2YgZm9ybWFycmF5LmNvbnRyb2xzOyBsZXQgaT1pbmRleFwiIFtmb3JtR3JvdXBOYW1lXT1cImlcIj5cbiAgICAgICAgICAgIDxtYXQtZ3JpZC10aWxlICAqbmdGb3I9XCJsZXQgZiBvZiBjb25maWcuZmllbGRzXCI+XG4gICAgICAgICAgICAgICAge3sgZi4ga2V5IH19XG4gICAgICAgICAgICAgICAgPG5nLWNydWQtZm9ybS1maWVsZCBbY2hvaWNlc109XCJjaG9pY2VzW2Yua2V5XVwiIFtmb3JtXT1cImN0cmxcIiBbZmllbGRdPVwiZlwiPjwvbmctY3J1ZC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgPC9tYXQtZ3JpZC10aWxlPlxuICAgICAgICA8L21hdC1ncmlkLWxpc3Q+XG4gICAgPC9kaXY+XG48L2Rpdj5gLFxuICBzdHlsZXM6IFtgLmZvcm1zZXR7cGFkZGluZy10b3A6MTJweH0ucm93e2Rpc3BsYXk6ZmxleDtmbGV4OjEgMSBhdXRvfS5zcGFjZXJ7ZmxleDoxIDEgYXV0b31gXSxcbiAgZXhwb3J0QXM6ICduZ2NydWR1aS1mb3Jtc2V0J1xufSlcbmV4cG9ydCBjbGFzcyBGb3Jtc2V0Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICBASW5wdXQoKSBmb3JtOiBGb3JtR3JvdXA7XG4gIEBJbnB1dCgpIG1vZGVsOiBNb2RlbDtcbiAgQElucHV0KCkgZm9ybWFycmF5OiBGb3JtQXJyYXk7XG4gIEBJbnB1dCgpIGNvbmZpZzogRmllbGQ7XG4gIGNob2ljZXMgPSB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwaTogQXBpU2VydmljZSwgcHJpdmF0ZSByZWc6IFJlZ2lzdHJ5LCBwcml2YXRlIGZvcm1TZXJ2aWNlOiBGb3JtU2VydmljZSkge1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmNvbmZpZy5maXJzdENoYW5nZSkge1xuICAgICAgZm9yIChjb25zdCBmaWVsZCBvZiBjaGFuZ2VzLmNvbmZpZy5jdXJyZW50VmFsdWUuZmllbGRzKSB7XG4gICAgICAgIGlmIChmaWVsZFsnY29udHJvbF90eXBlJ10gPT09ICdmb3JlaWduX2tleScpIHtcbiAgICAgICAgICB0aGlzLmdldENob2ljZXMoZmllbGQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWRkRm9ybSgpIHtcbiAgICBjb25zdCBjdHJsID0gdGhpcy5mb3JtU2VydmljZS50b0Zvcm1Hcm91cCh0aGlzLmNvbmZpZy5maWVsZHMpO1xuICAgIHRoaXMuZm9ybWFycmF5LnB1c2goY3RybCk7XG4gIH1cblxuICBnZXRDaG9pY2VzKGZpZWxkOiBGaWVsZCkge1xuICAgIGNvbnN0IHBhdGggPSBmaWVsZC5mb3JlaWduX21vZGVsX3BhdGguc3BsaXQoJy4nKTtcbiAgICBjb25zdCBtb2RlbCA9IHRoaXMucmVnLmdldE1vZGVsKHBhdGhbMF0sIHBhdGhbMV0sIHBhdGhbMl0pO1xuICAgIHRoaXMuYXBpLmZldGNoKG1vZGVsLmFwaSwge30pLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgdGhpcy5jaG9pY2VzW2ZpZWxkLmtleV0gPSByZXM7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmNob2ljZXMpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Registry } from '../../services/registry.service';
import { ApiService } from '../../services/api.service';
import { Field } from '../../forms';
import { ListingDialogComponent } from '../../containers/listing-dialog/listing-dialog.component';
var /** @type {?} */ CHOICES = [];
var /** @type {?} */ FOREIGN_MODEL;
var FormFieldComponent = /** @class */ (function () {
    function FormFieldComponent(dialog, api, reg) {
        this.dialog = dialog;
        this.api = api;
        this.reg = reg;
        this.forcedSearchParams = [];
        this.modelPath = [];
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    FormFieldComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        if (this.field.control_type === 'foreign_key') {
            console.log('first change', this.choices);
            var /** @type {?} */ path = this.field.foreign_model_path.split('.');
            this.modelPath = path;
            this.foreign_model = this.reg.getModel(path[0], path[1], path[2]);
            FOREIGN_MODEL = this.foreign_model;
            if (this.choices) {
                console.log('found choices');
                this.filteredOptions = of(this.choices);
            }
            // this.api.fetch(`${this.foreign_model.api}`, []).subscribe(res => {
            //   this.choices = res;
            //   CHOICES = res;
            // });
            var /** @type {?} */ ctrl = this.form.get(this.field.key);
            this.filteredOptions = ctrl.valueChanges.pipe(startWith(''), debounceTime(200), distinctUntilChanged(), switchMap(function (val) { return _this._filter(val || null); }));
            // if (this.form.value[this.field.key]) {
            //   console.log('setting ctrl value', this.form.value[this.field.key]);
            //   ctrl.setValue(this.form.value[this.field.key]);
            // }
        }
    };
    /**
     * @param {?} field_name
     * @return {?}
     */
    FormFieldComponent.prototype.getFormControl = /**
     * @param {?} field_name
     * @return {?}
     */
    function (field_name) {
        return /** @type {?} */ (this.form.get(field_name));
    };
    /**
     * @param {?} option
     * @return {?}
     */
    FormFieldComponent.prototype.displayFn = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        try {
            for (var CHOICES_1 = tslib_1.__values(CHOICES), CHOICES_1_1 = CHOICES_1.next(); !CHOICES_1_1.done; CHOICES_1_1 = CHOICES_1.next()) {
                var c = CHOICES_1_1.value;
                if (c['id'] === option) {
                    return c[FOREIGN_MODEL['external_name_field']];
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (CHOICES_1_1 && !CHOICES_1_1.done && (_a = CHOICES_1.return)) _a.call(CHOICES_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // return option ? option.code : option;
        var e_1, _a;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    FormFieldComponent.prototype._filter = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (typeof value !== 'string') {
            return new Observable();
        }
        var /** @type {?} */ filterValue = value ? value.toLowerCase() : null;
        var /** @type {?} */ params = {};
        params[this.foreign_model.external_name_field] = filterValue;
        return this.api.fetch("" + this.foreign_model.api, params).pipe(map(function (res) {
            CHOICES = res;
            return res;
        }));
        // return this.choices.filter(option => option.code.toLowerCase().indexOf(filterValue) === 0);
    };
    /**
     * @return {?}
     */
    FormFieldComponent.prototype.openListingDialog = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ ref = this.dialog.open(ListingDialogComponent, {
            width: '90%',
            height: '90%',
            data: {
                moduleName: this.modelPath[0],
                appName: this.modelPath[1],
                modelName: this.modelPath[2]
            }
        });
        ref.afterClosed().subscribe(function (value) {
            _this.form.get(_this.field.key).setValue(value);
        });
    };
    FormFieldComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ng-crud-form-field',
                    template: "<div [ngSwitch]=\"field.control_type\" class=\"form-field-wrapper\" [formGroup]=\"form\">\n\n    <div *ngSwitchCase=\"'switch'\">\n        <mat-slide-toggle matInput [formControlName]=\"field.key\">{{ field.label }}</mat-slide-toggle>\n    </div>\n\n    <mat-form-field *ngSwitchCase=\"'textarea'\">\n        <mat-label>{{ field.label }}</mat-label>\n        <textarea matInput matTextareaAutosize [formControlName]=\"field.key\"\n            [rows]=\"field.rowspan || 1\"></textarea>\n    </mat-form-field>\n\n    <mat-form-field *ngSwitchCase=\"'select'\">\n        <mat-label>{{ field.label }}</mat-label>\n        <mat-select [formControlName]=\"field.key\">\n            <mat-option></mat-option>\n            <mat-option [value]=\"c.value\" *ngFor=\"let c of field.choices\">\n                {{ c.label }}\n            </mat-option>\n        </mat-select>\n    </mat-form-field>\n\n    <mat-form-field *ngSwitchCase=\"'date'\">\n        <mat-label>{{ field.label }}</mat-label>\n        <input  matInput [formControlName]=\"field.key\"  [matDatepicker]=\"myDatepicker\" />\n        <mat-datepicker-toggle matSuffix [for]=\"myDatepicker\"></mat-datepicker-toggle>\n        <mat-datepicker #myDatepicker></mat-datepicker>\n    </mat-form-field>\n    \n    <ng-container *ngSwitchCase=\"'foreign_key'\">\n        <mat-form-field>\n            <mat-label>{{ field.label }}</mat-label>\n            <input type=\"text\" matInput [formControlName]=\"field.key\" [matAutocomplete]=\"auto\">\n        </mat-form-field>\n        <!-- <button mat-icon-button (click)=\"openListingDialog()\"><mat-icon>search</mat-icon></button> -->\n        \n        <mat-autocomplete #auto=\"matAutocomplete\" [displayWith]=\"displayFn\">\n            <mat-option *ngFor=\"let option of filteredOptions | async\" [value]=\"option[foreign_model.external_value_field]\">\n                {{ option[foreign_model.external_name_field] }}\n            </mat-option>\n        </mat-autocomplete>\n    </ng-container>\n\n    <!-- this fallsback from number and text -->\n    <mat-form-field *ngSwitchDefault>\n        <mat-label>{{ field.label }}</mat-label>\n        <input  matInput [formControlName]=\"field.key\"\n                [type]=\"field.control_type || field.value_type || 'text'\" />\n    </mat-form-field>\n\n</div>",
                    exportAs: 'ngcrudui-form-field',
                    styles: ['.form-field-wrapper{margin-right:  24px}']
                },] },
    ];
    /** @nocollapse */
    FormFieldComponent.ctorParameters = function () { return [
        { type: MatDialog },
        { type: ApiService },
        { type: Registry }
    ]; };
    FormFieldComponent.propDecorators = {
        form: [{ type: Input }],
        forcedSearchParams: [{ type: Input }],
        field: [{ type: Input }],
        choices: [{ type: Input }]
    };
    return FormFieldComponent;
}());
export { FormFieldComponent };
function FormFieldComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    FormFieldComponent.prototype.form;
    /** @type {?} */
    FormFieldComponent.prototype.forcedSearchParams;
    /** @type {?} */
    FormFieldComponent.prototype.field;
    /** @type {?} */
    FormFieldComponent.prototype.choices;
    /** @type {?} */
    FormFieldComponent.prototype.filteredOptions;
    /** @type {?} */
    FormFieldComponent.prototype.foreign_model;
    /** @type {?} */
    FormFieldComponent.prototype.modelPath;
    /** @type {?} */
    FormFieldComponent.prototype.dialog;
    /** @type {?} */
    FormFieldComponent.prototype.api;
    /** @type {?} */
    FormFieldComponent.prototype.reg;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9jcnVkLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZm9ybS1maWVsZC9mb3JtLWZpZWxkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWEsS0FBSyxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUMzRSxPQUFPLEVBQWUsZUFBZSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQy9GLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUdyRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDM0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDcEMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sMERBQTBELENBQUM7QUFFbEcscUJBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUNqQixxQkFBSSxhQUFhLENBQUM7O0lBb0VoQiw0QkFBb0IsTUFBaUIsRUFBVSxHQUFlLEVBQVUsR0FBYTtRQUFqRSxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUFVLFFBQUcsR0FBSCxHQUFHLENBQVU7a0NBUGxELEVBQUU7eUJBS1AsRUFBRTtLQUcvQjs7Ozs7SUFFRCx3Q0FBVzs7OztJQUFYLFVBQVksT0FBc0I7UUFBbEMsaUJBMkJDO1FBMUJDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFB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QUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFO1lBQ25ELEtBQUssRUFBRSxLQUFLO1lBQ1osTUFBTSxFQUFFLEtBQUs7WUFDYixJQUFJLEVBQUU7Z0JBQ0osVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzthQUM3QjtTQUNGLENBQUMsQ0FBQztRQUNILEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLO1lBQy9CLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQy9DLENBQUMsQ0FBQztLQUNKOztnQkE1SUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRSxrd0VBa0RMO29CQUNMLFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLE1BQU0sRUFBRSxDQUFDLDBDQUEwQyxDQUFDO2lCQUNyRDs7OztnQkFsRVEsU0FBUztnQkFJVCxVQUFVO2dCQURWLFFBQVE7Ozt1QkFrRWQsS0FBSztxQ0FDTCxLQUFLO3dCQUNMLEtBQUs7MEJBQ0wsS0FBSzs7NkJBNUVSOztTQXVFYSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uQ2hhbmdlcywgSW5wdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sLCBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBzdGFydFdpdGgsIGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE1hdERpYWxvZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5cbmltcG9ydCB7ICBNb2RlbCB9IGZyb20gJy4uLy4uL3NjcmVlbnMnO1xuaW1wb3J0IHsgUmVnaXN0cnkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9yZWdpc3RyeS5zZXJ2aWNlJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBGaWVsZCB9IGZyb20gJy4uLy4uL2Zvcm1zJztcbmltcG9ydCB7IExpc3RpbmdEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb250YWluZXJzL2xpc3RpbmctZGlhbG9nL2xpc3RpbmctZGlhbG9nLmNvbXBvbmVudCc7XG5cbmxldCBDSE9JQ0VTID0gW107XG5sZXQgRk9SRUlHTl9NT0RFTDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctY3J1ZC1mb3JtLWZpZWxkJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IFtuZ1N3aXRjaF09XCJmaWVsZC5jb250cm9sX3R5cGVcIiBjbGFzcz1cImZvcm0tZmllbGQtd3JhcHBlclwiIFtmb3JtR3JvdXBdPVwiZm9ybVwiPlxuXG4gICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3N3aXRjaCdcIj5cbiAgICAgICAgPG1hdC1zbGlkZS10b2dnbGUgbWF0SW5wdXQgW2Zvcm1Db250cm9sTmFtZV09XCJmaWVsZC5rZXlcIj57eyBmaWVsZC5sYWJlbCB9fTwvbWF0LXNsaWRlLXRvZ2dsZT5cbiAgICA8L2Rpdj5cblxuICAgIDxtYXQtZm9ybS1maWVsZCAqbmdTd2l0Y2hDYXNlPVwiJ3RleHRhcmVhJ1wiPlxuICAgICAgICA8bWF0LWxhYmVsPnt7IGZpZWxkLmxhYmVsIH19PC9tYXQtbGFiZWw+XG4gICAgICAgIDx0ZXh0YXJlYSBtYXRJbnB1dCBtYXRUZXh0YXJlYUF1dG9zaXplIFtmb3JtQ29udHJvbE5hbWVdPVwiZmllbGQua2V5XCJcbiAgICAgICAgICAgIFtyb3dzXT1cImZpZWxkLnJvd3NwYW4gfHwgMVwiPjwvdGV4dGFyZWE+XG4gICAgPC9tYXQtZm9ybS1maWVsZD5cblxuICAgIDxtYXQtZm9ybS1maWVsZCAqbmdTd2l0Y2hDYXNlPVwiJ3NlbGVjdCdcIj5cbiAgICAgICAgPG1hdC1sYWJlbD57eyBmaWVsZC5sYWJlbCB9fTwvbWF0LWxhYmVsPlxuICAgICAgICA8bWF0LXNlbGVjdCBbZm9ybUNvbnRyb2xOYW1lXT1cImZpZWxkLmtleVwiPlxuICAgICAgICAgICAgPG1hdC1vcHRpb24+PC9tYXQtb3B0aW9uPlxuICAgICAgICAgICAgPG1hdC1vcHRpb24gW3ZhbHVlXT1cImMudmFsdWVcIiAqbmdGb3I9XCJsZXQgYyBvZiBmaWVsZC5jaG9pY2VzXCI+XG4gICAgICAgICAgICAgICAge3sgYy5sYWJlbCB9fVxuICAgICAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgICAgICA8L21hdC1zZWxlY3Q+XG4gICAgPC9tYXQtZm9ybS1maWVsZD5cblxuICAgIDxtYXQtZm9ybS1maWVsZCAqbmdTd2l0Y2hDYXNlPVwiJ2RhdGUnXCI+XG4gICAgICAgIDxtYXQtbGFiZWw+e3sgZmllbGQubGFiZWwgfX08L21hdC1sYWJlbD5cbiAgICAgICAgPGlucHV0ICBtYXRJbnB1dCBbZm9ybUNvbnRyb2xOYW1lXT1cImZpZWxkLmtleVwiICBbbWF0RGF0ZXBpY2tlcl09XCJteURhdGVwaWNrZXJcIiAvPlxuICAgICAgICA8bWF0LWRhdGVwaWNrZXItdG9nZ2xlIG1hdFN1ZmZpeCBbZm9yXT1cIm15RGF0ZXBpY2tlclwiPjwvbWF0LWRhdGVwaWNrZXItdG9nZ2xlPlxuICAgICAgICA8bWF0LWRhdGVwaWNrZXIgI215RGF0ZXBpY2tlcj48L21hdC1kYXRlcGlja2VyPlxuICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgXG4gICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiJ2ZvcmVpZ25fa2V5J1wiPlxuICAgICAgICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgICAgICAgICA8bWF0LWxhYmVsPnt7IGZpZWxkLmxhYmVsIH19PC9tYXQtbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBtYXRJbnB1dCBbZm9ybUNvbnRyb2xOYW1lXT1cImZpZWxkLmtleVwiIFttYXRBdXRvY29tcGxldGVdPVwiYXV0b1wiPlxuICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgICAgICA8IS0tIDxidXR0b24gbWF0LWljb24tYnV0dG9uIChjbGljayk9XCJvcGVuTGlzdGluZ0RpYWxvZygpXCI+PG1hdC1pY29uPnNlYXJjaDwvbWF0LWljb24+PC9idXR0b24+IC0tPlxuICAgICAgICBcbiAgICAgICAgPG1hdC1hdXRvY29tcGxldGUgI2F1dG89XCJtYXRBdXRvY29tcGxldGVcIiBbZGlzcGxheVdpdGhdPVwiZGlzcGxheUZuXCI+XG4gICAgICAgICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIGZpbHRlcmVkT3B0aW9ucyB8IGFzeW5jXCIgW3ZhbHVlXT1cIm9wdGlvbltmb3JlaWduX21vZGVsLmV4dGVybmFsX3ZhbHVlX2ZpZWxkXVwiPlxuICAgICAgICAgICAgICAgIHt7IG9wdGlvbltmb3JlaWduX21vZGVsLmV4dGVybmFsX25hbWVfZmllbGRdIH19XG4gICAgICAgICAgICA8L21hdC1vcHRpb24+XG4gICAgICAgIDwvbWF0LWF1dG9jb21wbGV0ZT5cbiAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgIDwhLS0gdGhpcyBmYWxsc2JhY2sgZnJvbSBudW1iZXIgYW5kIHRleHQgLS0+XG4gICAgPG1hdC1mb3JtLWZpZWxkICpuZ1N3aXRjaERlZmF1bHQ+XG4gICAgICAgIDxtYXQtbGFiZWw+e3sgZmllbGQubGFiZWwgfX08L21hdC1sYWJlbD5cbiAgICAgICAgPGlucHV0ICBtYXRJbnB1dCBbZm9ybUNvbnRyb2xOYW1lXT1cImZpZWxkLmtleVwiXG4gICAgICAgICAgICAgICAgW3R5cGVdPVwiZmllbGQuY29udHJvbF90eXBlIHx8IGZpZWxkLnZhbHVlX3R5cGUgfHwgJ3RleHQnXCIgLz5cbiAgICA8L21hdC1mb3JtLWZpZWxkPlxuXG48L2Rpdj5gLFxuICBleHBvcnRBczogJ25nY3J1ZHVpLWZvcm0tZmllbGQnLFxuICBzdHlsZXM6IFsnLmZvcm0tZmllbGQtd3JhcHBlcnttYXJnaW4tcmlnaHQ6ICAyNHB4fSddXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1GaWVsZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KCkgZm9ybTogQWJzdHJhY3RDb250cm9sO1xuICBASW5wdXQoKSBmb3JjZWRTZWFyY2hQYXJhbXM6IGFueSA9IFtdO1xuICBASW5wdXQoKSBmaWVsZDogRmllbGQ7XG4gIEBJbnB1dCgpIGNob2ljZXM7XG4gIGZpbHRlcmVkT3B0aW9uczogT2JzZXJ2YWJsZTxhbnlbXT47XG4gIGZvcmVpZ25fbW9kZWw/OiBNb2RlbDtcbiAgcHJpdmF0ZSBtb2RlbFBhdGg6IHN0cmluZ1tdID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBkaWFsb2c6IE1hdERpYWxvZywgcHJpdmF0ZSBhcGk6IEFwaVNlcnZpY2UsIHByaXZhdGUgcmVnOiBSZWdpc3RyeSkge1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICh0aGlzLmZpZWxkLmNvbnRyb2xfdHlwZSA9PT0gJ2ZvcmVpZ25fa2V5Jykge1xuICAgICAgY29uc29sZS5sb2coJ2ZpcnN0IGNoYW5nZScsIHRoaXMuY2hvaWNlcyk7XG4gICAgICBjb25zdCBwYXRoID0gdGhpcy5maWVsZC5mb3JlaWduX21vZGVsX3BhdGguc3BsaXQoJy4nKTtcbiAgICAgIHRoaXMubW9kZWxQYXRoID0gcGF0aDtcbiAgICAgIHRoaXMuZm9yZWlnbl9tb2RlbCA9IHRoaXMucmVnLmdldE1vZGVsKHBhdGhbMF0sIHBhdGhbMV0sIHBhdGhbMl0pO1xuICAgICAgRk9SRUlHTl9NT0RFTCA9IHRoaXMuZm9yZWlnbl9tb2RlbDtcbiAgICAgIGlmICh0aGlzLmNob2ljZXMpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2ZvdW5kIGNob2ljZXMnKTtcbiAgICAgICAgdGhpcy5maWx0ZXJlZE9wdGlvbnMgPSBvZih0aGlzLmNob2ljZXMpO1xuICAgICAgfVxuICAgICAgLy8gdGhpcy5hcGkuZmV0Y2goYCR7dGhpcy5mb3JlaWduX21vZGVsLmFwaX1gLCBbXSkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAvLyAgIHRoaXMuY2hvaWNlcyA9IHJlcztcbiAgICAgIC8vICAgQ0hPSUNFUyA9IHJlcztcbiAgICAgIC8vIH0pO1xuICAgICAgY29uc3QgY3RybCA9IHRoaXMuZm9ybS5nZXQodGhpcy5maWVsZC5rZXkpO1xuICAgICAgdGhpcy5maWx0ZXJlZE9wdGlvbnMgPSBjdHJsLnZhbHVlQ2hhbmdlcy5waXBlKFxuICAgICAgICBzdGFydFdpdGgoJycpLFxuICAgICAgICBkZWJvdW5jZVRpbWUoMjAwKSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgICAgc3dpdGNoTWFwKHZhbCA9PiB0aGlzLl9maWx0ZXIodmFsIHx8IG51bGwpKVxuICAgICAgKTtcbiAgICAgIC8vIGlmICh0aGlzLmZvcm0udmFsdWVbdGhpcy5maWVsZC5rZXldKSB7XG4gICAgICAvLyAgIGNvbnNvbGUubG9nKCdzZXR0aW5nIGN0cmwgdmFsdWUnLCB0aGlzLmZvcm0udmFsdWVbdGhpcy5maWVsZC5rZXldKTtcbiAgICAgIC8vICAgY3RybC5zZXRWYWx1ZSh0aGlzLmZvcm0udmFsdWVbdGhpcy5maWVsZC5rZXldKTtcbiAgICAgIC8vIH1cbiAgICB9XG4gIH1cblxuICBnZXRGb3JtQ29udHJvbChmaWVsZF9uYW1lOiBzdHJpbmcpOiBGb3JtQ29udHJvbCB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybS5nZXQoZmllbGRfbmFtZSkgYXMgRm9ybUNvbnRyb2w7XG4gIH1cblxuICBkaXNwbGF5Rm4ob3B0aW9uKSB7XG4gICAgZm9yIChjb25zdCBjIG9mIENIT0lDRVMpIHtcbiAgICAgIGlmIChjWydpZCddID09PSBvcHRpb24pIHtcbiAgICAgICAgcmV0dXJuIGNbRk9SRUlHTl9NT0RFTFsnZXh0ZXJuYWxfbmFtZV9maWVsZCddXTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gcmV0dXJuIG9wdGlvbiA/IG9wdGlvbi5jb2RlIDogb3B0aW9uO1xuICB9XG5cbiAgX2ZpbHRlcih2YWx1ZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnlbXT4ge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKTtcbiAgICB9XG4gICAgY29uc3QgZmlsdGVyVmFsdWUgPSB2YWx1ZSA/IHZhbHVlLnRvTG93ZXJDYXNlKCkgOiBudWxsO1xuICAgIGNvbnN0IHBhcmFtcyA9IHt9O1xuICAgIHBhcmFtc1t0aGlzLmZvcmVpZ25fbW9kZWwuZXh0ZXJuYWxfbmFtZV9maWVsZF0gPSBmaWx0ZXJWYWx1ZTtcbiAgICByZXR1cm4gdGhpcy5hcGkuZmV0Y2goYCR7dGhpcy5mb3JlaWduX21vZGVsLmFwaX1gLCBwYXJhbXMpLnBpcGUoXG4gICAgICBtYXAocmVzID0+IHtcbiAgICAgICAgICBDSE9JQ0VTID0gcmVzO1xuICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICB9KVxuICAgICk7XG4gICAgLy8gcmV0dXJuIHRoaXMuY2hvaWNlcy5maWx0ZXIob3B0aW9uID0+IG9wdGlvbi5jb2RlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihmaWx0ZXJWYWx1ZSkgPT09IDApO1xuICB9XG5cbiAgb3Blbkxpc3RpbmdEaWFsb2coKSB7XG4gICAgY29uc3QgcmVmID0gdGhpcy5kaWFsb2cub3BlbihMaXN0aW5nRGlhbG9nQ29tcG9uZW50LCB7XG4gICAgICB3aWR0aDogJzkwJScsXG4gICAgICBoZWlnaHQ6ICc5MCUnLFxuICAgICAgZGF0YToge1xuICAgICAgICBtb2R1bGVOYW1lOiB0aGlzLm1vZGVsUGF0aFswXSxcbiAgICAgICAgYXBwTmFtZTogdGhpcy5tb2RlbFBhdGhbMV0sXG4gICAgICAgIG1vZGVsTmFtZTogdGhpcy5tb2RlbFBhdGhbMl1cbiAgICAgIH1cbiAgICB9KTtcbiAgICByZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgdGhpcy5mb3JtLmdldCh0aGlzLmZpZWxkLmtleSkuc2V0VmFsdWUodmFsdWUpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=
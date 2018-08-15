/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Registry } from '../../services/registry.service';
import { ApiService } from '../../services/api.service';
import { Field } from '../../forms';
import { ListingDialogComponent } from '../../containers/listing-dialog/listing-dialog.component';
let /** @type {?} */ CHOICES = [];
let /** @type {?} */ FOREIGN_MODEL;
export class FormFieldComponent {
    /**
     * @param {?} dialog
     * @param {?} api
     * @param {?} reg
     */
    constructor(dialog, api, reg) {
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
    ngOnChanges(changes) {
        if (this.field.control_type === 'foreign_key') {
            console.log('first change', this.choices);
            const /** @type {?} */ path = this.field.foreign_model_path.split('.');
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
            const /** @type {?} */ ctrl = this.form.get(this.field.key);
            this.filteredOptions = ctrl.valueChanges.pipe(startWith(''), debounceTime(200), distinctUntilChanged(), switchMap(val => this._filter(val || null)));
            // if (this.form.value[this.field.key]) {
            //   console.log('setting ctrl value', this.form.value[this.field.key]);
            //   ctrl.setValue(this.form.value[this.field.key]);
            // }
        }
    }
    /**
     * @param {?} field_name
     * @return {?}
     */
    getFormControl(field_name) {
        return /** @type {?} */ (this.form.get(field_name));
    }
    /**
     * @param {?} option
     * @return {?}
     */
    displayFn(option) {
        for (const /** @type {?} */ c of CHOICES) {
            if (c['id'] === option) {
                return c[FOREIGN_MODEL['external_name_field']];
            }
        }
        // return option ? option.code : option;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _filter(value) {
        if (typeof value !== 'string') {
            return new Observable();
        }
        const /** @type {?} */ filterValue = value ? value.toLowerCase() : null;
        const /** @type {?} */ params = {};
        params[this.foreign_model.external_name_field] = filterValue;
        return this.api.fetch(`${this.foreign_model.api}`, params).pipe(map(res => {
            CHOICES = res;
            return res;
        }));
        // return this.choices.filter(option => option.code.toLowerCase().indexOf(filterValue) === 0);
    }
    /**
     * @return {?}
     */
    openListingDialog() {
        const /** @type {?} */ ref = this.dialog.open(ListingDialogComponent, {
            width: '90%',
            height: '90%',
            data: {
                moduleName: this.modelPath[0],
                appName: this.modelPath[1],
                modelName: this.modelPath[2]
            }
        });
        ref.afterClosed().subscribe(value => {
            this.form.get(this.field.key).setValue(value);
        });
    }
}
FormFieldComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-crud-form-field',
                template: `<div [ngSwitch]="field.control_type" class="form-field-wrapper" [formGroup]="form">

    <div *ngSwitchCase="'switch'">
        <mat-slide-toggle matInput [formControlName]="field.key">{{ field.label }}</mat-slide-toggle>
    </div>

    <mat-form-field *ngSwitchCase="'textarea'">
        <mat-label>{{ field.label }}</mat-label>
        <textarea matInput matTextareaAutosize [formControlName]="field.key"
            [rows]="field.rowspan || 1"></textarea>
    </mat-form-field>

    <mat-form-field *ngSwitchCase="'select'">
        <mat-label>{{ field.label }}</mat-label>
        <mat-select [formControlName]="field.key">
            <mat-option></mat-option>
            <mat-option [value]="c.value" *ngFor="let c of field.choices">
                {{ c.label }}
            </mat-option>
        </mat-select>
    </mat-form-field>

    <mat-form-field *ngSwitchCase="'date'">
        <mat-label>{{ field.label }}</mat-label>
        <input  matInput [formControlName]="field.key"  [matDatepicker]="myDatepicker" />
        <mat-datepicker-toggle matSuffix [for]="myDatepicker"></mat-datepicker-toggle>
        <mat-datepicker #myDatepicker></mat-datepicker>
    </mat-form-field>
    
    <ng-container *ngSwitchCase="'foreign_key'">
        <mat-form-field>
            <mat-label>{{ field.label }}</mat-label>
            <input type="text" matInput [formControlName]="field.key" [matAutocomplete]="auto">
        </mat-form-field>
        <!-- <button mat-icon-button (click)="openListingDialog()"><mat-icon>search</mat-icon></button> -->
        
        <mat-autocomplete #auto="matAutocomplete" [displayWith]="displayFn">
            <mat-option *ngFor="let option of filteredOptions | async" [value]="option[foreign_model.external_value_field]">
                {{ option[foreign_model.external_name_field] }}
            </mat-option>
        </mat-autocomplete>
    </ng-container>

    <!-- this fallsback from number and text -->
    <mat-form-field *ngSwitchDefault>
        <mat-label>{{ field.label }}</mat-label>
        <input  matInput [formControlName]="field.key"
                [type]="field.control_type || field.value_type || 'text'" />
    </mat-form-field>

</div>`,
                exportAs: 'ngcrudui-form-field',
                styles: ['.form-field-wrapper{margin-right:  24px}']
            },] },
];
/** @nocollapse */
FormFieldComponent.ctorParameters = () => [
    { type: MatDialog },
    { type: ApiService },
    { type: Registry }
];
FormFieldComponent.propDecorators = {
    form: [{ type: Input }],
    forcedSearchParams: [{ type: Input }],
    field: [{ type: Input }],
    choices: [{ type: Input }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9jcnVkLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZm9ybS1maWVsZC9mb3JtLWZpZWxkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYSxLQUFLLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQzNFLE9BQU8sRUFBZSxlQUFlLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0YsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBR3JELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMzRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDeEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNwQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSwwREFBMEQsQ0FBQztBQUVsRyxxQkFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBQ2pCLHFCQUFJLGFBQWEsQ0FBQztBQTBEbEIsTUFBTTs7Ozs7O0lBVUosWUFBb0IsTUFBaUIsRUFBVSxHQUFlLEVBQVUsR0FBYTtRQUFqRSxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUFVLFFBQUcsR0FBSCxHQUFHLENBQVU7a0NBUGxELEVBQUU7eUJBS1AsRUFBRTtLQUcvQjs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEtBQUssYUFB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QUksRUFBRTtnQkFDSixVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2FBQzdCO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMvQyxDQUFDLENBQUM7S0FDSjs7O1lBNUlGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Ba0RMO2dCQUNMLFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLE1BQU0sRUFBRSxDQUFDLDBDQUEwQyxDQUFDO2FBQ3JEOzs7O1lBbEVRLFNBQVM7WUFJVCxVQUFVO1lBRFYsUUFBUTs7O21CQWtFZCxLQUFLO2lDQUNMLEtBQUs7b0JBQ0wsS0FBSztzQkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkNoYW5nZXMsIElucHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgc3RhcnRXaXRoLCBkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNYXREaWFsb2cgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuXG5pbXBvcnQgeyAgTW9kZWwgfSBmcm9tICcuLi8uLi9zY3JlZW5zJztcbmltcG9ydCB7IFJlZ2lzdHJ5IH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuLi8uLi9mb3Jtcyc7XG5pbXBvcnQgeyBMaXN0aW5nRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29udGFpbmVycy9saXN0aW5nLWRpYWxvZy9saXN0aW5nLWRpYWxvZy5jb21wb25lbnQnO1xuXG5sZXQgQ0hPSUNFUyA9IFtdO1xubGV0IEZPUkVJR05fTU9ERUw7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLWNydWQtZm9ybS1maWVsZCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBbbmdTd2l0Y2hdPVwiZmllbGQuY29udHJvbF90eXBlXCIgY2xhc3M9XCJmb3JtLWZpZWxkLXdyYXBwZXJcIiBbZm9ybUdyb3VwXT1cImZvcm1cIj5cblxuICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidzd2l0Y2gnXCI+XG4gICAgICAgIDxtYXQtc2xpZGUtdG9nZ2xlIG1hdElucHV0IFtmb3JtQ29udHJvbE5hbWVdPVwiZmllbGQua2V5XCI+e3sgZmllbGQubGFiZWwgfX08L21hdC1zbGlkZS10b2dnbGU+XG4gICAgPC9kaXY+XG5cbiAgICA8bWF0LWZvcm0tZmllbGQgKm5nU3dpdGNoQ2FzZT1cIid0ZXh0YXJlYSdcIj5cbiAgICAgICAgPG1hdC1sYWJlbD57eyBmaWVsZC5sYWJlbCB9fTwvbWF0LWxhYmVsPlxuICAgICAgICA8dGV4dGFyZWEgbWF0SW5wdXQgbWF0VGV4dGFyZWFBdXRvc2l6ZSBbZm9ybUNvbnRyb2xOYW1lXT1cImZpZWxkLmtleVwiXG4gICAgICAgICAgICBbcm93c109XCJmaWVsZC5yb3dzcGFuIHx8IDFcIj48L3RleHRhcmVhPlxuICAgIDwvbWF0LWZvcm0tZmllbGQ+XG5cbiAgICA8bWF0LWZvcm0tZmllbGQgKm5nU3dpdGNoQ2FzZT1cIidzZWxlY3QnXCI+XG4gICAgICAgIDxtYXQtbGFiZWw+e3sgZmllbGQubGFiZWwgfX08L21hdC1sYWJlbD5cbiAgICAgICAgPG1hdC1zZWxlY3QgW2Zvcm1Db250cm9sTmFtZV09XCJmaWVsZC5rZXlcIj5cbiAgICAgICAgICAgIDxtYXQtb3B0aW9uPjwvbWF0LW9wdGlvbj5cbiAgICAgICAgICAgIDxtYXQtb3B0aW9uIFt2YWx1ZV09XCJjLnZhbHVlXCIgKm5nRm9yPVwibGV0IGMgb2YgZmllbGQuY2hvaWNlc1wiPlxuICAgICAgICAgICAgICAgIHt7IGMubGFiZWwgfX1cbiAgICAgICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgICAgPC9tYXQtc2VsZWN0PlxuICAgIDwvbWF0LWZvcm0tZmllbGQ+XG5cbiAgICA8bWF0LWZvcm0tZmllbGQgKm5nU3dpdGNoQ2FzZT1cIidkYXRlJ1wiPlxuICAgICAgICA8bWF0LWxhYmVsPnt7IGZpZWxkLmxhYmVsIH19PC9tYXQtbGFiZWw+XG4gICAgICAgIDxpbnB1dCAgbWF0SW5wdXQgW2Zvcm1Db250cm9sTmFtZV09XCJmaWVsZC5rZXlcIiAgW21hdERhdGVwaWNrZXJdPVwibXlEYXRlcGlja2VyXCIgLz5cbiAgICAgICAgPG1hdC1kYXRlcGlja2VyLXRvZ2dsZSBtYXRTdWZmaXggW2Zvcl09XCJteURhdGVwaWNrZXJcIj48L21hdC1kYXRlcGlja2VyLXRvZ2dsZT5cbiAgICAgICAgPG1hdC1kYXRlcGlja2VyICNteURhdGVwaWNrZXI+PC9tYXQtZGF0ZXBpY2tlcj5cbiAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgIFxuICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIidmb3JlaWduX2tleSdcIj5cbiAgICAgICAgPG1hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgPG1hdC1sYWJlbD57eyBmaWVsZC5sYWJlbCB9fTwvbWF0LWxhYmVsPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbWF0SW5wdXQgW2Zvcm1Db250cm9sTmFtZV09XCJmaWVsZC5rZXlcIiBbbWF0QXV0b2NvbXBsZXRlXT1cImF1dG9cIj5cbiAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgPCEtLSA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiAoY2xpY2spPVwib3Blbkxpc3RpbmdEaWFsb2coKVwiPjxtYXQtaWNvbj5zZWFyY2g8L21hdC1pY29uPjwvYnV0dG9uPiAtLT5cbiAgICAgICAgXG4gICAgICAgIDxtYXQtYXV0b2NvbXBsZXRlICNhdXRvPVwibWF0QXV0b2NvbXBsZXRlXCIgW2Rpc3BsYXlXaXRoXT1cImRpc3BsYXlGblwiPlxuICAgICAgICAgICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBmaWx0ZXJlZE9wdGlvbnMgfCBhc3luY1wiIFt2YWx1ZV09XCJvcHRpb25bZm9yZWlnbl9tb2RlbC5leHRlcm5hbF92YWx1ZV9maWVsZF1cIj5cbiAgICAgICAgICAgICAgICB7eyBvcHRpb25bZm9yZWlnbl9tb2RlbC5leHRlcm5hbF9uYW1lX2ZpZWxkXSB9fVxuICAgICAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgICAgICA8L21hdC1hdXRvY29tcGxldGU+XG4gICAgPC9uZy1jb250YWluZXI+XG5cbiAgICA8IS0tIHRoaXMgZmFsbHNiYWNrIGZyb20gbnVtYmVyIGFuZCB0ZXh0IC0tPlxuICAgIDxtYXQtZm9ybS1maWVsZCAqbmdTd2l0Y2hEZWZhdWx0PlxuICAgICAgICA8bWF0LWxhYmVsPnt7IGZpZWxkLmxhYmVsIH19PC9tYXQtbGFiZWw+XG4gICAgICAgIDxpbnB1dCAgbWF0SW5wdXQgW2Zvcm1Db250cm9sTmFtZV09XCJmaWVsZC5rZXlcIlxuICAgICAgICAgICAgICAgIFt0eXBlXT1cImZpZWxkLmNvbnRyb2xfdHlwZSB8fCBmaWVsZC52YWx1ZV90eXBlIHx8ICd0ZXh0J1wiIC8+XG4gICAgPC9tYXQtZm9ybS1maWVsZD5cblxuPC9kaXY+YCxcbiAgZXhwb3J0QXM6ICduZ2NydWR1aS1mb3JtLWZpZWxkJyxcbiAgc3R5bGVzOiBbJy5mb3JtLWZpZWxkLXdyYXBwZXJ7bWFyZ2luLXJpZ2h0OiAgMjRweH0nXVxufSlcbmV4cG9ydCBjbGFzcyBGb3JtRmllbGRDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gIEBJbnB1dCgpIGZvcm06IEFic3RyYWN0Q29udHJvbDtcbiAgQElucHV0KCkgZm9yY2VkU2VhcmNoUGFyYW1zOiBhbnkgPSBbXTtcbiAgQElucHV0KCkgZmllbGQ6IEZpZWxkO1xuICBASW5wdXQoKSBjaG9pY2VzO1xuICBmaWx0ZXJlZE9wdGlvbnM6IE9ic2VydmFibGU8YW55W10+O1xuICBmb3JlaWduX21vZGVsPzogTW9kZWw7XG4gIHByaXZhdGUgbW9kZWxQYXRoOiBzdHJpbmdbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2csIHByaXZhdGUgYXBpOiBBcGlTZXJ2aWNlLCBwcml2YXRlIHJlZzogUmVnaXN0cnkpIHtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAodGhpcy5maWVsZC5jb250cm9sX3R5cGUgPT09ICdmb3JlaWduX2tleScpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdmaXJzdCBjaGFuZ2UnLCB0aGlzLmNob2ljZXMpO1xuICAgICAgY29uc3QgcGF0aCA9IHRoaXMuZmllbGQuZm9yZWlnbl9tb2RlbF9wYXRoLnNwbGl0KCcuJyk7XG4gICAgICB0aGlzLm1vZGVsUGF0aCA9IHBhdGg7XG4gICAgICB0aGlzLmZvcmVpZ25fbW9kZWwgPSB0aGlzLnJlZy5nZXRNb2RlbChwYXRoWzBdLCBwYXRoWzFdLCBwYXRoWzJdKTtcbiAgICAgIEZPUkVJR05fTU9ERUwgPSB0aGlzLmZvcmVpZ25fbW9kZWw7XG4gICAgICBpZiAodGhpcy5jaG9pY2VzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdmb3VuZCBjaG9pY2VzJyk7XG4gICAgICAgIHRoaXMuZmlsdGVyZWRPcHRpb25zID0gb2YodGhpcy5jaG9pY2VzKTtcbiAgICAgIH1cbiAgICAgIC8vIHRoaXMuYXBpLmZldGNoKGAke3RoaXMuZm9yZWlnbl9tb2RlbC5hcGl9YCwgW10pLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgLy8gICB0aGlzLmNob2ljZXMgPSByZXM7XG4gICAgICAvLyAgIENIT0lDRVMgPSByZXM7XG4gICAgICAvLyB9KTtcbiAgICAgIGNvbnN0IGN0cmwgPSB0aGlzLmZvcm0uZ2V0KHRoaXMuZmllbGQua2V5KTtcbiAgICAgIHRoaXMuZmlsdGVyZWRPcHRpb25zID0gY3RybC52YWx1ZUNoYW5nZXMucGlwZShcbiAgICAgICAgc3RhcnRXaXRoKCcnKSxcbiAgICAgICAgZGVib3VuY2VUaW1lKDIwMCksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICAgIHN3aXRjaE1hcCh2YWwgPT4gdGhpcy5fZmlsdGVyKHZhbCB8fCBudWxsKSlcbiAgICAgICk7XG4gICAgICAvLyBpZiAodGhpcy5mb3JtLnZhbHVlW3RoaXMuZmllbGQua2V5XSkge1xuICAgICAgLy8gICBjb25zb2xlLmxvZygnc2V0dGluZyBjdHJsIHZhbHVlJywgdGhpcy5mb3JtLnZhbHVlW3RoaXMuZmllbGQua2V5XSk7XG4gICAgICAvLyAgIGN0cmwuc2V0VmFsdWUodGhpcy5mb3JtLnZhbHVlW3RoaXMuZmllbGQua2V5XSk7XG4gICAgICAvLyB9XG4gICAgfVxuICB9XG5cbiAgZ2V0Rm9ybUNvbnRyb2woZmllbGRfbmFtZTogc3RyaW5nKTogRm9ybUNvbnRyb2wge1xuICAgIHJldHVybiB0aGlzLmZvcm0uZ2V0KGZpZWxkX25hbWUpIGFzIEZvcm1Db250cm9sO1xuICB9XG5cbiAgZGlzcGxheUZuKG9wdGlvbikge1xuICAgIGZvciAoY29uc3QgYyBvZiBDSE9JQ0VTKSB7XG4gICAgICBpZiAoY1snaWQnXSA9PT0gb3B0aW9uKSB7XG4gICAgICAgIHJldHVybiBjW0ZPUkVJR05fTU9ERUxbJ2V4dGVybmFsX25hbWVfZmllbGQnXV07XG4gICAgICB9XG4gICAgfVxuICAgIC8vIHJldHVybiBvcHRpb24gPyBvcHRpb24uY29kZSA6IG9wdGlvbjtcbiAgfVxuXG4gIF9maWx0ZXIodmFsdWU6IHN0cmluZyk6IE9ic2VydmFibGU8YW55W10+IHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKCk7XG4gICAgfVxuICAgIGNvbnN0IGZpbHRlclZhbHVlID0gdmFsdWUgPyB2YWx1ZS50b0xvd2VyQ2FzZSgpIDogbnVsbDtcbiAgICBjb25zdCBwYXJhbXMgPSB7fTtcbiAgICBwYXJhbXNbdGhpcy5mb3JlaWduX21vZGVsLmV4dGVybmFsX25hbWVfZmllbGRdID0gZmlsdGVyVmFsdWU7XG4gICAgcmV0dXJuIHRoaXMuYXBpLmZldGNoKGAke3RoaXMuZm9yZWlnbl9tb2RlbC5hcGl9YCwgcGFyYW1zKS5waXBlKFxuICAgICAgbWFwKHJlcyA9PiB7XG4gICAgICAgICAgQ0hPSUNFUyA9IHJlcztcbiAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfSlcbiAgICApO1xuICAgIC8vIHJldHVybiB0aGlzLmNob2ljZXMuZmlsdGVyKG9wdGlvbiA9PiBvcHRpb24uY29kZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdGVyVmFsdWUpID09PSAwKTtcbiAgfVxuXG4gIG9wZW5MaXN0aW5nRGlhbG9nKCkge1xuICAgIGNvbnN0IHJlZiA9IHRoaXMuZGlhbG9nLm9wZW4oTGlzdGluZ0RpYWxvZ0NvbXBvbmVudCwge1xuICAgICAgd2lkdGg6ICc5MCUnLFxuICAgICAgaGVpZ2h0OiAnOTAlJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgbW9kdWxlTmFtZTogdGhpcy5tb2RlbFBhdGhbMF0sXG4gICAgICAgIGFwcE5hbWU6IHRoaXMubW9kZWxQYXRoWzFdLFxuICAgICAgICBtb2RlbE5hbWU6IHRoaXMubW9kZWxQYXRoWzJdXG4gICAgICB9XG4gICAgfSk7XG4gICAgcmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgIHRoaXMuZm9ybS5nZXQodGhpcy5maWVsZC5rZXkpLnNldFZhbHVlKHZhbHVlKTtcbiAgICB9KTtcbiAgfVxufVxuIl19
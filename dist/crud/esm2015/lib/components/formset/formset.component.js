/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Model } from '../../screens';
import { Registry } from '../../services/registry.service';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { Field } from '../../forms';
export class FormsetComponent {
    /**
     * @param {?} api
     * @param {?} reg
     * @param {?} formService
     */
    constructor(api, reg, formService) {
        this.api = api;
        this.reg = reg;
        this.formService = formService;
        this.choices = {};
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["config"].firstChange) {
            for (const /** @type {?} */ field of changes["config"].currentValue.fields) {
                if (field['control_type'] === 'foreign_key') {
                    this.getChoices(field);
                }
            }
        }
    }
    /**
     * @return {?}
     */
    addForm() {
        const /** @type {?} */ ctrl = this.formService.toFormGroup(this.config.fields);
        this.formarray.push(ctrl);
    }
    /**
     * @param {?} field
     * @return {?}
     */
    getChoices(field) {
        const /** @type {?} */ path = field.foreign_model_path.split('.');
        const /** @type {?} */ model = this.reg.getModel(path[0], path[1], path[2]);
        this.api.fetch(model.api, {}).subscribe(res => {
            this.choices[field.key] = res;
            console.log(this.choices);
        });
    }
}
FormsetComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-crud-formset',
                template: `<div [formGroup]="form" *ngIf="formarray" class="formset">
    <div class="row">
        <h4> {{ config.label }}</h4>
        <span class="spacer"></span>
        <button mat-icon-button (click)="addForm()">
            <mat-icon>add_circle</mat-icon>
        </button>
    </div>
    <div [formArrayName]="config.key">
        <mat-grid-list gutterSize="12" [cols]="config.fields.length" rowHeight="60"  *ngFor="let ctrl of formarray.controls; let i=index" [formGroupName]="i">
            <mat-grid-tile  *ngFor="let f of config.fields">
                {{ f. key }}
                <ng-crud-form-field [choices]="choices[f.key]" [form]="ctrl" [field]="f"></ng-crud-form-field>
            </mat-grid-tile>
        </mat-grid-list>
    </div>
</div>`,
                styles: [`.formset{padding-top:12px}.row{display:flex;flex:1 1 auto}.spacer{flex:1 1 auto}`],
                exportAs: 'ngcrudui-formset'
            },] },
];
/** @nocollapse */
FormsetComponent.ctorParameters = () => [
    { type: ApiService },
    { type: Registry },
    { type: FormService }
];
FormsetComponent.propDecorators = {
    form: [{ type: Input }],
    model: [{ type: Input }],
    formarray: [{ type: Input }],
    config: [{ type: Input }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXNldC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9jcnVkLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZm9ybXNldC9mb3Jtc2V0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYSxLQUFLLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQzNFLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEQsT0FBTyxFQUFHLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDM0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBd0JwQyxNQUFNOzs7Ozs7SUFRSixZQUFvQixHQUFlLEVBQVUsR0FBYSxFQUFVLFdBQXdCO1FBQXhFLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFVO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7dUJBRmxGLEVBQUU7S0FHWDs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsRUFBRSxDQUFDLENBQUMsT0FBTyxXQUFRLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDL0IsR0FBRyxDQUFDLENBQUMsdUJBQU0sS0FBSyxJQUFJLE9BQU8sV0FBUSxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDdkQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxLQUFLLGFBQWEsQ0FBQyxDQUFDLENBQUM7b0JBQzVDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3hCO2FBQ0Y7U0FDRjtLQUNGOzs7O0lBRUQsT0FBTztRQUNMLHVCQUFNLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzNCOzs7OztJQUVELFVBQVUsQ0FBQyxLQUFZO1FBQ3JCLHVCQUFNLElBQUksR0FBRyxLQUFLLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pELHVCQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzVDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMzQixDQUFDLENBQUM7S0FDSjs7O1lBdkRGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQkw7Z0JBQ0wsTUFBTSxFQUFFLENBQUMsa0ZBQWtGLENBQUM7Z0JBQzVGLFFBQVEsRUFBRSxrQkFBa0I7YUFDN0I7Ozs7WUF6QlEsVUFBVTtZQURWLFFBQVE7WUFFUixXQUFXOzs7bUJBMkJqQixLQUFLO29CQUNMLEtBQUs7d0JBQ0wsS0FBSztxQkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkNoYW5nZXMsIElucHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1BcnJheSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgIE1vZGVsIH0gZnJvbSAnLi4vLi4vc2NyZWVucyc7XG5pbXBvcnQgeyBSZWdpc3RyeSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3JlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEZvcm1TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZm9ybS5zZXJ2aWNlJztcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi4vLi4vZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy1jcnVkLWZvcm1zZXQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgW2Zvcm1Hcm91cF09XCJmb3JtXCIgKm5nSWY9XCJmb3JtYXJyYXlcIiBjbGFzcz1cImZvcm1zZXRcIj5cbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgIDxoND4ge3sgY29uZmlnLmxhYmVsIH19PC9oND5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJzcGFjZXJcIj48L3NwYW4+XG4gICAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIChjbGljayk9XCJhZGRGb3JtKClcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbj5hZGRfY2lyY2xlPC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBbZm9ybUFycmF5TmFtZV09XCJjb25maWcua2V5XCI+XG4gICAgICAgIDxtYXQtZ3JpZC1saXN0IGd1dHRlclNpemU9XCIxMlwiIFtjb2xzXT1cImNvbmZpZy5maWVsZHMubGVuZ3RoXCIgcm93SGVpZ2h0PVwiNjBcIiAgKm5nRm9yPVwibGV0IGN0cmwgb2YgZm9ybWFycmF5LmNvbnRyb2xzOyBsZXQgaT1pbmRleFwiIFtmb3JtR3JvdXBOYW1lXT1cImlcIj5cbiAgICAgICAgICAgIDxtYXQtZ3JpZC10aWxlICAqbmdGb3I9XCJsZXQgZiBvZiBjb25maWcuZmllbGRzXCI+XG4gICAgICAgICAgICAgICAge3sgZi4ga2V5IH19XG4gICAgICAgICAgICAgICAgPG5nLWNydWQtZm9ybS1maWVsZCBbY2hvaWNlc109XCJjaG9pY2VzW2Yua2V5XVwiIFtmb3JtXT1cImN0cmxcIiBbZmllbGRdPVwiZlwiPjwvbmctY3J1ZC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgPC9tYXQtZ3JpZC10aWxlPlxuICAgICAgICA8L21hdC1ncmlkLWxpc3Q+XG4gICAgPC9kaXY+XG48L2Rpdj5gLFxuICBzdHlsZXM6IFtgLmZvcm1zZXR7cGFkZGluZy10b3A6MTJweH0ucm93e2Rpc3BsYXk6ZmxleDtmbGV4OjEgMSBhdXRvfS5zcGFjZXJ7ZmxleDoxIDEgYXV0b31gXSxcbiAgZXhwb3J0QXM6ICduZ2NydWR1aS1mb3Jtc2V0J1xufSlcbmV4cG9ydCBjbGFzcyBGb3Jtc2V0Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICBASW5wdXQoKSBmb3JtOiBGb3JtR3JvdXA7XG4gIEBJbnB1dCgpIG1vZGVsOiBNb2RlbDtcbiAgQElucHV0KCkgZm9ybWFycmF5OiBGb3JtQXJyYXk7XG4gIEBJbnB1dCgpIGNvbmZpZzogRmllbGQ7XG4gIGNob2ljZXMgPSB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwaTogQXBpU2VydmljZSwgcHJpdmF0ZSByZWc6IFJlZ2lzdHJ5LCBwcml2YXRlIGZvcm1TZXJ2aWNlOiBGb3JtU2VydmljZSkge1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmNvbmZpZy5maXJzdENoYW5nZSkge1xuICAgICAgZm9yIChjb25zdCBmaWVsZCBvZiBjaGFuZ2VzLmNvbmZpZy5jdXJyZW50VmFsdWUuZmllbGRzKSB7XG4gICAgICAgIGlmIChmaWVsZFsnY29udHJvbF90eXBlJ10gPT09ICdmb3JlaWduX2tleScpIHtcbiAgICAgICAgICB0aGlzLmdldENob2ljZXMoZmllbGQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWRkRm9ybSgpIHtcbiAgICBjb25zdCBjdHJsID0gdGhpcy5mb3JtU2VydmljZS50b0Zvcm1Hcm91cCh0aGlzLmNvbmZpZy5maWVsZHMpO1xuICAgIHRoaXMuZm9ybWFycmF5LnB1c2goY3RybCk7XG4gIH1cblxuICBnZXRDaG9pY2VzKGZpZWxkOiBGaWVsZCkge1xuICAgIGNvbnN0IHBhdGggPSBmaWVsZC5mb3JlaWduX21vZGVsX3BhdGguc3BsaXQoJy4nKTtcbiAgICBjb25zdCBtb2RlbCA9IHRoaXMucmVnLmdldE1vZGVsKHBhdGhbMF0sIHBhdGhbMV0sIHBhdGhbMl0pO1xuICAgIHRoaXMuYXBpLmZldGNoKG1vZGVsLmFwaSwge30pLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgdGhpcy5jaG9pY2VzW2ZpZWxkLmtleV0gPSByZXM7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmNob2ljZXMpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=
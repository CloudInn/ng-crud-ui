/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { of as observableOf } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Model } from '../../screens';
import { Registry } from '../../services/registry.service';
import { ApiService } from '../../services/api.service';
import { Field } from '../../forms';
var AutoCompleteFieldComponent = /** @class */ (function () {
    function AutoCompleteFieldComponent(api, reg) {
        this.api = api;
        this.reg = reg;
        this.choices = [];
        this.dataSource = new Array();
    }
    /**
     * @return {?}
     */
    AutoCompleteFieldComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.foreign_model) {
            return;
        }
        this.searchParams = { page: 1 };
        this.ctrl = /** @type {?} */ (this.form.get(this.field.key));
        console.log('foreign key value', this.ctrl.value);
        this.filteredOptions = observableOf(this.choices);
        this.filteredOptions = this.ctrl.valueChanges.pipe(startWith(''), map(function (val) { return _this.filter(val); }));
        // this.api.fetch(this.model.api, this.searchParams).subscribe(res => {
        //   this.dataSource.push(res['results']);
        // });
    };
    /**
     * @param {?} text
     * @return {?}
     */
    AutoCompleteFieldComponent.prototype.filter = /**
     * @param {?} text
     * @return {?}
     */
    function (text) {
        var _this = this;
        return this.choices.filter(function (option) {
            console.log(text);
            var /** @type {?} */ val = option[_this.foreign_model.external_name_field];
            return val ? val.toLowerCase().indexOf(text.toLowerCase()) === 0 : false;
        });
    };
    /**
     * @param {?} data
     * @return {?}
     */
    AutoCompleteFieldComponent.prototype.valueFormatter = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        return "(" + data[this.model.external_value_field] + ") " + data[this.model.external_name_field];
    };
    /**
     * @param {?} foreign_model
     * @return {?}
     */
    AutoCompleteFieldComponent.prototype.displayWith = /**
     * @param {?} foreign_model
     * @return {?}
     */
    function (foreign_model) {
        return function (item) {
            return item[foreign_model.external_name_field];
        };
    };
    AutoCompleteFieldComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ng-crud-autocomplete',
                    template: "<mat-form-field [formGroup]=\"form\">\n  <input type=\"text\" matInput [placeholder]=\"field.label\" [formControl]=\"ctrl\" [matAutocomplete]=\"auto\">\n  <mat-autocomplete #auto=\"matAutocomplete\" [displayWith]=\"displayWith(foreign_model)\">\n      <mat-option *ngFor=\"let c of filteredOptions | async\" [value]=\"c[foreign_model.external_value_field]\">\n        {{ c[foreign_model.external_name_field] }}\n      </mat-option>\n    </mat-autocomplete>\n</mat-form-field>",
                    exportAs: 'ngcrudui-autocomplete'
                },] },
    ];
    /** @nocollapse */
    AutoCompleteFieldComponent.ctorParameters = function () { return [
        { type: ApiService },
        { type: Registry }
    ]; };
    AutoCompleteFieldComponent.propDecorators = {
        model: [{ type: Input }],
        field: [{ type: Input }],
        foreign_model: [{ type: Input }],
        form: [{ type: Input }],
        choices: [{ type: Input }],
        forcedSearchParams: [{ type: Input }]
    };
    return AutoCompleteFieldComponent;
}());
export { AutoCompleteFieldComponent };
function AutoCompleteFieldComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    AutoCompleteFieldComponent.prototype.model;
    /** @type {?} */
    AutoCompleteFieldComponent.prototype.field;
    /** @type {?} */
    AutoCompleteFieldComponent.prototype.foreign_model;
    /** @type {?} */
    AutoCompleteFieldComponent.prototype.form;
    /** @type {?} */
    AutoCompleteFieldComponent.prototype.choices;
    /** @type {?} */
    AutoCompleteFieldComponent.prototype.forcedSearchParams;
    /** @type {?} */
    AutoCompleteFieldComponent.prototype.dataSource;
    /** @type {?} */
    AutoCompleteFieldComponent.prototype.searchParams;
    /** @type {?} */
    AutoCompleteFieldComponent.prototype.filteredOptions;
    /** @type {?} */
    AutoCompleteFieldComponent.prototype.ctrl;
    /** @type {?} */
    AutoCompleteFieldComponent.prototype.api;
    /** @type {?} */
    AutoCompleteFieldComponent.prototype.reg;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by1jb21wbGV0ZS1maWVsZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9jcnVkLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvYXV0by1jb21wbGV0ZS1maWVsZC9hdXRvLWNvbXBsZXRlLWZpZWxkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFFLFNBQVMsRUFBZSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hELE9BQU8sRUFBYyxFQUFFLElBQUksWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0MsT0FBTyxFQUFHLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDM0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxhQUFhLENBQUM7O0lBMkJsQyxvQ0FBb0IsR0FBZSxFQUFVLEdBQWE7UUFBdEMsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUFVLFFBQUcsR0FBSCxHQUFHLENBQVU7dUJBUGhDLEVBQUU7MEJBRVIsSUFBSSxLQUFLLEVBQUU7S0FNOUI7Ozs7SUFFQSxnREFBVzs7O0lBQVg7UUFBQSxpQkFlQztRQWRDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDeEIsTUFBTSxDQUFDO1NBQ1I7UUFDQSxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUMsSUFBSSxFQUFFLENBQUMsRUFBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxJQUFJLHFCQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFnQixDQUFBLENBQUM7UUFDekQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxlQUFlLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FDaEQsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUNiLEdBQUcsQ0FBQyxVQUFDLEdBQVcsSUFBSyxPQUFBLEtBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQWhCLENBQWdCLENBQUMsQ0FDdkMsQ0FBQzs7OztLQUlKOzs7OztJQUVELDJDQUFNOzs7O0lBQU4sVUFBTyxJQUFZO1FBQW5CLGlCQU1DO1FBTEEsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQUEsTUFBTTtZQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xCLHFCQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQzNELE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7U0FDMUUsQ0FBQyxDQUFDO0tBQ0g7Ozs7O0lBRUQsbURBQWM7Ozs7SUFBZCxVQUFlLElBQVM7UUFDckIsTUFBTSxDQUFDLE1BQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsVUFBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBRyxDQUFDO0tBQzdGOzs7OztJQUVILGdEQUFXOzs7O0lBQVgsVUFBWSxhQUFhO1FBQ3ZCLE1BQU0sQ0FBQyxVQUFDLElBQVM7WUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQ2hELENBQUM7S0FDSDs7Z0JBN0RGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxRQUFRLEVBQUUsNmRBT007b0JBQ2hCLFFBQVEsRUFBRSx1QkFBdUI7aUJBQ2xDOzs7O2dCQWRRLFVBQVU7Z0JBRFYsUUFBUTs7O3dCQWtCZCxLQUFLO3dCQUNMLEtBQUs7Z0NBQ0wsS0FBSzt1QkFDTCxLQUFLOzBCQUNMLEtBQUs7cUNBQ0wsS0FBSzs7cUNBN0JSOztTQXNCYSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uQ2hhbmdlcywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiBhcyBvYnNlcnZhYmxlT2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN0YXJ0V2l0aCwgbWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7ICBNb2RlbCB9IGZyb20gJy4uLy4uL3NjcmVlbnMnO1xuaW1wb3J0IHsgUmVnaXN0cnkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9yZWdpc3RyeS5zZXJ2aWNlJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBGaWVsZCB9IGZyb20gJy4uLy4uL2Zvcm1zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctY3J1ZC1hdXRvY29tcGxldGUnLFxuICB0ZW1wbGF0ZTogYDxtYXQtZm9ybS1maWVsZCBbZm9ybUdyb3VwXT1cImZvcm1cIj5cbiAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbWF0SW5wdXQgW3BsYWNlaG9sZGVyXT1cImZpZWxkLmxhYmVsXCIgW2Zvcm1Db250cm9sXT1cImN0cmxcIiBbbWF0QXV0b2NvbXBsZXRlXT1cImF1dG9cIj5cbiAgPG1hdC1hdXRvY29tcGxldGUgI2F1dG89XCJtYXRBdXRvY29tcGxldGVcIiBbZGlzcGxheVdpdGhdPVwiZGlzcGxheVdpdGgoZm9yZWlnbl9tb2RlbClcIj5cbiAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBjIG9mIGZpbHRlcmVkT3B0aW9ucyB8IGFzeW5jXCIgW3ZhbHVlXT1cImNbZm9yZWlnbl9tb2RlbC5leHRlcm5hbF92YWx1ZV9maWVsZF1cIj5cbiAgICAgICAge3sgY1tmb3JlaWduX21vZGVsLmV4dGVybmFsX25hbWVfZmllbGRdIH19XG4gICAgICA8L21hdC1vcHRpb24+XG4gICAgPC9tYXQtYXV0b2NvbXBsZXRlPlxuPC9tYXQtZm9ybS1maWVsZD5gLFxuICBleHBvcnRBczogJ25nY3J1ZHVpLWF1dG9jb21wbGV0ZSdcbn0pXG5leHBvcnQgY2xhc3MgQXV0b0NvbXBsZXRlRmllbGRDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gIEBJbnB1dCgpIG1vZGVsOiBNb2RlbDtcbiAgQElucHV0KCkgZmllbGQ6IEZpZWxkO1xuICBASW5wdXQoKSBmb3JlaWduX21vZGVsOiBNb2RlbDtcbiAgQElucHV0KCkgZm9ybTogRm9ybUdyb3VwO1xuICBASW5wdXQoKSBjaG9pY2VzOiBhbnlbXSA9IFtdO1xuICBASW5wdXQoKSBmb3JjZWRTZWFyY2hQYXJhbXM6IGFueTtcbiAgZGF0YVNvdXJjZTogYW55W10gPSBuZXcgQXJyYXkoKTtcbiAgc2VhcmNoUGFyYW1zOiB7fTtcbiAgZmlsdGVyZWRPcHRpb25zOiBPYnNlcnZhYmxlPGFueVtdPjtcbiAgY3RybDogRm9ybUNvbnRyb2w7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhcGk6IEFwaVNlcnZpY2UsIHByaXZhdGUgcmVnOiBSZWdpc3RyeSkge1xuICB9XG5cbiAgIG5nT25DaGFuZ2VzKCkge1xuICAgICBpZiAoIXRoaXMuZm9yZWlnbl9tb2RlbCkge1xuICAgICAgIHJldHVybjtcbiAgICAgfVxuICAgICAgdGhpcy5zZWFyY2hQYXJhbXMgPSB7cGFnZTogMX07XG4gICAgICB0aGlzLmN0cmwgPSB0aGlzLmZvcm0uZ2V0KHRoaXMuZmllbGQua2V5KSBhcyBGb3JtQ29udHJvbDtcbiAgICAgIGNvbnNvbGUubG9nKCdmb3JlaWduIGtleSB2YWx1ZScsIHRoaXMuY3RybC52YWx1ZSk7XG4gICAgICB0aGlzLmZpbHRlcmVkT3B0aW9ucyA9IG9ic2VydmFibGVPZih0aGlzLmNob2ljZXMpO1xuICAgICAgdGhpcy5maWx0ZXJlZE9wdGlvbnMgPSB0aGlzLmN0cmwudmFsdWVDaGFuZ2VzLnBpcGUoXG4gICAgICAgIHN0YXJ0V2l0aCgnJyksXG4gICAgICAgIG1hcCgodmFsOiBzdHJpbmcpID0+IHRoaXMuZmlsdGVyKHZhbCkpXG4gICAgICApO1xuICAgICAgLy8gdGhpcy5hcGkuZmV0Y2godGhpcy5tb2RlbC5hcGksIHRoaXMuc2VhcmNoUGFyYW1zKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgIC8vICAgdGhpcy5kYXRhU291cmNlLnB1c2gocmVzWydyZXN1bHRzJ10pO1xuICAgICAgLy8gfSk7XG4gICB9XG5cbiAgIGZpbHRlcih0ZXh0OiBzdHJpbmcpOiBhbnlbXSB7XG4gICAgcmV0dXJuIHRoaXMuY2hvaWNlcy5maWx0ZXIob3B0aW9uID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHRleHQpO1xuICAgICAgY29uc3QgdmFsID0gb3B0aW9uW3RoaXMuZm9yZWlnbl9tb2RlbC5leHRlcm5hbF9uYW1lX2ZpZWxkXTtcbiAgICAgIHJldHVybiB2YWwgPyB2YWwudG9Mb3dlckNhc2UoKS5pbmRleE9mKHRleHQudG9Mb3dlckNhc2UoKSkgPT09IDAgOiBmYWxzZTtcbiAgICB9KTtcbiAgIH1cblxuICAgdmFsdWVGb3JtYXR0ZXIoZGF0YTogYW55KTogc3RyaW5nIHtcbiAgICAgIHJldHVybiBgKCR7ZGF0YVt0aGlzLm1vZGVsLmV4dGVybmFsX3ZhbHVlX2ZpZWxkXX0pICR7ZGF0YVt0aGlzLm1vZGVsLmV4dGVybmFsX25hbWVfZmllbGRdfWA7XG4gICAgfVxuXG4gIGRpc3BsYXlXaXRoKGZvcmVpZ25fbW9kZWwpIHtcbiAgICByZXR1cm4gKGl0ZW06IGFueSk6IHN0cmluZyA9PiB7XG4gICAgICByZXR1cm4gaXRlbVtmb3JlaWduX21vZGVsLmV4dGVybmFsX25hbWVfZmllbGRdO1xuICAgIH07XG4gIH1cbn1cbiJdfQ==
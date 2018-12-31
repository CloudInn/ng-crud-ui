/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Registry } from '../../services/registry.service';
import { ApiService } from '../../services/api.service';
import { Field } from '../../forms';
var ForeignKeyFieldComponent = /** @class */ (function () {
    function ForeignKeyFieldComponent(api, reg) {
        this.api = api;
        this.reg = reg;
        this.forcedSearchParams = [];
        this.choices = [];
    }
    //   ngOnInit() {
    //   }
    /**
     * @return {?}
     */
    ForeignKeyFieldComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.formGroup) {
            return;
        }
        console.log(this.formGroup, this.field.key, this.formGroup.get(this.field.key));
        this.filteredOptions = (/** @type {?} */ (this.formGroup.get(this.field.key))).valueChanges.pipe(startWith(''), map(function (value) {
            console.log(value);
            return value ? value['code'] : value;
        }), map(function (code) { return code ? _this._filter(name) : _this.choices.slice(); }));
        console.log(this.formGroup);
        var /** @type {?} */ path = this.field.foreign_model_path.split('.');
        this.model = this.reg.getModel(path[0], path[1], path[2]);
        this.api.fetch("" + this.model.api, []).subscribe(function (res) {
            _this.choices = res;
        });
    };
    /**
     * @param {?} option
     * @return {?}
     */
    ForeignKeyFieldComponent.prototype.displayFn = /**
     * @param {?} option
     * @return {?}
     */
    function (option) {
        return option ? option.code : option;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ForeignKeyFieldComponent.prototype._filter = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var /** @type {?} */ filterValue = value.toLowerCase();
        console.log(filterValue);
        return this.choices.filter(function (option) { return option.code.toLowerCase().indexOf(filterValue) === 0; });
    };
    ForeignKeyFieldComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ng-crud-foreign-key-field',
                    template: "<mat-form-field>\n    <input type=\"text\" matInput [formControlName]=\"field.key\" [matAutocomplete]=\"auto\">\n</mat-form-field>\n\n<mat-autocomplete #auto=\"matAutocomplete\" [displayWith]=\"displayFn\">\n    <mat-option *ngFor=\"let option of choices\" [value]=\"option[model.external_value_field]\">\n        {{ option[model.external_name_field] }}\n    </mat-option>\n</mat-autocomplete>"
                },] },
    ];
    /** @nocollapse */
    ForeignKeyFieldComponent.ctorParameters = function () { return [
        { type: ApiService },
        { type: Registry }
    ]; };
    ForeignKeyFieldComponent.propDecorators = {
        formGroup: [{ type: Input }],
        forcedSearchParams: [{ type: Input }],
        field: [{ type: Input }]
    };
    return ForeignKeyFieldComponent;
}());
export { ForeignKeyFieldComponent };
function ForeignKeyFieldComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    ForeignKeyFieldComponent.prototype.formGroup;
    /** @type {?} */
    ForeignKeyFieldComponent.prototype.forcedSearchParams;
    /** @type {?} */
    ForeignKeyFieldComponent.prototype.field;
    /** @type {?} */
    ForeignKeyFieldComponent.prototype.choices;
    /** @type {?} */
    ForeignKeyFieldComponent.prototype.filteredOptions;
    /** @type {?} */
    ForeignKeyFieldComponent.prototype.model;
    /** @type {?} */
    ForeignKeyFieldComponent.prototype.api;
    /** @type {?} */
    ForeignKeyFieldComponent.prototype.reg;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yZWlnbi1rZXktZmllbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vY3J1ZC8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2ZvcmVpZ24ta2V5LWZpZWxkL2ZvcmVpZ24ta2V5LWZpZWxkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFFLFNBQVMsRUFBZSxNQUFNLGdCQUFnQixDQUFDO0FBRXhELE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHaEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzNELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sYUFBYSxDQUFDOztJQXVCbEMsa0NBQW9CLEdBQWUsRUFBVSxHQUFhO1FBQXRDLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFVO2tDQU52QixFQUFFO3VCQUUzQixFQUFFO0tBS1g7SUFFSCxpQkFBaUI7SUFDakIsTUFBTTs7OztJQUVKLDhDQUFXOzs7SUFBWDtRQUFBLGlCQW1CQztRQWxCQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLE1BQU0sQ0FBQztTQUNWO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNoRixJQUFJLENBQUMsZUFBZSxHQUFHLG1CQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFnQixFQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FDeEYsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUNiLEdBQUcsQ0FBQyxVQUFBLEtBQUs7WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQ3hDLENBQUMsRUFDRixHQUFHLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQWhELENBQWdELENBQUMsQ0FDaEUsQ0FBQztRQUNBLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVCLHFCQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHO1lBQ25ELEtBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1NBQ3BCLENBQUMsQ0FBQztLQUNOOzs7OztJQUVELDRDQUFTOzs7O0lBQVQsVUFBVSxNQUFNO1FBQ2QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0tBQ3RDOzs7OztJQUVELDBDQUFPOzs7O0lBQVAsVUFBUSxLQUFhO1FBQ25CLHFCQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV6QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQXBELENBQW9ELENBQUMsQ0FBQztLQUM1Rjs7Z0JBekRGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsMkJBQTJCO29CQUNyQyxRQUFRLEVBQUUsMllBUVE7aUJBQ25COzs7O2dCQWRRLFVBQVU7Z0JBRFYsUUFBUTs7OzRCQWtCZCxLQUFLO3FDQUNMLEtBQUs7d0JBQ0wsS0FBSzs7bUNBMUJSOztTQXNCYSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uQ2hhbmdlcywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgIE1vZGVsIH0gZnJvbSAnLi4vLi4vc2NyZWVucyc7XG5pbXBvcnQgeyBSZWdpc3RyeSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3JlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi4vLi4vZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy1jcnVkLWZvcmVpZ24ta2V5LWZpZWxkJyxcbiAgdGVtcGxhdGU6IGA8bWF0LWZvcm0tZmllbGQ+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbWF0SW5wdXQgW2Zvcm1Db250cm9sTmFtZV09XCJmaWVsZC5rZXlcIiBbbWF0QXV0b2NvbXBsZXRlXT1cImF1dG9cIj5cbjwvbWF0LWZvcm0tZmllbGQ+XG5cbjxtYXQtYXV0b2NvbXBsZXRlICNhdXRvPVwibWF0QXV0b2NvbXBsZXRlXCIgW2Rpc3BsYXlXaXRoXT1cImRpc3BsYXlGblwiPlxuICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgY2hvaWNlc1wiIFt2YWx1ZV09XCJvcHRpb25bbW9kZWwuZXh0ZXJuYWxfdmFsdWVfZmllbGRdXCI+XG4gICAgICAgIHt7IG9wdGlvblttb2RlbC5leHRlcm5hbF9uYW1lX2ZpZWxkXSB9fVxuICAgIDwvbWF0LW9wdGlvbj5cbjwvbWF0LWF1dG9jb21wbGV0ZT5gXG59KVxuZXhwb3J0IGNsYXNzIEZvcmVpZ25LZXlGaWVsZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KCkgZm9ybUdyb3VwOiBGb3JtR3JvdXA7XG4gIEBJbnB1dCgpIGZvcmNlZFNlYXJjaFBhcmFtczogYW55ID0gW107XG4gIEBJbnB1dCgpIGZpZWxkOiBGaWVsZDtcbiAgY2hvaWNlcyA9IFtdO1xuICBmaWx0ZXJlZE9wdGlvbnM6ICBPYnNlcnZhYmxlPGFueVtdPjtcbiAgbW9kZWw/OiBNb2RlbDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwaTogQXBpU2VydmljZSwgcHJpdmF0ZSByZWc6IFJlZ2lzdHJ5KSB7XG4gIH1cblxuLy8gICBuZ09uSW5pdCgpIHtcbi8vICAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIGlmICghdGhpcy5mb3JtR3JvdXApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyh0aGlzLmZvcm1Hcm91cCwgdGhpcy5maWVsZC5rZXksIHRoaXMuZm9ybUdyb3VwLmdldCh0aGlzLmZpZWxkLmtleSkpO1xuICAgIHRoaXMuZmlsdGVyZWRPcHRpb25zID0gKHRoaXMuZm9ybUdyb3VwLmdldCh0aGlzLmZpZWxkLmtleSkgYXMgRm9ybUNvbnRyb2wpLnZhbHVlQ2hhbmdlcy5waXBlKFxuICAgICAgICBzdGFydFdpdGgoJycpLFxuICAgICAgICBtYXAodmFsdWUgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2codmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlID8gdmFsdWVbJ2NvZGUnXSA6IHZhbHVlO1xuICAgICAgICB9KSxcbiAgICAgICAgbWFwKGNvZGUgPT4gY29kZSA/IHRoaXMuX2ZpbHRlcihuYW1lKSA6IHRoaXMuY2hvaWNlcy5zbGljZSgpKVxuICAgICk7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmZvcm1Hcm91cCk7XG4gICAgICBjb25zdCBwYXRoID0gdGhpcy5maWVsZC5mb3JlaWduX21vZGVsX3BhdGguc3BsaXQoJy4nKTtcbiAgICAgIHRoaXMubW9kZWwgPSB0aGlzLnJlZy5nZXRNb2RlbChwYXRoWzBdLCBwYXRoWzFdLCBwYXRoWzJdKTtcbiAgICAgIHRoaXMuYXBpLmZldGNoKGAke3RoaXMubW9kZWwuYXBpfWAsIFtdKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgdGhpcy5jaG9pY2VzID0gcmVzO1xuICAgICAgfSk7XG4gIH1cblxuICBkaXNwbGF5Rm4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIG9wdGlvbiA/IG9wdGlvbi5jb2RlIDogb3B0aW9uO1xuICB9XG5cbiAgX2ZpbHRlcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgY29uc3QgZmlsdGVyVmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnNvbGUubG9nKGZpbHRlclZhbHVlKTtcblxuICAgIHJldHVybiB0aGlzLmNob2ljZXMuZmlsdGVyKG9wdGlvbiA9PiBvcHRpb24uY29kZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdGVyVmFsdWUpID09PSAwKTtcbiAgfVxufVxuIl19
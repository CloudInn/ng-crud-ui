/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { FormControl } from '@angular/forms';
/**
 * @record
 */
export function BaseField() { }
function BaseField_tsickle_Closure_declarations() {
    /** @type {?} */
    BaseField.prototype.label;
}
/**
 * @record
 */
export function CrudField() { }
function CrudField_tsickle_Closure_declarations() {
    /** @type {?} */
    CrudField.prototype.name;
    /** @type {?} */
    CrudField.prototype.label;
    /** @type {?|undefined} */
    CrudField.prototype.validators;
}
/**
 * @record
 */
export function CrudForm() { }
function CrudForm_tsickle_Closure_declarations() {
    /** @type {?} */
    CrudForm.prototype.name;
    /** @type {?} */
    CrudForm.prototype.controls;
}
/** @enum {number} */
var FieldType = {
    Text: 0,
    Number: 1,
    Date: 2,
    DateTime: 3,
    Time: 4,
    Boolean: 5,
    ForeignKey: 6,
    ManyToMany: 7,
    // FormSet,
    File: 8,
};
export { FieldType };
FieldType[FieldType.Text] = "Text";
FieldType[FieldType.Number] = "Number";
FieldType[FieldType.Date] = "Date";
FieldType[FieldType.DateTime] = "DateTime";
FieldType[FieldType.Time] = "Time";
FieldType[FieldType.Boolean] = "Boolean";
FieldType[FieldType.ForeignKey] = "ForeignKey";
FieldType[FieldType.ManyToMany] = "ManyToMany";
FieldType[FieldType.File] = "File";
var Field = /** @class */ (function () {
    function Field(label, key, type, is_editable, is_searchable, foreign_model, colors) {
        this.is_editable = true;
        this.is_searchable = true;
        this.is_hidden = false;
        this.colspan = 1;
        this.rowspan = 1;
        this.key = key;
        this.label = label;
        this.value_type = type;
        this.is_editable = is_editable;
        this.is_searchable = is_searchable;
        // this.foreign_model = foreign_model;
    }
    return Field;
}());
export { Field };
function Field_tsickle_Closure_declarations() {
    /** @type {?} */
    Field.prototype.key;
    /** @type {?} */
    Field.prototype.label;
    /** @type {?} */
    Field.prototype.value_type;
    /** @type {?} */
    Field.prototype.control_type;
    /** @type {?} */
    Field.prototype.is_editable;
    /** @type {?} */
    Field.prototype.is_searchable;
    /** @type {?} */
    Field.prototype.is_hidden;
    /** @type {?} */
    Field.prototype.foreign_model_path;
    /** @type {?} */
    Field.prototype.fields;
    /** @type {?} */
    Field.prototype.choices;
    /** @type {?} */
    Field.prototype.colspan;
    /** @type {?} */
    Field.prototype.rowspan;
    /** @type {?} */
    Field.prototype._value;
}
var Fieldset = /** @class */ (function () {
    function Fieldset() {
        this.is_fieldset = true;
    }
    return Fieldset;
}());
export { Fieldset };
function Fieldset_tsickle_Closure_declarations() {
    /** @type {?} */
    Fieldset.prototype.label;
    /** @type {?} */
    Fieldset.prototype.is_fieldset;
    /** @type {?} */
    Fieldset.prototype.fields;
}
var Formset = /** @class */ (function () {
    function Formset() {
    }
    return Formset;
}());
export { Formset };
function Formset_tsickle_Closure_declarations() {
    /** @type {?} */
    Formset.prototype.label;
    /** @type {?} */
    Formset.prototype.model;
}
/**
 * @template T
 */
var /**
 * @template T
 */
AutoCompleteField = /** @class */ (function (_super) {
    tslib_1.__extends(AutoCompleteField, _super);
    function AutoCompleteField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = 'some label';
        return _this;
    }
    return AutoCompleteField;
}(FormControl));
/**
 * @template T
 */
export { AutoCompleteField };
function AutoCompleteField_tsickle_Closure_declarations() {
    /** @type {?} */
    AutoCompleteField.prototype.value;
    /** @type {?} */
    AutoCompleteField.prototype.label;
}
var DefaultCrudForm = /** @class */ (function () {
    function DefaultCrudForm(model) {
        var _this = this;
        this.model = model;
        this.name = '';
        this.controls = [];
        this.name = model.name;
        Object.keys(model).forEach(function (v) {
            console.log(v);
            _this.controls.push(new FormControl({}));
        });
    }
    return DefaultCrudForm;
}());
export { DefaultCrudForm };
function DefaultCrudForm_tsickle_Closure_declarations() {
    /** @type {?} */
    DefaultCrudForm.prototype.name;
    /** @type {?} */
    DefaultCrudForm.prototype.controls;
    /** @type {?} */
    DefaultCrudForm.prototype.model;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9jcnVkLyIsInNvdXJjZXMiOlsibGliL2Zvcm1zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE4QjdDLElBQUE7SUFtQkUsZUFDRSxLQUFhLEVBQ2IsR0FBVyxFQUNYLElBQVksRUFDWixXQUFxQixFQUNyQixhQUF1QixFQUN2QixhQUFtQixFQUNuQixNQUFZOzJCQXJCQSxJQUFJOzZCQUNGLElBQUk7eUJBQ1IsS0FBSzt1QkFPUCxDQUFDO3VCQUNELENBQUM7UUFhVCxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDOztLQUVwQztnQkFoRUg7SUFrRUMsQ0FBQTtBQXBDRCxpQkFvQ0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUQsSUFBQTs7MkJBRWdCLElBQUk7O21CQXRFcEI7SUF3RUMsQ0FBQTtBQUpELG9CQUlDOzs7Ozs7Ozs7QUFFRCxJQUFBOzs7a0JBMUVBO0lBNkVDLENBQUE7QUFIRCxtQkFHQzs7Ozs7Ozs7OztBQUVEOzs7QUFBQTtJQUEwQyw2Q0FBVzs7O3NCQUUzQyxZQUFZOzs7NEJBakZ0QjtFQStFMEMsV0FBVyxFQUdwRCxDQUFBOzs7O0FBSEQsNkJBR0M7Ozs7Ozs7QUFFRCxJQUFBO0lBSUUseUJBQW1CLEtBQVU7UUFBN0IsaUJBTUM7UUFOa0IsVUFBSyxHQUFMLEtBQUssQ0FBSztvQkFIZixFQUFFO3dCQUNFLEVBQUU7UUFHaEIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztZQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMzQyxDQUFDLENBQUM7S0FDTjswQkE5Rkg7SUErRkMsQ0FBQTtBQVhELDJCQVdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmFzZUZpZWxkIHtcbiAgbGFiZWw6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDcnVkRmllbGQge1xuICBuYW1lOiBzdHJpbmc7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHZhbGlkYXRvcnM/OiBhbnlbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDcnVkRm9ybSB7XG4gIG5hbWU6IHN0cmluZztcbiAgY29udHJvbHM6IENydWRGaWVsZFtdO1xufVxuXG5leHBvcnQgZW51bSBGaWVsZFR5cGUge1xuICBUZXh0LFxuICBOdW1iZXIsXG4gIERhdGUsXG4gIERhdGVUaW1lLFxuICBUaW1lLFxuICBCb29sZWFuLFxuICBGb3JlaWduS2V5LFxuICBNYW55VG9NYW55LFxuICAvLyBGb3JtU2V0LFxuICBGaWxlLFxufVxuXG5leHBvcnQgY2xhc3MgRmllbGQgaW1wbGVtZW50cyBCYXNlRmllbGQge1xuICBrZXk6IHN0cmluZztcbiAgbGFiZWw6IHN0cmluZztcbiAgdmFsdWVfdHlwZTogc3RyaW5nO1xuICBjb250cm9sX3R5cGU6IHN0cmluZztcbiAgaXNfZWRpdGFibGUgPSB0cnVlO1xuICBpc19zZWFyY2hhYmxlID0gdHJ1ZTtcbiAgaXNfaGlkZGVuID0gZmFsc2U7XG4gIC8vIGZvcmVpZ24ga2V5IGluZm9ybWF0aW9uXG4gIC8vIGZvcmVpZ25fbW9kZWw/OiBhbnkgPSBudWxsOyAvLyBldmFsdWF0ZWQgaW4gcnVuIHRpbWVcbiAgZm9yZWlnbl9tb2RlbF9wYXRoPzogc3RyaW5nO1xuICAvLyBjaG9pY2VzPzogYW55W107XG4gIGZpZWxkczogRmllbGRbXTtcbiAgY2hvaWNlczogYW55O1xuICBjb2xzcGFuID0gMTtcbiAgcm93c3BhbiA9IDE7XG5cbiAgX3ZhbHVlOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgbGFiZWw6IHN0cmluZyxcbiAgICBrZXk6IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgaXNfZWRpdGFibGU/OiBib29sZWFuLFxuICAgIGlzX3NlYXJjaGFibGU/OiBib29sZWFuLFxuICAgIGZvcmVpZ25fbW9kZWw/OiBhbnksXG4gICAgY29sb3JzPzogYW55XG4gICkge1xuICAgIHRoaXMua2V5ID0ga2V5O1xuICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcbiAgICB0aGlzLnZhbHVlX3R5cGUgPSB0eXBlO1xuICAgIHRoaXMuaXNfZWRpdGFibGUgPSBpc19lZGl0YWJsZTtcbiAgICB0aGlzLmlzX3NlYXJjaGFibGUgPSBpc19zZWFyY2hhYmxlO1xuICAgIC8vIHRoaXMuZm9yZWlnbl9tb2RlbCA9IGZvcmVpZ25fbW9kZWw7XG4gIH1cblxufVxuXG5leHBvcnQgY2xhc3MgRmllbGRzZXQgaW1wbGVtZW50cyBCYXNlRmllbGQge1xuICBsYWJlbDogc3RyaW5nO1xuICBpc19maWVsZHNldCA9IHRydWU7XG4gIGZpZWxkczogRmllbGRbXTtcbn1cblxuZXhwb3J0IGNsYXNzIEZvcm1zZXQgaW1wbGVtZW50cyBCYXNlRmllbGQge1xuICBsYWJlbDogc3RyaW5nO1xuICBtb2RlbDogYW55O1xufVxuXG5leHBvcnQgY2xhc3MgQXV0b0NvbXBsZXRlRmllbGQ8VD4gZXh0ZW5kcyBGb3JtQ29udHJvbCB7XG4gIHZhbHVlOiBUO1xuICBsYWJlbCA9ICdzb21lIGxhYmVsJztcbn1cblxuZXhwb3J0IGNsYXNzIERlZmF1bHRDcnVkRm9ybSBpbXBsZW1lbnRzIENydWRGb3JtIHtcbiAgcHVibGljIG5hbWUgPSAnJztcbiAgcHVibGljIGNvbnRyb2xzID0gW107XG5cbiAgY29uc3RydWN0b3IocHVibGljIG1vZGVsOiBhbnkpIHtcbiAgICAgIHRoaXMubmFtZSA9IG1vZGVsLm5hbWU7XG4gICAgICBPYmplY3Qua2V5cyhtb2RlbCkuZm9yRWFjaCh2ID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyh2KTtcbiAgICAgICAgICB0aGlzLmNvbnRyb2xzLnB1c2gobmV3IEZvcm1Db250cm9sKHt9KSk7XG4gICAgICB9KTtcbiAgfVxufSJdfQ==
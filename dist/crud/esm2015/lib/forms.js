/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
const FieldType = {
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
export class Field {
    /**
     * @param {?} label
     * @param {?} key
     * @param {?} type
     * @param {?=} is_editable
     * @param {?=} is_searchable
     * @param {?=} foreign_model
     * @param {?=} colors
     */
    constructor(label, key, type, is_editable, is_searchable, foreign_model, colors) {
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
}
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
export class Fieldset {
    constructor() {
        this.is_fieldset = true;
    }
}
function Fieldset_tsickle_Closure_declarations() {
    /** @type {?} */
    Fieldset.prototype.label;
    /** @type {?} */
    Fieldset.prototype.is_fieldset;
    /** @type {?} */
    Fieldset.prototype.fields;
}
export class Formset {
}
function Formset_tsickle_Closure_declarations() {
    /** @type {?} */
    Formset.prototype.label;
    /** @type {?} */
    Formset.prototype.model;
}
/**
 * @template T
 */
export class AutoCompleteField extends FormControl {
    constructor() {
        super(...arguments);
        this.label = 'some label';
    }
}
function AutoCompleteField_tsickle_Closure_declarations() {
    /** @type {?} */
    AutoCompleteField.prototype.value;
    /** @type {?} */
    AutoCompleteField.prototype.label;
}
export class DefaultCrudForm {
    /**
     * @param {?} model
     */
    constructor(model) {
        this.model = model;
        this.name = '';
        this.controls = [];
        this.name = model.name;
        Object.keys(model).forEach(v => {
            console.log(v);
            this.controls.push(new FormControl({}));
        });
    }
}
function DefaultCrudForm_tsickle_Closure_declarations() {
    /** @type {?} */
    DefaultCrudForm.prototype.name;
    /** @type {?} */
    DefaultCrudForm.prototype.controls;
    /** @type {?} */
    DefaultCrudForm.prototype.model;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9jcnVkLyIsInNvdXJjZXMiOlsibGliL2Zvcm1zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQThCN0MsTUFBTTs7Ozs7Ozs7OztJQW1CSixZQUNFLEtBQWEsRUFDYixHQUFXLEVBQ1gsSUFBWSxFQUNaLFdBQXFCLEVBQ3JCLGFBQXVCLEVBQ3ZCLGFBQW1CLEVBQ25CLE1BQVk7MkJBckJBLElBQUk7NkJBQ0YsSUFBSTt5QkFDUixLQUFLO3VCQU9QLENBQUM7dUJBQ0QsQ0FBQztRQWFULElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7O0tBRXBDO0NBRUY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUQsTUFBTTs7MkJBRVUsSUFBSTs7Q0FFbkI7Ozs7Ozs7OztBQUVELE1BQU07Q0FHTDs7Ozs7Ozs7OztBQUVELE1BQU0sd0JBQTRCLFNBQVEsV0FBVzs7O3FCQUUzQyxZQUFZOztDQUNyQjs7Ozs7OztBQUVELE1BQU07Ozs7SUFJSixZQUFtQixLQUFVO1FBQVYsVUFBSyxHQUFMLEtBQUssQ0FBSztvQkFIZixFQUFFO3dCQUNFLEVBQUU7UUFHaEIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzNDLENBQUMsQ0FBQztLQUNOO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZXhwb3J0IGludGVyZmFjZSBCYXNlRmllbGQge1xuICBsYWJlbDogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENydWRGaWVsZCB7XG4gIG5hbWU6IHN0cmluZztcbiAgbGFiZWw6IHN0cmluZztcbiAgdmFsaWRhdG9ycz86IGFueVtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENydWRGb3JtIHtcbiAgbmFtZTogc3RyaW5nO1xuICBjb250cm9sczogQ3J1ZEZpZWxkW107XG59XG5cbmV4cG9ydCBlbnVtIEZpZWxkVHlwZSB7XG4gIFRleHQsXG4gIE51bWJlcixcbiAgRGF0ZSxcbiAgRGF0ZVRpbWUsXG4gIFRpbWUsXG4gIEJvb2xlYW4sXG4gIEZvcmVpZ25LZXksXG4gIE1hbnlUb01hbnksXG4gIC8vIEZvcm1TZXQsXG4gIEZpbGUsXG59XG5cbmV4cG9ydCBjbGFzcyBGaWVsZCBpbXBsZW1lbnRzIEJhc2VGaWVsZCB7XG4gIGtleTogc3RyaW5nO1xuICBsYWJlbDogc3RyaW5nO1xuICB2YWx1ZV90eXBlOiBzdHJpbmc7XG4gIGNvbnRyb2xfdHlwZTogc3RyaW5nO1xuICBpc19lZGl0YWJsZSA9IHRydWU7XG4gIGlzX3NlYXJjaGFibGUgPSB0cnVlO1xuICBpc19oaWRkZW4gPSBmYWxzZTtcbiAgLy8gZm9yZWlnbiBrZXkgaW5mb3JtYXRpb25cbiAgLy8gZm9yZWlnbl9tb2RlbD86IGFueSA9IG51bGw7IC8vIGV2YWx1YXRlZCBpbiBydW4gdGltZVxuICBmb3JlaWduX21vZGVsX3BhdGg/OiBzdHJpbmc7XG4gIC8vIGNob2ljZXM/OiBhbnlbXTtcbiAgZmllbGRzOiBGaWVsZFtdO1xuICBjaG9pY2VzOiBhbnk7XG4gIGNvbHNwYW4gPSAxO1xuICByb3dzcGFuID0gMTtcblxuICBfdmFsdWU6IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBsYWJlbDogc3RyaW5nLFxuICAgIGtleTogc3RyaW5nLFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBpc19lZGl0YWJsZT86IGJvb2xlYW4sXG4gICAgaXNfc2VhcmNoYWJsZT86IGJvb2xlYW4sXG4gICAgZm9yZWlnbl9tb2RlbD86IGFueSxcbiAgICBjb2xvcnM/OiBhbnlcbiAgKSB7XG4gICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xuICAgIHRoaXMudmFsdWVfdHlwZSA9IHR5cGU7XG4gICAgdGhpcy5pc19lZGl0YWJsZSA9IGlzX2VkaXRhYmxlO1xuICAgIHRoaXMuaXNfc2VhcmNoYWJsZSA9IGlzX3NlYXJjaGFibGU7XG4gICAgLy8gdGhpcy5mb3JlaWduX21vZGVsID0gZm9yZWlnbl9tb2RlbDtcbiAgfVxuXG59XG5cbmV4cG9ydCBjbGFzcyBGaWVsZHNldCBpbXBsZW1lbnRzIEJhc2VGaWVsZCB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIGlzX2ZpZWxkc2V0ID0gdHJ1ZTtcbiAgZmllbGRzOiBGaWVsZFtdO1xufVxuXG5leHBvcnQgY2xhc3MgRm9ybXNldCBpbXBsZW1lbnRzIEJhc2VGaWVsZCB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIG1vZGVsOiBhbnk7XG59XG5cbmV4cG9ydCBjbGFzcyBBdXRvQ29tcGxldGVGaWVsZDxUPiBleHRlbmRzIEZvcm1Db250cm9sIHtcbiAgdmFsdWU6IFQ7XG4gIGxhYmVsID0gJ3NvbWUgbGFiZWwnO1xufVxuXG5leHBvcnQgY2xhc3MgRGVmYXVsdENydWRGb3JtIGltcGxlbWVudHMgQ3J1ZEZvcm0ge1xuICBwdWJsaWMgbmFtZSA9ICcnO1xuICBwdWJsaWMgY29udHJvbHMgPSBbXTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbW9kZWw6IGFueSkge1xuICAgICAgdGhpcy5uYW1lID0gbW9kZWwubmFtZTtcbiAgICAgIE9iamVjdC5rZXlzKG1vZGVsKS5mb3JFYWNoKHYgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHYpO1xuICAgICAgICAgIHRoaXMuY29udHJvbHMucHVzaChuZXcgRm9ybUNvbnRyb2woe30pKTtcbiAgICAgIH0pO1xuICB9XG59Il19
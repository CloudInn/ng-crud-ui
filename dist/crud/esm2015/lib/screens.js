/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
export class Module {
    constructor() {
        this.apps = [];
    }
}
function Module_tsickle_Closure_declarations() {
    /** @type {?} */
    Module.prototype.label;
    /** @type {?} */
    Module.prototype.apps;
}
export class App {
    constructor() {
        this.models = [];
    }
}
function App_tsickle_Closure_declarations() {
    /** @type {?} */
    App.prototype.key;
    /** @type {?} */
    App.prototype.label;
    /** @type {?} */
    App.prototype.icon;
    /** @type {?} */
    App.prototype.models;
}
export class Model {
    constructor() {
        this.fields = [];
        this.formsets = [];
        this.actions = [];
        this.bulk_actions = [];
        this.list_actions = [];
        this.pageSize = 20;
    }
}
function Model_tsickle_Closure_declarations() {
    /** @type {?} */
    Model.prototype.key;
    /** @type {?} */
    Model.prototype.api;
    /** @type {?} */
    Model.prototype.verbose_name;
    /** @type {?} */
    Model.prototype.fields;
    /** @type {?} */
    Model.prototype.formsets;
    /** @type {?} */
    Model.prototype.external_value_field;
    /** @type {?} */
    Model.prototype.external_name_field;
    /** @type {?} */
    Model.prototype.listing_fields;
    /** @type {?} */
    Model.prototype.actions;
    /** @type {?} */
    Model.prototype.bulk_actions;
    /** @type {?} */
    Model.prototype.list_actions;
    /** @type {?} */
    Model.prototype.pageSize;
}
export class DefaultForm {
    /**
     * @param {?} model
     */
    constructor(model) {
        this.model = model;
    }
}
function DefaultForm_tsickle_Closure_declarations() {
    /** @type {?} */
    DefaultForm.prototype.model;
}
export class ListingScreen {
}
function ListingScreen_tsickle_Closure_declarations() {
    /** @type {?} */
    ListingScreen.prototype.model;
}
export class EditingScreen {
}
function EditingScreen_tsickle_Closure_declarations() {
    /** @type {?} */
    EditingScreen.prototype.model;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyZWVucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2NydWQvIiwic291cmNlcyI6WyJsaWIvc2NyZWVucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBSUEsTUFBTTs7b0JBRVksRUFBRTs7Q0FDbkI7Ozs7Ozs7QUFFRCxNQUFNOztzQkFJZ0IsRUFBRTs7Q0FDdkI7Ozs7Ozs7Ozs7O0FBRUQsTUFBTTs7c0JBSWdCLEVBQUU7d0JBQ0EsRUFBRTt1QkFLRixFQUFFOzRCQUNHLEVBQUU7NEJBQ0YsRUFBRTt3QkFDUixFQUFFOztDQUN4Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUQsTUFBTTs7OztJQUNGLFlBQW1CLEtBQVk7UUFBWixVQUFLLEdBQUwsS0FBSyxDQUFPO0tBQUk7Q0FDdEM7Ozs7O0FBRUQsTUFBTTtDQUVMOzs7OztBQUdELE1BQU07Q0FFTCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi9mb3Jtcyc7XG5cblxuZXhwb3J0IGNsYXNzIE1vZHVsZSB7XG4gICAgbGFiZWw6IHN0cmluZztcbiAgICBhcHBzOiBBcHBbXSA9IFtdO1xufVxuXG5leHBvcnQgY2xhc3MgQXBwIHtcbiAgICBrZXk6IHN0cmluZztcbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIGljb246IHN0cmluZztcbiAgICBtb2RlbHM6IE1vZGVsW10gPSBbXTtcbn1cblxuZXhwb3J0IGNsYXNzIE1vZGVsIHtcbiAgICBrZXk6IHN0cmluZztcbiAgICBhcGk6IHN0cmluZztcbiAgICB2ZXJib3NlX25hbWU6IHN0cmluZztcbiAgICBmaWVsZHM6IEZpZWxkW10gPSBbXTtcbiAgICBmb3Jtc2V0czogRmllbGRbXSA9IFtdO1xuICAgIGV4dGVybmFsX3ZhbHVlX2ZpZWxkOiBzdHJpbmc7XG4gICAgZXh0ZXJuYWxfbmFtZV9maWVsZDogc3RyaW5nO1xuICAgIGxpc3RpbmdfZmllbGRzOiBzdHJpbmdbXTtcblxuICAgIGFjdGlvbnM6IHN0cmluZ1tdID0gW107XG4gICAgYnVsa19hY3Rpb25zOiBzdHJpbmdbXSA9IFtdO1xuICAgIGxpc3RfYWN0aW9uczogc3RyaW5nW10gPSBbXTtcbiAgICBwYWdlU2l6ZTogTnVtYmVyID0gMjA7XG59XG5cbmV4cG9ydCBjbGFzcyBEZWZhdWx0Rm9ybSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIG1vZGVsOiBNb2RlbCkge31cbn1cblxuZXhwb3J0IGNsYXNzIExpc3RpbmdTY3JlZW4ge1xuICAgIG1vZGVsOiBNb2RlbDtcbn1cblxuXG5leHBvcnQgY2xhc3MgRWRpdGluZ1NjcmVlbiB7XG4gICAgbW9kZWw6IE1vZGVsO1xufVxuIl19
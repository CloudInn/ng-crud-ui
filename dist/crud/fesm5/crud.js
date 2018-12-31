import { __values, __extends } from 'tslib';
import { Injectable, Component, Input, Output, EventEmitter, Inject, NgModule, defineInjectable, inject } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpParams, HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { map, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MomentModule } from 'ngx-moment';
import { MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule, MatTableModule, MatCardModule, MatPaginatorModule, MatButtonModule, MatMenuModule, MatProgressBarModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSlideToggleModule, MatGridListModule, MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatTabsModule, MatExpansionModule, MatAutocompleteModule } from '@angular/material';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Registry = /** @class */ (function () {
    function Registry() {
        this.forms = {};
        this.registry = {};
        this.isReady = new BehaviorSubject(false);
    }
    /**
     * @param {?} metadata
     * @param {?} formClass
     * @return {?}
     */
    Registry.prototype.registerForm = /**
     * @param {?} metadata
     * @param {?} formClass
     * @return {?}
     */
    function (metadata, formClass) {
        var /** @type {?} */ ctrls = {};
        try {
            for (var _a = __values(metadata.controls), _b = _a.next(); !_b.done; _b = _a.next()) {
                var ctrl = _b.value;
                ctrls[ctrl.name] = new FormControl({}, ctrl.validators);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var /** @type {?} */ f = new FormGroup(ctrls);
        this.forms[metadata.name] = f;
        var e_1, _c;
    };
    /**
     * @param {?} meta
     * @return {?}
     */
    Registry.prototype.register = /**
     * @param {?} meta
     * @return {?}
     */
    function (meta) {
        this.registry = meta;
        this.isReady.next(true);
    };
    /**
     * @return {?}
     */
    Registry.prototype.getModules = /**
     * @return {?}
     */
    function () {
        return this.registry;
    };
    /**
     * @param {?} moduleName
     * @param {?} app
     * @param {?} key
     * @return {?}
     */
    Registry.prototype.getModel = /**
     * @param {?} moduleName
     * @param {?} app
     * @param {?} key
     * @return {?}
     */
    function (moduleName, app, key) {
        return this.registry[moduleName].apps.filter(function (a) { return a.key === app; })[0]
            .models.filter(function (m) { return m.key === key; })[0];
    };
    /**
     * @param {?} moduleName
     * @param {?} app
     * @return {?}
     */
    Registry.prototype.getApp = /**
     * @param {?} moduleName
     * @param {?} app
     * @return {?}
     */
    function (moduleName, app) {
        return this.registry[moduleName].apps.filter(function (a) { return a.key === app; })[0];
    };
    /**
     * @param {?} moduleName
     * @param {?} app
     * @return {?}
     */
    Registry.prototype.getAppModels = /**
     * @param {?} moduleName
     * @param {?} app
     * @return {?}
     */
    function (moduleName, app) {
        return this.registry[moduleName].apps.filter(function (a) { return a.key === app; }).models;
    };
    Registry.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    Registry.ctorParameters = function () { return []; };
    /** @nocollapse */ Registry.ngInjectableDef = defineInjectable({ factory: function Registry_Factory() { return new Registry(); }, token: Registry, providedIn: "root" });
    return Registry;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ListingScreenComponent = /** @class */ (function () {
    function ListingScreenComponent(reg, router, route) {
        this.reg = reg;
        this.router = router;
        this.route = route;
        this.appName = null;
        this.moduleName = null;
        this.modelName = null;
    }
    /**
     * @return {?}
     */
    ListingScreenComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // keep listening for route params changes, in case of
        // the model name changed, e.g: another model clicked from
        // the nav menu
        this.route.params.subscribe(function (params) {
            var /** @type {?} */ parentParams = _this.route.parent.snapshot.params;
            _this.moduleName = parentParams['module'];
            _this.appName = parentParams['app'];
            _this.modelName = params['model_name'];
        });
    };
    ListingScreenComponent.decorators = [
        { type: Component, args: [{
                    template: "<section class=\"app-settings\" *ngIf=\"modelName\">\n\n  <ng-crud-listing [modelName]=\"modelName\" [appName]=\"appName\" [moduleName]=\"moduleName\">\n\n  </ng-crud-listing>\n</section>\n",
                    styles: ["#custom-header{padding-top:12px;margin-bottom:12px}.page-title a{color:#333}.mat-tab-nav-bar,mat-tab-nav-bar{border:none!important}.tabs-bar a{color:#fff}"]
                },] },
    ];
    /** @nocollapse */
    ListingScreenComponent.ctorParameters = function () { return [
        { type: Registry },
        { type: Router },
        { type: ActivatedRoute }
    ]; };
    return ListingScreenComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Navigator = /** @class */ (function () {
    function Navigator() {
        this.navItems = new EventEmitter();
        this.activeNavItem = null;
        this.path = new EventEmitter();
    }
    Navigator.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    Navigator.ctorParameters = function () { return []; };
    /** @nocollapse */ Navigator.ngInjectableDef = defineInjectable({ factory: function Navigator_Factory() { return new Navigator(); }, token: Navigator, providedIn: "root" });
    return Navigator;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AppScreenComponent = /** @class */ (function () {
    function AppScreenComponent(reg, router, route, navigator) {
        this.reg = reg;
        this.router = router;
        this.route = route;
        this.navigator = navigator;
        this.app = null;
        this.moduleName = null;
        this.models = [];
    }
    /**
     * @return {?}
     */
    AppScreenComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ params = this.route.snapshot.params;
        this.moduleName = params['module'];
        this.app = this.reg.getApp(this.moduleName, params['app']);
        this.models = this.app.models;
        this.renderSidebar();
        if (!this.route.firstChild) {
            // this.renderSidebar();
            this.navigator.path.emit([params['module'], params['app'], this.models[0].key]);
            this.router.navigate(["/" + params['module'], params['app'], this.models[0].key]);
            return;
        }
        this.navigator.path.emit([params['module'], params['app'], this.route.firstChild.snapshot.params['model_name']]);
        // this.route.params.subscribe(res => {
        //   console.log(res);
        // });
        // console.log(this.route.firstChild.snapshot.params);
        // if (!params['model_name']) {
        //   this.renderSidebar();
        //   // this.router.navigate([`/${params['module']}`, params['app'], this.models[0].key]);
        //   return;
        // }
    };
    // ngOnChanges() {
    //   this.route.params.subscribe(params => {
    //     this.moduleName = params['parent_app'];
    //     this.app = this.reg.getApp(params['app']);
    //     this.models = this.reg.getAppModels(params['app']);
    //   });
    // }
    /**
     * @return {?}
     */
    AppScreenComponent.prototype.renderSidebar = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ items = [];
        var /** @type {?} */ item = { title: this.app.label, type: 'subheading' };
        items.push(item);
        this.models.forEach(function (m) {
            var /** @type {?} */ i = { title: m.verbose_name + "s", url: "/" + _this.moduleName + "/" + _this.app.key + "/" + m.key };
            items.push(i);
        });
        this.navigator.navItems.next(items);
    };
    AppScreenComponent.decorators = [
        { type: Component, args: [{
                    template: "<section class=\"app-settings\">\n  \n  <!-- <mat-card>\n    <p class=\"mat-subheading-1\">Welcome to Cloudinn Settings</p>\n  </mat-card> -->\n  <div class=\"container\">\n    <router-outlet></router-outlet>\n  </div>\n</section>\n",
                    styles: ["#custom-header{padding-top:12px;margin-bottom:12px}.page-title a{color:#333}.mat-tab-nav-bar,mat-tab-nav-bar{border:none!important}.tabs-bar a{color:#fff}"]
                },] },
    ];
    /** @nocollapse */
    AppScreenComponent.ctorParameters = function () { return [
        { type: Registry },
        { type: Router },
        { type: ActivatedRoute },
        { type: Navigator }
    ]; };
    return AppScreenComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ApiService = /** @class */ (function () {
    function ApiService(http) {
        this.http = http;
    }
    /**
     * @param {?} api
     * @param {?=} params
     * @return {?}
     */
    ApiService.prototype.fetch = /**
     * @param {?} api
     * @param {?=} params
     * @return {?}
     */
    function (api, params) {
        var /** @type {?} */ opts = new HttpParams();
        Object.keys(params).forEach(function (p) {
            if (params[p]) {
                opts = opts.set(p, params[p]);
            }
        });
        return this.http.get(api, { params: opts });
    };
    /**
     * @param {?} api
     * @param {?} body
     * @param {?=} params
     * @return {?}
     */
    ApiService.prototype.put = /**
     * @param {?} api
     * @param {?} body
     * @param {?=} params
     * @return {?}
     */
    function (api, body, params) {
        if (params === void 0) { params = {}; }
        var /** @type {?} */ opts = new HttpParams();
        Object.keys(params).forEach(function (p) {
            if (params[p]) {
                opts = opts.set(p, params[p]);
            }
        });
        return this.http.put(api, body, { params: opts });
    };
    /**
     * @param {?} api
     * @param {?} body
     * @param {?=} params
     * @return {?}
     */
    ApiService.prototype.post = /**
     * @param {?} api
     * @param {?} body
     * @param {?=} params
     * @return {?}
     */
    function (api, body, params) {
        if (params === void 0) { params = {}; }
        var /** @type {?} */ opts = new HttpParams();
        Object.keys(params).forEach(function (p) {
            if (params[p]) {
                opts = opts.set(p, params[p]);
            }
        });
        return this.http.post(api, body, { params: opts });
    };
    ApiService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    ApiService.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    /** @nocollapse */ ApiService.ngInjectableDef = defineInjectable({ factory: function ApiService_Factory() { return new ApiService(inject(HttpClient)); }, token: ApiService, providedIn: "root" });
    return ApiService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
var Fieldset = /** @class */ (function () {
    function Fieldset() {
        this.is_fieldset = true;
    }
    return Fieldset;
}());
var Formset = /** @class */ (function () {
    function Formset() {
    }
    return Formset;
}());
/**
 * @template T
 */
var  /**
 * @template T
 */
AutoCompleteField = /** @class */ (function (_super) {
    __extends(AutoCompleteField, _super);
    function AutoCompleteField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = 'some label';
        return _this;
    }
    return AutoCompleteField;
}(FormControl));
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ModelFormScreenComponent = /** @class */ (function () {
    function ModelFormScreenComponent(api, reg, router, route, snackbar) {
        this.api = api;
        this.reg = reg;
        this.router = router;
        this.route = route;
        this.snackbar = snackbar;
        this.id = null;
        this.mode = 'create';
        this.ngModel = {};
        this.fieldType = FieldType;
        this.editableFields = [];
        this.choices = {};
    }
    /**
     * @return {?}
     */
    ModelFormScreenComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.route.parent.params.subscribe(function (params) {
            _this.module = params['module'];
            _this.appName = params['app'];
        });
        this.route.params.subscribe(function (params) {
            _this.modelName = params['model_name'];
            _this.model = _this.reg.getModel(_this.module, _this.appName, _this.modelName);
            _this.id = params['id'];
            if (_this.id != null && _this.id !== 'new') {
                _this.mode = 'edit';
            }
        });
    };
    /**
     * @param {?} e
     * @return {?}
     */
    ModelFormScreenComponent.prototype.onSubmit = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        var _this = this;
        var /** @type {?} */ req = null;
        if (this.mode === 'edit') {
            req = this.api.put(this.model.api + this.id + '/', e);
        }
        else {
            req = this.api.post(this.model.api, e);
        }
        req.subscribe(function (res) {
            _this.snackbar.open('Saved Successfully', 'Dismiss');
            _this.router.navigate([_this.module, _this.appName, _this.modelName]);
        }, function (err) {
            _this.snackbar.open('Failed to save', 'Dismiss');
        });
    };
    ModelFormScreenComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ng-crud-model-form-screen',
                    template: "<!-- <mat-progress-bar *ngIf=\"isLoading\" mode=\"query\"></mat-progress-bar> -->\n\n<!--<form>-->\n<div class=\"wrapper\">\n    <mat-toolbar>\n        <a routerLink=\"/\" mat-icon-button class=\"mat-caption\"><mat-icon>home</mat-icon></a>\n        <mat-icon>keyboard_arrow_right</mat-icon>\n        <a mat-button [routerLink]=\"'/'+module+'/'+appName\" class=\"mat-caption\">{{ appName }}</a>\n        <mat-icon>keyboard_arrow_right</mat-icon>\n        <a mat-button class=\"mat-caption\" [routerLink]=\"'/'+module+'/'+appName+'/'+modelName\">{{ model.verbose_name }}s</a>\n        <mat-icon>keyboard_arrow_right</mat-icon>\n        <span *ngIf=\"mode === 'edit'\" class=\"mat-caption\">{{ id }}</span>\n        <span *ngIf=\"mode === 'create'\" class=\"mat-caption\">Creating new {{ modelName }}</span>\n        <span class=\"toolbar-fill-remaining-space\"></span>\n    </mat-toolbar>\n\n    <mat-card>\n        <mat-card-content>\n            <ng-crud-model-form [moduleName]=\"module\" [appName]=\"appName\" [mode]='mode'\n                [modelName]=\"modelName\" (submit)=\"onSubmit($event)\" [id]=\"id\"></ng-crud-model-form>\n        </mat-card-content>\n    </mat-card>\n</div>",
                    styles: [".wrapper {\n    padding: 24px;\n  }"],
                    exportAs: 'ngcrudui-model-form-screen'
                },] },
    ];
    /** @nocollapse */
    ModelFormScreenComponent.ctorParameters = function () { return [
        { type: ApiService },
        { type: Registry },
        { type: Router },
        { type: ActivatedRoute },
        { type: MatSnackBar }
    ]; };
    return ModelFormScreenComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var Module = /** @class */ (function () {
    function Module() {
        this.apps = [];
    }
    return Module;
}());
var App = /** @class */ (function () {
    function App() {
        this.models = [];
    }
    return App;
}());
var Model = /** @class */ (function () {
    function Model() {
        this.fields = [];
        this.formsets = [];
        this.actions = [];
        this.bulk_actions = [];
        this.list_actions = [];
        this.pageSize = 20;
    }
    return Model;
}());
var DefaultForm = /** @class */ (function () {
    function DefaultForm(model) {
        this.model = model;
    }
    return DefaultForm;
}());
var ListingScreen = /** @class */ (function () {
    function ListingScreen() {
    }
    return ListingScreen;
}());
var EditingScreen = /** @class */ (function () {
    function EditingScreen() {
    }
    return EditingScreen;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FormService = /** @class */ (function () {
    function FormService() {
    }
    /**
     * @param {?} fields
     * @return {?}
     */
    FormService.prototype.toFormGroup = /**
     * @param {?} fields
     * @return {?}
     */
    function (fields) {
        var /** @type {?} */ controls = {};
        try {
            for (var fields_1 = __values(fields), fields_1_1 = fields_1.next(); !fields_1_1.done; fields_1_1 = fields_1.next()) {
                var field = fields_1_1.value;
                if (field.control_type === 'formset') {
                    controls[field.key] = this.toFormArray(field.fields, field._value);
                }
                else {
                    controls[field.key] = new FormControl(field._value);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (fields_1_1 && !fields_1_1.done && (_a = fields_1.return)) _a.call(fields_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return new FormGroup(controls);
        var e_1, _a;
    };
    /**
     * @param {?} fields
     * @param {?} values
     * @return {?}
     */
    FormService.prototype.toFormArray = /**
     * @param {?} fields
     * @param {?} values
     * @return {?}
     */
    function (fields, values) {
        var _this = this;
        if (!values) {
            values = [];
        }
        var /** @type {?} */ groups = [];
        values.forEach(function (v) {
            // assign value to fields
            fields.map(function (f) {
                f._value = v[f.key];
            });
            var /** @type {?} */ group = _this.toFormGroup(fields);
            groups.push(g);
        });
        // always add an empty row
        var /** @type {?} */ g = this.toFormGroup(fields);
        var /** @type {?} */ emptyValues = {};
        try {
            for (var fields_2 = __values(fields), fields_2_1 = fields_2.next(); !fields_2_1.done; fields_2_1 = fields_2.next()) {
                var f = fields_2_1.value;
                emptyValues[f.key] = null;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (fields_2_1 && !fields_2_1.done && (_a = fields_2.return)) _a.call(fields_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        g.setValue(emptyValues);
        groups.push(g);
        return new FormArray(groups);
        var e_2, _a;
    };
    FormService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    FormService.ctorParameters = function () { return []; };
    /** @nocollapse */ FormService.ngInjectableDef = defineInjectable({ factory: function FormService_Factory() { return new FormService(); }, token: FormService, providedIn: "root" });
    return FormService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ListingComponent = /** @class */ (function () {
    function ListingComponent(api, reg, route, router) {
        this.api = api;
        this.reg = reg;
        this.route = route;
        this.router = router;
        this.mode = 'normal';
        this.is_actions_set = false;
        this.dataSource = new MatTableDataSource();
        this.searchParams = {
            page: 1,
        };
        this.columns = [];
        this.displayColumns = [];
        this.resultsCount = 0;
        this.isLoading = true;
        this.picked = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ListingComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        if (this.modelName) {
            this.populateDataTable();
        }
    };
    /**
     * @return {?}
     */
    ListingComponent.prototype.prepareColumns = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.mode !== 'pick') {
            this.columns = [{ 'columnDef': 'checked', 'header': '' }];
        }
        else {
            this.columns = [];
        }
        this.model.listing_fields.map(function (field) {
            var /** @type {?} */ f = _this.model.fields.filter(function (ff) { return ff.key === field; })[0];
            var /** @type {?} */ col = {};
            col['columnDef'] = f.key;
            col['header'] = f.label;
            col['cell'] = function (element) { return "" + element[f.key]; };
            if (_this.model.external_name_field === field) {
                col['clickable'] = true;
            }
            _this.columns.push(col);
        });
        if (this.mode !== 'pick') {
            this.columns.push({ 'columnDef': 'actions', 'header': '' });
        }
    };
    /**
     * @return {?}
     */
    ListingComponent.prototype.populateDataTable = /**
     * @return {?}
     */
    function () {
        this.model = this.reg.getModel(this.moduleName, this.appName, this.modelName);
        this.prepareColumns();
        this.displayColumns = this.columns.map(function (c) { return c.columnDef; });
        this.resultsCount = 0;
        this.dataSource.data = [];
        // this.displayColumns.push('actions');
        this.searchParams = { page: 1 };
        this.fetch();
    };
    /**
     * @return {?}
     */
    ListingComponent.prototype.fetch = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.api.fetch(this.model.api, this.searchParams).subscribe(function (res) {
            var /** @type {?} */ newItems = [];
            if (res.results) {
                newItems = _this.dataSource.data.concat(res.results);
            }
            else {
                newItems = _this.dataSource.data.concat(res);
            }
            _this.resultsCount = newItems.length;
            _this.dataSource.data = newItems;
            _this.isLoading = false;
        }, function (err) {
            _this.isLoading = false;
        });
    };
    /**
     * @param {?} id
     * @return {?}
     */
    ListingComponent.prototype.getLink = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return ['/', this.moduleName, this.appName, this.modelName, id];
    };
    /**
     * @param {?} columnName
     * @param {?} row
     * @return {?}
     */
    ListingComponent.prototype.cellClicked = /**
     * @param {?} columnName
     * @param {?} row
     * @return {?}
     */
    function (columnName, row) {
        if (columnName === this.model.external_name_field) {
            this.router.navigate(this.getLink(row.id));
        }
    };
    /**
     * @param {?} searchParams
     * @return {?}
     */
    ListingComponent.prototype.onSearch = /**
     * @param {?} searchParams
     * @return {?}
     */
    function (searchParams) {
        this.isLoading = true;
        this.dataSource.data = [];
        this.resultsCount = 0;
        this.searchParams = searchParams;
        this.searchParams.page = 1;
        this.fetch();
    };
    /**
     * @param {?} row
     * @return {?}
     */
    ListingComponent.prototype.onChecked = /**
     * @param {?} row
     * @return {?}
     */
    function (row) {
        row['is_checked'] = true;
    };
    /**
     * @return {?}
     */
    ListingComponent.prototype.onCheckAll = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ListingComponent.prototype._picked = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.picked.next(value);
    };
    ListingComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ng-crud-listing',
                    template: "<!-- <mat-toolbar>\n    <a routerLink=\"/\" mat-icon-button class=\"mat-caption\"><mat-icon>home</mat-icon></a>\n    <mat-icon>keyboard_arrow_right</mat-icon>\n    <a mat-button [routerLink]=\"'/'+moduleName+'/'+appName\" class=\"mat-caption\">{{ appName }}</a>\n    <mat-icon>keyboard_arrow_right</mat-icon>\n    <a mat-button class=\"mat-caption\">{{ model.verbose_name }}s</a>\n    <span class=\"toolbar-fill-remaining-space\"></span>\n    <a mat-button [routerLink]=\"'/'+moduleName+'/'+appName+'/'+modelName+'/new'\" color=\"primary\">Create</a>\n    &nbsp;\n    <button mat-button color=\"warn\" [matMenuTriggerFor]=\"menu\">Bulk Actions <mat-icon>arrow_drop_down</mat-icon></button>    \n    <mat-menu #menu=\"matMenu\" >\n        <button mat-menu-item>Delete</button>\n    </mat-menu>\n</mat-toolbar> -->\n\n<div class=\"row\" *ngIf=\"mode !== 'pick'\">\n    <span class=\"fill-remaining-space\"></span>\n    <button mat-button color=\"warn\" [matMenuTriggerFor]=\"menu\">Bulk Actions <mat-icon>arrow_drop_down</mat-icon></button>    \n    <mat-menu #menu=\"matMenu\" >\n        <button mat-menu-item>Delete</button>\n    </mat-menu>\n</div>\n\n<mat-expansion-panel>\n    <mat-expansion-panel-header>\n        <mat-panel-title>\n            <mat-icon>search</mat-icon>\n        </mat-panel-title>\n        <mat-panel-description>\n            Search and filter restults\n        </mat-panel-description>                \n    </mat-expansion-panel-header>\n\n    <ng-crud-model-form [moduleName]=\"moduleName\" [appName]=\"appName\" mode='search'\n                 [modelName]=\"modelName\" (submit)=\"onSearch($event)\"></ng-crud-model-form>\n\n</mat-expansion-panel>    \n\n<mat-progress-bar *ngIf=\"isLoading\" mode=\"query\"></mat-progress-bar>\n\n<mat-table [dataSource]=\"dataSource\">\n    <ng-container *ngFor=\"let column of columns\" [matColumnDef]=\"column.columnDef\">\n        <ng-template [ngIf]=\"column.columnDef === 'checked'\">\n            <mat-header-cell *matHeaderCellDef (click)=\"onCheckAll()\"><mat-checkbox></mat-checkbox></mat-header-cell>\n            <mat-cell *matCellDef=\"let row\"> <mat-checkbox></mat-checkbox> </mat-cell>\n        </ng-template>\n        <ng-template [ngIf]=\"column.columnDef !== 'checked' && column.columnDef !== 'actions'\">\n            <mat-header-cell *matHeaderCellDef>{{ column.header }}</mat-header-cell>\n            <mat-cell *matCellDef=\"let row\">\n                <!-- <a *ngIf=\"column.clickable; else normal\" [routerLink]=\"getLink(row.id)\">{{ column.cell(row) }}</a>\n                <ng-template #normal>{{ column.cell(row) }}</ng-template>     -->\n                <a class=\"clickable\" [routerLink]=\"[row.id]\" *ngIf=\"(mode !== 'pick' && column.columnDef === model.external_name_field); else normalCell\">\n                    {{ column.cell(row) }}\n                </a>\n                <ng-template #normalCell>\n                    {{ column.cell(row) }}\n                </ng-template>\n            </mat-cell>\n        </ng-template>\n        <ng-template [ngIf]=\"column.columnDef === 'actions'\">\n            <mat-header-cell *matHeaderCellDef>{{ column.header }}</mat-header-cell>\n            <mat-cell *matCellDef=\"let row\">\n                <button mat-button *ngFor=\"let action of model.list_actions\">\n                    {{ action }}\n                </button>\n            </mat-cell>\n            </ng-template>\n    </ng-container>\n\n    <mat-header-row *matHeaderRowDef=\"displayColumns\"></mat-header-row>\n    <mat-row  *matRowDef=\"let row; columns: displayColumns;\" [ngClass]=\"{'clickable': mode === 'pick'}\" (click)=\"_picked(row[this.model.external_value_field])\"></mat-row>\n</mat-table>\n\n<mat-paginator #paginator\n    [length]=\"resultsCount\"\n    [pageIndex]=\"searchParams.page - 1\"\n    [pageSize]=\"20\">\n</mat-paginator>",
                    styles: [".clickable{color:#00f;cursor:pointer}"],
                    exportAs: 'ngcrudui-listing'
                },] },
    ];
    /** @nocollapse */
    ListingComponent.ctorParameters = function () { return [
        { type: ApiService },
        { type: Registry },
        { type: ActivatedRoute },
        { type: Router }
    ]; };
    ListingComponent.propDecorators = {
        moduleName: [{ type: Input, args: ['moduleName',] }],
        appName: [{ type: Input, args: ['appName',] }],
        modelName: [{ type: Input, args: ['modelName',] }],
        mode: [{ type: Input }],
        forcedSearchParams: [{ type: Input }],
        picked: [{ type: Output }]
    };
    return ListingComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
                for (var _a = __values(this.model.formsets), _b = _a.next(); !_b.done; _b = _a.next()) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ListingDialogComponent = /** @class */ (function () {
    function ListingDialogComponent(reg, ref, data) {
        this.reg = reg;
        this.ref = ref;
        this.data = data;
    }
    /**
     * @return {?}
     */
    ListingDialogComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.moduleName = this.data['moduleName'];
        this.appName = this.data['appName'];
        this.modelName = this.data['modelName'];
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ListingDialogComponent.prototype.picked = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        console.log('picked', value);
        this.ref.close(value);
    };
    ListingDialogComponent.decorators = [
        { type: Component, args: [{
                    template: "<section class=\"app-settings\" *ngIf=\"modelName\">\n\n  <ng-crud-listing (picked)=\"picked($event)\" [modelName]=\"modelName\" [appName]=\"appName\" [moduleName]=\"moduleName\" mode=\"pick\">\n\n  </ng-crud-listing>\n</section>",
                    styles: ["#custom-header{padding-top:12px;margin-bottom:12px}.page-title a{color:#333}.mat-tab-nav-bar,mat-tab-nav-bar{border:none!important}.tabs-bar a{color:#fff}"]
                },] },
    ];
    /** @nocollapse */
    ListingDialogComponent.ctorParameters = function () { return [
        { type: Registry },
        { type: MatDialogRef },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
    ]; };
    return ListingDialogComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
            for (var CHOICES_1 = __values(CHOICES), CHOICES_1_1 = CHOICES_1.next(); !CHOICES_1_1.done; CHOICES_1_1 = CHOICES_1.next()) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
                for (var _a = __values(changes["config"].currentValue.fields), _b = _a.next(); !_b.done; _b = _a.next()) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
        this.filteredOptions = of(this.choices);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CrudModule = /** @class */ (function () {
    function CrudModule() {
    }
    CrudModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        HttpClientModule,
                        MomentModule,
                        RouterModule,
                        MatToolbarModule,
                        MatSidenavModule,
                        MatListModule,
                        MatIconModule,
                        MatTableModule,
                        MatCardModule,
                        MatPaginatorModule,
                        MatButtonModule,
                        MatMenuModule,
                        MatProgressBarModule,
                        MatFormFieldModule,
                        MatInputModule,
                        MatCheckboxModule,
                        MatSlideToggleModule,
                        MatGridListModule,
                        MatSnackBarModule,
                        MatDatepickerModule,
                        MatNativeDateModule,
                        MatSelectModule,
                        MatTabsModule,
                        MatExpansionModule,
                        MatAutocompleteModule,
                    ],
                    declarations: [
                        FormFieldComponent,
                        AutoCompleteFieldComponent,
                        ListingComponent,
                        ModelFormComponent,
                        AppScreenComponent,
                        ListingScreenComponent,
                        ModelFormScreenComponent,
                        FormsetComponent,
                        ForeignKeyFieldComponent,
                        ListingDialogComponent,
                    ],
                    providers: [],
                    exports: [
                        HttpClientModule,
                        AutoCompleteFieldComponent,
                        MatToolbarModule,
                        MatSidenavModule,
                        MatListModule,
                        MatIconModule,
                        MatTableModule,
                        MatCardModule,
                        MatPaginatorModule,
                        MatButtonModule,
                        MatMenuModule,
                        MatProgressBarModule,
                        MatFormFieldModule,
                        MatInputModule,
                        MatCheckboxModule,
                        MatSlideToggleModule,
                        MatGridListModule,
                        MatSnackBarModule,
                        MatNativeDateModule,
                        MatDatepickerModule,
                        MatSelectModule,
                        MatTabsModule,
                        MatAutocompleteModule,
                        MatExpansionModule,
                        FormFieldComponent,
                        ListingComponent,
                        ModelFormComponent,
                        AppScreenComponent,
                        ListingScreenComponent,
                        ModelFormScreenComponent,
                        FormsetComponent,
                        ForeignKeyFieldComponent,
                    ],
                    entryComponents: [
                        ListingDialogComponent
                    ]
                },] },
    ];
    return CrudModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { ListingScreenComponent, AppScreenComponent, ModelFormScreenComponent, Module, App, Model, DefaultForm, ListingScreen, EditingScreen, FieldType, Field, Fieldset, Formset, AutoCompleteField, DefaultCrudForm, Registry, Navigator, ApiService, FormService, CrudModule, AutoCompleteFieldComponent as ɵb, ForeignKeyFieldComponent as ɵf, FormFieldComponent as ɵa, FormsetComponent as ɵe, ListingComponent as ɵc, ModelFormComponent as ɵd, ListingDialogComponent as ɵg };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J1ZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vY3J1ZC9saWIvc2VydmljZXMvcmVnaXN0cnkuc2VydmljZS50cyIsIm5nOi8vY3J1ZC9saWIvY29udGFpbmVycy9saXN0aW5nLXNjcmVlbi9saXN0aW5nLXNjcmVlbi5jb21wb25lbnQudHMiLCJuZzovL2NydWQvbGliL3NlcnZpY2VzL25hdmlnYXRvci5zZXJ2aWNlLnRzIiwibmc6Ly9jcnVkL2xpYi9jb250YWluZXJzL2FwcC1zY3JlZW4vYXBwLXNjcmVlbi5jb21wb25lbnQudHMiLCJuZzovL2NydWQvbGliL3NlcnZpY2VzL2FwaS5zZXJ2aWNlLnRzIiwibmc6Ly9jcnVkL2xpYi9mb3Jtcy50cyIsIm5nOi8vY3J1ZC9saWIvY29tcG9uZW50cy9tb2RlbC1mb3JtLXNjcmVlbi9tb2RlbC1mb3JtLXNjcmVlbi5jb21wb25lbnQudHMiLCJuZzovL2NydWQvbGliL3NjcmVlbnMudHMiLCJuZzovL2NydWQvbGliL3NlcnZpY2VzL2Zvcm0uc2VydmljZS50cyIsIm5nOi8vY3J1ZC9saWIvY29tcG9uZW50cy9saXN0aW5nL2xpc3RpbmcuY29tcG9uZW50LnRzIiwibmc6Ly9jcnVkL2xpYi9jb21wb25lbnRzL21vZGVsLWZvcm0vbW9kZWwtZm9ybS5jb21wb25lbnQudHMiLCJuZzovL2NydWQvbGliL2NvbnRhaW5lcnMvbGlzdGluZy1kaWFsb2cvbGlzdGluZy1kaWFsb2cuY29tcG9uZW50LnRzIiwibmc6Ly9jcnVkL2xpYi9jb21wb25lbnRzL2Zvcm0tZmllbGQvZm9ybS1maWVsZC5jb21wb25lbnQudHMiLCJuZzovL2NydWQvbGliL2NvbXBvbmVudHMvZm9ybXNldC9mb3Jtc2V0LmNvbXBvbmVudC50cyIsIm5nOi8vY3J1ZC9saWIvY29tcG9uZW50cy9hdXRvLWNvbXBsZXRlLWZpZWxkL2F1dG8tY29tcGxldGUtZmllbGQuY29tcG9uZW50LnRzIiwibmc6Ly9jcnVkL2xpYi9jb21wb25lbnRzL2ZvcmVpZ24ta2V5LWZpZWxkL2ZvcmVpZ24ta2V5LWZpZWxkLmNvbXBvbmVudC50cyIsIm5nOi8vY3J1ZC9saWIvY3J1ZC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSAsICBTdWJqZWN0ICwgIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRmllbGQsIENydWRGb3JtIH0gZnJvbSAnLi4vZm9ybXMnO1xuaW1wb3J0IHsgQXBwLCBNb2RlbCB9IGZyb20gJy4uL3NjcmVlbnMnO1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFJlZ2lzdHJ5IHtcblxuICBwdWJsaWMgZm9ybXM6IHtba2V5OiBzdHJpbmddOiBGb3JtR3JvdXB9ID0ge307XG4gIHByaXZhdGUgcmVnaXN0cnk6IGFueSA9IHt9O1xuICBwdWJsaWMgaXNSZWFkeTogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIHJlZ2lzdGVyRm9ybShtZXRhZGF0YTogQ3J1ZEZvcm0sIGZvcm1DbGFzczogYW55KSB7XG4gICAgY29uc3QgY3RybHMgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGN0cmwgb2YgbWV0YWRhdGEuY29udHJvbHMpIHtcbiAgICAgIGN0cmxzW2N0cmwubmFtZV0gPSBuZXcgRm9ybUNvbnRyb2woe30sIGN0cmwudmFsaWRhdG9ycyk7XG4gICAgfVxuICAgIGNvbnN0IGYgPSBuZXcgRm9ybUdyb3VwKGN0cmxzKTtcbiAgICB0aGlzLmZvcm1zW21ldGFkYXRhLm5hbWVdID0gZjtcbiAgfVxuXG4gIHJlZ2lzdGVyKG1ldGE6IHt9KSB7XG4gICAgdGhpcy5yZWdpc3RyeSA9IG1ldGE7XG4gICAgdGhpcy5pc1JlYWR5Lm5leHQodHJ1ZSk7XG4gIH1cblxuICBnZXRNb2R1bGVzKCkge1xuICAgIHJldHVybiB0aGlzLnJlZ2lzdHJ5O1xuICB9XG5cbiAgZ2V0TW9kZWwobW9kdWxlTmFtZTogc3RyaW5nLCBhcHA6IHN0cmluZywga2V5OiBzdHJpbmcpOiBNb2RlbCB7XG4gICAgcmV0dXJuIHRoaXMucmVnaXN0cnlbbW9kdWxlTmFtZV0uYXBwcy5maWx0ZXIoKGE6IEFwcCkgPT4gYS5rZXkgPT09IGFwcClbMF1cbiAgICAgIC5tb2RlbHMuZmlsdGVyKG0gPT4gbS5rZXkgPT09IGtleSlbMF07XG4gIH1cblxuICBnZXRBcHAobW9kdWxlTmFtZTogc3RyaW5nLCBhcHA6IHN0cmluZyk6IEFwcCB7XG4gICAgcmV0dXJuIHRoaXMucmVnaXN0cnlbbW9kdWxlTmFtZV0uYXBwcy5maWx0ZXIoYSA9PiBhLmtleSA9PT0gYXBwKVswXTtcbiAgfVxuXG4gIGdldEFwcE1vZGVscyhtb2R1bGVOYW1lOiBzdHJpbmcsIGFwcDogc3RyaW5nKToge3N0cmluZzogTW9kZWx9IHtcbiAgICByZXR1cm4gdGhpcy5yZWdpc3RyeVttb2R1bGVOYW1lXS5hcHBzLmZpbHRlcihhID0+IGEua2V5ID09PSBhcHApLm1vZGVscztcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlICwgUm91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBSZWdpc3RyeSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3JlZ2lzdHJ5LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgdGVtcGxhdGU6IGA8c2VjdGlvbiBjbGFzcz1cImFwcC1zZXR0aW5nc1wiICpuZ0lmPVwibW9kZWxOYW1lXCI+XG5cbiAgPG5nLWNydWQtbGlzdGluZyBbbW9kZWxOYW1lXT1cIm1vZGVsTmFtZVwiIFthcHBOYW1lXT1cImFwcE5hbWVcIiBbbW9kdWxlTmFtZV09XCJtb2R1bGVOYW1lXCI+XG5cbiAgPC9uZy1jcnVkLWxpc3Rpbmc+XG48L3NlY3Rpb24+XG5gLFxuICBzdHlsZXM6IFtgI2N1c3RvbS1oZWFkZXJ7cGFkZGluZy10b3A6MTJweDttYXJnaW4tYm90dG9tOjEycHh9LnBhZ2UtdGl0bGUgYXtjb2xvcjojMzMzfS5tYXQtdGFiLW5hdi1iYXIsbWF0LXRhYi1uYXYtYmFye2JvcmRlcjpub25lIWltcG9ydGFudH0udGFicy1iYXIgYXtjb2xvcjojZmZmfWBdXG59KVxuZXhwb3J0IGNsYXNzIExpc3RpbmdTY3JlZW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgYXBwTmFtZTogc3RyaW5nID0gbnVsbDtcbiAgICBtb2R1bGVOYW1lOiBzdHJpbmcgPSBudWxsO1xuICAgIG1vZGVsTmFtZTogc3RyaW5nID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSByZWc6IFJlZ2lzdHJ5LFxuICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgLy8ga2VlcCBsaXN0ZW5pbmcgZm9yIHJvdXRlIHBhcmFtcyBjaGFuZ2VzLCBpbiBjYXNlIG9mXG4gICAgICAvLyB0aGUgbW9kZWwgbmFtZSBjaGFuZ2VkLCBlLmc6IGFub3RoZXIgbW9kZWwgY2xpY2tlZCBmcm9tXG4gICAgICAvLyB0aGUgbmF2IG1lbnVcbiAgICAgIHRoaXMucm91dGUucGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xuICAgICAgICBjb25zdCBwYXJlbnRQYXJhbXMgPSB0aGlzLnJvdXRlLnBhcmVudC5zbmFwc2hvdC5wYXJhbXM7XG4gICAgICAgIHRoaXMubW9kdWxlTmFtZSA9IHBhcmVudFBhcmFtc1snbW9kdWxlJ107XG4gICAgICAgIHRoaXMuYXBwTmFtZSA9IHBhcmVudFBhcmFtc1snYXBwJ107XG4gICAgICAgIHRoaXMubW9kZWxOYW1lID0gcGFyYW1zWydtb2RlbF9uYW1lJ107XG4gICAgICB9KTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBGb3JtQXJyYXkgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlICwgIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi4vZm9ybXMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5hdmlnYXRvciB7XG5cbiAgICBuYXZJdGVtczogRXZlbnRFbWl0dGVyPGFueVtdPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBhY3RpdmVOYXZJdGVtID0gbnVsbDtcbiAgICBwYXRoOiBFdmVudEVtaXR0ZXI8c3RyaW5nW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmdbXT4oKTtcblxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IFJlZ2lzdHJ5IH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQgeyBOYXZpZ2F0b3IgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9uYXZpZ2F0b3Iuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICB0ZW1wbGF0ZTogYDxzZWN0aW9uIGNsYXNzPVwiYXBwLXNldHRpbmdzXCI+XG4gIFxuICA8IS0tIDxtYXQtY2FyZD5cbiAgICA8cCBjbGFzcz1cIm1hdC1zdWJoZWFkaW5nLTFcIj5XZWxjb21lIHRvIENsb3VkaW5uIFNldHRpbmdzPC9wPlxuICA8L21hdC1jYXJkPiAtLT5cbiAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgIDxyb3V0ZXItb3V0bGV0Pjwvcm91dGVyLW91dGxldD5cbiAgPC9kaXY+XG48L3NlY3Rpb24+XG5gLFxuICBzdHlsZXM6IFtgI2N1c3RvbS1oZWFkZXJ7cGFkZGluZy10b3A6MTJweDttYXJnaW4tYm90dG9tOjEycHh9LnBhZ2UtdGl0bGUgYXtjb2xvcjojMzMzfS5tYXQtdGFiLW5hdi1iYXIsbWF0LXRhYi1uYXYtYmFye2JvcmRlcjpub25lIWltcG9ydGFudH0udGFicy1iYXIgYXtjb2xvcjojZmZmfWBdXG59KVxuZXhwb3J0IGNsYXNzIEFwcFNjcmVlbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgYXBwOiBhbnkgPSBudWxsO1xuICBtb2R1bGVOYW1lID0gbnVsbDtcbiAgbW9kZWxzID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWc6IFJlZ2lzdHJ5LFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgcHJpdmF0ZSBuYXZpZ2F0b3I6IE5hdmlnYXRvcixcbiAgKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBjb25zdCBwYXJhbXMgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtcztcbiAgICB0aGlzLm1vZHVsZU5hbWUgPSBwYXJhbXNbJ21vZHVsZSddO1xuICAgIHRoaXMuYXBwID0gdGhpcy5yZWcuZ2V0QXBwKHRoaXMubW9kdWxlTmFtZSwgcGFyYW1zWydhcHAnXSk7XG4gICAgdGhpcy5tb2RlbHMgPSB0aGlzLmFwcC5tb2RlbHM7XG5cbiAgICB0aGlzLnJlbmRlclNpZGViYXIoKTtcbiAgICBpZiAoIXRoaXMucm91dGUuZmlyc3RDaGlsZCkge1xuICAgICAgLy8gdGhpcy5yZW5kZXJTaWRlYmFyKCk7XG4gICAgICB0aGlzLm5hdmlnYXRvci5wYXRoLmVtaXQoW3BhcmFtc1snbW9kdWxlJ10sIHBhcmFtc1snYXBwJ10sIHRoaXMubW9kZWxzWzBdLmtleV0pO1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW2AvJHtwYXJhbXNbJ21vZHVsZSddfWAsIHBhcmFtc1snYXBwJ10sIHRoaXMubW9kZWxzWzBdLmtleV0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm5hdmlnYXRvci5wYXRoLmVtaXQoW3BhcmFtc1snbW9kdWxlJ10sIHBhcmFtc1snYXBwJ10sIHRoaXMucm91dGUuZmlyc3RDaGlsZC5zbmFwc2hvdC5wYXJhbXNbJ21vZGVsX25hbWUnXV0pO1xuXG4gICAgLy8gdGhpcy5yb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgLy8gICBjb25zb2xlLmxvZyhyZXMpO1xuICAgIC8vIH0pO1xuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucm91dGUuZmlyc3RDaGlsZC5zbmFwc2hvdC5wYXJhbXMpO1xuXG4gICAgLy8gaWYgKCFwYXJhbXNbJ21vZGVsX25hbWUnXSkge1xuICAgIC8vICAgdGhpcy5yZW5kZXJTaWRlYmFyKCk7XG4gICAgLy8gICAvLyB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbYC8ke3BhcmFtc1snbW9kdWxlJ119YCwgcGFyYW1zWydhcHAnXSwgdGhpcy5tb2RlbHNbMF0ua2V5XSk7XG4gICAgLy8gICByZXR1cm47XG4gICAgLy8gfVxuICB9XG5cbiAgLy8gbmdPbkNoYW5nZXMoKSB7XG4gIC8vICAgdGhpcy5yb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XG4gIC8vICAgICB0aGlzLm1vZHVsZU5hbWUgPSBwYXJhbXNbJ3BhcmVudF9hcHAnXTtcbiAgLy8gICAgIHRoaXMuYXBwID0gdGhpcy5yZWcuZ2V0QXBwKHBhcmFtc1snYXBwJ10pO1xuICAvLyAgICAgdGhpcy5tb2RlbHMgPSB0aGlzLnJlZy5nZXRBcHBNb2RlbHMocGFyYW1zWydhcHAnXSk7XG4gIC8vICAgfSk7XG4gIC8vIH1cbiAgcmVuZGVyU2lkZWJhcigpIHtcbiAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgIGNvbnN0IGl0ZW0gPSB7IHRpdGxlOiB0aGlzLmFwcC5sYWJlbCwgdHlwZTogJ3N1YmhlYWRpbmcnIH07XG4gICAgaXRlbXMucHVzaChpdGVtKTtcbiAgICB0aGlzLm1vZGVscy5mb3JFYWNoKG0gPT4ge1xuICAgICAgY29uc3QgaSA9IHt0aXRsZTogYCR7bS52ZXJib3NlX25hbWV9c2AsIHVybDogYC8ke3RoaXMubW9kdWxlTmFtZX0vJHt0aGlzLmFwcC5rZXl9LyR7bS5rZXl9YCB9O1xuICAgICAgaXRlbXMucHVzaChpKTtcbiAgICB9KTtcbiAgICB0aGlzLm5hdmlnYXRvci5uYXZJdGVtcy5uZXh0KGl0ZW1zKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBcGlTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkgeyB9XG5cbiAgICBwdWJsaWMgZmV0Y2goYXBpOiBzdHJpbmcsIHBhcmFtcz86IGFueSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGxldCBvcHRzID0gbmV3IEh0dHBQYXJhbXMoKTtcbiAgICAgICAgT2JqZWN0LmtleXMocGFyYW1zKS5mb3JFYWNoKHAgPT4ge1xuICAgICAgICAgICAgaWYgKHBhcmFtc1twXSkge1xuICAgICAgICAgICAgICAgIG9wdHMgPSBvcHRzLnNldChwLCBwYXJhbXNbcF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChhcGksIHtwYXJhbXM6IG9wdHN9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcHV0KGFwaTogc3RyaW5nLCBib2R5LCBwYXJhbXMgPSB7fSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGxldCBvcHRzID0gbmV3IEh0dHBQYXJhbXMoKTtcbiAgICAgICAgT2JqZWN0LmtleXMocGFyYW1zKS5mb3JFYWNoKHAgPT4ge1xuICAgICAgICAgICAgaWYgKHBhcmFtc1twXSkge1xuICAgICAgICAgICAgICAgIG9wdHMgPSBvcHRzLnNldChwLCBwYXJhbXNbcF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dChhcGksIGJvZHksIHtwYXJhbXM6IG9wdHN9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcG9zdChhcGk6IHN0cmluZywgYm9keSwgcGFyYW1zID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICBsZXQgb3B0cyA9IG5ldyBIdHRwUGFyYW1zKCk7XG4gICAgICAgIE9iamVjdC5rZXlzKHBhcmFtcykuZm9yRWFjaChwID0+IHtcbiAgICAgICAgICAgIGlmIChwYXJhbXNbcF0pIHtcbiAgICAgICAgICAgICAgICBvcHRzID0gb3B0cy5zZXQocCwgcGFyYW1zW3BdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KGFwaSwgYm9keSwge3BhcmFtczogb3B0c30pO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmFzZUZpZWxkIHtcbiAgbGFiZWw6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDcnVkRmllbGQge1xuICBuYW1lOiBzdHJpbmc7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHZhbGlkYXRvcnM/OiBhbnlbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDcnVkRm9ybSB7XG4gIG5hbWU6IHN0cmluZztcbiAgY29udHJvbHM6IENydWRGaWVsZFtdO1xufVxuXG5leHBvcnQgZW51bSBGaWVsZFR5cGUge1xuICBUZXh0LFxuICBOdW1iZXIsXG4gIERhdGUsXG4gIERhdGVUaW1lLFxuICBUaW1lLFxuICBCb29sZWFuLFxuICBGb3JlaWduS2V5LFxuICBNYW55VG9NYW55LFxuICAvLyBGb3JtU2V0LFxuICBGaWxlLFxufVxuXG5leHBvcnQgY2xhc3MgRmllbGQgaW1wbGVtZW50cyBCYXNlRmllbGQge1xuICBrZXk6IHN0cmluZztcbiAgbGFiZWw6IHN0cmluZztcbiAgdmFsdWVfdHlwZTogc3RyaW5nO1xuICBjb250cm9sX3R5cGU6IHN0cmluZztcbiAgaXNfZWRpdGFibGUgPSB0cnVlO1xuICBpc19zZWFyY2hhYmxlID0gdHJ1ZTtcbiAgaXNfaGlkZGVuID0gZmFsc2U7XG4gIC8vIGZvcmVpZ24ga2V5IGluZm9ybWF0aW9uXG4gIC8vIGZvcmVpZ25fbW9kZWw/OiBhbnkgPSBudWxsOyAvLyBldmFsdWF0ZWQgaW4gcnVuIHRpbWVcbiAgZm9yZWlnbl9tb2RlbF9wYXRoPzogc3RyaW5nO1xuICAvLyBjaG9pY2VzPzogYW55W107XG4gIGZpZWxkczogRmllbGRbXTtcbiAgY2hvaWNlczogYW55O1xuICBjb2xzcGFuID0gMTtcbiAgcm93c3BhbiA9IDE7XG5cbiAgX3ZhbHVlOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgbGFiZWw6IHN0cmluZyxcbiAgICBrZXk6IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgaXNfZWRpdGFibGU/OiBib29sZWFuLFxuICAgIGlzX3NlYXJjaGFibGU/OiBib29sZWFuLFxuICAgIGZvcmVpZ25fbW9kZWw/OiBhbnksXG4gICAgY29sb3JzPzogYW55XG4gICkge1xuICAgIHRoaXMua2V5ID0ga2V5O1xuICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcbiAgICB0aGlzLnZhbHVlX3R5cGUgPSB0eXBlO1xuICAgIHRoaXMuaXNfZWRpdGFibGUgPSBpc19lZGl0YWJsZTtcbiAgICB0aGlzLmlzX3NlYXJjaGFibGUgPSBpc19zZWFyY2hhYmxlO1xuICAgIC8vIHRoaXMuZm9yZWlnbl9tb2RlbCA9IGZvcmVpZ25fbW9kZWw7XG4gIH1cblxufVxuXG5leHBvcnQgY2xhc3MgRmllbGRzZXQgaW1wbGVtZW50cyBCYXNlRmllbGQge1xuICBsYWJlbDogc3RyaW5nO1xuICBpc19maWVsZHNldCA9IHRydWU7XG4gIGZpZWxkczogRmllbGRbXTtcbn1cblxuZXhwb3J0IGNsYXNzIEZvcm1zZXQgaW1wbGVtZW50cyBCYXNlRmllbGQge1xuICBsYWJlbDogc3RyaW5nO1xuICBtb2RlbDogYW55O1xufVxuXG5leHBvcnQgY2xhc3MgQXV0b0NvbXBsZXRlRmllbGQ8VD4gZXh0ZW5kcyBGb3JtQ29udHJvbCB7XG4gIHZhbHVlOiBUO1xuICBsYWJlbCA9ICdzb21lIGxhYmVsJztcbn1cblxuZXhwb3J0IGNsYXNzIERlZmF1bHRDcnVkRm9ybSBpbXBsZW1lbnRzIENydWRGb3JtIHtcbiAgcHVibGljIG5hbWUgPSAnJztcbiAgcHVibGljIGNvbnRyb2xzID0gW107XG5cbiAgY29uc3RydWN0b3IocHVibGljIG1vZGVsOiBhbnkpIHtcbiAgICAgIHRoaXMubmFtZSA9IG1vZGVsLm5hbWU7XG4gICAgICBPYmplY3Qua2V5cyhtb2RlbCkuZm9yRWFjaCh2ID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyh2KTtcbiAgICAgICAgICB0aGlzLmNvbnRyb2xzLnB1c2gobmV3IEZvcm1Db250cm9sKHt9KSk7XG4gICAgICB9KTtcbiAgfVxufSIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgTWF0U25hY2tCYXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbmFjay1iYXInO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlICwgIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVnaXN0cnkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9yZWdpc3RyeS5zZXJ2aWNlJztcblxuXG5pbXBvcnQgeyBGaWVsZFR5cGUsIEZpZWxkIH0gZnJvbSAnLi4vLi4vZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy1jcnVkLW1vZGVsLWZvcm0tc2NyZWVuJyxcbiAgdGVtcGxhdGU6IGA8IS0tIDxtYXQtcHJvZ3Jlc3MtYmFyICpuZ0lmPVwiaXNMb2FkaW5nXCIgbW9kZT1cInF1ZXJ5XCI+PC9tYXQtcHJvZ3Jlc3MtYmFyPiAtLT5cblxuPCEtLTxmb3JtPi0tPlxuPGRpdiBjbGFzcz1cIndyYXBwZXJcIj5cbiAgICA8bWF0LXRvb2xiYXI+XG4gICAgICAgIDxhIHJvdXRlckxpbms9XCIvXCIgbWF0LWljb24tYnV0dG9uIGNsYXNzPVwibWF0LWNhcHRpb25cIj48bWF0LWljb24+aG9tZTwvbWF0LWljb24+PC9hPlxuICAgICAgICA8bWF0LWljb24+a2V5Ym9hcmRfYXJyb3dfcmlnaHQ8L21hdC1pY29uPlxuICAgICAgICA8YSBtYXQtYnV0dG9uIFtyb3V0ZXJMaW5rXT1cIicvJyttb2R1bGUrJy8nK2FwcE5hbWVcIiBjbGFzcz1cIm1hdC1jYXB0aW9uXCI+e3sgYXBwTmFtZSB9fTwvYT5cbiAgICAgICAgPG1hdC1pY29uPmtleWJvYXJkX2Fycm93X3JpZ2h0PC9tYXQtaWNvbj5cbiAgICAgICAgPGEgbWF0LWJ1dHRvbiBjbGFzcz1cIm1hdC1jYXB0aW9uXCIgW3JvdXRlckxpbmtdPVwiJy8nK21vZHVsZSsnLycrYXBwTmFtZSsnLycrbW9kZWxOYW1lXCI+e3sgbW9kZWwudmVyYm9zZV9uYW1lIH19czwvYT5cbiAgICAgICAgPG1hdC1pY29uPmtleWJvYXJkX2Fycm93X3JpZ2h0PC9tYXQtaWNvbj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJtb2RlID09PSAnZWRpdCdcIiBjbGFzcz1cIm1hdC1jYXB0aW9uXCI+e3sgaWQgfX08L3NwYW4+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwibW9kZSA9PT0gJ2NyZWF0ZSdcIiBjbGFzcz1cIm1hdC1jYXB0aW9uXCI+Q3JlYXRpbmcgbmV3IHt7IG1vZGVsTmFtZSB9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ0b29sYmFyLWZpbGwtcmVtYWluaW5nLXNwYWNlXCI+PC9zcGFuPlxuICAgIDwvbWF0LXRvb2xiYXI+XG5cbiAgICA8bWF0LWNhcmQ+XG4gICAgICAgIDxtYXQtY2FyZC1jb250ZW50PlxuICAgICAgICAgICAgPG5nLWNydWQtbW9kZWwtZm9ybSBbbW9kdWxlTmFtZV09XCJtb2R1bGVcIiBbYXBwTmFtZV09XCJhcHBOYW1lXCIgW21vZGVdPSdtb2RlJ1xuICAgICAgICAgICAgICAgIFttb2RlbE5hbWVdPVwibW9kZWxOYW1lXCIgKHN1Ym1pdCk9XCJvblN1Ym1pdCgkZXZlbnQpXCIgW2lkXT1cImlkXCI+PC9uZy1jcnVkLW1vZGVsLWZvcm0+XG4gICAgICAgIDwvbWF0LWNhcmQtY29udGVudD5cbiAgICA8L21hdC1jYXJkPlxuPC9kaXY+YCxcbiAgc3R5bGVzOiBbYC53cmFwcGVyIHtcbiAgICBwYWRkaW5nOiAyNHB4O1xuICB9YF0sXG4gIGV4cG9ydEFzOiAnbmdjcnVkdWktbW9kZWwtZm9ybS1zY3JlZW4nXG59KVxuZXhwb3J0IGNsYXNzIE1vZGVsRm9ybVNjcmVlbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBtb2R1bGU6IHN0cmluZztcbiAgICBhcHBOYW1lOiBzdHJpbmc7XG4gICAgbW9kZWxOYW1lOiBzdHJpbmc7XG4gICAgaWQ6IGFueSA9IG51bGw7XG4gICAgbW9kZSA9ICdjcmVhdGUnO1xuICAgIG5nTW9kZWw6IGFueSA9IHt9O1xuICAgIG1vZGVsOiBhbnk7XG4gICAgZmllbGRUeXBlOiB0eXBlb2YgRmllbGRUeXBlID0gRmllbGRUeXBlO1xuICAgIGVkaXRhYmxlRmllbGRzOiBGaWVsZFtdID0gW107XG4gICAgY2hvaWNlcyA9IHt9O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhcGk6IEFwaVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByZWc6IFJlZ2lzdHJ5LFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBzbmFja2JhcjogTWF0U25hY2tCYXIsXG4gICAgKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMucm91dGUucGFyZW50LnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcbiAgICAgICAgICAgIHRoaXMubW9kdWxlID0gcGFyYW1zWydtb2R1bGUnXTtcbiAgICAgICAgICAgIHRoaXMuYXBwTmFtZSA9IHBhcmFtc1snYXBwJ107XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcbiAgICAgICAgICAgIHRoaXMubW9kZWxOYW1lID0gcGFyYW1zWydtb2RlbF9uYW1lJ107XG4gICAgICAgICAgICB0aGlzLm1vZGVsID0gdGhpcy5yZWcuZ2V0TW9kZWwodGhpcy5tb2R1bGUsIHRoaXMuYXBwTmFtZSwgdGhpcy5tb2RlbE5hbWUpO1xuICAgICAgICAgICAgdGhpcy5pZCA9IHBhcmFtc1snaWQnXTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlkICE9IG51bGwgJiYgdGhpcy5pZCAhPT0gJ25ldycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGUgPSAnZWRpdCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgfVxuXG4gICAgb25TdWJtaXQoZSkge1xuICAgICAgICBsZXQgcmVxOiBPYnNlcnZhYmxlPGFueT4gPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5tb2RlID09PSAnZWRpdCcpIHtcbiAgICAgICAgICAgIHJlcSA9IHRoaXMuYXBpLnB1dCh0aGlzLm1vZGVsLmFwaSArIHRoaXMuaWQgKyAnLycsIGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVxID0gdGhpcy5hcGkucG9zdCh0aGlzLm1vZGVsLmFwaSwgZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVxLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgdGhpcy5zbmFja2Jhci5vcGVuKCdTYXZlZCBTdWNjZXNzZnVsbHknLCAnRGlzbWlzcycpO1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMubW9kdWxlLCB0aGlzLmFwcE5hbWUsIHRoaXMubW9kZWxOYW1lXSk7XG4gICAgICAgIH0sIGVyciA9PiB7XG4gICAgICAgICAgICB0aGlzLnNuYWNrYmFyLm9wZW4oJ0ZhaWxlZCB0byBzYXZlJywgJ0Rpc21pc3MnKTtcbiAgICAgICAgfSk7XG4gICB9XG5cbn1cbiIsImltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi9mb3Jtcyc7XG5cblxuZXhwb3J0IGNsYXNzIE1vZHVsZSB7XG4gICAgbGFiZWw6IHN0cmluZztcbiAgICBhcHBzOiBBcHBbXSA9IFtdO1xufVxuXG5leHBvcnQgY2xhc3MgQXBwIHtcbiAgICBrZXk6IHN0cmluZztcbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIGljb246IHN0cmluZztcbiAgICBtb2RlbHM6IE1vZGVsW10gPSBbXTtcbn1cblxuZXhwb3J0IGNsYXNzIE1vZGVsIHtcbiAgICBrZXk6IHN0cmluZztcbiAgICBhcGk6IHN0cmluZztcbiAgICB2ZXJib3NlX25hbWU6IHN0cmluZztcbiAgICBmaWVsZHM6IEZpZWxkW10gPSBbXTtcbiAgICBmb3Jtc2V0czogRmllbGRbXSA9IFtdO1xuICAgIGV4dGVybmFsX3ZhbHVlX2ZpZWxkOiBzdHJpbmc7XG4gICAgZXh0ZXJuYWxfbmFtZV9maWVsZDogc3RyaW5nO1xuICAgIGxpc3RpbmdfZmllbGRzOiBzdHJpbmdbXTtcblxuICAgIGFjdGlvbnM6IHN0cmluZ1tdID0gW107XG4gICAgYnVsa19hY3Rpb25zOiBzdHJpbmdbXSA9IFtdO1xuICAgIGxpc3RfYWN0aW9uczogc3RyaW5nW10gPSBbXTtcbiAgICBwYWdlU2l6ZTogTnVtYmVyID0gMjA7XG59XG5cbmV4cG9ydCBjbGFzcyBEZWZhdWx0Rm9ybSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIG1vZGVsOiBNb2RlbCkge31cbn1cblxuZXhwb3J0IGNsYXNzIExpc3RpbmdTY3JlZW4ge1xuICAgIG1vZGVsOiBNb2RlbDtcbn1cblxuXG5leHBvcnQgY2xhc3MgRWRpdGluZ1NjcmVlbiB7XG4gICAgbW9kZWw6IE1vZGVsO1xufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wsIEZvcm1BcnJheSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUgLCAgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuLi9mb3Jtcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1TZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgdG9Gb3JtR3JvdXAoZmllbGRzOiBGaWVsZFtdKTogRm9ybUdyb3VwIHtcbiAgICBjb25zdCBjb250cm9scyA9IHt9O1xuICAgIGZvciAoY29uc3QgZmllbGQgb2YgZmllbGRzKSB7XG4gICAgICBpZiAoZmllbGQuY29udHJvbF90eXBlID09PSAnZm9ybXNldCcpIHtcbiAgICAgICAgY29udHJvbHNbZmllbGQua2V5XSA9IHRoaXMudG9Gb3JtQXJyYXkoZmllbGQuZmllbGRzLCBmaWVsZC5fdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29udHJvbHNbZmllbGQua2V5XSA9IG5ldyBGb3JtQ29udHJvbChmaWVsZC5fdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3IEZvcm1Hcm91cChjb250cm9scyk7XG4gIH1cblxuICB0b0Zvcm1BcnJheShmaWVsZHM6IEZpZWxkW10sIHZhbHVlczogYW55W10pIHtcbiAgICBpZiAoIXZhbHVlcykge1xuICAgICAgdmFsdWVzID0gW107XG4gICAgfVxuICAgIGNvbnN0IGdyb3VwczogRm9ybUdyb3VwW10gPSBbXTtcbiAgICB2YWx1ZXMuZm9yRWFjaCh2ID0+IHtcbiAgICAgIC8vIGFzc2lnbiB2YWx1ZSB0byBmaWVsZHNcbiAgICAgIGZpZWxkcy5tYXAoZiA9PiB7XG4gICAgICAgIGYuX3ZhbHVlID0gdltmLmtleV07XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGdyb3VwID0gdGhpcy50b0Zvcm1Hcm91cChmaWVsZHMpO1xuICAgICAgZ3JvdXBzLnB1c2goZyk7XG4gICAgfSk7XG4gICAgLy8gYWx3YXlzIGFkZCBhbiBlbXB0eSByb3dcbiAgICBjb25zdCBnID0gdGhpcy50b0Zvcm1Hcm91cChmaWVsZHMpO1xuICAgIGNvbnN0IGVtcHR5VmFsdWVzID0ge307XG4gICAgZm9yIChjb25zdCBmIG9mIGZpZWxkcykge1xuICAgICAgZW1wdHlWYWx1ZXNbZi5rZXldID0gbnVsbDtcbiAgICB9XG4gICAgZy5zZXRWYWx1ZShlbXB0eVZhbHVlcyk7XG4gICAgZ3JvdXBzLnB1c2goZyk7XG4gICAgcmV0dXJuIG5ldyBGb3JtQXJyYXkoZ3JvdXBzKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uQ2hhbmdlcywgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE1hdFRhYmxlRGF0YVNvdXJjZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYmxlJztcblxuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IFJlZ2lzdHJ5IH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQgeyAgTW9kZWwgfSBmcm9tICcuLi8uLi9zY3JlZW5zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctY3J1ZC1saXN0aW5nJyxcbiAgdGVtcGxhdGU6IGA8IS0tIDxtYXQtdG9vbGJhcj5cbiAgICA8YSByb3V0ZXJMaW5rPVwiL1wiIG1hdC1pY29uLWJ1dHRvbiBjbGFzcz1cIm1hdC1jYXB0aW9uXCI+PG1hdC1pY29uPmhvbWU8L21hdC1pY29uPjwvYT5cbiAgICA8bWF0LWljb24+a2V5Ym9hcmRfYXJyb3dfcmlnaHQ8L21hdC1pY29uPlxuICAgIDxhIG1hdC1idXR0b24gW3JvdXRlckxpbmtdPVwiJy8nK21vZHVsZU5hbWUrJy8nK2FwcE5hbWVcIiBjbGFzcz1cIm1hdC1jYXB0aW9uXCI+e3sgYXBwTmFtZSB9fTwvYT5cbiAgICA8bWF0LWljb24+a2V5Ym9hcmRfYXJyb3dfcmlnaHQ8L21hdC1pY29uPlxuICAgIDxhIG1hdC1idXR0b24gY2xhc3M9XCJtYXQtY2FwdGlvblwiPnt7IG1vZGVsLnZlcmJvc2VfbmFtZSB9fXM8L2E+XG4gICAgPHNwYW4gY2xhc3M9XCJ0b29sYmFyLWZpbGwtcmVtYWluaW5nLXNwYWNlXCI+PC9zcGFuPlxuICAgIDxhIG1hdC1idXR0b24gW3JvdXRlckxpbmtdPVwiJy8nK21vZHVsZU5hbWUrJy8nK2FwcE5hbWUrJy8nK21vZGVsTmFtZSsnL25ldydcIiBjb2xvcj1cInByaW1hcnlcIj5DcmVhdGU8L2E+XG4gICAgJm5ic3A7XG4gICAgPGJ1dHRvbiBtYXQtYnV0dG9uIGNvbG9yPVwid2FyblwiIFttYXRNZW51VHJpZ2dlckZvcl09XCJtZW51XCI+QnVsayBBY3Rpb25zIDxtYXQtaWNvbj5hcnJvd19kcm9wX2Rvd248L21hdC1pY29uPjwvYnV0dG9uPiAgICBcbiAgICA8bWF0LW1lbnUgI21lbnU9XCJtYXRNZW51XCIgPlxuICAgICAgICA8YnV0dG9uIG1hdC1tZW51LWl0ZW0+RGVsZXRlPC9idXR0b24+XG4gICAgPC9tYXQtbWVudT5cbjwvbWF0LXRvb2xiYXI+IC0tPlxuXG48ZGl2IGNsYXNzPVwicm93XCIgKm5nSWY9XCJtb2RlICE9PSAncGljaydcIj5cbiAgICA8c3BhbiBjbGFzcz1cImZpbGwtcmVtYWluaW5nLXNwYWNlXCI+PC9zcGFuPlxuICAgIDxidXR0b24gbWF0LWJ1dHRvbiBjb2xvcj1cIndhcm5cIiBbbWF0TWVudVRyaWdnZXJGb3JdPVwibWVudVwiPkJ1bGsgQWN0aW9ucyA8bWF0LWljb24+YXJyb3dfZHJvcF9kb3duPC9tYXQtaWNvbj48L2J1dHRvbj4gICAgXG4gICAgPG1hdC1tZW51ICNtZW51PVwibWF0TWVudVwiID5cbiAgICAgICAgPGJ1dHRvbiBtYXQtbWVudS1pdGVtPkRlbGV0ZTwvYnV0dG9uPlxuICAgIDwvbWF0LW1lbnU+XG48L2Rpdj5cblxuPG1hdC1leHBhbnNpb24tcGFuZWw+XG4gICAgPG1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyPlxuICAgICAgICA8bWF0LXBhbmVsLXRpdGxlPlxuICAgICAgICAgICAgPG1hdC1pY29uPnNlYXJjaDwvbWF0LWljb24+XG4gICAgICAgIDwvbWF0LXBhbmVsLXRpdGxlPlxuICAgICAgICA8bWF0LXBhbmVsLWRlc2NyaXB0aW9uPlxuICAgICAgICAgICAgU2VhcmNoIGFuZCBmaWx0ZXIgcmVzdHVsdHNcbiAgICAgICAgPC9tYXQtcGFuZWwtZGVzY3JpcHRpb24+ICAgICAgICAgICAgICAgIFxuICAgIDwvbWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXI+XG5cbiAgICA8bmctY3J1ZC1tb2RlbC1mb3JtIFttb2R1bGVOYW1lXT1cIm1vZHVsZU5hbWVcIiBbYXBwTmFtZV09XCJhcHBOYW1lXCIgbW9kZT0nc2VhcmNoJ1xuICAgICAgICAgICAgICAgICBbbW9kZWxOYW1lXT1cIm1vZGVsTmFtZVwiIChzdWJtaXQpPVwib25TZWFyY2goJGV2ZW50KVwiPjwvbmctY3J1ZC1tb2RlbC1mb3JtPlxuXG48L21hdC1leHBhbnNpb24tcGFuZWw+ICAgIFxuXG48bWF0LXByb2dyZXNzLWJhciAqbmdJZj1cImlzTG9hZGluZ1wiIG1vZGU9XCJxdWVyeVwiPjwvbWF0LXByb2dyZXNzLWJhcj5cblxuPG1hdC10YWJsZSBbZGF0YVNvdXJjZV09XCJkYXRhU291cmNlXCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGNvbHVtbnNcIiBbbWF0Q29sdW1uRGVmXT1cImNvbHVtbi5jb2x1bW5EZWZcIj5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImNvbHVtbi5jb2x1bW5EZWYgPT09ICdjaGVja2VkJ1wiPlxuICAgICAgICAgICAgPG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZiAoY2xpY2spPVwib25DaGVja0FsbCgpXCI+PG1hdC1jaGVja2JveD48L21hdC1jaGVja2JveD48L21hdC1oZWFkZXItY2VsbD5cbiAgICAgICAgICAgIDxtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCByb3dcIj4gPG1hdC1jaGVja2JveD48L21hdC1jaGVja2JveD4gPC9tYXQtY2VsbD5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImNvbHVtbi5jb2x1bW5EZWYgIT09ICdjaGVja2VkJyAmJiBjb2x1bW4uY29sdW1uRGVmICE9PSAnYWN0aW9ucydcIj5cbiAgICAgICAgICAgIDxtYXQtaGVhZGVyLWNlbGwgKm1hdEhlYWRlckNlbGxEZWY+e3sgY29sdW1uLmhlYWRlciB9fTwvbWF0LWhlYWRlci1jZWxsPlxuICAgICAgICAgICAgPG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IHJvd1wiPlxuICAgICAgICAgICAgICAgIDwhLS0gPGEgKm5nSWY9XCJjb2x1bW4uY2xpY2thYmxlOyBlbHNlIG5vcm1hbFwiIFtyb3V0ZXJMaW5rXT1cImdldExpbmsocm93LmlkKVwiPnt7IGNvbHVtbi5jZWxsKHJvdykgfX08L2E+XG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNub3JtYWw+e3sgY29sdW1uLmNlbGwocm93KSB9fTwvbmctdGVtcGxhdGU+ICAgICAtLT5cbiAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImNsaWNrYWJsZVwiIFtyb3V0ZXJMaW5rXT1cIltyb3cuaWRdXCIgKm5nSWY9XCIobW9kZSAhPT0gJ3BpY2snICYmIGNvbHVtbi5jb2x1bW5EZWYgPT09IG1vZGVsLmV4dGVybmFsX25hbWVfZmllbGQpOyBlbHNlIG5vcm1hbENlbGxcIj5cbiAgICAgICAgICAgICAgICAgICAge3sgY29sdW1uLmNlbGwocm93KSB9fVxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI25vcm1hbENlbGw+XG4gICAgICAgICAgICAgICAgICAgIHt7IGNvbHVtbi5jZWxsKHJvdykgfX1cbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9tYXQtY2VsbD5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImNvbHVtbi5jb2x1bW5EZWYgPT09ICdhY3Rpb25zJ1wiPlxuICAgICAgICAgICAgPG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZj57eyBjb2x1bW4uaGVhZGVyIH19PC9tYXQtaGVhZGVyLWNlbGw+XG4gICAgICAgICAgICA8bWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgcm93XCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uICpuZ0Zvcj1cImxldCBhY3Rpb24gb2YgbW9kZWwubGlzdF9hY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgICAgIHt7IGFjdGlvbiB9fVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9tYXQtY2VsbD5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9uZy1jb250YWluZXI+XG5cbiAgICA8bWF0LWhlYWRlci1yb3cgKm1hdEhlYWRlclJvd0RlZj1cImRpc3BsYXlDb2x1bW5zXCI+PC9tYXQtaGVhZGVyLXJvdz5cbiAgICA8bWF0LXJvdyAgKm1hdFJvd0RlZj1cImxldCByb3c7IGNvbHVtbnM6IGRpc3BsYXlDb2x1bW5zO1wiIFtuZ0NsYXNzXT1cInsnY2xpY2thYmxlJzogbW9kZSA9PT0gJ3BpY2snfVwiIChjbGljayk9XCJfcGlja2VkKHJvd1t0aGlzLm1vZGVsLmV4dGVybmFsX3ZhbHVlX2ZpZWxkXSlcIj48L21hdC1yb3c+XG48L21hdC10YWJsZT5cblxuPG1hdC1wYWdpbmF0b3IgI3BhZ2luYXRvclxuICAgIFtsZW5ndGhdPVwicmVzdWx0c0NvdW50XCJcbiAgICBbcGFnZUluZGV4XT1cInNlYXJjaFBhcmFtcy5wYWdlIC0gMVwiXG4gICAgW3BhZ2VTaXplXT1cIjIwXCI+XG48L21hdC1wYWdpbmF0b3I+YCxcbiAgc3R5bGVzOiBbYC5jbGlja2FibGV7Y29sb3I6IzAwZjtjdXJzb3I6cG9pbnRlcn1gXSxcbiAgZXhwb3J0QXM6ICduZ2NydWR1aS1saXN0aW5nJ1xufSlcbmV4cG9ydCBjbGFzcyBMaXN0aW5nQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICAgIEBJbnB1dCgnbW9kdWxlTmFtZScpIG1vZHVsZU5hbWU6IHN0cmluZztcbiAgICBASW5wdXQoJ2FwcE5hbWUnKSBhcHBOYW1lOiBzdHJpbmc7XG4gICAgQElucHV0KCdtb2RlbE5hbWUnKSBtb2RlbE5hbWU6IHN0cmluZztcbiAgICBASW5wdXQoKSBtb2RlID0gJ25vcm1hbCc7IC8vIG90aGVyIG1vZGVzOiAncGljaydcbiAgICBpc19hY3Rpb25zX3NldCA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGZvcmNlZFNlYXJjaFBhcmFtczogYW55O1xuICAgIGRhdGFTb3VyY2UgPSBuZXcgTWF0VGFibGVEYXRhU291cmNlKCk7XG4gICAgc2VhcmNoUGFyYW1zID0ge1xuICAgICAgICBwYWdlOiAxLFxuICAgIH07XG4gICAgbW9kZWw6IE1vZGVsO1xuICAgIGNvbHVtbnMgPSBbXTtcbiAgICBkaXNwbGF5Q29sdW1uczogc3RyaW5nW10gPSBbXTtcbiAgICByZXN1bHRzQ291bnQgPSAwO1xuICAgIGlzTG9hZGluZyA9IHRydWU7XG4gICAgQE91dHB1dCgpIHBpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBpOiBBcGlTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcmVnOiBSZWdpc3RyeSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7fVxuXG4gICAgbmdPbkNoYW5nZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLm1vZGVsTmFtZSkge1xuICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZURhdGFUYWJsZSgpO1xuICAgICAgICB9XG4gICB9XG5cbiAgICBwcml2YXRlIHByZXBhcmVDb2x1bW5zKCkge1xuICAgICAgICBpZiAodGhpcy5tb2RlICE9PSAncGljaycpIHtcbiAgICAgICAgICAgIHRoaXMuY29sdW1ucyA9IFt7J2NvbHVtbkRlZic6ICdjaGVja2VkJywgJ2hlYWRlcic6ICcnfV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvbHVtbnMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1vZGVsLmxpc3RpbmdfZmllbGRzLm1hcChmaWVsZCA9PiB7XG4gICAgICAgICAgICBjb25zdCBmID0gdGhpcy5tb2RlbC5maWVsZHMuZmlsdGVyKGZmID0+IGZmLmtleSA9PT0gZmllbGQpWzBdO1xuICAgICAgICAgICAgY29uc3QgY29sID0ge307XG4gICAgICAgICAgICBjb2xbJ2NvbHVtbkRlZiddID0gZi5rZXk7XG4gICAgICAgICAgICBjb2xbJ2hlYWRlciddID0gZi5sYWJlbDtcbiAgICAgICAgICAgIGNvbFsnY2VsbCddID0gKGVsZW1lbnQ6IEVsZW1lbnQpID0+IGAke2VsZW1lbnRbZi5rZXldfWA7XG4gICAgICAgICAgICBpZiAodGhpcy5tb2RlbC5leHRlcm5hbF9uYW1lX2ZpZWxkID09PSBmaWVsZCkge1xuICAgICAgICAgICAgICAgIGNvbFsnY2xpY2thYmxlJ10gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb2x1bW5zLnB1c2goY29sKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLm1vZGUgIT09ICdwaWNrJykge1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5zLnB1c2goeydjb2x1bW5EZWYnOiAnYWN0aW9ucycsICdoZWFkZXInOiAnJ30pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwb3B1bGF0ZURhdGFUYWJsZSgpIHtcbiAgICAgICAgdGhpcy5tb2RlbCA9IHRoaXMucmVnLmdldE1vZGVsKHRoaXMubW9kdWxlTmFtZSwgdGhpcy5hcHBOYW1lLCB0aGlzLm1vZGVsTmFtZSk7XG4gICAgICAgIHRoaXMucHJlcGFyZUNvbHVtbnMoKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5Q29sdW1ucyA9IHRoaXMuY29sdW1ucy5tYXAoYyA9PiBjLmNvbHVtbkRlZik7XG4gICAgICAgIHRoaXMucmVzdWx0c0NvdW50ID0gMDtcbiAgICAgICAgdGhpcy5kYXRhU291cmNlLmRhdGEgPSBbXTtcbiAgICAgICAgLy8gdGhpcy5kaXNwbGF5Q29sdW1ucy5wdXNoKCdhY3Rpb25zJyk7XG4gICAgICAgIHRoaXMuc2VhcmNoUGFyYW1zID0ge3BhZ2U6IDF9O1xuICAgICAgICB0aGlzLmZldGNoKCk7XG4gICAgfVxuXG4gICAgZmV0Y2goKSB7XG4gICAgICAgIHRoaXMuYXBpLmZldGNoKHRoaXMubW9kZWwuYXBpLCB0aGlzLnNlYXJjaFBhcmFtcykuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICBsZXQgbmV3SXRlbXMgPSBbXTtcbiAgICAgICAgICAgIGlmIChyZXMucmVzdWx0cykge1xuICAgICAgICAgICAgICAgIG5ld0l0ZW1zID0gdGhpcy5kYXRhU291cmNlLmRhdGEuY29uY2F0KHJlcy5yZXN1bHRzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3SXRlbXMgPSB0aGlzLmRhdGFTb3VyY2UuZGF0YS5jb25jYXQocmVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmVzdWx0c0NvdW50ID0gbmV3SXRlbXMubGVuZ3RoO1xuICAgICAgICAgICAgdGhpcy5kYXRhU291cmNlLmRhdGEgPSBuZXdJdGVtcztcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH0sIGVyciA9PiB7XG4gICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgIGdldExpbmsoaWQpOiBzdHJpbmdbXSB7XG4gICAgICAgcmV0dXJuIFsnLycsIHRoaXMubW9kdWxlTmFtZSwgdGhpcy5hcHBOYW1lLCB0aGlzLm1vZGVsTmFtZSwgaWRdO1xuICAgfVxuXG4gICBjZWxsQ2xpY2tlZChjb2x1bW5OYW1lOiBzdHJpbmcsIHJvdzogYW55KSB7XG4gICAgICAgaWYgKGNvbHVtbk5hbWUgPT09IHRoaXMubW9kZWwuZXh0ZXJuYWxfbmFtZV9maWVsZCkge1xuICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZSh0aGlzLmdldExpbmsocm93LmlkKSk7XG4gICAgICAgfVxuICAgfVxuXG4gICAgb25TZWFyY2goc2VhcmNoUGFyYW1zKSB7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5kYXRhU291cmNlLmRhdGEgPSBbXTtcbiAgICAgICAgdGhpcy5yZXN1bHRzQ291bnQgPSAwO1xuICAgICAgICB0aGlzLnNlYXJjaFBhcmFtcyA9IHNlYXJjaFBhcmFtcztcbiAgICAgICAgdGhpcy5zZWFyY2hQYXJhbXMucGFnZSA9IDE7XG4gICAgICAgIHRoaXMuZmV0Y2goKTtcbiAgICB9XG5cbiAgICBvbkNoZWNrZWQocm93KSB7XG4gICAgICAgIHJvd1snaXNfY2hlY2tlZCddID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBvbkNoZWNrQWxsKCkge1xuXG4gICAgfVxuXG4gICAgX3BpY2tlZCh2YWx1ZSkge1xuICAgICAgICB0aGlzLnBpY2tlZC5uZXh0KHZhbHVlKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25DaGFuZ2VzLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgRm9ybUdyb3VwLCBGb3JtQnVpbGRlciwgRm9ybUNvbnRyb2wsIEZvcm1BcnJheSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSAsICBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IFJlZ2lzdHJ5IH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4uLy4uL3NjcmVlbnMnO1xuaW1wb3J0IHsgRm9ybVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9mb3JtLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmllbGRUeXBlLCBGaWVsZCwgQXV0b0NvbXBsZXRlRmllbGQgfSBmcm9tICcuLi8uLi9mb3Jtcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLWNydWQtbW9kZWwtZm9ybScsXG4gIHRlbXBsYXRlOiBgPCEtLSA8bWF0LXByb2dyZXNzLWJhciAqbmdJZj1cImlzTG9hZGluZ1wiIG1vZGU9XCJxdWVyeVwiPjwvbWF0LXByb2dyZXNzLWJhcj4gLS0+XG5cbjxuZy10ZW1wbGF0ZSBbbmdJZl09XCJpc19yZWFkeVwiPlxuICAgIDwhLS0gPGRpdiBjbGFzcz1cImZvcm0tY29udGFpbmVyXCI+IC0tPlxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZmllbGQgb2YgZmllbGRzXCI+XG4gICAgICAgICAgICA8bmctY3J1ZC1mb3JtLWZpZWxkICBbZm9ybV09XCJmb3JtXCIgW2ZpZWxkXT1cImZpZWxkXCI+PC9uZy1jcnVkLWZvcm0tZmllbGQ+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PlxuXG5cbiAgICA8ZGl2ICpuZ0Zvcj1cImxldCBmb3JtYXJyYXkgb2YgZm9ybXNldHM7IGxldCBpPWluZGV4XCI+XG4gICAgICAgIDxtYXQtZGl2aWRlcj48L21hdC1kaXZpZGVyPlxuICAgICAgICA8bmctY3J1ZC1mb3Jtc2V0ICBbbW9kZWxdPVwibW9kZWxcIiBbY29uZmlnXT1cIm1vZGVsLmZvcm1zZXRzW2ldXCIgIFtmb3JtYXJyYXldPVwiZm9ybWFycmF5XCIgW2Zvcm1dPVwiZm9ybVwiPjwvbmctY3J1ZC1mb3Jtc2V0PiAgICAgICAgXG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgIDxidXR0b24gbWF0LXJhaXNlZC1idXR0b24gY29sb3I9XCJwcmltYXJ5XCIgY2xhc3M9XCJzdWJtaXQtYnV0dG9uXCIgKGNsaWNrKT1cIl9vblN1Ym1pdCgpXCI+XG4gICAgICAgICAgICA8c3BhbiAqbmdJZj1cIm1vZGUgPT09ICdzZWFyY2gnXCI+U2VhcmNoPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJtb2RlID09PSAnY3JlYXRlJ1wiPkNyZWF0ZTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwibW9kZSA9PT0gJ2VkaXQnXCI+VXBkYXRlPC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbjwvbmctdGVtcGxhdGU+YCxcbiAgc3R5bGVzOiBbYC5yb3d7ZGlzcGxheTpmbGV4O2ZsZXg6MSAxIGF1dG87ZmxleC1mbG93OnJvdyB3cmFwfS5zdWJtaXQtYnV0dG9ue2FsaWduLXNlbGY6ZmxleC1lbmR9YF0sXG4gIGV4cG9ydEFzOiAnbmdjcnVkdWktbW9kZWwtZm9ybSdcbn0pXG5leHBvcnQgY2xhc3MgTW9kZWxGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICAgIEBJbnB1dCgpIG1vZHVsZU5hbWU6IHN0cmluZztcbiAgICBASW5wdXQoKSBhcHBOYW1lOiBzdHJpbmc7XG4gICAgQElucHV0KCkgbW9kZWxOYW1lOiBzdHJpbmc7XG4gICAgQElucHV0KCkgbW9kZSA9ICdzZWFyY2gnO1xuICAgIEBJbnB1dCgpIGlkOiBudW1iZXIgPSBudWxsO1xuICAgIG5nTW9kZWw6IGFueSA9IHt9O1xuICAgIG1vZGVsOiBNb2RlbDtcbiAgICBmaWVsZFR5cGU6IHR5cGVvZiBGaWVsZFR5cGUgPSBGaWVsZFR5cGU7XG4gICAgQXV0b0NvbXBsZXRlRmllbGQ6IHR5cGVvZiBBdXRvQ29tcGxldGVGaWVsZCA9IEF1dG9Db21wbGV0ZUZpZWxkO1xuICAgIGZpZWxkczogRmllbGRbXSA9IFtdO1xuICAgIGNob2ljZXMgPSB7fTtcbiAgICBAT3V0cHV0KCkgc3VibWl0ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgZm9ybTogRm9ybUdyb3VwID0gbmV3IEZvcm1Hcm91cCh7fSk7XG4gICAgZm9ybXNldDogRm9ybUFycmF5ID0gbmV3IEZvcm1BcnJheShbXSk7XG4gICAgZm9ybXNldHM6IEZvcm1BcnJheVtdID0gbmV3IEFycmF5PEZvcm1BcnJheT4oKTtcbiAgICBpc19yZWFkeSA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgYXBpOiBBcGlTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHJlZzogUmVnaXN0cnksXG4gICAgICAgIHByaXZhdGUgZm9ybVNlcnZpY2U6IEZvcm1TZXJ2aWNlLFxuICAgICkge1xuXG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoKSB7XG4gICAgICAgIGlmICghdGhpcy5hcHBOYW1lIHx8ICF0aGlzLm1vZGVsTmFtZSB8fCAhdGhpcy5tb2R1bGVOYW1lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mb3JtID0gdGhpcy5yZWcuZm9ybXNbdGhpcy5tb2RlbE5hbWVdO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmZvcm0pO1xuICAgICAgICAvLyB0aGlzLm1vZGVsID0gdGhpcy5yZWcuZ2V0TW9kZWwodGhpcy5tb2R1bGVOYW1lLCB0aGlzLmFwcE5hbWUsIHRoaXMubW9kZWxOYW1lKTtcbiAgICAgICAgLy8gaWYgKHRoaXMubW9kZSA9PT0gJ3NlYXJjaCcpIHtcbiAgICAgICAgLy8gICAgIHRoaXMuZmllbGRzID0gdGhpcy5tb2RlbC5maWVsZHMuZmlsdGVyKChmOiBGaWVsZCkgPT4gIShmLmlzX3NlYXJjaGFibGUgPT09IGZhbHNlKSk7XG4gICAgICAgIC8vICAgICB0aGlzLmJ1aWxkRm9ybShudWxsKTtcbiAgICAgICAgLy8gfSBlbHNlIGlmICh0aGlzLm1vZGUgPT09ICdlZGl0Jykge1xuICAgICAgICAvLyAgICAgLy8gZWRpdCBtb2RlXG4gICAgICAgIC8vICAgICBjb25zdCBhcGkgPSBgJHt0aGlzLm1vZGVsLmFwaX0ke3RoaXMuaWR9L2A7XG4gICAgICAgIC8vICAgICAvLyByZW1vdmUgdGhlIHVuZWRpdGFibGUgZmllbGRzXG4gICAgICAgIC8vICAgICB0aGlzLmZpZWxkcyA9IHRoaXMubW9kZWwuZmllbGRzLmZpbHRlcihmID0+IHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gIShmLmlzX2VkaXRhYmxlID09PSBmYWxzZSk7XG4gICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgLy8gICAgIHRoaXMuYXBpLmZldGNoKGFwaSwge30pLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuYnVpbGRGb3JtKHJlcyk7XG4gICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgLy8gICAgIHRoaXMuYnVpbGRGb3JtKG51bGwpO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgLy8gLy8gaWYgKHRoaXMubW9kZWwuZm9ybV90eXBlID09PSAnZm9ybXNldCcpIHtcbiAgICAgICAgLy8gLy8gICAgIHRoaXMuZm9ybXNldCA9IHRoaXMuZm9ybVNlcnZpY2UudG9Gb3JtQXJyYXkodGhpcy5maWVsZHMsIFtdKTtcbiAgICAgICAgLy8gLy8gfSBlbHNlIHtcbiAgICAgICAgLy8gLy8gICAgIHRoaXMuZm9ybSA9IHRoaXMuZm9ybVNlcnZpY2UudG9Gb3JtR3JvdXAodGhpcy5maWVsZHMpO1xuICAgICAgICAvLyAvLyB9XG4gICAgfVxuXG4gICAgX29uU3VibWl0KCkge1xuICAgICAgICB0aGlzLnN1Ym1pdC5lbWl0KHRoaXMuZm9ybS52YWx1ZSk7XG4gICAgfVxuXG4gICAgYnVpbGRGb3JtKHZhbHVlczogYW55KSB7XG4gICAgICAgIGlmICh2YWx1ZXMgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZmllbGRzLm1hcChmID0+IHtcbiAgICAgICAgICAgICAgICBmLl92YWx1ZSA9IHZhbHVlc1tmLmtleV07XG4gICAgICAgICAgICAgICAgcmV0dXJuIGY7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZvcm0gPSB0aGlzLmZvcm1TZXJ2aWNlLnRvRm9ybUdyb3VwKHRoaXMuZmllbGRzKTtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIG1vZGVsIGhhcyBmb3Jtc2V0cywgcmVuZGVyIHRoZW0gYmVuZWF0aCB0aGUgbWFpbiBmb3JtXG4gICAgICAgIGlmICh0aGlzLm1vZGUgIT09ICdzZWFyY2gnICYmIHRoaXMubW9kZWwuZm9ybXNldHMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZm9ybXNldCBvZiB0aGlzLm1vZGVsLmZvcm1zZXRzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZnMgPSB0aGlzLmZvcm1TZXJ2aWNlLnRvRm9ybUFycmF5KGZvcm1zZXQuZmllbGRzLCB2YWx1ZXNbZm9ybXNldC5rZXldKTtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm1zZXRzLnB1c2goZnMpO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9ybS5hZGRDb250cm9sKGZvcm1zZXQua2V5LCBmcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc19yZWFkeSA9IHRydWU7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSAsIFJvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE1BVF9ESUFMT0dfREFUQSwgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcblxuaW1wb3J0IHsgUmVnaXN0cnkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9yZWdpc3RyeS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHRlbXBsYXRlOiBgPHNlY3Rpb24gY2xhc3M9XCJhcHAtc2V0dGluZ3NcIiAqbmdJZj1cIm1vZGVsTmFtZVwiPlxuXG4gIDxuZy1jcnVkLWxpc3RpbmcgKHBpY2tlZCk9XCJwaWNrZWQoJGV2ZW50KVwiIFttb2RlbE5hbWVdPVwibW9kZWxOYW1lXCIgW2FwcE5hbWVdPVwiYXBwTmFtZVwiIFttb2R1bGVOYW1lXT1cIm1vZHVsZU5hbWVcIiBtb2RlPVwicGlja1wiPlxuXG4gIDwvbmctY3J1ZC1saXN0aW5nPlxuPC9zZWN0aW9uPmAsXG4gIHN0eWxlczogW2AjY3VzdG9tLWhlYWRlcntwYWRkaW5nLXRvcDoxMnB4O21hcmdpbi1ib3R0b206MTJweH0ucGFnZS10aXRsZSBhe2NvbG9yOiMzMzN9Lm1hdC10YWItbmF2LWJhcixtYXQtdGFiLW5hdi1iYXJ7Ym9yZGVyOm5vbmUhaW1wb3J0YW50fS50YWJzLWJhciBhe2NvbG9yOiNmZmZ9YF1cbn0pXG5leHBvcnQgY2xhc3MgTGlzdGluZ0RpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBtb2R1bGVOYW1lOiBzdHJpbmc7XG4gICAgYXBwTmFtZTogc3RyaW5nO1xuICAgIG1vZGVsTmFtZTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIHJlZzogUmVnaXN0cnksXG4gICAgICBwcml2YXRlIHJlZjogTWF0RGlhbG9nUmVmPExpc3RpbmdEaWFsb2dDb21wb25lbnQ+LFxuICAgICAgQEluamVjdChNQVRfRElBTE9HX0RBVEEpIHB1YmxpYyBkYXRhOiBhbnksXG4gICAgKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICB0aGlzLm1vZHVsZU5hbWUgPSB0aGlzLmRhdGFbJ21vZHVsZU5hbWUnXTtcbiAgICAgIHRoaXMuYXBwTmFtZSA9IHRoaXMuZGF0YVsnYXBwTmFtZSddO1xuICAgICAgdGhpcy5tb2RlbE5hbWUgPSB0aGlzLmRhdGFbJ21vZGVsTmFtZSddO1xuICAgIH1cblxuICAgIHBpY2tlZCh2YWx1ZSkge1xuICAgICAgY29uc29sZS5sb2coJ3BpY2tlZCcsIHZhbHVlKTtcbiAgICAgIHRoaXMucmVmLmNsb3NlKHZhbHVlKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25DaGFuZ2VzLCBJbnB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHN0YXJ0V2l0aCwgZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWF0RGlhbG9nIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcblxuaW1wb3J0IHsgIE1vZGVsIH0gZnJvbSAnLi4vLi4vc2NyZWVucyc7XG5pbXBvcnQgeyBSZWdpc3RyeSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3JlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi4vLi4vZm9ybXMnO1xuaW1wb3J0IHsgTGlzdGluZ0RpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvbnRhaW5lcnMvbGlzdGluZy1kaWFsb2cvbGlzdGluZy1kaWFsb2cuY29tcG9uZW50JztcblxubGV0IENIT0lDRVMgPSBbXTtcbmxldCBGT1JFSUdOX01PREVMO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy1jcnVkLWZvcm0tZmllbGQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgW25nU3dpdGNoXT1cImZpZWxkLmNvbnRyb2xfdHlwZVwiIGNsYXNzPVwiZm9ybS1maWVsZC13cmFwcGVyXCIgW2Zvcm1Hcm91cF09XCJmb3JtXCI+XG5cbiAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInc3dpdGNoJ1wiPlxuICAgICAgICA8bWF0LXNsaWRlLXRvZ2dsZSBtYXRJbnB1dCBbZm9ybUNvbnRyb2xOYW1lXT1cImZpZWxkLmtleVwiPnt7IGZpZWxkLmxhYmVsIH19PC9tYXQtc2xpZGUtdG9nZ2xlPlxuICAgIDwvZGl2PlxuXG4gICAgPG1hdC1mb3JtLWZpZWxkICpuZ1N3aXRjaENhc2U9XCIndGV4dGFyZWEnXCI+XG4gICAgICAgIDxtYXQtbGFiZWw+e3sgZmllbGQubGFiZWwgfX08L21hdC1sYWJlbD5cbiAgICAgICAgPHRleHRhcmVhIG1hdElucHV0IG1hdFRleHRhcmVhQXV0b3NpemUgW2Zvcm1Db250cm9sTmFtZV09XCJmaWVsZC5rZXlcIlxuICAgICAgICAgICAgW3Jvd3NdPVwiZmllbGQucm93c3BhbiB8fCAxXCI+PC90ZXh0YXJlYT5cbiAgICA8L21hdC1mb3JtLWZpZWxkPlxuXG4gICAgPG1hdC1mb3JtLWZpZWxkICpuZ1N3aXRjaENhc2U9XCInc2VsZWN0J1wiPlxuICAgICAgICA8bWF0LWxhYmVsPnt7IGZpZWxkLmxhYmVsIH19PC9tYXQtbGFiZWw+XG4gICAgICAgIDxtYXQtc2VsZWN0IFtmb3JtQ29udHJvbE5hbWVdPVwiZmllbGQua2V5XCI+XG4gICAgICAgICAgICA8bWF0LW9wdGlvbj48L21hdC1vcHRpb24+XG4gICAgICAgICAgICA8bWF0LW9wdGlvbiBbdmFsdWVdPVwiYy52YWx1ZVwiICpuZ0Zvcj1cImxldCBjIG9mIGZpZWxkLmNob2ljZXNcIj5cbiAgICAgICAgICAgICAgICB7eyBjLmxhYmVsIH19XG4gICAgICAgICAgICA8L21hdC1vcHRpb24+XG4gICAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICA8L21hdC1mb3JtLWZpZWxkPlxuXG4gICAgPG1hdC1mb3JtLWZpZWxkICpuZ1N3aXRjaENhc2U9XCInZGF0ZSdcIj5cbiAgICAgICAgPG1hdC1sYWJlbD57eyBmaWVsZC5sYWJlbCB9fTwvbWF0LWxhYmVsPlxuICAgICAgICA8aW5wdXQgIG1hdElucHV0IFtmb3JtQ29udHJvbE5hbWVdPVwiZmllbGQua2V5XCIgIFttYXREYXRlcGlja2VyXT1cIm15RGF0ZXBpY2tlclwiIC8+XG4gICAgICAgIDxtYXQtZGF0ZXBpY2tlci10b2dnbGUgbWF0U3VmZml4IFtmb3JdPVwibXlEYXRlcGlja2VyXCI+PC9tYXQtZGF0ZXBpY2tlci10b2dnbGU+XG4gICAgICAgIDxtYXQtZGF0ZXBpY2tlciAjbXlEYXRlcGlja2VyPjwvbWF0LWRhdGVwaWNrZXI+XG4gICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICBcbiAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCInZm9yZWlnbl9rZXknXCI+XG4gICAgICAgIDxtYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgIDxtYXQtbGFiZWw+e3sgZmllbGQubGFiZWwgfX08L21hdC1sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG1hdElucHV0IFtmb3JtQ29udHJvbE5hbWVdPVwiZmllbGQua2V5XCIgW21hdEF1dG9jb21wbGV0ZV09XCJhdXRvXCI+XG4gICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgIDwhLS0gPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gKGNsaWNrKT1cIm9wZW5MaXN0aW5nRGlhbG9nKClcIj48bWF0LWljb24+c2VhcmNoPC9tYXQtaWNvbj48L2J1dHRvbj4gLS0+XG4gICAgICAgIFxuICAgICAgICA8bWF0LWF1dG9jb21wbGV0ZSAjYXV0bz1cIm1hdEF1dG9jb21wbGV0ZVwiIFtkaXNwbGF5V2l0aF09XCJkaXNwbGF5Rm5cIj5cbiAgICAgICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgZmlsdGVyZWRPcHRpb25zIHwgYXN5bmNcIiBbdmFsdWVdPVwib3B0aW9uW2ZvcmVpZ25fbW9kZWwuZXh0ZXJuYWxfdmFsdWVfZmllbGRdXCI+XG4gICAgICAgICAgICAgICAge3sgb3B0aW9uW2ZvcmVpZ25fbW9kZWwuZXh0ZXJuYWxfbmFtZV9maWVsZF0gfX1cbiAgICAgICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgICAgPC9tYXQtYXV0b2NvbXBsZXRlPlxuICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgPCEtLSB0aGlzIGZhbGxzYmFjayBmcm9tIG51bWJlciBhbmQgdGV4dCAtLT5cbiAgICA8bWF0LWZvcm0tZmllbGQgKm5nU3dpdGNoRGVmYXVsdD5cbiAgICAgICAgPG1hdC1sYWJlbD57eyBmaWVsZC5sYWJlbCB9fTwvbWF0LWxhYmVsPlxuICAgICAgICA8aW5wdXQgIG1hdElucHV0IFtmb3JtQ29udHJvbE5hbWVdPVwiZmllbGQua2V5XCJcbiAgICAgICAgICAgICAgICBbdHlwZV09XCJmaWVsZC5jb250cm9sX3R5cGUgfHwgZmllbGQudmFsdWVfdHlwZSB8fCAndGV4dCdcIiAvPlxuICAgIDwvbWF0LWZvcm0tZmllbGQ+XG5cbjwvZGl2PmAsXG4gIGV4cG9ydEFzOiAnbmdjcnVkdWktZm9ybS1maWVsZCcsXG4gIHN0eWxlczogWycuZm9ybS1maWVsZC13cmFwcGVye21hcmdpbi1yaWdodDogIDI0cHh9J11cbn0pXG5leHBvcnQgY2xhc3MgRm9ybUZpZWxkQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICBASW5wdXQoKSBmb3JtOiBBYnN0cmFjdENvbnRyb2w7XG4gIEBJbnB1dCgpIGZvcmNlZFNlYXJjaFBhcmFtczogYW55ID0gW107XG4gIEBJbnB1dCgpIGZpZWxkOiBGaWVsZDtcbiAgQElucHV0KCkgY2hvaWNlcztcbiAgZmlsdGVyZWRPcHRpb25zOiBPYnNlcnZhYmxlPGFueVtdPjtcbiAgZm9yZWlnbl9tb2RlbD86IE1vZGVsO1xuICBwcml2YXRlIG1vZGVsUGF0aDogc3RyaW5nW10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRpYWxvZzogTWF0RGlhbG9nLCBwcml2YXRlIGFwaTogQXBpU2VydmljZSwgcHJpdmF0ZSByZWc6IFJlZ2lzdHJ5KSB7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKHRoaXMuZmllbGQuY29udHJvbF90eXBlID09PSAnZm9yZWlnbl9rZXknKSB7XG4gICAgICBjb25zb2xlLmxvZygnZmlyc3QgY2hhbmdlJywgdGhpcy5jaG9pY2VzKTtcbiAgICAgIGNvbnN0IHBhdGggPSB0aGlzLmZpZWxkLmZvcmVpZ25fbW9kZWxfcGF0aC5zcGxpdCgnLicpO1xuICAgICAgdGhpcy5tb2RlbFBhdGggPSBwYXRoO1xuICAgICAgdGhpcy5mb3JlaWduX21vZGVsID0gdGhpcy5yZWcuZ2V0TW9kZWwocGF0aFswXSwgcGF0aFsxXSwgcGF0aFsyXSk7XG4gICAgICBGT1JFSUdOX01PREVMID0gdGhpcy5mb3JlaWduX21vZGVsO1xuICAgICAgaWYgKHRoaXMuY2hvaWNlcykge1xuICAgICAgICBjb25zb2xlLmxvZygnZm91bmQgY2hvaWNlcycpO1xuICAgICAgICB0aGlzLmZpbHRlcmVkT3B0aW9ucyA9IG9mKHRoaXMuY2hvaWNlcyk7XG4gICAgICB9XG4gICAgICAvLyB0aGlzLmFwaS5mZXRjaChgJHt0aGlzLmZvcmVpZ25fbW9kZWwuYXBpfWAsIFtdKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgIC8vICAgdGhpcy5jaG9pY2VzID0gcmVzO1xuICAgICAgLy8gICBDSE9JQ0VTID0gcmVzO1xuICAgICAgLy8gfSk7XG4gICAgICBjb25zdCBjdHJsID0gdGhpcy5mb3JtLmdldCh0aGlzLmZpZWxkLmtleSk7XG4gICAgICB0aGlzLmZpbHRlcmVkT3B0aW9ucyA9IGN0cmwudmFsdWVDaGFuZ2VzLnBpcGUoXG4gICAgICAgIHN0YXJ0V2l0aCgnJyksXG4gICAgICAgIGRlYm91bmNlVGltZSgyMDApLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgICBzd2l0Y2hNYXAodmFsID0+IHRoaXMuX2ZpbHRlcih2YWwgfHwgbnVsbCkpXG4gICAgICApO1xuICAgICAgLy8gaWYgKHRoaXMuZm9ybS52YWx1ZVt0aGlzLmZpZWxkLmtleV0pIHtcbiAgICAgIC8vICAgY29uc29sZS5sb2coJ3NldHRpbmcgY3RybCB2YWx1ZScsIHRoaXMuZm9ybS52YWx1ZVt0aGlzLmZpZWxkLmtleV0pO1xuICAgICAgLy8gICBjdHJsLnNldFZhbHVlKHRoaXMuZm9ybS52YWx1ZVt0aGlzLmZpZWxkLmtleV0pO1xuICAgICAgLy8gfVxuICAgIH1cbiAgfVxuXG4gIGdldEZvcm1Db250cm9sKGZpZWxkX25hbWU6IHN0cmluZyk6IEZvcm1Db250cm9sIHtcbiAgICByZXR1cm4gdGhpcy5mb3JtLmdldChmaWVsZF9uYW1lKSBhcyBGb3JtQ29udHJvbDtcbiAgfVxuXG4gIGRpc3BsYXlGbihvcHRpb24pIHtcbiAgICBmb3IgKGNvbnN0IGMgb2YgQ0hPSUNFUykge1xuICAgICAgaWYgKGNbJ2lkJ10gPT09IG9wdGlvbikge1xuICAgICAgICByZXR1cm4gY1tGT1JFSUdOX01PREVMWydleHRlcm5hbF9uYW1lX2ZpZWxkJ11dO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyByZXR1cm4gb3B0aW9uID8gb3B0aW9uLmNvZGUgOiBvcHRpb247XG4gIH1cblxuICBfZmlsdGVyKHZhbHVlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueVtdPiB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgpO1xuICAgIH1cbiAgICBjb25zdCBmaWx0ZXJWYWx1ZSA9IHZhbHVlID8gdmFsdWUudG9Mb3dlckNhc2UoKSA6IG51bGw7XG4gICAgY29uc3QgcGFyYW1zID0ge307XG4gICAgcGFyYW1zW3RoaXMuZm9yZWlnbl9tb2RlbC5leHRlcm5hbF9uYW1lX2ZpZWxkXSA9IGZpbHRlclZhbHVlO1xuICAgIHJldHVybiB0aGlzLmFwaS5mZXRjaChgJHt0aGlzLmZvcmVpZ25fbW9kZWwuYXBpfWAsIHBhcmFtcykucGlwZShcbiAgICAgIG1hcChyZXMgPT4ge1xuICAgICAgICAgIENIT0lDRVMgPSByZXM7XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH0pXG4gICAgKTtcbiAgICAvLyByZXR1cm4gdGhpcy5jaG9pY2VzLmZpbHRlcihvcHRpb24gPT4gb3B0aW9uLmNvZGUudG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlclZhbHVlKSA9PT0gMCk7XG4gIH1cblxuICBvcGVuTGlzdGluZ0RpYWxvZygpIHtcbiAgICBjb25zdCByZWYgPSB0aGlzLmRpYWxvZy5vcGVuKExpc3RpbmdEaWFsb2dDb21wb25lbnQsIHtcbiAgICAgIHdpZHRoOiAnOTAlJyxcbiAgICAgIGhlaWdodDogJzkwJScsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIG1vZHVsZU5hbWU6IHRoaXMubW9kZWxQYXRoWzBdLFxuICAgICAgICBhcHBOYW1lOiB0aGlzLm1vZGVsUGF0aFsxXSxcbiAgICAgICAgbW9kZWxOYW1lOiB0aGlzLm1vZGVsUGF0aFsyXVxuICAgICAgfVxuICAgIH0pO1xuICAgIHJlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICB0aGlzLmZvcm0uZ2V0KHRoaXMuZmllbGQua2V5KS5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25DaGFuZ2VzLCBJbnB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQXJyYXkgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7ICBNb2RlbCB9IGZyb20gJy4uLy4uL3NjcmVlbnMnO1xuaW1wb3J0IHsgUmVnaXN0cnkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9yZWdpc3RyeS5zZXJ2aWNlJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBGb3JtU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2Zvcm0uc2VydmljZSc7XG5pbXBvcnQgeyBGaWVsZCB9IGZyb20gJy4uLy4uL2Zvcm1zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctY3J1ZC1mb3Jtc2V0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IFtmb3JtR3JvdXBdPVwiZm9ybVwiICpuZ0lmPVwiZm9ybWFycmF5XCIgY2xhc3M9XCJmb3Jtc2V0XCI+XG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICA8aDQ+IHt7IGNvbmZpZy5sYWJlbCB9fTwvaDQ+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwic3BhY2VyXCI+PC9zcGFuPlxuICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiAoY2xpY2spPVwiYWRkRm9ybSgpXCI+XG4gICAgICAgICAgICA8bWF0LWljb24+YWRkX2NpcmNsZTwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgW2Zvcm1BcnJheU5hbWVdPVwiY29uZmlnLmtleVwiPlxuICAgICAgICA8bWF0LWdyaWQtbGlzdCBndXR0ZXJTaXplPVwiMTJcIiBbY29sc109XCJjb25maWcuZmllbGRzLmxlbmd0aFwiIHJvd0hlaWdodD1cIjYwXCIgICpuZ0Zvcj1cImxldCBjdHJsIG9mIGZvcm1hcnJheS5jb250cm9sczsgbGV0IGk9aW5kZXhcIiBbZm9ybUdyb3VwTmFtZV09XCJpXCI+XG4gICAgICAgICAgICA8bWF0LWdyaWQtdGlsZSAgKm5nRm9yPVwibGV0IGYgb2YgY29uZmlnLmZpZWxkc1wiPlxuICAgICAgICAgICAgICAgIHt7IGYuIGtleSB9fVxuICAgICAgICAgICAgICAgIDxuZy1jcnVkLWZvcm0tZmllbGQgW2Nob2ljZXNdPVwiY2hvaWNlc1tmLmtleV1cIiBbZm9ybV09XCJjdHJsXCIgW2ZpZWxkXT1cImZcIj48L25nLWNydWQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgIDwvbWF0LWdyaWQtdGlsZT5cbiAgICAgICAgPC9tYXQtZ3JpZC1saXN0PlxuICAgIDwvZGl2PlxuPC9kaXY+YCxcbiAgc3R5bGVzOiBbYC5mb3Jtc2V0e3BhZGRpbmctdG9wOjEycHh9LnJvd3tkaXNwbGF5OmZsZXg7ZmxleDoxIDEgYXV0b30uc3BhY2Vye2ZsZXg6MSAxIGF1dG99YF0sXG4gIGV4cG9ydEFzOiAnbmdjcnVkdWktZm9ybXNldCdcbn0pXG5leHBvcnQgY2xhc3MgRm9ybXNldENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KCkgZm9ybTogRm9ybUdyb3VwO1xuICBASW5wdXQoKSBtb2RlbDogTW9kZWw7XG4gIEBJbnB1dCgpIGZvcm1hcnJheTogRm9ybUFycmF5O1xuICBASW5wdXQoKSBjb25maWc6IEZpZWxkO1xuICBjaG9pY2VzID0ge307XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhcGk6IEFwaVNlcnZpY2UsIHByaXZhdGUgcmVnOiBSZWdpc3RyeSwgcHJpdmF0ZSBmb3JtU2VydmljZTogRm9ybVNlcnZpY2UpIHtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5jb25maWcuZmlyc3RDaGFuZ2UpIHtcbiAgICAgIGZvciAoY29uc3QgZmllbGQgb2YgY2hhbmdlcy5jb25maWcuY3VycmVudFZhbHVlLmZpZWxkcykge1xuICAgICAgICBpZiAoZmllbGRbJ2NvbnRyb2xfdHlwZSddID09PSAnZm9yZWlnbl9rZXknKSB7XG4gICAgICAgICAgdGhpcy5nZXRDaG9pY2VzKGZpZWxkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFkZEZvcm0oKSB7XG4gICAgY29uc3QgY3RybCA9IHRoaXMuZm9ybVNlcnZpY2UudG9Gb3JtR3JvdXAodGhpcy5jb25maWcuZmllbGRzKTtcbiAgICB0aGlzLmZvcm1hcnJheS5wdXNoKGN0cmwpO1xuICB9XG5cbiAgZ2V0Q2hvaWNlcyhmaWVsZDogRmllbGQpIHtcbiAgICBjb25zdCBwYXRoID0gZmllbGQuZm9yZWlnbl9tb2RlbF9wYXRoLnNwbGl0KCcuJyk7XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLnJlZy5nZXRNb2RlbChwYXRoWzBdLCBwYXRoWzFdLCBwYXRoWzJdKTtcbiAgICB0aGlzLmFwaS5mZXRjaChtb2RlbC5hcGksIHt9KS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgIHRoaXMuY2hvaWNlc1tmaWVsZC5rZXldID0gcmVzO1xuICAgICAgY29uc29sZS5sb2codGhpcy5jaG9pY2VzKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkNoYW5nZXMsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgYXMgb2JzZXJ2YWJsZU9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzdGFydFdpdGgsIG1hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyAgTW9kZWwgfSBmcm9tICcuLi8uLi9zY3JlZW5zJztcbmltcG9ydCB7IFJlZ2lzdHJ5IH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuLi8uLi9mb3Jtcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLWNydWQtYXV0b2NvbXBsZXRlJyxcbiAgdGVtcGxhdGU6IGA8bWF0LWZvcm0tZmllbGQgW2Zvcm1Hcm91cF09XCJmb3JtXCI+XG4gIDxpbnB1dCB0eXBlPVwidGV4dFwiIG1hdElucHV0IFtwbGFjZWhvbGRlcl09XCJmaWVsZC5sYWJlbFwiIFtmb3JtQ29udHJvbF09XCJjdHJsXCIgW21hdEF1dG9jb21wbGV0ZV09XCJhdXRvXCI+XG4gIDxtYXQtYXV0b2NvbXBsZXRlICNhdXRvPVwibWF0QXV0b2NvbXBsZXRlXCIgW2Rpc3BsYXlXaXRoXT1cImRpc3BsYXlXaXRoKGZvcmVpZ25fbW9kZWwpXCI+XG4gICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgYyBvZiBmaWx0ZXJlZE9wdGlvbnMgfCBhc3luY1wiIFt2YWx1ZV09XCJjW2ZvcmVpZ25fbW9kZWwuZXh0ZXJuYWxfdmFsdWVfZmllbGRdXCI+XG4gICAgICAgIHt7IGNbZm9yZWlnbl9tb2RlbC5leHRlcm5hbF9uYW1lX2ZpZWxkXSB9fVxuICAgICAgPC9tYXQtb3B0aW9uPlxuICAgIDwvbWF0LWF1dG9jb21wbGV0ZT5cbjwvbWF0LWZvcm0tZmllbGQ+YCxcbiAgZXhwb3J0QXM6ICduZ2NydWR1aS1hdXRvY29tcGxldGUnXG59KVxuZXhwb3J0IGNsYXNzIEF1dG9Db21wbGV0ZUZpZWxkQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICBASW5wdXQoKSBtb2RlbDogTW9kZWw7XG4gIEBJbnB1dCgpIGZpZWxkOiBGaWVsZDtcbiAgQElucHV0KCkgZm9yZWlnbl9tb2RlbDogTW9kZWw7XG4gIEBJbnB1dCgpIGZvcm06IEZvcm1Hcm91cDtcbiAgQElucHV0KCkgY2hvaWNlczogYW55W10gPSBbXTtcbiAgQElucHV0KCkgZm9yY2VkU2VhcmNoUGFyYW1zOiBhbnk7XG4gIGRhdGFTb3VyY2U6IGFueVtdID0gbmV3IEFycmF5KCk7XG4gIHNlYXJjaFBhcmFtczoge307XG4gIGZpbHRlcmVkT3B0aW9uczogT2JzZXJ2YWJsZTxhbnlbXT47XG4gIGN0cmw6IEZvcm1Db250cm9sO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBpOiBBcGlTZXJ2aWNlLCBwcml2YXRlIHJlZzogUmVnaXN0cnkpIHtcbiAgfVxuXG4gICBuZ09uQ2hhbmdlcygpIHtcbiAgICAgaWYgKCF0aGlzLmZvcmVpZ25fbW9kZWwpIHtcbiAgICAgICByZXR1cm47XG4gICAgIH1cbiAgICAgIHRoaXMuc2VhcmNoUGFyYW1zID0ge3BhZ2U6IDF9O1xuICAgICAgdGhpcy5jdHJsID0gdGhpcy5mb3JtLmdldCh0aGlzLmZpZWxkLmtleSkgYXMgRm9ybUNvbnRyb2w7XG4gICAgICBjb25zb2xlLmxvZygnZm9yZWlnbiBrZXkgdmFsdWUnLCB0aGlzLmN0cmwudmFsdWUpO1xuICAgICAgdGhpcy5maWx0ZXJlZE9wdGlvbnMgPSBvYnNlcnZhYmxlT2YodGhpcy5jaG9pY2VzKTtcbiAgICAgIHRoaXMuZmlsdGVyZWRPcHRpb25zID0gdGhpcy5jdHJsLnZhbHVlQ2hhbmdlcy5waXBlKFxuICAgICAgICBzdGFydFdpdGgoJycpLFxuICAgICAgICBtYXAoKHZhbDogc3RyaW5nKSA9PiB0aGlzLmZpbHRlcih2YWwpKVxuICAgICAgKTtcbiAgICAgIC8vIHRoaXMuYXBpLmZldGNoKHRoaXMubW9kZWwuYXBpLCB0aGlzLnNlYXJjaFBhcmFtcykuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAvLyAgIHRoaXMuZGF0YVNvdXJjZS5wdXNoKHJlc1sncmVzdWx0cyddKTtcbiAgICAgIC8vIH0pO1xuICAgfVxuXG4gICBmaWx0ZXIodGV4dDogc3RyaW5nKTogYW55W10ge1xuICAgIHJldHVybiB0aGlzLmNob2ljZXMuZmlsdGVyKG9wdGlvbiA9PiB7XG4gICAgICBjb25zb2xlLmxvZyh0ZXh0KTtcbiAgICAgIGNvbnN0IHZhbCA9IG9wdGlvblt0aGlzLmZvcmVpZ25fbW9kZWwuZXh0ZXJuYWxfbmFtZV9maWVsZF07XG4gICAgICByZXR1cm4gdmFsID8gdmFsLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0ZXh0LnRvTG93ZXJDYXNlKCkpID09PSAwIDogZmFsc2U7XG4gICAgfSk7XG4gICB9XG5cbiAgIHZhbHVlRm9ybWF0dGVyKGRhdGE6IGFueSk6IHN0cmluZyB7XG4gICAgICByZXR1cm4gYCgke2RhdGFbdGhpcy5tb2RlbC5leHRlcm5hbF92YWx1ZV9maWVsZF19KSAke2RhdGFbdGhpcy5tb2RlbC5leHRlcm5hbF9uYW1lX2ZpZWxkXX1gO1xuICAgIH1cblxuICBkaXNwbGF5V2l0aChmb3JlaWduX21vZGVsKSB7XG4gICAgcmV0dXJuIChpdGVtOiBhbnkpOiBzdHJpbmcgPT4ge1xuICAgICAgcmV0dXJuIGl0ZW1bZm9yZWlnbl9tb2RlbC5leHRlcm5hbF9uYW1lX2ZpZWxkXTtcbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uQ2hhbmdlcywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgIE1vZGVsIH0gZnJvbSAnLi4vLi4vc2NyZWVucyc7XG5pbXBvcnQgeyBSZWdpc3RyeSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3JlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi4vLi4vZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy1jcnVkLWZvcmVpZ24ta2V5LWZpZWxkJyxcbiAgdGVtcGxhdGU6IGA8bWF0LWZvcm0tZmllbGQ+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbWF0SW5wdXQgW2Zvcm1Db250cm9sTmFtZV09XCJmaWVsZC5rZXlcIiBbbWF0QXV0b2NvbXBsZXRlXT1cImF1dG9cIj5cbjwvbWF0LWZvcm0tZmllbGQ+XG5cbjxtYXQtYXV0b2NvbXBsZXRlICNhdXRvPVwibWF0QXV0b2NvbXBsZXRlXCIgW2Rpc3BsYXlXaXRoXT1cImRpc3BsYXlGblwiPlxuICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgY2hvaWNlc1wiIFt2YWx1ZV09XCJvcHRpb25bbW9kZWwuZXh0ZXJuYWxfdmFsdWVfZmllbGRdXCI+XG4gICAgICAgIHt7IG9wdGlvblttb2RlbC5leHRlcm5hbF9uYW1lX2ZpZWxkXSB9fVxuICAgIDwvbWF0LW9wdGlvbj5cbjwvbWF0LWF1dG9jb21wbGV0ZT5gXG59KVxuZXhwb3J0IGNsYXNzIEZvcmVpZ25LZXlGaWVsZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KCkgZm9ybUdyb3VwOiBGb3JtR3JvdXA7XG4gIEBJbnB1dCgpIGZvcmNlZFNlYXJjaFBhcmFtczogYW55ID0gW107XG4gIEBJbnB1dCgpIGZpZWxkOiBGaWVsZDtcbiAgY2hvaWNlcyA9IFtdO1xuICBmaWx0ZXJlZE9wdGlvbnM6ICBPYnNlcnZhYmxlPGFueVtdPjtcbiAgbW9kZWw/OiBNb2RlbDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwaTogQXBpU2VydmljZSwgcHJpdmF0ZSByZWc6IFJlZ2lzdHJ5KSB7XG4gIH1cblxuLy8gICBuZ09uSW5pdCgpIHtcbi8vICAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIGlmICghdGhpcy5mb3JtR3JvdXApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyh0aGlzLmZvcm1Hcm91cCwgdGhpcy5maWVsZC5rZXksIHRoaXMuZm9ybUdyb3VwLmdldCh0aGlzLmZpZWxkLmtleSkpO1xuICAgIHRoaXMuZmlsdGVyZWRPcHRpb25zID0gKHRoaXMuZm9ybUdyb3VwLmdldCh0aGlzLmZpZWxkLmtleSkgYXMgRm9ybUNvbnRyb2wpLnZhbHVlQ2hhbmdlcy5waXBlKFxuICAgICAgICBzdGFydFdpdGgoJycpLFxuICAgICAgICBtYXAodmFsdWUgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2codmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlID8gdmFsdWVbJ2NvZGUnXSA6IHZhbHVlO1xuICAgICAgICB9KSxcbiAgICAgICAgbWFwKGNvZGUgPT4gY29kZSA/IHRoaXMuX2ZpbHRlcihuYW1lKSA6IHRoaXMuY2hvaWNlcy5zbGljZSgpKVxuICAgICk7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmZvcm1Hcm91cCk7XG4gICAgICBjb25zdCBwYXRoID0gdGhpcy5maWVsZC5mb3JlaWduX21vZGVsX3BhdGguc3BsaXQoJy4nKTtcbiAgICAgIHRoaXMubW9kZWwgPSB0aGlzLnJlZy5nZXRNb2RlbChwYXRoWzBdLCBwYXRoWzFdLCBwYXRoWzJdKTtcbiAgICAgIHRoaXMuYXBpLmZldGNoKGAke3RoaXMubW9kZWwuYXBpfWAsIFtdKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgdGhpcy5jaG9pY2VzID0gcmVzO1xuICAgICAgfSk7XG4gIH1cblxuICBkaXNwbGF5Rm4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIG9wdGlvbiA/IG9wdGlvbi5jb2RlIDogb3B0aW9uO1xuICB9XG5cbiAgX2ZpbHRlcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgY29uc3QgZmlsdGVyVmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnNvbGUubG9nKGZpbHRlclZhbHVlKTtcblxuICAgIHJldHVybiB0aGlzLmNob2ljZXMuZmlsdGVyKG9wdGlvbiA9PiBvcHRpb24uY29kZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdGVyVmFsdWUpID09PSAwKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTW9tZW50TW9kdWxlIH0gZnJvbSAnbmd4LW1vbWVudCc7XG5cbmltcG9ydCB7XG4gIE1hdFRvb2xiYXJNb2R1bGUsXG4gIE1hdFNpZGVuYXZNb2R1bGUsXG4gIE1hdExpc3RNb2R1bGUsXG4gIE1hdEljb25Nb2R1bGUsXG4gIE1hdFRhYmxlTW9kdWxlLFxuICBNYXRDYXJkTW9kdWxlLFxuICBNYXRQYWdpbmF0b3JNb2R1bGUsXG4gIE1hdEJ1dHRvbk1vZHVsZSxcbiAgTWF0TWVudU1vZHVsZSxcbiAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgTWF0SW5wdXRNb2R1bGUsXG4gIE1hdENoZWNrYm94TW9kdWxlLFxuICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxcbiAgTWF0R3JpZExpc3RNb2R1bGUsXG4gIE1hdFNuYWNrQmFyTW9kdWxlLFxuICBNYXREYXRlcGlja2VyTW9kdWxlLFxuICBNYXROYXRpdmVEYXRlTW9kdWxlLFxuICBNYXRTZWxlY3RNb2R1bGUsXG4gIE1hdFRhYnNNb2R1bGUsXG4gIE1hdEV4cGFuc2lvbk1vZHVsZSxcbiAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cblxuaW1wb3J0IHsgTGlzdGluZ0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9saXN0aW5nL2xpc3RpbmcuY29tcG9uZW50JztcbmltcG9ydCB7IE1vZGVsRm9ybUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9tb2RlbC1mb3JtL21vZGVsLWZvcm0uY29tcG9uZW50JztcbmltcG9ydCB7IE1vZGVsRm9ybVNjcmVlbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9tb2RlbC1mb3JtLXNjcmVlbi9tb2RlbC1mb3JtLXNjcmVlbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgRm9ybUZpZWxkQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Zvcm0tZmllbGQvZm9ybS1maWVsZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRm9ybXNldENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9mb3Jtc2V0L2Zvcm1zZXQuY29tcG9uZW50JztcbmltcG9ydCB7IEF1dG9Db21wbGV0ZUZpZWxkQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2F1dG8tY29tcGxldGUtZmllbGQvYXV0by1jb21wbGV0ZS1maWVsZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRm9yZWlnbktleUZpZWxkQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2ZvcmVpZ24ta2V5LWZpZWxkL2ZvcmVpZ24ta2V5LWZpZWxkLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IEFwcFNjcmVlbkNvbXBvbmVudCB9IGZyb20gJy4vY29udGFpbmVycy9hcHAtc2NyZWVuL2FwcC1zY3JlZW4uY29tcG9uZW50JztcbmltcG9ydCB7IExpc3RpbmdTY3JlZW5Db21wb25lbnQgfSBmcm9tICcuL2NvbnRhaW5lcnMvbGlzdGluZy1zY3JlZW4vbGlzdGluZy1zY3JlZW4uY29tcG9uZW50JztcbmltcG9ydCB7IExpc3RpbmdEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2NvbnRhaW5lcnMvbGlzdGluZy1kaWFsb2cvbGlzdGluZy1kaWFsb2cuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgTW9tZW50TW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICAvL1xuICAgIE1hdFRvb2xiYXJNb2R1bGUsXG4gICAgTWF0U2lkZW5hdk1vZHVsZSxcbiAgICBNYXRMaXN0TW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0VGFibGVNb2R1bGUsXG4gICAgTWF0Q2FyZE1vZHVsZSxcbiAgICBNYXRQYWdpbmF0b3JNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdE1lbnVNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdENoZWNrYm94TW9kdWxlLFxuICAgIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLFxuICAgIE1hdEdyaWRMaXN0TW9kdWxlLFxuICAgIE1hdFNuYWNrQmFyTW9kdWxlLFxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gICAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgTWF0VGFic01vZHVsZSxcbiAgICBNYXRFeHBhbnNpb25Nb2R1bGUsXG4gICAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBGb3JtRmllbGRDb21wb25lbnQsXG4gICAgQXV0b0NvbXBsZXRlRmllbGRDb21wb25lbnQsXG4gICAgTGlzdGluZ0NvbXBvbmVudCxcbiAgICBNb2RlbEZvcm1Db21wb25lbnQsXG4gICAgQXBwU2NyZWVuQ29tcG9uZW50LFxuICAgIExpc3RpbmdTY3JlZW5Db21wb25lbnQsXG4gICAgTW9kZWxGb3JtU2NyZWVuQ29tcG9uZW50LFxuICAgIEZvcm1zZXRDb21wb25lbnQsXG4gICAgRm9yZWlnbktleUZpZWxkQ29tcG9uZW50LFxuICAgIExpc3RpbmdEaWFsb2dDb21wb25lbnQsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICBdLFxuICBleHBvcnRzOiBbXG4gICAgSHR0cENsaWVudE1vZHVsZSxcbiAgICBBdXRvQ29tcGxldGVGaWVsZENvbXBvbmVudCxcbiAgICBNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdFNpZGVuYXZNb2R1bGUsXG4gICAgTWF0TGlzdE1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdFRhYmxlTW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsXG4gICAgTWF0UGFnaW5hdG9yTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRNZW51TW9kdWxlLFxuICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRDaGVja2JveE1vZHVsZSxcbiAgICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxcbiAgICBNYXRHcmlkTGlzdE1vZHVsZSxcbiAgICBNYXRTbmFja0Jhck1vZHVsZSxcbiAgICBNYXROYXRpdmVEYXRlTW9kdWxlLFxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgIE1hdFRhYnNNb2R1bGUsXG4gICAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxuICAgIE1hdEV4cGFuc2lvbk1vZHVsZSxcbiAgICBGb3JtRmllbGRDb21wb25lbnQsXG4gICAgTGlzdGluZ0NvbXBvbmVudCxcbiAgICBNb2RlbEZvcm1Db21wb25lbnQsXG4gICAgQXBwU2NyZWVuQ29tcG9uZW50LFxuICAgIExpc3RpbmdTY3JlZW5Db21wb25lbnQsXG4gICAgTW9kZWxGb3JtU2NyZWVuQ29tcG9uZW50LFxuICAgIEZvcm1zZXRDb21wb25lbnQsXG4gICAgRm9yZWlnbktleUZpZWxkQ29tcG9uZW50LFxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICBMaXN0aW5nRGlhbG9nQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgQ3J1ZE1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJ0c2xpYl8xLl9fdmFsdWVzIiwidHNsaWJfMS5fX2V4dGVuZHMiLCJvYnNlcnZhYmxlT2YiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFnQkU7cUJBSjJDLEVBQUU7d0JBQ3JCLEVBQUU7dUJBQ2lCLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQztL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
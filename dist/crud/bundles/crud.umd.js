(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('rxjs'), require('@angular/router'), require('@angular/common/http'), require('@angular/material/snack-bar'), require('@angular/material/table'), require('@angular/material/dialog'), require('rxjs/operators'), require('@angular/common'), require('ngx-moment'), require('@angular/material')) :
    typeof define === 'function' && define.amd ? define('crud', ['exports', '@angular/core', '@angular/forms', 'rxjs', '@angular/router', '@angular/common/http', '@angular/material/snack-bar', '@angular/material/table', '@angular/material/dialog', 'rxjs/operators', '@angular/common', 'ngx-moment', '@angular/material'], factory) :
    (factory((global.crud = {}),global.ng.core,global.ng.forms,global.rxjs,global.ng.router,global.ng.common.http,global.ng.material['snack-bar'],global.ng.material.table,global.ng.material.dialog,global.rxjs.operators,global.ng.common,null,global.ng.material));
}(this, (function (exports,i0,forms,rxjs,router,i1,snackBar,table,dialog,operators,common,ngxMoment,material) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var Registry = (function () {
        function Registry() {
            this.forms = {};
            this.registry = {};
            this.isReady = new rxjs.BehaviorSubject(false);
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
                        ctrls[ctrl.name] = new forms.FormControl({}, ctrl.validators);
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return))
                            _c.call(_a);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
                var /** @type {?} */ f = new forms.FormGroup(ctrls);
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
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        Registry.ctorParameters = function () { return []; };
        /** @nocollapse */ Registry.ngInjectableDef = i0.defineInjectable({ factory: function Registry_Factory() { return new Registry(); }, token: Registry, providedIn: "root" });
        return Registry;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ListingScreenComponent = (function () {
        function ListingScreenComponent(reg, router$$1, route) {
            this.reg = reg;
            this.router = router$$1;
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
            { type: i0.Component, args: [{
                        template: "<section class=\"app-settings\" *ngIf=\"modelName\">\n\n  <ng-crud-listing [modelName]=\"modelName\" [appName]=\"appName\" [moduleName]=\"moduleName\">\n\n  </ng-crud-listing>\n</section>\n",
                        styles: ["#custom-header{padding-top:12px;margin-bottom:12px}.page-title a{color:#333}.mat-tab-nav-bar,mat-tab-nav-bar{border:none!important}.tabs-bar a{color:#fff}"]
                    },] },
        ];
        /** @nocollapse */
        ListingScreenComponent.ctorParameters = function () {
            return [
                { type: Registry },
                { type: router.Router },
                { type: router.ActivatedRoute }
            ];
        };
        return ListingScreenComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var Navigator = (function () {
        function Navigator() {
            this.navItems = new i0.EventEmitter();
            this.activeNavItem = null;
            this.path = new i0.EventEmitter();
        }
        Navigator.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        Navigator.ctorParameters = function () { return []; };
        /** @nocollapse */ Navigator.ngInjectableDef = i0.defineInjectable({ factory: function Navigator_Factory() { return new Navigator(); }, token: Navigator, providedIn: "root" });
        return Navigator;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var AppScreenComponent = (function () {
        function AppScreenComponent(reg, router$$1, route, navigator) {
            this.reg = reg;
            this.router = router$$1;
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
            { type: i0.Component, args: [{
                        template: "<section class=\"app-settings\">\n  \n  <!-- <mat-card>\n    <p class=\"mat-subheading-1\">Welcome to Cloudinn Settings</p>\n  </mat-card> -->\n  <div class=\"container\">\n    <router-outlet></router-outlet>\n  </div>\n</section>\n",
                        styles: ["#custom-header{padding-top:12px;margin-bottom:12px}.page-title a{color:#333}.mat-tab-nav-bar,mat-tab-nav-bar{border:none!important}.tabs-bar a{color:#fff}"]
                    },] },
        ];
        /** @nocollapse */
        AppScreenComponent.ctorParameters = function () {
            return [
                { type: Registry },
                { type: router.Router },
                { type: router.ActivatedRoute },
                { type: Navigator }
            ];
        };
        return AppScreenComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ApiService = (function () {
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
                var /** @type {?} */ opts = new i1.HttpParams();
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
                if (params === void 0) {
                    params = {};
                }
                var /** @type {?} */ opts = new i1.HttpParams();
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
                if (params === void 0) {
                    params = {};
                }
                var /** @type {?} */ opts = new i1.HttpParams();
                Object.keys(params).forEach(function (p) {
                    if (params[p]) {
                        opts = opts.set(p, params[p]);
                    }
                });
                return this.http.post(api, body, { params: opts });
            };
        ApiService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        ApiService.ctorParameters = function () {
            return [
                { type: i1.HttpClient }
            ];
        };
        /** @nocollapse */ ApiService.ngInjectableDef = i0.defineInjectable({ factory: function ApiService_Factory() { return new ApiService(i0.inject(i1.HttpClient)); }, token: ApiService, providedIn: "root" });
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
    var Field = (function () {
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
    var Fieldset = (function () {
        function Fieldset() {
            this.is_fieldset = true;
        }
        return Fieldset;
    }());
    var Formset = (function () {
        function Formset() {
        }
        return Formset;
    }());
    /**
     * @template T
     */
    var /**
     * @template T
     */ AutoCompleteField = (function (_super) {
        __extends(AutoCompleteField, _super);
        function AutoCompleteField() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.label = 'some label';
            return _this;
        }
        return AutoCompleteField;
    }(forms.FormControl));
    var DefaultCrudForm = (function () {
        function DefaultCrudForm(model) {
            var _this = this;
            this.model = model;
            this.name = '';
            this.controls = [];
            this.name = model.name;
            Object.keys(model).forEach(function (v) {
                console.log(v);
                _this.controls.push(new forms.FormControl({}));
            });
        }
        return DefaultCrudForm;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ModelFormScreenComponent = (function () {
        function ModelFormScreenComponent(api, reg, router$$1, route, snackbar) {
            this.api = api;
            this.reg = reg;
            this.router = router$$1;
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
            { type: i0.Component, args: [{
                        selector: 'ng-crud-model-form-screen',
                        template: "<!-- <mat-progress-bar *ngIf=\"isLoading\" mode=\"query\"></mat-progress-bar> -->\n\n<!--<form>-->\n<div class=\"wrapper\">\n    <mat-toolbar>\n        <a routerLink=\"/\" mat-icon-button class=\"mat-caption\"><mat-icon>home</mat-icon></a>\n        <mat-icon>keyboard_arrow_right</mat-icon>\n        <a mat-button [routerLink]=\"'/'+module+'/'+appName\" class=\"mat-caption\">{{ appName }}</a>\n        <mat-icon>keyboard_arrow_right</mat-icon>\n        <a mat-button class=\"mat-caption\" [routerLink]=\"'/'+module+'/'+appName+'/'+modelName\">{{ model.verbose_name }}s</a>\n        <mat-icon>keyboard_arrow_right</mat-icon>\n        <span *ngIf=\"mode === 'edit'\" class=\"mat-caption\">{{ id }}</span>\n        <span *ngIf=\"mode === 'create'\" class=\"mat-caption\">Creating new {{ modelName }}</span>\n        <span class=\"toolbar-fill-remaining-space\"></span>\n    </mat-toolbar>\n\n    <mat-card>\n        <mat-card-content>\n            <ng-crud-model-form [moduleName]=\"module\" [appName]=\"appName\" [mode]='mode'\n                [modelName]=\"modelName\" (submit)=\"onSubmit($event)\" [id]=\"id\"></ng-crud-model-form>\n        </mat-card-content>\n    </mat-card>\n</div>",
                        styles: [".wrapper {\n    padding: 24px;\n  }"],
                        exportAs: 'ngcrudui-model-form-screen'
                    },] },
        ];
        /** @nocollapse */
        ModelFormScreenComponent.ctorParameters = function () {
            return [
                { type: ApiService },
                { type: Registry },
                { type: router.Router },
                { type: router.ActivatedRoute },
                { type: snackBar.MatSnackBar }
            ];
        };
        return ModelFormScreenComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var Module = (function () {
        function Module() {
            this.apps = [];
        }
        return Module;
    }());
    var App = (function () {
        function App() {
            this.models = [];
        }
        return App;
    }());
    var Model = (function () {
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
    var DefaultForm = (function () {
        function DefaultForm(model) {
            this.model = model;
        }
        return DefaultForm;
    }());
    var ListingScreen = (function () {
        function ListingScreen() {
        }
        return ListingScreen;
    }());
    var EditingScreen = (function () {
        function EditingScreen() {
        }
        return EditingScreen;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var FormService = (function () {
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
                            controls[field.key] = new forms.FormControl(field._value);
                        }
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (fields_1_1 && !fields_1_1.done && (_a = fields_1.return))
                            _a.call(fields_1);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
                return new forms.FormGroup(controls);
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
                catch (e_2_1) {
                    e_2 = { error: e_2_1 };
                }
                finally {
                    try {
                        if (fields_2_1 && !fields_2_1.done && (_a = fields_2.return))
                            _a.call(fields_2);
                    }
                    finally {
                        if (e_2)
                            throw e_2.error;
                    }
                }
                g.setValue(emptyValues);
                groups.push(g);
                return new forms.FormArray(groups);
                var e_2, _a;
            };
        FormService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        FormService.ctorParameters = function () { return []; };
        /** @nocollapse */ FormService.ngInjectableDef = i0.defineInjectable({ factory: function FormService_Factory() { return new FormService(); }, token: FormService, providedIn: "root" });
        return FormService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ListingComponent = (function () {
        function ListingComponent(api, reg, route, router$$1) {
            this.api = api;
            this.reg = reg;
            this.route = route;
            this.router = router$$1;
            this.mode = 'normal';
            this.is_actions_set = false;
            this.dataSource = new table.MatTableDataSource();
            this.searchParams = {
                page: 1,
            };
            this.columns = [];
            this.displayColumns = [];
            this.resultsCount = 0;
            this.isLoading = true;
            this.picked = new i0.EventEmitter();
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
            { type: i0.Component, args: [{
                        selector: 'ng-crud-listing',
                        template: "<!-- <mat-toolbar>\n    <a routerLink=\"/\" mat-icon-button class=\"mat-caption\"><mat-icon>home</mat-icon></a>\n    <mat-icon>keyboard_arrow_right</mat-icon>\n    <a mat-button [routerLink]=\"'/'+moduleName+'/'+appName\" class=\"mat-caption\">{{ appName }}</a>\n    <mat-icon>keyboard_arrow_right</mat-icon>\n    <a mat-button class=\"mat-caption\">{{ model.verbose_name }}s</a>\n    <span class=\"toolbar-fill-remaining-space\"></span>\n    <a mat-button [routerLink]=\"'/'+moduleName+'/'+appName+'/'+modelName+'/new'\" color=\"primary\">Create</a>\n    &nbsp;\n    <button mat-button color=\"warn\" [matMenuTriggerFor]=\"menu\">Bulk Actions <mat-icon>arrow_drop_down</mat-icon></button>    \n    <mat-menu #menu=\"matMenu\" >\n        <button mat-menu-item>Delete</button>\n    </mat-menu>\n</mat-toolbar> -->\n\n<div class=\"row\" *ngIf=\"mode !== 'pick'\">\n    <span class=\"fill-remaining-space\"></span>\n    <button mat-button color=\"warn\" [matMenuTriggerFor]=\"menu\">Bulk Actions <mat-icon>arrow_drop_down</mat-icon></button>    \n    <mat-menu #menu=\"matMenu\" >\n        <button mat-menu-item>Delete</button>\n    </mat-menu>\n</div>\n\n<mat-expansion-panel>\n    <mat-expansion-panel-header>\n        <mat-panel-title>\n            <mat-icon>search</mat-icon>\n        </mat-panel-title>\n        <mat-panel-description>\n            Search and filter restults\n        </mat-panel-description>                \n    </mat-expansion-panel-header>\n\n    <ng-crud-model-form [moduleName]=\"moduleName\" [appName]=\"appName\" mode='search'\n                 [modelName]=\"modelName\" (submit)=\"onSearch($event)\"></ng-crud-model-form>\n\n</mat-expansion-panel>    \n\n<mat-progress-bar *ngIf=\"isLoading\" mode=\"query\"></mat-progress-bar>\n\n<mat-table [dataSource]=\"dataSource\">\n    <ng-container *ngFor=\"let column of columns\" [matColumnDef]=\"column.columnDef\">\n        <ng-template [ngIf]=\"column.columnDef === 'checked'\">\n            <mat-header-cell *matHeaderCellDef (click)=\"onCheckAll()\"><mat-checkbox></mat-checkbox></mat-header-cell>\n            <mat-cell *matCellDef=\"let row\"> <mat-checkbox></mat-checkbox> </mat-cell>\n        </ng-template>\n        <ng-template [ngIf]=\"column.columnDef !== 'checked' && column.columnDef !== 'actions'\">\n            <mat-header-cell *matHeaderCellDef>{{ column.header }}</mat-header-cell>\n            <mat-cell *matCellDef=\"let row\">\n                <!-- <a *ngIf=\"column.clickable; else normal\" [routerLink]=\"getLink(row.id)\">{{ column.cell(row) }}</a>\n                <ng-template #normal>{{ column.cell(row) }}</ng-template>     -->\n                <a class=\"clickable\" [routerLink]=\"[row.id]\" *ngIf=\"(mode !== 'pick' && column.columnDef === model.external_name_field); else normalCell\">\n                    {{ column.cell(row) }}\n                </a>\n                <ng-template #normalCell>\n                    {{ column.cell(row) }}\n                </ng-template>\n            </mat-cell>\n        </ng-template>\n        <ng-template [ngIf]=\"column.columnDef === 'actions'\">\n            <mat-header-cell *matHeaderCellDef>{{ column.header }}</mat-header-cell>\n            <mat-cell *matCellDef=\"let row\">\n                <button mat-button *ngFor=\"let action of model.list_actions\">\n                    {{ action }}\n                </button>\n            </mat-cell>\n            </ng-template>\n    </ng-container>\n\n    <mat-header-row *matHeaderRowDef=\"displayColumns\"></mat-header-row>\n    <mat-row  *matRowDef=\"let row; columns: displayColumns;\" [ngClass]=\"{'clickable': mode === 'pick'}\" (click)=\"_picked(row[this.model.external_value_field])\"></mat-row>\n</mat-table>\n\n<mat-paginator #paginator\n    [length]=\"resultsCount\"\n    [pageIndex]=\"searchParams.page - 1\"\n    [pageSize]=\"20\">\n</mat-paginator>",
                        styles: [".clickable{color:#00f;cursor:pointer}"],
                        exportAs: 'ngcrudui-listing'
                    },] },
        ];
        /** @nocollapse */
        ListingComponent.ctorParameters = function () {
            return [
                { type: ApiService },
                { type: Registry },
                { type: router.ActivatedRoute },
                { type: router.Router }
            ];
        };
        ListingComponent.propDecorators = {
            moduleName: [{ type: i0.Input, args: ['moduleName',] }],
            appName: [{ type: i0.Input, args: ['appName',] }],
            modelName: [{ type: i0.Input, args: ['modelName',] }],
            mode: [{ type: i0.Input }],
            forcedSearchParams: [{ type: i0.Input }],
            picked: [{ type: i0.Output }]
        };
        return ListingComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ModelFormComponent = (function () {
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
            this.submit = new i0.EventEmitter();
            this.form = new forms.FormGroup({});
            this.formset = new forms.FormArray([]);
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
                    catch (e_1_1) {
                        e_1 = { error: e_1_1 };
                    }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return))
                                _c.call(_a);
                        }
                        finally {
                            if (e_1)
                                throw e_1.error;
                        }
                    }
                }
                this.is_ready = true;
                var e_1, _c;
            };
        ModelFormComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'ng-crud-model-form',
                        template: "<!-- <mat-progress-bar *ngIf=\"isLoading\" mode=\"query\"></mat-progress-bar> -->\n\n<ng-template [ngIf]=\"is_ready\">\n    <!-- <div class=\"form-container\"> -->\n    <div class=\"row\">\n        <ng-container *ngFor=\"let field of fields\">\n            <ng-crud-form-field  [form]=\"form\" [field]=\"field\"></ng-crud-form-field>\n        </ng-container>\n    </div>\n\n\n    <div *ngFor=\"let formarray of formsets; let i=index\">\n        <mat-divider></mat-divider>\n        <ng-crud-formset  [model]=\"model\" [config]=\"model.formsets[i]\"  [formarray]=\"formarray\" [form]=\"form\"></ng-crud-formset>        \n    </div>\n\n    <div class=\"row\">\n        <button mat-raised-button color=\"primary\" class=\"submit-button\" (click)=\"_onSubmit()\">\n            <span *ngIf=\"mode === 'search'\">Search</span>\n            <span *ngIf=\"mode === 'create'\">Create</span>\n            <span *ngIf=\"mode === 'edit'\">Update</span>\n        </button>\n    </div>\n</ng-template>",
                        styles: [".row{display:flex;flex:1 1 auto;flex-flow:row wrap}.submit-button{align-self:flex-end}"],
                        exportAs: 'ngcrudui-model-form'
                    },] },
        ];
        /** @nocollapse */
        ModelFormComponent.ctorParameters = function () {
            return [
                { type: ApiService },
                { type: Registry },
                { type: FormService }
            ];
        };
        ModelFormComponent.propDecorators = {
            moduleName: [{ type: i0.Input }],
            appName: [{ type: i0.Input }],
            modelName: [{ type: i0.Input }],
            mode: [{ type: i0.Input }],
            id: [{ type: i0.Input }],
            submit: [{ type: i0.Output }]
        };
        return ModelFormComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ListingDialogComponent = (function () {
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
            { type: i0.Component, args: [{
                        template: "<section class=\"app-settings\" *ngIf=\"modelName\">\n\n  <ng-crud-listing (picked)=\"picked($event)\" [modelName]=\"modelName\" [appName]=\"appName\" [moduleName]=\"moduleName\" mode=\"pick\">\n\n  </ng-crud-listing>\n</section>",
                        styles: ["#custom-header{padding-top:12px;margin-bottom:12px}.page-title a{color:#333}.mat-tab-nav-bar,mat-tab-nav-bar{border:none!important}.tabs-bar a{color:#fff}"]
                    },] },
        ];
        /** @nocollapse */
        ListingDialogComponent.ctorParameters = function () {
            return [
                { type: Registry },
                { type: dialog.MatDialogRef },
                { type: undefined, decorators: [{ type: i0.Inject, args: [dialog.MAT_DIALOG_DATA,] }] }
            ];
        };
        return ListingDialogComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var /** @type {?} */ CHOICES = [];
    var /** @type {?} */ FOREIGN_MODEL;
    var FormFieldComponent = (function () {
        function FormFieldComponent(dialog$$1, api, reg) {
            this.dialog = dialog$$1;
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
                        this.filteredOptions = rxjs.of(this.choices);
                    }
                    // this.api.fetch(`${this.foreign_model.api}`, []).subscribe(res => {
                    //   this.choices = res;
                    //   CHOICES = res;
                    // });
                    var /** @type {?} */ ctrl = this.form.get(this.field.key);
                    this.filteredOptions = ctrl.valueChanges.pipe(operators.startWith(''), operators.debounceTime(200), operators.distinctUntilChanged(), operators.switchMap(function (val) { return _this._filter(val || null); }));
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
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (CHOICES_1_1 && !CHOICES_1_1.done && (_a = CHOICES_1.return))
                            _a.call(CHOICES_1);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
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
                    return new rxjs.Observable();
                }
                var /** @type {?} */ filterValue = value ? value.toLowerCase() : null;
                var /** @type {?} */ params = {};
                params[this.foreign_model.external_name_field] = filterValue;
                return this.api.fetch("" + this.foreign_model.api, params).pipe(operators.map(function (res) {
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
            { type: i0.Component, args: [{
                        selector: 'ng-crud-form-field',
                        template: "<div [ngSwitch]=\"field.control_type\" class=\"form-field-wrapper\" [formGroup]=\"form\">\n\n    <div *ngSwitchCase=\"'switch'\">\n        <mat-slide-toggle matInput [formControlName]=\"field.key\">{{ field.label }}</mat-slide-toggle>\n    </div>\n\n    <mat-form-field *ngSwitchCase=\"'textarea'\">\n        <mat-label>{{ field.label }}</mat-label>\n        <textarea matInput matTextareaAutosize [formControlName]=\"field.key\"\n            [rows]=\"field.rowspan || 1\"></textarea>\n    </mat-form-field>\n\n    <mat-form-field *ngSwitchCase=\"'select'\">\n        <mat-label>{{ field.label }}</mat-label>\n        <mat-select [formControlName]=\"field.key\">\n            <mat-option></mat-option>\n            <mat-option [value]=\"c.value\" *ngFor=\"let c of field.choices\">\n                {{ c.label }}\n            </mat-option>\n        </mat-select>\n    </mat-form-field>\n\n    <mat-form-field *ngSwitchCase=\"'date'\">\n        <mat-label>{{ field.label }}</mat-label>\n        <input  matInput [formControlName]=\"field.key\"  [matDatepicker]=\"myDatepicker\" />\n        <mat-datepicker-toggle matSuffix [for]=\"myDatepicker\"></mat-datepicker-toggle>\n        <mat-datepicker #myDatepicker></mat-datepicker>\n    </mat-form-field>\n    \n    <ng-container *ngSwitchCase=\"'foreign_key'\">\n        <mat-form-field>\n            <mat-label>{{ field.label }}</mat-label>\n            <input type=\"text\" matInput [formControlName]=\"field.key\" [matAutocomplete]=\"auto\">\n        </mat-form-field>\n        <!-- <button mat-icon-button (click)=\"openListingDialog()\"><mat-icon>search</mat-icon></button> -->\n        \n        <mat-autocomplete #auto=\"matAutocomplete\" [displayWith]=\"displayFn\">\n            <mat-option *ngFor=\"let option of filteredOptions | async\" [value]=\"option[foreign_model.external_value_field]\">\n                {{ option[foreign_model.external_name_field] }}\n            </mat-option>\n        </mat-autocomplete>\n    </ng-container>\n\n    <!-- this fallsback from number and text -->\n    <mat-form-field *ngSwitchDefault>\n        <mat-label>{{ field.label }}</mat-label>\n        <input  matInput [formControlName]=\"field.key\"\n                [type]=\"field.control_type || field.value_type || 'text'\" />\n    </mat-form-field>\n\n</div>",
                        exportAs: 'ngcrudui-form-field',
                        styles: ['.form-field-wrapper{margin-right:  24px}']
                    },] },
        ];
        /** @nocollapse */
        FormFieldComponent.ctorParameters = function () {
            return [
                { type: dialog.MatDialog },
                { type: ApiService },
                { type: Registry }
            ];
        };
        FormFieldComponent.propDecorators = {
            form: [{ type: i0.Input }],
            forcedSearchParams: [{ type: i0.Input }],
            field: [{ type: i0.Input }],
            choices: [{ type: i0.Input }]
        };
        return FormFieldComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var FormsetComponent = (function () {
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
                    catch (e_1_1) {
                        e_1 = { error: e_1_1 };
                    }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return))
                                _c.call(_a);
                        }
                        finally {
                            if (e_1)
                                throw e_1.error;
                        }
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
            { type: i0.Component, args: [{
                        selector: 'ng-crud-formset',
                        template: "<div [formGroup]=\"form\" *ngIf=\"formarray\" class=\"formset\">\n    <div class=\"row\">\n        <h4> {{ config.label }}</h4>\n        <span class=\"spacer\"></span>\n        <button mat-icon-button (click)=\"addForm()\">\n            <mat-icon>add_circle</mat-icon>\n        </button>\n    </div>\n    <div [formArrayName]=\"config.key\">\n        <mat-grid-list gutterSize=\"12\" [cols]=\"config.fields.length\" rowHeight=\"60\"  *ngFor=\"let ctrl of formarray.controls; let i=index\" [formGroupName]=\"i\">\n            <mat-grid-tile  *ngFor=\"let f of config.fields\">\n                {{ f. key }}\n                <ng-crud-form-field [choices]=\"choices[f.key]\" [form]=\"ctrl\" [field]=\"f\"></ng-crud-form-field>\n            </mat-grid-tile>\n        </mat-grid-list>\n    </div>\n</div>",
                        styles: [".formset{padding-top:12px}.row{display:flex;flex:1 1 auto}.spacer{flex:1 1 auto}"],
                        exportAs: 'ngcrudui-formset'
                    },] },
        ];
        /** @nocollapse */
        FormsetComponent.ctorParameters = function () {
            return [
                { type: ApiService },
                { type: Registry },
                { type: FormService }
            ];
        };
        FormsetComponent.propDecorators = {
            form: [{ type: i0.Input }],
            model: [{ type: i0.Input }],
            formarray: [{ type: i0.Input }],
            config: [{ type: i0.Input }]
        };
        return FormsetComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var AutoCompleteFieldComponent = (function () {
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
                this.filteredOptions = rxjs.of(this.choices);
                this.filteredOptions = this.ctrl.valueChanges.pipe(operators.startWith(''), operators.map(function (val) { return _this.filter(val); }));
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
            { type: i0.Component, args: [{
                        selector: 'ng-crud-autocomplete',
                        template: "<mat-form-field [formGroup]=\"form\">\n  <input type=\"text\" matInput [placeholder]=\"field.label\" [formControl]=\"ctrl\" [matAutocomplete]=\"auto\">\n  <mat-autocomplete #auto=\"matAutocomplete\" [displayWith]=\"displayWith(foreign_model)\">\n      <mat-option *ngFor=\"let c of filteredOptions | async\" [value]=\"c[foreign_model.external_value_field]\">\n        {{ c[foreign_model.external_name_field] }}\n      </mat-option>\n    </mat-autocomplete>\n</mat-form-field>",
                        exportAs: 'ngcrudui-autocomplete'
                    },] },
        ];
        /** @nocollapse */
        AutoCompleteFieldComponent.ctorParameters = function () {
            return [
                { type: ApiService },
                { type: Registry }
            ];
        };
        AutoCompleteFieldComponent.propDecorators = {
            model: [{ type: i0.Input }],
            field: [{ type: i0.Input }],
            foreign_model: [{ type: i0.Input }],
            form: [{ type: i0.Input }],
            choices: [{ type: i0.Input }],
            forcedSearchParams: [{ type: i0.Input }]
        };
        return AutoCompleteFieldComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ForeignKeyFieldComponent = (function () {
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
                this.filteredOptions = ((this.formGroup.get(this.field.key))).valueChanges.pipe(operators.startWith(''), operators.map(function (value) {
                    console.log(value);
                    return value ? value['code'] : value;
                }), operators.map(function (code) { return code ? _this._filter(name) : _this.choices.slice(); }));
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
            { type: i0.Component, args: [{
                        selector: 'ng-crud-foreign-key-field',
                        template: "<mat-form-field>\n    <input type=\"text\" matInput [formControlName]=\"field.key\" [matAutocomplete]=\"auto\">\n</mat-form-field>\n\n<mat-autocomplete #auto=\"matAutocomplete\" [displayWith]=\"displayFn\">\n    <mat-option *ngFor=\"let option of choices\" [value]=\"option[model.external_value_field]\">\n        {{ option[model.external_name_field] }}\n    </mat-option>\n</mat-autocomplete>"
                    },] },
        ];
        /** @nocollapse */
        ForeignKeyFieldComponent.ctorParameters = function () {
            return [
                { type: ApiService },
                { type: Registry }
            ];
        };
        ForeignKeyFieldComponent.propDecorators = {
            formGroup: [{ type: i0.Input }],
            forcedSearchParams: [{ type: i0.Input }],
            field: [{ type: i0.Input }]
        };
        return ForeignKeyFieldComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var CrudModule = (function () {
        function CrudModule() {
        }
        CrudModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            forms.FormsModule,
                            forms.ReactiveFormsModule,
                            i1.HttpClientModule,
                            ngxMoment.MomentModule,
                            router.RouterModule,
                            material.MatToolbarModule,
                            material.MatSidenavModule,
                            material.MatListModule,
                            material.MatIconModule,
                            material.MatTableModule,
                            material.MatCardModule,
                            material.MatPaginatorModule,
                            material.MatButtonModule,
                            material.MatMenuModule,
                            material.MatProgressBarModule,
                            material.MatFormFieldModule,
                            material.MatInputModule,
                            material.MatCheckboxModule,
                            material.MatSlideToggleModule,
                            material.MatGridListModule,
                            material.MatSnackBarModule,
                            material.MatDatepickerModule,
                            material.MatNativeDateModule,
                            material.MatSelectModule,
                            material.MatTabsModule,
                            material.MatExpansionModule,
                            material.MatAutocompleteModule,
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
                            i1.HttpClientModule,
                            AutoCompleteFieldComponent,
                            material.MatToolbarModule,
                            material.MatSidenavModule,
                            material.MatListModule,
                            material.MatIconModule,
                            material.MatTableModule,
                            material.MatCardModule,
                            material.MatPaginatorModule,
                            material.MatButtonModule,
                            material.MatMenuModule,
                            material.MatProgressBarModule,
                            material.MatFormFieldModule,
                            material.MatInputModule,
                            material.MatCheckboxModule,
                            material.MatSlideToggleModule,
                            material.MatGridListModule,
                            material.MatSnackBarModule,
                            material.MatNativeDateModule,
                            material.MatDatepickerModule,
                            material.MatSelectModule,
                            material.MatTabsModule,
                            material.MatAutocompleteModule,
                            material.MatExpansionModule,
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

    exports.ListingScreenComponent = ListingScreenComponent;
    exports.AppScreenComponent = AppScreenComponent;
    exports.ModelFormScreenComponent = ModelFormScreenComponent;
    exports.Module = Module;
    exports.App = App;
    exports.Model = Model;
    exports.DefaultForm = DefaultForm;
    exports.ListingScreen = ListingScreen;
    exports.EditingScreen = EditingScreen;
    exports.FieldType = FieldType;
    exports.Field = Field;
    exports.Fieldset = Fieldset;
    exports.Formset = Formset;
    exports.AutoCompleteField = AutoCompleteField;
    exports.DefaultCrudForm = DefaultCrudForm;
    exports.Registry = Registry;
    exports.Navigator = Navigator;
    exports.ApiService = ApiService;
    exports.FormService = FormService;
    exports.CrudModule = CrudModule;
    exports.ɵb = AutoCompleteFieldComponent;
    exports.ɵf = ForeignKeyFieldComponent;
    exports.ɵa = FormFieldComponent;
    exports.ɵe = FormsetComponent;
    exports.ɵc = ListingComponent;
    exports.ɵd = ModelFormComponent;
    exports.ɵg = ListingDialogComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J1ZC51bWQuanMubWFwIiwic291cmNlcyI6W251bGwsIm5nOi8vY3J1ZC9saWIvc2VydmljZXMvcmVnaXN0cnkuc2VydmljZS50cyIsIm5nOi8vY3J1ZC9saWIvY29udGFpbmVycy9saXN0aW5nLXNjcmVlbi9saXN0aW5nLXNjcmVlbi5jb21wb25lbnQudHMiLCJuZzovL2NydWQvbGliL3NlcnZpY2VzL25hdmlnYXRvci5zZXJ2aWNlLnRzIiwibmc6Ly9jcnVkL2xpYi9jb250YWluZXJzL2FwcC1zY3JlZW4vYXBwLXNjcmVlbi5jb21wb25lbnQudHMiLCJuZzovL2NydWQvbGliL3NlcnZpY2VzL2FwaS5zZXJ2aWNlLnRzIiwibmc6Ly9jcnVkL2xpYi9mb3Jtcy50cyIsIm5nOi8vY3J1ZC9saWIvY29tcG9uZW50cy9tb2RlbC1mb3JtLXNjcmVlbi9tb2RlbC1mb3JtLXNjcmVlbi5jb21wb25lbnQudHMiLCJuZzovL2NydWQvbGliL3NjcmVlbnMudHMiLCJuZzovL2NydWQvbGliL3NlcnZpY2VzL2Zvcm0uc2VydmljZS50cyIsIm5nOi8vY3J1ZC9saWIvY29tcG9uZW50cy9saXN0aW5nL2xpc3RpbmcuY29tcG9uZW50LnRzIiwibmc6Ly9jcnVkL2xpYi9jb21wb25lbnRzL21vZGVsLWZvcm0vbW9kZWwtZm9ybS5jb21wb25lbnQudHMiLCJuZzovL2NydWQvbGliL2NvbnRhaW5lcnMvbGlzdGluZy1kaWFsb2cvbGlzdGluZy1kaWFsb2cuY29tcG9uZW50LnRzIiwibmc6Ly9jcnVkL2xpYi9jb21wb25lbnRzL2Zvcm0tZmllbGQvZm9ybS1maWVsZC5jb21wb25lbnQudHMiLCJuZzovL2NydWQvbGliL2NvbXBvbmVudHMvZm9ybXNldC9mb3Jtc2V0LmNvbXBvbmVudC50cyIsIm5nOi8vY3J1ZC9saWIvY29tcG9uZW50cy9hdXRvLWNvbXBsZXRlLWZpZWxkL2F1dG8tY29tcGxldGUtZmllbGQuY29tcG9uZW50LnRzIiwibmc6Ly9jcnVkL2xpYi9jb21wb25lbnRzL2ZvcmVpZ24ta2V5LWZpZWxkL2ZvcmVpZ24ta2V5LWZpZWxkLmNvbXBvbmVudC50cyIsIm5nOi8vY3J1ZC9saWIvY3J1ZC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wsIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlICwgIFN1YmplY3QgLCAgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBGaWVsZCwgQ3J1ZEZvcm0gfSBmcm9tICcuLi9mb3Jtcyc7XG5pbXBvcnQgeyBBcHAsIE1vZGVsIH0gZnJvbSAnLi4vc2NyZWVucyc7XG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgUmVnaXN0cnkge1xuXG4gIHB1YmxpYyBmb3Jtczoge1trZXk6IHN0cmluZ106IEZvcm1Hcm91cH0gPSB7fTtcbiAgcHJpdmF0ZSByZWdpc3RyeTogYW55ID0ge307XG4gIHB1YmxpYyBpc1JlYWR5OiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgcmVnaXN0ZXJGb3JtKG1ldGFkYXRhOiBDcnVkRm9ybSwgZm9ybUNsYXNzOiBhbnkpIHtcbiAgICBjb25zdCBjdHJscyA9IHt9O1xuICAgIGZvciAoY29uc3QgY3RybCBvZiBtZXRhZGF0YS5jb250cm9scykge1xuICAgICAgY3RybHNbY3RybC5uYW1lXSA9IG5ldyBGb3JtQ29udHJvbCh7fSwgY3RybC52YWxpZGF0b3JzKTtcbiAgICB9XG4gICAgY29uc3QgZiA9IG5ldyBGb3JtR3JvdXAoY3RybHMpO1xuICAgIHRoaXMuZm9ybXNbbWV0YWRhdGEubmFtZV0gPSBmO1xuICB9XG5cbiAgcmVnaXN0ZXIobWV0YToge30pIHtcbiAgICB0aGlzLnJlZ2lzdHJ5ID0gbWV0YTtcbiAgICB0aGlzLmlzUmVhZHkubmV4dCh0cnVlKTtcbiAgfVxuXG4gIGdldE1vZHVsZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVnaXN0cnk7XG4gIH1cblxuICBnZXRNb2RlbChtb2R1bGVOYW1lOiBzdHJpbmcsIGFwcDogc3RyaW5nLCBrZXk6IHN0cmluZyk6IE1vZGVsIHtcbiAgICByZXR1cm4gdGhpcy5yZWdpc3RyeVttb2R1bGVOYW1lXS5hcHBzLmZpbHRlcigoYTogQXBwKSA9PiBhLmtleSA9PT0gYXBwKVswXVxuICAgICAgLm1vZGVscy5maWx0ZXIobSA9PiBtLmtleSA9PT0ga2V5KVswXTtcbiAgfVxuXG4gIGdldEFwcChtb2R1bGVOYW1lOiBzdHJpbmcsIGFwcDogc3RyaW5nKTogQXBwIHtcbiAgICByZXR1cm4gdGhpcy5yZWdpc3RyeVttb2R1bGVOYW1lXS5hcHBzLmZpbHRlcihhID0+IGEua2V5ID09PSBhcHApWzBdO1xuICB9XG5cbiAgZ2V0QXBwTW9kZWxzKG1vZHVsZU5hbWU6IHN0cmluZywgYXBwOiBzdHJpbmcpOiB7c3RyaW5nOiBNb2RlbH0ge1xuICAgIHJldHVybiB0aGlzLnJlZ2lzdHJ5W21vZHVsZU5hbWVdLmFwcHMuZmlsdGVyKGEgPT4gYS5rZXkgPT09IGFwcCkubW9kZWxzO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgLCBSb3V0ZXJ9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IFJlZ2lzdHJ5IH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcmVnaXN0cnkuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICB0ZW1wbGF0ZTogYDxzZWN0aW9uIGNsYXNzPVwiYXBwLXNldHRpbmdzXCIgKm5nSWY9XCJtb2RlbE5hbWVcIj5cblxuICA8bmctY3J1ZC1saXN0aW5nIFttb2RlbE5hbWVdPVwibW9kZWxOYW1lXCIgW2FwcE5hbWVdPVwiYXBwTmFtZVwiIFttb2R1bGVOYW1lXT1cIm1vZHVsZU5hbWVcIj5cblxuICA8L25nLWNydWQtbGlzdGluZz5cbjwvc2VjdGlvbj5cbmAsXG4gIHN0eWxlczogW2AjY3VzdG9tLWhlYWRlcntwYWRkaW5nLXRvcDoxMnB4O21hcmdpbi1ib3R0b206MTJweH0ucGFnZS10aXRsZSBhe2NvbG9yOiMzMzN9Lm1hdC10YWItbmF2LWJhcixtYXQtdGFiLW5hdi1iYXJ7Ym9yZGVyOm5vbmUhaW1wb3J0YW50fS50YWJzLWJhciBhe2NvbG9yOiNmZmZ9YF1cbn0pXG5leHBvcnQgY2xhc3MgTGlzdGluZ1NjcmVlbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBhcHBOYW1lOiBzdHJpbmcgPSBudWxsO1xuICAgIG1vZHVsZU5hbWU6IHN0cmluZyA9IG51bGw7XG4gICAgbW9kZWxOYW1lOiBzdHJpbmcgPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIHJlZzogUmVnaXN0cnksXG4gICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAvLyBrZWVwIGxpc3RlbmluZyBmb3Igcm91dGUgcGFyYW1zIGNoYW5nZXMsIGluIGNhc2Ugb2ZcbiAgICAgIC8vIHRoZSBtb2RlbCBuYW1lIGNoYW5nZWQsIGUuZzogYW5vdGhlciBtb2RlbCBjbGlja2VkIGZyb21cbiAgICAgIC8vIHRoZSBuYXYgbWVudVxuICAgICAgdGhpcy5yb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XG4gICAgICAgIGNvbnN0IHBhcmVudFBhcmFtcyA9IHRoaXMucm91dGUucGFyZW50LnNuYXBzaG90LnBhcmFtcztcbiAgICAgICAgdGhpcy5tb2R1bGVOYW1lID0gcGFyZW50UGFyYW1zWydtb2R1bGUnXTtcbiAgICAgICAgdGhpcy5hcHBOYW1lID0gcGFyZW50UGFyYW1zWydhcHAnXTtcbiAgICAgICAgdGhpcy5tb2RlbE5hbWUgPSBwYXJhbXNbJ21vZGVsX25hbWUnXTtcbiAgICAgIH0pO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wsIEZvcm1BcnJheSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUgLCAgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuLi9mb3Jtcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmF2aWdhdG9yIHtcblxuICAgIG5hdkl0ZW1zOiBFdmVudEVtaXR0ZXI8YW55W10+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIGFjdGl2ZU5hdkl0ZW0gPSBudWxsO1xuICAgIHBhdGg6IEV2ZW50RW1pdHRlcjxzdHJpbmdbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZ1tdPigpO1xuXG4gICAgY29uc3RydWN0b3IoKSB7IH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgUmVnaXN0cnkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9yZWdpc3RyeS5zZXJ2aWNlJztcbmltcG9ydCB7IE5hdmlnYXRvciB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25hdmlnYXRvci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHRlbXBsYXRlOiBgPHNlY3Rpb24gY2xhc3M9XCJhcHAtc2V0dGluZ3NcIj5cbiAgXG4gIDwhLS0gPG1hdC1jYXJkPlxuICAgIDxwIGNsYXNzPVwibWF0LXN1YmhlYWRpbmctMVwiPldlbGNvbWUgdG8gQ2xvdWRpbm4gU2V0dGluZ3M8L3A+XG4gIDwvbWF0LWNhcmQ+IC0tPlxuICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgPHJvdXRlci1vdXRsZXQ+PC9yb3V0ZXItb3V0bGV0PlxuICA8L2Rpdj5cbjwvc2VjdGlvbj5cbmAsXG4gIHN0eWxlczogW2AjY3VzdG9tLWhlYWRlcntwYWRkaW5nLXRvcDoxMnB4O21hcmdpbi1ib3R0b206MTJweH0ucGFnZS10aXRsZSBhe2NvbG9yOiMzMzN9Lm1hdC10YWItbmF2LWJhcixtYXQtdGFiLW5hdi1iYXJ7Ym9yZGVyOm5vbmUhaW1wb3J0YW50fS50YWJzLWJhciBhe2NvbG9yOiNmZmZ9YF1cbn0pXG5leHBvcnQgY2xhc3MgQXBwU2NyZWVuQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBhcHA6IGFueSA9IG51bGw7XG4gIG1vZHVsZU5hbWUgPSBudWxsO1xuICBtb2RlbHMgPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlZzogUmVnaXN0cnksXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICBwcml2YXRlIG5hdmlnYXRvcjogTmF2aWdhdG9yLFxuICApIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMucm91dGUuc25hcHNob3QucGFyYW1zO1xuICAgIHRoaXMubW9kdWxlTmFtZSA9IHBhcmFtc1snbW9kdWxlJ107XG4gICAgdGhpcy5hcHAgPSB0aGlzLnJlZy5nZXRBcHAodGhpcy5tb2R1bGVOYW1lLCBwYXJhbXNbJ2FwcCddKTtcbiAgICB0aGlzLm1vZGVscyA9IHRoaXMuYXBwLm1vZGVscztcblxuICAgIHRoaXMucmVuZGVyU2lkZWJhcigpO1xuICAgIGlmICghdGhpcy5yb3V0ZS5maXJzdENoaWxkKSB7XG4gICAgICAvLyB0aGlzLnJlbmRlclNpZGViYXIoKTtcbiAgICAgIHRoaXMubmF2aWdhdG9yLnBhdGguZW1pdChbcGFyYW1zWydtb2R1bGUnXSwgcGFyYW1zWydhcHAnXSwgdGhpcy5tb2RlbHNbMF0ua2V5XSk7XG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbYC8ke3BhcmFtc1snbW9kdWxlJ119YCwgcGFyYW1zWydhcHAnXSwgdGhpcy5tb2RlbHNbMF0ua2V5XSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMubmF2aWdhdG9yLnBhdGguZW1pdChbcGFyYW1zWydtb2R1bGUnXSwgcGFyYW1zWydhcHAnXSwgdGhpcy5yb3V0ZS5maXJzdENoaWxkLnNuYXBzaG90LnBhcmFtc1snbW9kZWxfbmFtZSddXSk7XG5cbiAgICAvLyB0aGlzLnJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAvLyAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgLy8gfSk7XG4gICAgLy8gY29uc29sZS5sb2codGhpcy5yb3V0ZS5maXJzdENoaWxkLnNuYXBzaG90LnBhcmFtcyk7XG5cbiAgICAvLyBpZiAoIXBhcmFtc1snbW9kZWxfbmFtZSddKSB7XG4gICAgLy8gICB0aGlzLnJlbmRlclNpZGViYXIoKTtcbiAgICAvLyAgIC8vIHRoaXMucm91dGVyLm5hdmlnYXRlKFtgLyR7cGFyYW1zWydtb2R1bGUnXX1gLCBwYXJhbXNbJ2FwcCddLCB0aGlzLm1vZGVsc1swXS5rZXldKTtcbiAgICAvLyAgIHJldHVybjtcbiAgICAvLyB9XG4gIH1cblxuICAvLyBuZ09uQ2hhbmdlcygpIHtcbiAgLy8gICB0aGlzLnJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcbiAgLy8gICAgIHRoaXMubW9kdWxlTmFtZSA9IHBhcmFtc1sncGFyZW50X2FwcCddO1xuICAvLyAgICAgdGhpcy5hcHAgPSB0aGlzLnJlZy5nZXRBcHAocGFyYW1zWydhcHAnXSk7XG4gIC8vICAgICB0aGlzLm1vZGVscyA9IHRoaXMucmVnLmdldEFwcE1vZGVscyhwYXJhbXNbJ2FwcCddKTtcbiAgLy8gICB9KTtcbiAgLy8gfVxuICByZW5kZXJTaWRlYmFyKCkge1xuICAgIGNvbnN0IGl0ZW1zID0gW107XG4gICAgY29uc3QgaXRlbSA9IHsgdGl0bGU6IHRoaXMuYXBwLmxhYmVsLCB0eXBlOiAnc3ViaGVhZGluZycgfTtcbiAgICBpdGVtcy5wdXNoKGl0ZW0pO1xuICAgIHRoaXMubW9kZWxzLmZvckVhY2gobSA9PiB7XG4gICAgICBjb25zdCBpID0ge3RpdGxlOiBgJHttLnZlcmJvc2VfbmFtZX1zYCwgdXJsOiBgLyR7dGhpcy5tb2R1bGVOYW1lfS8ke3RoaXMuYXBwLmtleX0vJHttLmtleX1gIH07XG4gICAgICBpdGVtcy5wdXNoKGkpO1xuICAgIH0pO1xuICAgIHRoaXMubmF2aWdhdG9yLm5hdkl0ZW1zLm5leHQoaXRlbXMpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEFwaVNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7IH1cblxuICAgIHB1YmxpYyBmZXRjaChhcGk6IHN0cmluZywgcGFyYW1zPzogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgbGV0IG9wdHMgPSBuZXcgSHR0cFBhcmFtcygpO1xuICAgICAgICBPYmplY3Qua2V5cyhwYXJhbXMpLmZvckVhY2gocCA9PiB7XG4gICAgICAgICAgICBpZiAocGFyYW1zW3BdKSB7XG4gICAgICAgICAgICAgICAgb3B0cyA9IG9wdHMuc2V0KHAsIHBhcmFtc1twXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGFwaSwge3BhcmFtczogb3B0c30pO1xuICAgIH1cblxuICAgIHB1YmxpYyBwdXQoYXBpOiBzdHJpbmcsIGJvZHksIHBhcmFtcyA9IHt9KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgbGV0IG9wdHMgPSBuZXcgSHR0cFBhcmFtcygpO1xuICAgICAgICBPYmplY3Qua2V5cyhwYXJhbXMpLmZvckVhY2gocCA9PiB7XG4gICAgICAgICAgICBpZiAocGFyYW1zW3BdKSB7XG4gICAgICAgICAgICAgICAgb3B0cyA9IG9wdHMuc2V0KHAsIHBhcmFtc1twXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucHV0KGFwaSwgYm9keSwge3BhcmFtczogb3B0c30pO1xuICAgIH1cblxuICAgIHB1YmxpYyBwb3N0KGFwaTogc3RyaW5nLCBib2R5LCBwYXJhbXMgPSB7fSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGxldCBvcHRzID0gbmV3IEh0dHBQYXJhbXMoKTtcbiAgICAgICAgT2JqZWN0LmtleXMocGFyYW1zKS5mb3JFYWNoKHAgPT4ge1xuICAgICAgICAgICAgaWYgKHBhcmFtc1twXSkge1xuICAgICAgICAgICAgICAgIG9wdHMgPSBvcHRzLnNldChwLCBwYXJhbXNbcF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoYXBpLCBib2R5LCB7cGFyYW1zOiBvcHRzfSk7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZXhwb3J0IGludGVyZmFjZSBCYXNlRmllbGQge1xuICBsYWJlbDogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENydWRGaWVsZCB7XG4gIG5hbWU6IHN0cmluZztcbiAgbGFiZWw6IHN0cmluZztcbiAgdmFsaWRhdG9ycz86IGFueVtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENydWRGb3JtIHtcbiAgbmFtZTogc3RyaW5nO1xuICBjb250cm9sczogQ3J1ZEZpZWxkW107XG59XG5cbmV4cG9ydCBlbnVtIEZpZWxkVHlwZSB7XG4gIFRleHQsXG4gIE51bWJlcixcbiAgRGF0ZSxcbiAgRGF0ZVRpbWUsXG4gIFRpbWUsXG4gIEJvb2xlYW4sXG4gIEZvcmVpZ25LZXksXG4gIE1hbnlUb01hbnksXG4gIC8vIEZvcm1TZXQsXG4gIEZpbGUsXG59XG5cbmV4cG9ydCBjbGFzcyBGaWVsZCBpbXBsZW1lbnRzIEJhc2VGaWVsZCB7XG4gIGtleTogc3RyaW5nO1xuICBsYWJlbDogc3RyaW5nO1xuICB2YWx1ZV90eXBlOiBzdHJpbmc7XG4gIGNvbnRyb2xfdHlwZTogc3RyaW5nO1xuICBpc19lZGl0YWJsZSA9IHRydWU7XG4gIGlzX3NlYXJjaGFibGUgPSB0cnVlO1xuICBpc19oaWRkZW4gPSBmYWxzZTtcbiAgLy8gZm9yZWlnbiBrZXkgaW5mb3JtYXRpb25cbiAgLy8gZm9yZWlnbl9tb2RlbD86IGFueSA9IG51bGw7IC8vIGV2YWx1YXRlZCBpbiBydW4gdGltZVxuICBmb3JlaWduX21vZGVsX3BhdGg/OiBzdHJpbmc7XG4gIC8vIGNob2ljZXM/OiBhbnlbXTtcbiAgZmllbGRzOiBGaWVsZFtdO1xuICBjaG9pY2VzOiBhbnk7XG4gIGNvbHNwYW4gPSAxO1xuICByb3dzcGFuID0gMTtcblxuICBfdmFsdWU6IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBsYWJlbDogc3RyaW5nLFxuICAgIGtleTogc3RyaW5nLFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBpc19lZGl0YWJsZT86IGJvb2xlYW4sXG4gICAgaXNfc2VhcmNoYWJsZT86IGJvb2xlYW4sXG4gICAgZm9yZWlnbl9tb2RlbD86IGFueSxcbiAgICBjb2xvcnM/OiBhbnlcbiAgKSB7XG4gICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xuICAgIHRoaXMudmFsdWVfdHlwZSA9IHR5cGU7XG4gICAgdGhpcy5pc19lZGl0YWJsZSA9IGlzX2VkaXRhYmxlO1xuICAgIHRoaXMuaXNfc2VhcmNoYWJsZSA9IGlzX3NlYXJjaGFibGU7XG4gICAgLy8gdGhpcy5mb3JlaWduX21vZGVsID0gZm9yZWlnbl9tb2RlbDtcbiAgfVxuXG59XG5cbmV4cG9ydCBjbGFzcyBGaWVsZHNldCBpbXBsZW1lbnRzIEJhc2VGaWVsZCB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIGlzX2ZpZWxkc2V0ID0gdHJ1ZTtcbiAgZmllbGRzOiBGaWVsZFtdO1xufVxuXG5leHBvcnQgY2xhc3MgRm9ybXNldCBpbXBsZW1lbnRzIEJhc2VGaWVsZCB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIG1vZGVsOiBhbnk7XG59XG5cbmV4cG9ydCBjbGFzcyBBdXRvQ29tcGxldGVGaWVsZDxUPiBleHRlbmRzIEZvcm1Db250cm9sIHtcbiAgdmFsdWU6IFQ7XG4gIGxhYmVsID0gJ3NvbWUgbGFiZWwnO1xufVxuXG5leHBvcnQgY2xhc3MgRGVmYXVsdENydWRGb3JtIGltcGxlbWVudHMgQ3J1ZEZvcm0ge1xuICBwdWJsaWMgbmFtZSA9ICcnO1xuICBwdWJsaWMgY29udHJvbHMgPSBbXTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbW9kZWw6IGFueSkge1xuICAgICAgdGhpcy5uYW1lID0gbW9kZWwubmFtZTtcbiAgICAgIE9iamVjdC5rZXlzKG1vZGVsKS5mb3JFYWNoKHYgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHYpO1xuICAgICAgICAgIHRoaXMuY29udHJvbHMucHVzaChuZXcgRm9ybUNvbnRyb2woe30pKTtcbiAgICAgIH0pO1xuICB9XG59IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBNYXRTbmFja0JhciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NuYWNrLWJhcic7XG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7IE9ic2VydmFibGUgLCAgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBSZWdpc3RyeSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3JlZ2lzdHJ5LnNlcnZpY2UnO1xuXG5cbmltcG9ydCB7IEZpZWxkVHlwZSwgRmllbGQgfSBmcm9tICcuLi8uLi9mb3Jtcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLWNydWQtbW9kZWwtZm9ybS1zY3JlZW4nLFxuICB0ZW1wbGF0ZTogYDwhLS0gPG1hdC1wcm9ncmVzcy1iYXIgKm5nSWY9XCJpc0xvYWRpbmdcIiBtb2RlPVwicXVlcnlcIj48L21hdC1wcm9ncmVzcy1iYXI+IC0tPlxuXG48IS0tPGZvcm0+LS0+XG48ZGl2IGNsYXNzPVwid3JhcHBlclwiPlxuICAgIDxtYXQtdG9vbGJhcj5cbiAgICAgICAgPGEgcm91dGVyTGluaz1cIi9cIiBtYXQtaWNvbi1idXR0b24gY2xhc3M9XCJtYXQtY2FwdGlvblwiPjxtYXQtaWNvbj5ob21lPC9tYXQtaWNvbj48L2E+XG4gICAgICAgIDxtYXQtaWNvbj5rZXlib2FyZF9hcnJvd19yaWdodDwvbWF0LWljb24+XG4gICAgICAgIDxhIG1hdC1idXR0b24gW3JvdXRlckxpbmtdPVwiJy8nK21vZHVsZSsnLycrYXBwTmFtZVwiIGNsYXNzPVwibWF0LWNhcHRpb25cIj57eyBhcHBOYW1lIH19PC9hPlxuICAgICAgICA8bWF0LWljb24+a2V5Ym9hcmRfYXJyb3dfcmlnaHQ8L21hdC1pY29uPlxuICAgICAgICA8YSBtYXQtYnV0dG9uIGNsYXNzPVwibWF0LWNhcHRpb25cIiBbcm91dGVyTGlua109XCInLycrbW9kdWxlKycvJythcHBOYW1lKycvJyttb2RlbE5hbWVcIj57eyBtb2RlbC52ZXJib3NlX25hbWUgfX1zPC9hPlxuICAgICAgICA8bWF0LWljb24+a2V5Ym9hcmRfYXJyb3dfcmlnaHQ8L21hdC1pY29uPlxuICAgICAgICA8c3BhbiAqbmdJZj1cIm1vZGUgPT09ICdlZGl0J1wiIGNsYXNzPVwibWF0LWNhcHRpb25cIj57eyBpZCB9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJtb2RlID09PSAnY3JlYXRlJ1wiIGNsYXNzPVwibWF0LWNhcHRpb25cIj5DcmVhdGluZyBuZXcge3sgbW9kZWxOYW1lIH19PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInRvb2xiYXItZmlsbC1yZW1haW5pbmctc3BhY2VcIj48L3NwYW4+XG4gICAgPC9tYXQtdG9vbGJhcj5cblxuICAgIDxtYXQtY2FyZD5cbiAgICAgICAgPG1hdC1jYXJkLWNvbnRlbnQ+XG4gICAgICAgICAgICA8bmctY3J1ZC1tb2RlbC1mb3JtIFttb2R1bGVOYW1lXT1cIm1vZHVsZVwiIFthcHBOYW1lXT1cImFwcE5hbWVcIiBbbW9kZV09J21vZGUnXG4gICAgICAgICAgICAgICAgW21vZGVsTmFtZV09XCJtb2RlbE5hbWVcIiAoc3VibWl0KT1cIm9uU3VibWl0KCRldmVudClcIiBbaWRdPVwiaWRcIj48L25nLWNydWQtbW9kZWwtZm9ybT5cbiAgICAgICAgPC9tYXQtY2FyZC1jb250ZW50PlxuICAgIDwvbWF0LWNhcmQ+XG48L2Rpdj5gLFxuICBzdHlsZXM6IFtgLndyYXBwZXIge1xuICAgIHBhZGRpbmc6IDI0cHg7XG4gIH1gXSxcbiAgZXhwb3J0QXM6ICduZ2NydWR1aS1tb2RlbC1mb3JtLXNjcmVlbidcbn0pXG5leHBvcnQgY2xhc3MgTW9kZWxGb3JtU2NyZWVuQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIG1vZHVsZTogc3RyaW5nO1xuICAgIGFwcE5hbWU6IHN0cmluZztcbiAgICBtb2RlbE5hbWU6IHN0cmluZztcbiAgICBpZDogYW55ID0gbnVsbDtcbiAgICBtb2RlID0gJ2NyZWF0ZSc7XG4gICAgbmdNb2RlbDogYW55ID0ge307XG4gICAgbW9kZWw6IGFueTtcbiAgICBmaWVsZFR5cGU6IHR5cGVvZiBGaWVsZFR5cGUgPSBGaWVsZFR5cGU7XG4gICAgZWRpdGFibGVGaWVsZHM6IEZpZWxkW10gPSBbXTtcbiAgICBjaG9pY2VzID0ge307XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwaTogQXBpU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJlZzogUmVnaXN0cnksXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHNuYWNrYmFyOiBNYXRTbmFja0JhcixcbiAgICApIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5yb3V0ZS5wYXJlbnQucGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xuICAgICAgICAgICAgdGhpcy5tb2R1bGUgPSBwYXJhbXNbJ21vZHVsZSddO1xuICAgICAgICAgICAgdGhpcy5hcHBOYW1lID0gcGFyYW1zWydhcHAnXTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucm91dGUucGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xuICAgICAgICAgICAgdGhpcy5tb2RlbE5hbWUgPSBwYXJhbXNbJ21vZGVsX25hbWUnXTtcbiAgICAgICAgICAgIHRoaXMubW9kZWwgPSB0aGlzLnJlZy5nZXRNb2RlbCh0aGlzLm1vZHVsZSwgdGhpcy5hcHBOYW1lLCB0aGlzLm1vZGVsTmFtZSk7XG4gICAgICAgICAgICB0aGlzLmlkID0gcGFyYW1zWydpZCddO1xuICAgICAgICAgICAgaWYgKHRoaXMuaWQgIT0gbnVsbCAmJiB0aGlzLmlkICE9PSAnbmV3Jykge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kZSA9ICdlZGl0JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICB9XG5cbiAgICBvblN1Ym1pdChlKSB7XG4gICAgICAgIGxldCByZXE6IE9ic2VydmFibGU8YW55PiA9IG51bGw7XG4gICAgICAgIGlmICh0aGlzLm1vZGUgPT09ICdlZGl0Jykge1xuICAgICAgICAgICAgcmVxID0gdGhpcy5hcGkucHV0KHRoaXMubW9kZWwuYXBpICsgdGhpcy5pZCArICcvJywgZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXEgPSB0aGlzLmFwaS5wb3N0KHRoaXMubW9kZWwuYXBpLCBlKTtcbiAgICAgICAgfVxuICAgICAgICByZXEuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICB0aGlzLnNuYWNrYmFyLm9wZW4oJ1NhdmVkIFN1Y2Nlc3NmdWxseScsICdEaXNtaXNzJyk7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5tb2R1bGUsIHRoaXMuYXBwTmFtZSwgdGhpcy5tb2RlbE5hbWVdKTtcbiAgICAgICAgfSwgZXJyID0+IHtcbiAgICAgICAgICAgIHRoaXMuc25hY2tiYXIub3BlbignRmFpbGVkIHRvIHNhdmUnLCAnRGlzbWlzcycpO1xuICAgICAgICB9KTtcbiAgIH1cblxufVxuIiwiaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuL2Zvcm1zJztcblxuXG5leHBvcnQgY2xhc3MgTW9kdWxlIHtcbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIGFwcHM6IEFwcFtdID0gW107XG59XG5cbmV4cG9ydCBjbGFzcyBBcHAge1xuICAgIGtleTogc3RyaW5nO1xuICAgIGxhYmVsOiBzdHJpbmc7XG4gICAgaWNvbjogc3RyaW5nO1xuICAgIG1vZGVsczogTW9kZWxbXSA9IFtdO1xufVxuXG5leHBvcnQgY2xhc3MgTW9kZWwge1xuICAgIGtleTogc3RyaW5nO1xuICAgIGFwaTogc3RyaW5nO1xuICAgIHZlcmJvc2VfbmFtZTogc3RyaW5nO1xuICAgIGZpZWxkczogRmllbGRbXSA9IFtdO1xuICAgIGZvcm1zZXRzOiBGaWVsZFtdID0gW107XG4gICAgZXh0ZXJuYWxfdmFsdWVfZmllbGQ6IHN0cmluZztcbiAgICBleHRlcm5hbF9uYW1lX2ZpZWxkOiBzdHJpbmc7XG4gICAgbGlzdGluZ19maWVsZHM6IHN0cmluZ1tdO1xuXG4gICAgYWN0aW9uczogc3RyaW5nW10gPSBbXTtcbiAgICBidWxrX2FjdGlvbnM6IHN0cmluZ1tdID0gW107XG4gICAgbGlzdF9hY3Rpb25zOiBzdHJpbmdbXSA9IFtdO1xuICAgIHBhZ2VTaXplOiBOdW1iZXIgPSAyMDtcbn1cblxuZXhwb3J0IGNsYXNzIERlZmF1bHRGb3JtIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbW9kZWw6IE1vZGVsKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgTGlzdGluZ1NjcmVlbiB7XG4gICAgbW9kZWw6IE1vZGVsO1xufVxuXG5cbmV4cG9ydCBjbGFzcyBFZGl0aW5nU2NyZWVuIHtcbiAgICBtb2RlbDogTW9kZWw7XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgRm9ybUFycmF5IH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSAsICBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBGaWVsZCB9IGZyb20gJy4uL2Zvcm1zJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRm9ybVNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICB0b0Zvcm1Hcm91cChmaWVsZHM6IEZpZWxkW10pOiBGb3JtR3JvdXAge1xuICAgIGNvbnN0IGNvbnRyb2xzID0ge307XG4gICAgZm9yIChjb25zdCBmaWVsZCBvZiBmaWVsZHMpIHtcbiAgICAgIGlmIChmaWVsZC5jb250cm9sX3R5cGUgPT09ICdmb3Jtc2V0Jykge1xuICAgICAgICBjb250cm9sc1tmaWVsZC5rZXldID0gdGhpcy50b0Zvcm1BcnJheShmaWVsZC5maWVsZHMsIGZpZWxkLl92YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb250cm9sc1tmaWVsZC5rZXldID0gbmV3IEZvcm1Db250cm9sKGZpZWxkLl92YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXcgRm9ybUdyb3VwKGNvbnRyb2xzKTtcbiAgfVxuXG4gIHRvRm9ybUFycmF5KGZpZWxkczogRmllbGRbXSwgdmFsdWVzOiBhbnlbXSkge1xuICAgIGlmICghdmFsdWVzKSB7XG4gICAgICB2YWx1ZXMgPSBbXTtcbiAgICB9XG4gICAgY29uc3QgZ3JvdXBzOiBGb3JtR3JvdXBbXSA9IFtdO1xuICAgIHZhbHVlcy5mb3JFYWNoKHYgPT4ge1xuICAgICAgLy8gYXNzaWduIHZhbHVlIHRvIGZpZWxkc1xuICAgICAgZmllbGRzLm1hcChmID0+IHtcbiAgICAgICAgZi5fdmFsdWUgPSB2W2Yua2V5XTtcbiAgICAgIH0pO1xuICAgICAgY29uc3QgZ3JvdXAgPSB0aGlzLnRvRm9ybUdyb3VwKGZpZWxkcyk7XG4gICAgICBncm91cHMucHVzaChnKTtcbiAgICB9KTtcbiAgICAvLyBhbHdheXMgYWRkIGFuIGVtcHR5IHJvd1xuICAgIGNvbnN0IGcgPSB0aGlzLnRvRm9ybUdyb3VwKGZpZWxkcyk7XG4gICAgY29uc3QgZW1wdHlWYWx1ZXMgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGYgb2YgZmllbGRzKSB7XG4gICAgICBlbXB0eVZhbHVlc1tmLmtleV0gPSBudWxsO1xuICAgIH1cbiAgICBnLnNldFZhbHVlKGVtcHR5VmFsdWVzKTtcbiAgICBncm91cHMucHVzaChnKTtcbiAgICByZXR1cm4gbmV3IEZvcm1BcnJheShncm91cHMpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25DaGFuZ2VzLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgTWF0VGFibGVEYXRhU291cmNlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdGFibGUnO1xuXG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVnaXN0cnkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9yZWdpc3RyeS5zZXJ2aWNlJztcbmltcG9ydCB7ICBNb2RlbCB9IGZyb20gJy4uLy4uL3NjcmVlbnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy1jcnVkLWxpc3RpbmcnLFxuICB0ZW1wbGF0ZTogYDwhLS0gPG1hdC10b29sYmFyPlxuICAgIDxhIHJvdXRlckxpbms9XCIvXCIgbWF0LWljb24tYnV0dG9uIGNsYXNzPVwibWF0LWNhcHRpb25cIj48bWF0LWljb24+aG9tZTwvbWF0LWljb24+PC9hPlxuICAgIDxtYXQtaWNvbj5rZXlib2FyZF9hcnJvd19yaWdodDwvbWF0LWljb24+XG4gICAgPGEgbWF0LWJ1dHRvbiBbcm91dGVyTGlua109XCInLycrbW9kdWxlTmFtZSsnLycrYXBwTmFtZVwiIGNsYXNzPVwibWF0LWNhcHRpb25cIj57eyBhcHBOYW1lIH19PC9hPlxuICAgIDxtYXQtaWNvbj5rZXlib2FyZF9hcnJvd19yaWdodDwvbWF0LWljb24+XG4gICAgPGEgbWF0LWJ1dHRvbiBjbGFzcz1cIm1hdC1jYXB0aW9uXCI+e3sgbW9kZWwudmVyYm9zZV9uYW1lIH19czwvYT5cbiAgICA8c3BhbiBjbGFzcz1cInRvb2xiYXItZmlsbC1yZW1haW5pbmctc3BhY2VcIj48L3NwYW4+XG4gICAgPGEgbWF0LWJ1dHRvbiBbcm91dGVyTGlua109XCInLycrbW9kdWxlTmFtZSsnLycrYXBwTmFtZSsnLycrbW9kZWxOYW1lKycvbmV3J1wiIGNvbG9yPVwicHJpbWFyeVwiPkNyZWF0ZTwvYT5cbiAgICAmbmJzcDtcbiAgICA8YnV0dG9uIG1hdC1idXR0b24gY29sb3I9XCJ3YXJuXCIgW21hdE1lbnVUcmlnZ2VyRm9yXT1cIm1lbnVcIj5CdWxrIEFjdGlvbnMgPG1hdC1pY29uPmFycm93X2Ryb3BfZG93bjwvbWF0LWljb24+PC9idXR0b24+ICAgIFxuICAgIDxtYXQtbWVudSAjbWVudT1cIm1hdE1lbnVcIiA+XG4gICAgICAgIDxidXR0b24gbWF0LW1lbnUtaXRlbT5EZWxldGU8L2J1dHRvbj5cbiAgICA8L21hdC1tZW51PlxuPC9tYXQtdG9vbGJhcj4gLS0+XG5cbjxkaXYgY2xhc3M9XCJyb3dcIiAqbmdJZj1cIm1vZGUgIT09ICdwaWNrJ1wiPlxuICAgIDxzcGFuIGNsYXNzPVwiZmlsbC1yZW1haW5pbmctc3BhY2VcIj48L3NwYW4+XG4gICAgPGJ1dHRvbiBtYXQtYnV0dG9uIGNvbG9yPVwid2FyblwiIFttYXRNZW51VHJpZ2dlckZvcl09XCJtZW51XCI+QnVsayBBY3Rpb25zIDxtYXQtaWNvbj5hcnJvd19kcm9wX2Rvd248L21hdC1pY29uPjwvYnV0dG9uPiAgICBcbiAgICA8bWF0LW1lbnUgI21lbnU9XCJtYXRNZW51XCIgPlxuICAgICAgICA8YnV0dG9uIG1hdC1tZW51LWl0ZW0+RGVsZXRlPC9idXR0b24+XG4gICAgPC9tYXQtbWVudT5cbjwvZGl2PlxuXG48bWF0LWV4cGFuc2lvbi1wYW5lbD5cbiAgICA8bWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXI+XG4gICAgICAgIDxtYXQtcGFuZWwtdGl0bGU+XG4gICAgICAgICAgICA8bWF0LWljb24+c2VhcmNoPC9tYXQtaWNvbj5cbiAgICAgICAgPC9tYXQtcGFuZWwtdGl0bGU+XG4gICAgICAgIDxtYXQtcGFuZWwtZGVzY3JpcHRpb24+XG4gICAgICAgICAgICBTZWFyY2ggYW5kIGZpbHRlciByZXN0dWx0c1xuICAgICAgICA8L21hdC1wYW5lbC1kZXNjcmlwdGlvbj4gICAgICAgICAgICAgICAgXG4gICAgPC9tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlcj5cblxuICAgIDxuZy1jcnVkLW1vZGVsLWZvcm0gW21vZHVsZU5hbWVdPVwibW9kdWxlTmFtZVwiIFthcHBOYW1lXT1cImFwcE5hbWVcIiBtb2RlPSdzZWFyY2gnXG4gICAgICAgICAgICAgICAgIFttb2RlbE5hbWVdPVwibW9kZWxOYW1lXCIgKHN1Ym1pdCk9XCJvblNlYXJjaCgkZXZlbnQpXCI+PC9uZy1jcnVkLW1vZGVsLWZvcm0+XG5cbjwvbWF0LWV4cGFuc2lvbi1wYW5lbD4gICAgXG5cbjxtYXQtcHJvZ3Jlc3MtYmFyICpuZ0lmPVwiaXNMb2FkaW5nXCIgbW9kZT1cInF1ZXJ5XCI+PC9tYXQtcHJvZ3Jlc3MtYmFyPlxuXG48bWF0LXRhYmxlIFtkYXRhU291cmNlXT1cImRhdGFTb3VyY2VcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgY29sdW1uc1wiIFttYXRDb2x1bW5EZWZdPVwiY29sdW1uLmNvbHVtbkRlZlwiPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiY29sdW1uLmNvbHVtbkRlZiA9PT0gJ2NoZWNrZWQnXCI+XG4gICAgICAgICAgICA8bWF0LWhlYWRlci1jZWxsICptYXRIZWFkZXJDZWxsRGVmIChjbGljayk9XCJvbkNoZWNrQWxsKClcIj48bWF0LWNoZWNrYm94PjwvbWF0LWNoZWNrYm94PjwvbWF0LWhlYWRlci1jZWxsPlxuICAgICAgICAgICAgPG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IHJvd1wiPiA8bWF0LWNoZWNrYm94PjwvbWF0LWNoZWNrYm94PiA8L21hdC1jZWxsPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiY29sdW1uLmNvbHVtbkRlZiAhPT0gJ2NoZWNrZWQnICYmIGNvbHVtbi5jb2x1bW5EZWYgIT09ICdhY3Rpb25zJ1wiPlxuICAgICAgICAgICAgPG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZj57eyBjb2x1bW4uaGVhZGVyIH19PC9tYXQtaGVhZGVyLWNlbGw+XG4gICAgICAgICAgICA8bWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgcm93XCI+XG4gICAgICAgICAgICAgICAgPCEtLSA8YSAqbmdJZj1cImNvbHVtbi5jbGlja2FibGU7IGVsc2Ugbm9ybWFsXCIgW3JvdXRlckxpbmtdPVwiZ2V0TGluayhyb3cuaWQpXCI+e3sgY29sdW1uLmNlbGwocm93KSB9fTwvYT5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI25vcm1hbD57eyBjb2x1bW4uY2VsbChyb3cpIH19PC9uZy10ZW1wbGF0ZT4gICAgIC0tPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwiY2xpY2thYmxlXCIgW3JvdXRlckxpbmtdPVwiW3Jvdy5pZF1cIiAqbmdJZj1cIihtb2RlICE9PSAncGljaycgJiYgY29sdW1uLmNvbHVtbkRlZiA9PT0gbW9kZWwuZXh0ZXJuYWxfbmFtZV9maWVsZCk7IGVsc2Ugbm9ybWFsQ2VsbFwiPlxuICAgICAgICAgICAgICAgICAgICB7eyBjb2x1bW4uY2VsbChyb3cpIH19XG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjbm9ybWFsQ2VsbD5cbiAgICAgICAgICAgICAgICAgICAge3sgY29sdW1uLmNlbGwocm93KSB9fVxuICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8L21hdC1jZWxsPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiY29sdW1uLmNvbHVtbkRlZiA9PT0gJ2FjdGlvbnMnXCI+XG4gICAgICAgICAgICA8bWF0LWhlYWRlci1jZWxsICptYXRIZWFkZXJDZWxsRGVmPnt7IGNvbHVtbi5oZWFkZXIgfX08L21hdC1oZWFkZXItY2VsbD5cbiAgICAgICAgICAgIDxtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCByb3dcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1idXR0b24gKm5nRm9yPVwibGV0IGFjdGlvbiBvZiBtb2RlbC5saXN0X2FjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAge3sgYWN0aW9uIH19XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L21hdC1jZWxsPlxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgIDxtYXQtaGVhZGVyLXJvdyAqbWF0SGVhZGVyUm93RGVmPVwiZGlzcGxheUNvbHVtbnNcIj48L21hdC1oZWFkZXItcm93PlxuICAgIDxtYXQtcm93ICAqbWF0Um93RGVmPVwibGV0IHJvdzsgY29sdW1uczogZGlzcGxheUNvbHVtbnM7XCIgW25nQ2xhc3NdPVwieydjbGlja2FibGUnOiBtb2RlID09PSAncGljayd9XCIgKGNsaWNrKT1cIl9waWNrZWQocm93W3RoaXMubW9kZWwuZXh0ZXJuYWxfdmFsdWVfZmllbGRdKVwiPjwvbWF0LXJvdz5cbjwvbWF0LXRhYmxlPlxuXG48bWF0LXBhZ2luYXRvciAjcGFnaW5hdG9yXG4gICAgW2xlbmd0aF09XCJyZXN1bHRzQ291bnRcIlxuICAgIFtwYWdlSW5kZXhdPVwic2VhcmNoUGFyYW1zLnBhZ2UgLSAxXCJcbiAgICBbcGFnZVNpemVdPVwiMjBcIj5cbjwvbWF0LXBhZ2luYXRvcj5gLFxuICBzdHlsZXM6IFtgLmNsaWNrYWJsZXtjb2xvcjojMDBmO2N1cnNvcjpwb2ludGVyfWBdLFxuICBleHBvcnRBczogJ25nY3J1ZHVpLWxpc3RpbmcnXG59KVxuZXhwb3J0IGNsYXNzIExpc3RpbmdDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gICAgQElucHV0KCdtb2R1bGVOYW1lJykgbW9kdWxlTmFtZTogc3RyaW5nO1xuICAgIEBJbnB1dCgnYXBwTmFtZScpIGFwcE5hbWU6IHN0cmluZztcbiAgICBASW5wdXQoJ21vZGVsTmFtZScpIG1vZGVsTmFtZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIG1vZGUgPSAnbm9ybWFsJzsgLy8gb3RoZXIgbW9kZXM6ICdwaWNrJ1xuICAgIGlzX2FjdGlvbnNfc2V0ID0gZmFsc2U7XG4gICAgQElucHV0KCkgZm9yY2VkU2VhcmNoUGFyYW1zOiBhbnk7XG4gICAgZGF0YVNvdXJjZSA9IG5ldyBNYXRUYWJsZURhdGFTb3VyY2UoKTtcbiAgICBzZWFyY2hQYXJhbXMgPSB7XG4gICAgICAgIHBhZ2U6IDEsXG4gICAgfTtcbiAgICBtb2RlbDogTW9kZWw7XG4gICAgY29sdW1ucyA9IFtdO1xuICAgIGRpc3BsYXlDb2x1bW5zOiBzdHJpbmdbXSA9IFtdO1xuICAgIHJlc3VsdHNDb3VudCA9IDA7XG4gICAgaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICBAT3V0cHV0KCkgcGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhcGk6IEFwaVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByZWc6IFJlZ2lzdHJ5LFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHt9XG5cbiAgICBuZ09uQ2hhbmdlcygpIHtcbiAgICAgICAgaWYgKHRoaXMubW9kZWxOYW1lKSB7XG4gICAgICAgICAgICB0aGlzLnBvcHVsYXRlRGF0YVRhYmxlKCk7XG4gICAgICAgIH1cbiAgIH1cblxuICAgIHByaXZhdGUgcHJlcGFyZUNvbHVtbnMoKSB7XG4gICAgICAgIGlmICh0aGlzLm1vZGUgIT09ICdwaWNrJykge1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5zID0gW3snY29sdW1uRGVmJzogJ2NoZWNrZWQnLCAnaGVhZGVyJzogJyd9XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29sdW1ucyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubW9kZWwubGlzdGluZ19maWVsZHMubWFwKGZpZWxkID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGYgPSB0aGlzLm1vZGVsLmZpZWxkcy5maWx0ZXIoZmYgPT4gZmYua2V5ID09PSBmaWVsZClbMF07XG4gICAgICAgICAgICBjb25zdCBjb2wgPSB7fTtcbiAgICAgICAgICAgIGNvbFsnY29sdW1uRGVmJ10gPSBmLmtleTtcbiAgICAgICAgICAgIGNvbFsnaGVhZGVyJ10gPSBmLmxhYmVsO1xuICAgICAgICAgICAgY29sWydjZWxsJ10gPSAoZWxlbWVudDogRWxlbWVudCkgPT4gYCR7ZWxlbWVudFtmLmtleV19YDtcbiAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsLmV4dGVybmFsX25hbWVfZmllbGQgPT09IGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgY29sWydjbGlja2FibGUnXSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNvbHVtbnMucHVzaChjb2wpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRoaXMubW9kZSAhPT0gJ3BpY2snKSB7XG4gICAgICAgICAgICB0aGlzLmNvbHVtbnMucHVzaCh7J2NvbHVtbkRlZic6ICdhY3Rpb25zJywgJ2hlYWRlcic6ICcnfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHBvcHVsYXRlRGF0YVRhYmxlKCkge1xuICAgICAgICB0aGlzLm1vZGVsID0gdGhpcy5yZWcuZ2V0TW9kZWwodGhpcy5tb2R1bGVOYW1lLCB0aGlzLmFwcE5hbWUsIHRoaXMubW9kZWxOYW1lKTtcbiAgICAgICAgdGhpcy5wcmVwYXJlQ29sdW1ucygpO1xuICAgICAgICB0aGlzLmRpc3BsYXlDb2x1bW5zID0gdGhpcy5jb2x1bW5zLm1hcChjID0+IGMuY29sdW1uRGVmKTtcbiAgICAgICAgdGhpcy5yZXN1bHRzQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2UuZGF0YSA9IFtdO1xuICAgICAgICAvLyB0aGlzLmRpc3BsYXlDb2x1bW5zLnB1c2goJ2FjdGlvbnMnKTtcbiAgICAgICAgdGhpcy5zZWFyY2hQYXJhbXMgPSB7cGFnZTogMX07XG4gICAgICAgIHRoaXMuZmV0Y2goKTtcbiAgICB9XG5cbiAgICBmZXRjaCgpIHtcbiAgICAgICAgdGhpcy5hcGkuZmV0Y2godGhpcy5tb2RlbC5hcGksIHRoaXMuc2VhcmNoUGFyYW1zKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgIGxldCBuZXdJdGVtcyA9IFtdO1xuICAgICAgICAgICAgaWYgKHJlcy5yZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgbmV3SXRlbXMgPSB0aGlzLmRhdGFTb3VyY2UuZGF0YS5jb25jYXQocmVzLnJlc3VsdHMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdJdGVtcyA9IHRoaXMuZGF0YVNvdXJjZS5kYXRhLmNvbmNhdChyZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5yZXN1bHRzQ291bnQgPSBuZXdJdGVtcy5sZW5ndGg7XG4gICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2UuZGF0YSA9IG5ld0l0ZW1zO1xuICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSwgZXJyID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgZ2V0TGluayhpZCk6IHN0cmluZ1tdIHtcbiAgICAgICByZXR1cm4gWycvJywgdGhpcy5tb2R1bGVOYW1lLCB0aGlzLmFwcE5hbWUsIHRoaXMubW9kZWxOYW1lLCBpZF07XG4gICB9XG5cbiAgIGNlbGxDbGlja2VkKGNvbHVtbk5hbWU6IHN0cmluZywgcm93OiBhbnkpIHtcbiAgICAgICBpZiAoY29sdW1uTmFtZSA9PT0gdGhpcy5tb2RlbC5leHRlcm5hbF9uYW1lX2ZpZWxkKSB7XG4gICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKHRoaXMuZ2V0TGluayhyb3cuaWQpKTtcbiAgICAgICB9XG4gICB9XG5cbiAgICBvblNlYXJjaChzZWFyY2hQYXJhbXMpIHtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2UuZGF0YSA9IFtdO1xuICAgICAgICB0aGlzLnJlc3VsdHNDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuc2VhcmNoUGFyYW1zID0gc2VhcmNoUGFyYW1zO1xuICAgICAgICB0aGlzLnNlYXJjaFBhcmFtcy5wYWdlID0gMTtcbiAgICAgICAgdGhpcy5mZXRjaCgpO1xuICAgIH1cblxuICAgIG9uQ2hlY2tlZChyb3cpIHtcbiAgICAgICAgcm93Wydpc19jaGVja2VkJ10gPSB0cnVlO1xuICAgIH1cblxuICAgIG9uQ2hlY2tBbGwoKSB7XG5cbiAgICB9XG5cbiAgICBfcGlja2VkKHZhbHVlKSB7XG4gICAgICAgIHRoaXMucGlja2VkLm5leHQodmFsdWUpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkNoYW5nZXMsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBGb3JtR3JvdXAsIEZvcm1CdWlsZGVyLCBGb3JtQ29udHJvbCwgRm9ybUFycmF5IH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlICwgIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVnaXN0cnkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9yZWdpc3RyeS5zZXJ2aWNlJztcbmltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi4vLi4vc2NyZWVucyc7XG5pbXBvcnQgeyBGb3JtU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2Zvcm0uc2VydmljZSc7XG5pbXBvcnQgeyBGaWVsZFR5cGUsIEZpZWxkLCBBdXRvQ29tcGxldGVGaWVsZCB9IGZyb20gJy4uLy4uL2Zvcm1zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctY3J1ZC1tb2RlbC1mb3JtJyxcbiAgdGVtcGxhdGU6IGA8IS0tIDxtYXQtcHJvZ3Jlc3MtYmFyICpuZ0lmPVwiaXNMb2FkaW5nXCIgbW9kZT1cInF1ZXJ5XCI+PC9tYXQtcHJvZ3Jlc3MtYmFyPiAtLT5cblxuPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImlzX3JlYWR5XCI+XG4gICAgPCEtLSA8ZGl2IGNsYXNzPVwiZm9ybS1jb250YWluZXJcIj4gLS0+XG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBmaWVsZCBvZiBmaWVsZHNcIj5cbiAgICAgICAgICAgIDxuZy1jcnVkLWZvcm0tZmllbGQgIFtmb3JtXT1cImZvcm1cIiBbZmllbGRdPVwiZmllbGRcIj48L25nLWNydWQtZm9ybS1maWVsZD5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9kaXY+XG5cblxuICAgIDxkaXYgKm5nRm9yPVwibGV0IGZvcm1hcnJheSBvZiBmb3Jtc2V0czsgbGV0IGk9aW5kZXhcIj5cbiAgICAgICAgPG1hdC1kaXZpZGVyPjwvbWF0LWRpdmlkZXI+XG4gICAgICAgIDxuZy1jcnVkLWZvcm1zZXQgIFttb2RlbF09XCJtb2RlbFwiIFtjb25maWddPVwibW9kZWwuZm9ybXNldHNbaV1cIiAgW2Zvcm1hcnJheV09XCJmb3JtYXJyYXlcIiBbZm9ybV09XCJmb3JtXCI+PC9uZy1jcnVkLWZvcm1zZXQ+ICAgICAgICBcbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgPGJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvbiBjb2xvcj1cInByaW1hcnlcIiBjbGFzcz1cInN1Ym1pdC1idXR0b25cIiAoY2xpY2spPVwiX29uU3VibWl0KClcIj5cbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwibW9kZSA9PT0gJ3NlYXJjaCdcIj5TZWFyY2g8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiAqbmdJZj1cIm1vZGUgPT09ICdjcmVhdGUnXCI+Q3JlYXRlPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJtb2RlID09PSAnZWRpdCdcIj5VcGRhdGU8L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5gLFxuICBzdHlsZXM6IFtgLnJvd3tkaXNwbGF5OmZsZXg7ZmxleDoxIDEgYXV0bztmbGV4LWZsb3c6cm93IHdyYXB9LnN1Ym1pdC1idXR0b257YWxpZ24tc2VsZjpmbGV4LWVuZH1gXSxcbiAgZXhwb3J0QXM6ICduZ2NydWR1aS1tb2RlbC1mb3JtJ1xufSlcbmV4cG9ydCBjbGFzcyBNb2RlbEZvcm1Db21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gICAgQElucHV0KCkgbW9kdWxlTmFtZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGFwcE5hbWU6IHN0cmluZztcbiAgICBASW5wdXQoKSBtb2RlbE5hbWU6IHN0cmluZztcbiAgICBASW5wdXQoKSBtb2RlID0gJ3NlYXJjaCc7XG4gICAgQElucHV0KCkgaWQ6IG51bWJlciA9IG51bGw7XG4gICAgbmdNb2RlbDogYW55ID0ge307XG4gICAgbW9kZWw6IE1vZGVsO1xuICAgIGZpZWxkVHlwZTogdHlwZW9mIEZpZWxkVHlwZSA9IEZpZWxkVHlwZTtcbiAgICBBdXRvQ29tcGxldGVGaWVsZDogdHlwZW9mIEF1dG9Db21wbGV0ZUZpZWxkID0gQXV0b0NvbXBsZXRlRmllbGQ7XG4gICAgZmllbGRzOiBGaWVsZFtdID0gW107XG4gICAgY2hvaWNlcyA9IHt9O1xuICAgIEBPdXRwdXQoKSBzdWJtaXQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICBmb3JtOiBGb3JtR3JvdXAgPSBuZXcgRm9ybUdyb3VwKHt9KTtcbiAgICBmb3Jtc2V0OiBGb3JtQXJyYXkgPSBuZXcgRm9ybUFycmF5KFtdKTtcbiAgICBmb3Jtc2V0czogRm9ybUFycmF5W10gPSBuZXcgQXJyYXk8Rm9ybUFycmF5PigpO1xuICAgIGlzX3JlYWR5ID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBhcGk6IEFwaVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgcmVnOiBSZWdpc3RyeSxcbiAgICAgICAgcHJpdmF0ZSBmb3JtU2VydmljZTogRm9ybVNlcnZpY2UsXG4gICAgKSB7XG5cbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmFwcE5hbWUgfHwgIXRoaXMubW9kZWxOYW1lIHx8ICF0aGlzLm1vZHVsZU5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZvcm0gPSB0aGlzLnJlZy5mb3Jtc1t0aGlzLm1vZGVsTmFtZV07XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZm9ybSk7XG4gICAgICAgIC8vIHRoaXMubW9kZWwgPSB0aGlzLnJlZy5nZXRNb2RlbCh0aGlzLm1vZHVsZU5hbWUsIHRoaXMuYXBwTmFtZSwgdGhpcy5tb2RlbE5hbWUpO1xuICAgICAgICAvLyBpZiAodGhpcy5tb2RlID09PSAnc2VhcmNoJykge1xuICAgICAgICAvLyAgICAgdGhpcy5maWVsZHMgPSB0aGlzLm1vZGVsLmZpZWxkcy5maWx0ZXIoKGY6IEZpZWxkKSA9PiAhKGYuaXNfc2VhcmNoYWJsZSA9PT0gZmFsc2UpKTtcbiAgICAgICAgLy8gICAgIHRoaXMuYnVpbGRGb3JtKG51bGwpO1xuICAgICAgICAvLyB9IGVsc2UgaWYgKHRoaXMubW9kZSA9PT0gJ2VkaXQnKSB7XG4gICAgICAgIC8vICAgICAvLyBlZGl0IG1vZGVcbiAgICAgICAgLy8gICAgIGNvbnN0IGFwaSA9IGAke3RoaXMubW9kZWwuYXBpfSR7dGhpcy5pZH0vYDtcbiAgICAgICAgLy8gICAgIC8vIHJlbW92ZSB0aGUgdW5lZGl0YWJsZSBmaWVsZHNcbiAgICAgICAgLy8gICAgIHRoaXMuZmllbGRzID0gdGhpcy5tb2RlbC5maWVsZHMuZmlsdGVyKGYgPT4ge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiAhKGYuaXNfZWRpdGFibGUgPT09IGZhbHNlKTtcbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvLyAgICAgdGhpcy5hcGkuZmV0Y2goYXBpLCB7fSkuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgIC8vICAgICAgICAgdGhpcy5idWlsZEZvcm0ocmVzKTtcbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgdGhpcy5idWlsZEZvcm0obnVsbCk7XG4gICAgICAgIC8vIH1cblxuICAgICAgICAvLyAvLyBpZiAodGhpcy5tb2RlbC5mb3JtX3R5cGUgPT09ICdmb3Jtc2V0Jykge1xuICAgICAgICAvLyAvLyAgICAgdGhpcy5mb3Jtc2V0ID0gdGhpcy5mb3JtU2VydmljZS50b0Zvcm1BcnJheSh0aGlzLmZpZWxkcywgW10pO1xuICAgICAgICAvLyAvLyB9IGVsc2Uge1xuICAgICAgICAvLyAvLyAgICAgdGhpcy5mb3JtID0gdGhpcy5mb3JtU2VydmljZS50b0Zvcm1Hcm91cCh0aGlzLmZpZWxkcyk7XG4gICAgICAgIC8vIC8vIH1cbiAgICB9XG5cbiAgICBfb25TdWJtaXQoKSB7XG4gICAgICAgIHRoaXMuc3VibWl0LmVtaXQodGhpcy5mb3JtLnZhbHVlKTtcbiAgICB9XG5cbiAgICBidWlsZEZvcm0odmFsdWVzOiBhbnkpIHtcbiAgICAgICAgaWYgKHZhbHVlcyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5maWVsZHMubWFwKGYgPT4ge1xuICAgICAgICAgICAgICAgIGYuX3ZhbHVlID0gdmFsdWVzW2Yua2V5XTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZm9ybSA9IHRoaXMuZm9ybVNlcnZpY2UudG9Gb3JtR3JvdXAodGhpcy5maWVsZHMpO1xuICAgICAgICAvLyBDaGVjayBpZiB0aGUgbW9kZWwgaGFzIGZvcm1zZXRzLCByZW5kZXIgdGhlbSBiZW5lYXRoIHRoZSBtYWluIGZvcm1cbiAgICAgICAgaWYgKHRoaXMubW9kZSAhPT0gJ3NlYXJjaCcgJiYgdGhpcy5tb2RlbC5mb3Jtc2V0cykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBmb3Jtc2V0IG9mIHRoaXMubW9kZWwuZm9ybXNldHMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmcyA9IHRoaXMuZm9ybVNlcnZpY2UudG9Gb3JtQXJyYXkoZm9ybXNldC5maWVsZHMsIHZhbHVlc1tmb3Jtc2V0LmtleV0pO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9ybXNldHMucHVzaChmcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtLmFkZENvbnRyb2woZm9ybXNldC5rZXksIGZzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzX3JlYWR5ID0gdHJ1ZTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlICwgUm91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgTUFUX0RJQUxPR19EQVRBLCBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuXG5pbXBvcnQgeyBSZWdpc3RyeSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3JlZ2lzdHJ5LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgdGVtcGxhdGU6IGA8c2VjdGlvbiBjbGFzcz1cImFwcC1zZXR0aW5nc1wiICpuZ0lmPVwibW9kZWxOYW1lXCI+XG5cbiAgPG5nLWNydWQtbGlzdGluZyAocGlja2VkKT1cInBpY2tlZCgkZXZlbnQpXCIgW21vZGVsTmFtZV09XCJtb2RlbE5hbWVcIiBbYXBwTmFtZV09XCJhcHBOYW1lXCIgW21vZHVsZU5hbWVdPVwibW9kdWxlTmFtZVwiIG1vZGU9XCJwaWNrXCI+XG5cbiAgPC9uZy1jcnVkLWxpc3Rpbmc+XG48L3NlY3Rpb24+YCxcbiAgc3R5bGVzOiBbYCNjdXN0b20taGVhZGVye3BhZGRpbmctdG9wOjEycHg7bWFyZ2luLWJvdHRvbToxMnB4fS5wYWdlLXRpdGxlIGF7Y29sb3I6IzMzM30ubWF0LXRhYi1uYXYtYmFyLG1hdC10YWItbmF2LWJhcntib3JkZXI6bm9uZSFpbXBvcnRhbnR9LnRhYnMtYmFyIGF7Y29sb3I6I2ZmZn1gXVxufSlcbmV4cG9ydCBjbGFzcyBMaXN0aW5nRGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIG1vZHVsZU5hbWU6IHN0cmluZztcbiAgICBhcHBOYW1lOiBzdHJpbmc7XG4gICAgbW9kZWxOYW1lOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgcmVnOiBSZWdpc3RyeSxcbiAgICAgIHByaXZhdGUgcmVmOiBNYXREaWFsb2dSZWY8TGlzdGluZ0RpYWxvZ0NvbXBvbmVudD4sXG4gICAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IGFueSxcbiAgICApIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgIHRoaXMubW9kdWxlTmFtZSA9IHRoaXMuZGF0YVsnbW9kdWxlTmFtZSddO1xuICAgICAgdGhpcy5hcHBOYW1lID0gdGhpcy5kYXRhWydhcHBOYW1lJ107XG4gICAgICB0aGlzLm1vZGVsTmFtZSA9IHRoaXMuZGF0YVsnbW9kZWxOYW1lJ107XG4gICAgfVxuXG4gICAgcGlja2VkKHZhbHVlKSB7XG4gICAgICBjb25zb2xlLmxvZygncGlja2VkJywgdmFsdWUpO1xuICAgICAgdGhpcy5yZWYuY2xvc2UodmFsdWUpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkNoYW5nZXMsIElucHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgc3RhcnRXaXRoLCBkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNYXREaWFsb2cgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuXG5pbXBvcnQgeyAgTW9kZWwgfSBmcm9tICcuLi8uLi9zY3JlZW5zJztcbmltcG9ydCB7IFJlZ2lzdHJ5IH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuLi8uLi9mb3Jtcyc7XG5pbXBvcnQgeyBMaXN0aW5nRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29udGFpbmVycy9saXN0aW5nLWRpYWxvZy9saXN0aW5nLWRpYWxvZy5jb21wb25lbnQnO1xuXG5sZXQgQ0hPSUNFUyA9IFtdO1xubGV0IEZPUkVJR05fTU9ERUw7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLWNydWQtZm9ybS1maWVsZCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBbbmdTd2l0Y2hdPVwiZmllbGQuY29udHJvbF90eXBlXCIgY2xhc3M9XCJmb3JtLWZpZWxkLXdyYXBwZXJcIiBbZm9ybUdyb3VwXT1cImZvcm1cIj5cblxuICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cIidzd2l0Y2gnXCI+XG4gICAgICAgIDxtYXQtc2xpZGUtdG9nZ2xlIG1hdElucHV0IFtmb3JtQ29udHJvbE5hbWVdPVwiZmllbGQua2V5XCI+e3sgZmllbGQubGFiZWwgfX08L21hdC1zbGlkZS10b2dnbGU+XG4gICAgPC9kaXY+XG5cbiAgICA8bWF0LWZvcm0tZmllbGQgKm5nU3dpdGNoQ2FzZT1cIid0ZXh0YXJlYSdcIj5cbiAgICAgICAgPG1hdC1sYWJlbD57eyBmaWVsZC5sYWJlbCB9fTwvbWF0LWxhYmVsPlxuICAgICAgICA8dGV4dGFyZWEgbWF0SW5wdXQgbWF0VGV4dGFyZWFBdXRvc2l6ZSBbZm9ybUNvbnRyb2xOYW1lXT1cImZpZWxkLmtleVwiXG4gICAgICAgICAgICBbcm93c109XCJmaWVsZC5yb3dzcGFuIHx8IDFcIj48L3RleHRhcmVhPlxuICAgIDwvbWF0LWZvcm0tZmllbGQ+XG5cbiAgICA8bWF0LWZvcm0tZmllbGQgKm5nU3dpdGNoQ2FzZT1cIidzZWxlY3QnXCI+XG4gICAgICAgIDxtYXQtbGFiZWw+e3sgZmllbGQubGFiZWwgfX08L21hdC1sYWJlbD5cbiAgICAgICAgPG1hdC1zZWxlY3QgW2Zvcm1Db250cm9sTmFtZV09XCJmaWVsZC5rZXlcIj5cbiAgICAgICAgICAgIDxtYXQtb3B0aW9uPjwvbWF0LW9wdGlvbj5cbiAgICAgICAgICAgIDxtYXQtb3B0aW9uIFt2YWx1ZV09XCJjLnZhbHVlXCIgKm5nRm9yPVwibGV0IGMgb2YgZmllbGQuY2hvaWNlc1wiPlxuICAgICAgICAgICAgICAgIHt7IGMubGFiZWwgfX1cbiAgICAgICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgICAgPC9tYXQtc2VsZWN0PlxuICAgIDwvbWF0LWZvcm0tZmllbGQ+XG5cbiAgICA8bWF0LWZvcm0tZmllbGQgKm5nU3dpdGNoQ2FzZT1cIidkYXRlJ1wiPlxuICAgICAgICA8bWF0LWxhYmVsPnt7IGZpZWxkLmxhYmVsIH19PC9tYXQtbGFiZWw+XG4gICAgICAgIDxpbnB1dCAgbWF0SW5wdXQgW2Zvcm1Db250cm9sTmFtZV09XCJmaWVsZC5rZXlcIiAgW21hdERhdGVwaWNrZXJdPVwibXlEYXRlcGlja2VyXCIgLz5cbiAgICAgICAgPG1hdC1kYXRlcGlja2VyLXRvZ2dsZSBtYXRTdWZmaXggW2Zvcl09XCJteURhdGVwaWNrZXJcIj48L21hdC1kYXRlcGlja2VyLXRvZ2dsZT5cbiAgICAgICAgPG1hdC1kYXRlcGlja2VyICNteURhdGVwaWNrZXI+PC9tYXQtZGF0ZXBpY2tlcj5cbiAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgIFxuICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIidmb3JlaWduX2tleSdcIj5cbiAgICAgICAgPG1hdC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgPG1hdC1sYWJlbD57eyBmaWVsZC5sYWJlbCB9fTwvbWF0LWxhYmVsPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbWF0SW5wdXQgW2Zvcm1Db250cm9sTmFtZV09XCJmaWVsZC5rZXlcIiBbbWF0QXV0b2NvbXBsZXRlXT1cImF1dG9cIj5cbiAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgICAgPCEtLSA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiAoY2xpY2spPVwib3Blbkxpc3RpbmdEaWFsb2coKVwiPjxtYXQtaWNvbj5zZWFyY2g8L21hdC1pY29uPjwvYnV0dG9uPiAtLT5cbiAgICAgICAgXG4gICAgICAgIDxtYXQtYXV0b2NvbXBsZXRlICNhdXRvPVwibWF0QXV0b2NvbXBsZXRlXCIgW2Rpc3BsYXlXaXRoXT1cImRpc3BsYXlGblwiPlxuICAgICAgICAgICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBmaWx0ZXJlZE9wdGlvbnMgfCBhc3luY1wiIFt2YWx1ZV09XCJvcHRpb25bZm9yZWlnbl9tb2RlbC5leHRlcm5hbF92YWx1ZV9maWVsZF1cIj5cbiAgICAgICAgICAgICAgICB7eyBvcHRpb25bZm9yZWlnbl9tb2RlbC5leHRlcm5hbF9uYW1lX2ZpZWxkXSB9fVxuICAgICAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgICAgICA8L21hdC1hdXRvY29tcGxldGU+XG4gICAgPC9uZy1jb250YWluZXI+XG5cbiAgICA8IS0tIHRoaXMgZmFsbHNiYWNrIGZyb20gbnVtYmVyIGFuZCB0ZXh0IC0tPlxuICAgIDxtYXQtZm9ybS1maWVsZCAqbmdTd2l0Y2hEZWZhdWx0PlxuICAgICAgICA8bWF0LWxhYmVsPnt7IGZpZWxkLmxhYmVsIH19PC9tYXQtbGFiZWw+XG4gICAgICAgIDxpbnB1dCAgbWF0SW5wdXQgW2Zvcm1Db250cm9sTmFtZV09XCJmaWVsZC5rZXlcIlxuICAgICAgICAgICAgICAgIFt0eXBlXT1cImZpZWxkLmNvbnRyb2xfdHlwZSB8fCBmaWVsZC52YWx1ZV90eXBlIHx8ICd0ZXh0J1wiIC8+XG4gICAgPC9tYXQtZm9ybS1maWVsZD5cblxuPC9kaXY+YCxcbiAgZXhwb3J0QXM6ICduZ2NydWR1aS1mb3JtLWZpZWxkJyxcbiAgc3R5bGVzOiBbJy5mb3JtLWZpZWxkLXdyYXBwZXJ7bWFyZ2luLXJpZ2h0OiAgMjRweH0nXVxufSlcbmV4cG9ydCBjbGFzcyBGb3JtRmllbGRDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gIEBJbnB1dCgpIGZvcm06IEFic3RyYWN0Q29udHJvbDtcbiAgQElucHV0KCkgZm9yY2VkU2VhcmNoUGFyYW1zOiBhbnkgPSBbXTtcbiAgQElucHV0KCkgZmllbGQ6IEZpZWxkO1xuICBASW5wdXQoKSBjaG9pY2VzO1xuICBmaWx0ZXJlZE9wdGlvbnM6IE9ic2VydmFibGU8YW55W10+O1xuICBmb3JlaWduX21vZGVsPzogTW9kZWw7XG4gIHByaXZhdGUgbW9kZWxQYXRoOiBzdHJpbmdbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZGlhbG9nOiBNYXREaWFsb2csIHByaXZhdGUgYXBpOiBBcGlTZXJ2aWNlLCBwcml2YXRlIHJlZzogUmVnaXN0cnkpIHtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAodGhpcy5maWVsZC5jb250cm9sX3R5cGUgPT09ICdmb3JlaWduX2tleScpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdmaXJzdCBjaGFuZ2UnLCB0aGlzLmNob2ljZXMpO1xuICAgICAgY29uc3QgcGF0aCA9IHRoaXMuZmllbGQuZm9yZWlnbl9tb2RlbF9wYXRoLnNwbGl0KCcuJyk7XG4gICAgICB0aGlzLm1vZGVsUGF0aCA9IHBhdGg7XG4gICAgICB0aGlzLmZvcmVpZ25fbW9kZWwgPSB0aGlzLnJlZy5nZXRNb2RlbChwYXRoWzBdLCBwYXRoWzFdLCBwYXRoWzJdKTtcbiAgICAgIEZPUkVJR05fTU9ERUwgPSB0aGlzLmZvcmVpZ25fbW9kZWw7XG4gICAgICBpZiAodGhpcy5jaG9pY2VzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdmb3VuZCBjaG9pY2VzJyk7XG4gICAgICAgIHRoaXMuZmlsdGVyZWRPcHRpb25zID0gb2YodGhpcy5jaG9pY2VzKTtcbiAgICAgIH1cbiAgICAgIC8vIHRoaXMuYXBpLmZldGNoKGAke3RoaXMuZm9yZWlnbl9tb2RlbC5hcGl9YCwgW10pLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgLy8gICB0aGlzLmNob2ljZXMgPSByZXM7XG4gICAgICAvLyAgIENIT0lDRVMgPSByZXM7XG4gICAgICAvLyB9KTtcbiAgICAgIGNvbnN0IGN0cmwgPSB0aGlzLmZvcm0uZ2V0KHRoaXMuZmllbGQua2V5KTtcbiAgICAgIHRoaXMuZmlsdGVyZWRPcHRpb25zID0gY3RybC52YWx1ZUNoYW5nZXMucGlwZShcbiAgICAgICAgc3RhcnRXaXRoKCcnKSxcbiAgICAgICAgZGVib3VuY2VUaW1lKDIwMCksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICAgIHN3aXRjaE1hcCh2YWwgPT4gdGhpcy5fZmlsdGVyKHZhbCB8fCBudWxsKSlcbiAgICAgICk7XG4gICAgICAvLyBpZiAodGhpcy5mb3JtLnZhbHVlW3RoaXMuZmllbGQua2V5XSkge1xuICAgICAgLy8gICBjb25zb2xlLmxvZygnc2V0dGluZyBjdHJsIHZhbHVlJywgdGhpcy5mb3JtLnZhbHVlW3RoaXMuZmllbGQua2V5XSk7XG4gICAgICAvLyAgIGN0cmwuc2V0VmFsdWUodGhpcy5mb3JtLnZhbHVlW3RoaXMuZmllbGQua2V5XSk7XG4gICAgICAvLyB9XG4gICAgfVxuICB9XG5cbiAgZ2V0Rm9ybUNvbnRyb2woZmllbGRfbmFtZTogc3RyaW5nKTogRm9ybUNvbnRyb2wge1xuICAgIHJldHVybiB0aGlzLmZvcm0uZ2V0KGZpZWxkX25hbWUpIGFzIEZvcm1Db250cm9sO1xuICB9XG5cbiAgZGlzcGxheUZuKG9wdGlvbikge1xuICAgIGZvciAoY29uc3QgYyBvZiBDSE9JQ0VTKSB7XG4gICAgICBpZiAoY1snaWQnXSA9PT0gb3B0aW9uKSB7XG4gICAgICAgIHJldHVybiBjW0ZPUkVJR05fTU9ERUxbJ2V4dGVybmFsX25hbWVfZmllbGQnXV07XG4gICAgICB9XG4gICAgfVxuICAgIC8vIHJldHVybiBvcHRpb24gPyBvcHRpb24uY29kZSA6IG9wdGlvbjtcbiAgfVxuXG4gIF9maWx0ZXIodmFsdWU6IHN0cmluZyk6IE9ic2VydmFibGU8YW55W10+IHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKCk7XG4gICAgfVxuICAgIGNvbnN0IGZpbHRlclZhbHVlID0gdmFsdWUgPyB2YWx1ZS50b0xvd2VyQ2FzZSgpIDogbnVsbDtcbiAgICBjb25zdCBwYXJhbXMgPSB7fTtcbiAgICBwYXJhbXNbdGhpcy5mb3JlaWduX21vZGVsLmV4dGVybmFsX25hbWVfZmllbGRdID0gZmlsdGVyVmFsdWU7XG4gICAgcmV0dXJuIHRoaXMuYXBpLmZldGNoKGAke3RoaXMuZm9yZWlnbl9tb2RlbC5hcGl9YCwgcGFyYW1zKS5waXBlKFxuICAgICAgbWFwKHJlcyA9PiB7XG4gICAgICAgICAgQ0hPSUNFUyA9IHJlcztcbiAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfSlcbiAgICApO1xuICAgIC8vIHJldHVybiB0aGlzLmNob2ljZXMuZmlsdGVyKG9wdGlvbiA9PiBvcHRpb24uY29kZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdGVyVmFsdWUpID09PSAwKTtcbiAgfVxuXG4gIG9wZW5MaXN0aW5nRGlhbG9nKCkge1xuICAgIGNvbnN0IHJlZiA9IHRoaXMuZGlhbG9nLm9wZW4oTGlzdGluZ0RpYWxvZ0NvbXBvbmVudCwge1xuICAgICAgd2lkdGg6ICc5MCUnLFxuICAgICAgaGVpZ2h0OiAnOTAlJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgbW9kdWxlTmFtZTogdGhpcy5tb2RlbFBhdGhbMF0sXG4gICAgICAgIGFwcE5hbWU6IHRoaXMubW9kZWxQYXRoWzFdLFxuICAgICAgICBtb2RlbE5hbWU6IHRoaXMubW9kZWxQYXRoWzJdXG4gICAgICB9XG4gICAgfSk7XG4gICAgcmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgIHRoaXMuZm9ybS5nZXQodGhpcy5maWVsZC5rZXkpLnNldFZhbHVlKHZhbHVlKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkNoYW5nZXMsIElucHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1BcnJheSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgIE1vZGVsIH0gZnJvbSAnLi4vLi4vc2NyZWVucyc7XG5pbXBvcnQgeyBSZWdpc3RyeSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3JlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEZvcm1TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZm9ybS5zZXJ2aWNlJztcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi4vLi4vZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy1jcnVkLWZvcm1zZXQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgW2Zvcm1Hcm91cF09XCJmb3JtXCIgKm5nSWY9XCJmb3JtYXJyYXlcIiBjbGFzcz1cImZvcm1zZXRcIj5cbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgIDxoND4ge3sgY29uZmlnLmxhYmVsIH19PC9oND5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJzcGFjZXJcIj48L3NwYW4+XG4gICAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIChjbGljayk9XCJhZGRGb3JtKClcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbj5hZGRfY2lyY2xlPC9tYXQtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBbZm9ybUFycmF5TmFtZV09XCJjb25maWcua2V5XCI+XG4gICAgICAgIDxtYXQtZ3JpZC1saXN0IGd1dHRlclNpemU9XCIxMlwiIFtjb2xzXT1cImNvbmZpZy5maWVsZHMubGVuZ3RoXCIgcm93SGVpZ2h0PVwiNjBcIiAgKm5nRm9yPVwibGV0IGN0cmwgb2YgZm9ybWFycmF5LmNvbnRyb2xzOyBsZXQgaT1pbmRleFwiIFtmb3JtR3JvdXBOYW1lXT1cImlcIj5cbiAgICAgICAgICAgIDxtYXQtZ3JpZC10aWxlICAqbmdGb3I9XCJsZXQgZiBvZiBjb25maWcuZmllbGRzXCI+XG4gICAgICAgICAgICAgICAge3sgZi4ga2V5IH19XG4gICAgICAgICAgICAgICAgPG5nLWNydWQtZm9ybS1maWVsZCBbY2hvaWNlc109XCJjaG9pY2VzW2Yua2V5XVwiIFtmb3JtXT1cImN0cmxcIiBbZmllbGRdPVwiZlwiPjwvbmctY3J1ZC1mb3JtLWZpZWxkPlxuICAgICAgICAgICAgPC9tYXQtZ3JpZC10aWxlPlxuICAgICAgICA8L21hdC1ncmlkLWxpc3Q+XG4gICAgPC9kaXY+XG48L2Rpdj5gLFxuICBzdHlsZXM6IFtgLmZvcm1zZXR7cGFkZGluZy10b3A6MTJweH0ucm93e2Rpc3BsYXk6ZmxleDtmbGV4OjEgMSBhdXRvfS5zcGFjZXJ7ZmxleDoxIDEgYXV0b31gXSxcbiAgZXhwb3J0QXM6ICduZ2NydWR1aS1mb3Jtc2V0J1xufSlcbmV4cG9ydCBjbGFzcyBGb3Jtc2V0Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICBASW5wdXQoKSBmb3JtOiBGb3JtR3JvdXA7XG4gIEBJbnB1dCgpIG1vZGVsOiBNb2RlbDtcbiAgQElucHV0KCkgZm9ybWFycmF5OiBGb3JtQXJyYXk7XG4gIEBJbnB1dCgpIGNvbmZpZzogRmllbGQ7XG4gIGNob2ljZXMgPSB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwaTogQXBpU2VydmljZSwgcHJpdmF0ZSByZWc6IFJlZ2lzdHJ5LCBwcml2YXRlIGZvcm1TZXJ2aWNlOiBGb3JtU2VydmljZSkge1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmNvbmZpZy5maXJzdENoYW5nZSkge1xuICAgICAgZm9yIChjb25zdCBmaWVsZCBvZiBjaGFuZ2VzLmNvbmZpZy5jdXJyZW50VmFsdWUuZmllbGRzKSB7XG4gICAgICAgIGlmIChmaWVsZFsnY29udHJvbF90eXBlJ10gPT09ICdmb3JlaWduX2tleScpIHtcbiAgICAgICAgICB0aGlzLmdldENob2ljZXMoZmllbGQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWRkRm9ybSgpIHtcbiAgICBjb25zdCBjdHJsID0gdGhpcy5mb3JtU2VydmljZS50b0Zvcm1Hcm91cCh0aGlzLmNvbmZpZy5maWVsZHMpO1xuICAgIHRoaXMuZm9ybWFycmF5LnB1c2goY3RybCk7XG4gIH1cblxuICBnZXRDaG9pY2VzKGZpZWxkOiBGaWVsZCkge1xuICAgIGNvbnN0IHBhdGggPSBmaWVsZC5mb3JlaWduX21vZGVsX3BhdGguc3BsaXQoJy4nKTtcbiAgICBjb25zdCBtb2RlbCA9IHRoaXMucmVnLmdldE1vZGVsKHBhdGhbMF0sIHBhdGhbMV0sIHBhdGhbMl0pO1xuICAgIHRoaXMuYXBpLmZldGNoKG1vZGVsLmFwaSwge30pLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgdGhpcy5jaG9pY2VzW2ZpZWxkLmtleV0gPSByZXM7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmNob2ljZXMpO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uQ2hhbmdlcywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiBhcyBvYnNlcnZhYmxlT2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN0YXJ0V2l0aCwgbWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7ICBNb2RlbCB9IGZyb20gJy4uLy4uL3NjcmVlbnMnO1xuaW1wb3J0IHsgUmVnaXN0cnkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9yZWdpc3RyeS5zZXJ2aWNlJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBGaWVsZCB9IGZyb20gJy4uLy4uL2Zvcm1zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctY3J1ZC1hdXRvY29tcGxldGUnLFxuICB0ZW1wbGF0ZTogYDxtYXQtZm9ybS1maWVsZCBbZm9ybUdyb3VwXT1cImZvcm1cIj5cbiAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbWF0SW5wdXQgW3BsYWNlaG9sZGVyXT1cImZpZWxkLmxhYmVsXCIgW2Zvcm1Db250cm9sXT1cImN0cmxcIiBbbWF0QXV0b2NvbXBsZXRlXT1cImF1dG9cIj5cbiAgPG1hdC1hdXRvY29tcGxldGUgI2F1dG89XCJtYXRBdXRvY29tcGxldGVcIiBbZGlzcGxheVdpdGhdPVwiZGlzcGxheVdpdGgoZm9yZWlnbl9tb2RlbClcIj5cbiAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBjIG9mIGZpbHRlcmVkT3B0aW9ucyB8IGFzeW5jXCIgW3ZhbHVlXT1cImNbZm9yZWlnbl9tb2RlbC5leHRlcm5hbF92YWx1ZV9maWVsZF1cIj5cbiAgICAgICAge3sgY1tmb3JlaWduX21vZGVsLmV4dGVybmFsX25hbWVfZmllbGRdIH19XG4gICAgICA8L21hdC1vcHRpb24+XG4gICAgPC9tYXQtYXV0b2NvbXBsZXRlPlxuPC9tYXQtZm9ybS1maWVsZD5gLFxuICBleHBvcnRBczogJ25nY3J1ZHVpLWF1dG9jb21wbGV0ZSdcbn0pXG5leHBvcnQgY2xhc3MgQXV0b0NvbXBsZXRlRmllbGRDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gIEBJbnB1dCgpIG1vZGVsOiBNb2RlbDtcbiAgQElucHV0KCkgZmllbGQ6IEZpZWxkO1xuICBASW5wdXQoKSBmb3JlaWduX21vZGVsOiBNb2RlbDtcbiAgQElucHV0KCkgZm9ybTogRm9ybUdyb3VwO1xuICBASW5wdXQoKSBjaG9pY2VzOiBhbnlbXSA9IFtdO1xuICBASW5wdXQoKSBmb3JjZWRTZWFyY2hQYXJhbXM6IGFueTtcbiAgZGF0YVNvdXJjZTogYW55W10gPSBuZXcgQXJyYXkoKTtcbiAgc2VhcmNoUGFyYW1zOiB7fTtcbiAgZmlsdGVyZWRPcHRpb25zOiBPYnNlcnZhYmxlPGFueVtdPjtcbiAgY3RybDogRm9ybUNvbnRyb2w7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhcGk6IEFwaVNlcnZpY2UsIHByaXZhdGUgcmVnOiBSZWdpc3RyeSkge1xuICB9XG5cbiAgIG5nT25DaGFuZ2VzKCkge1xuICAgICBpZiAoIXRoaXMuZm9yZWlnbl9tb2RlbCkge1xuICAgICAgIHJldHVybjtcbiAgICAgfVxuICAgICAgdGhpcy5zZWFyY2hQYXJhbXMgPSB7cGFnZTogMX07XG4gICAgICB0aGlzLmN0cmwgPSB0aGlzLmZvcm0uZ2V0KHRoaXMuZmllbGQua2V5KSBhcyBGb3JtQ29udHJvbDtcbiAgICAgIGNvbnNvbGUubG9nKCdmb3JlaWduIGtleSB2YWx1ZScsIHRoaXMuY3RybC52YWx1ZSk7XG4gICAgICB0aGlzLmZpbHRlcmVkT3B0aW9ucyA9IG9ic2VydmFibGVPZih0aGlzLmNob2ljZXMpO1xuICAgICAgdGhpcy5maWx0ZXJlZE9wdGlvbnMgPSB0aGlzLmN0cmwudmFsdWVDaGFuZ2VzLnBpcGUoXG4gICAgICAgIHN0YXJ0V2l0aCgnJyksXG4gICAgICAgIG1hcCgodmFsOiBzdHJpbmcpID0+IHRoaXMuZmlsdGVyKHZhbCkpXG4gICAgICApO1xuICAgICAgLy8gdGhpcy5hcGkuZmV0Y2godGhpcy5tb2RlbC5hcGksIHRoaXMuc2VhcmNoUGFyYW1zKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgIC8vICAgdGhpcy5kYXRhU291cmNlLnB1c2gocmVzWydyZXN1bHRzJ10pO1xuICAgICAgLy8gfSk7XG4gICB9XG5cbiAgIGZpbHRlcih0ZXh0OiBzdHJpbmcpOiBhbnlbXSB7XG4gICAgcmV0dXJuIHRoaXMuY2hvaWNlcy5maWx0ZXIob3B0aW9uID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHRleHQpO1xuICAgICAgY29uc3QgdmFsID0gb3B0aW9uW3RoaXMuZm9yZWlnbl9tb2RlbC5leHRlcm5hbF9uYW1lX2ZpZWxkXTtcbiAgICAgIHJldHVybiB2YWwgPyB2YWwudG9Mb3dlckNhc2UoKS5pbmRleE9mKHRleHQudG9Mb3dlckNhc2UoKSkgPT09IDAgOiBmYWxzZTtcbiAgICB9KTtcbiAgIH1cblxuICAgdmFsdWVGb3JtYXR0ZXIoZGF0YTogYW55KTogc3RyaW5nIHtcbiAgICAgIHJldHVybiBgKCR7ZGF0YVt0aGlzLm1vZGVsLmV4dGVybmFsX3ZhbHVlX2ZpZWxkXX0pICR7ZGF0YVt0aGlzLm1vZGVsLmV4dGVybmFsX25hbWVfZmllbGRdfWA7XG4gICAgfVxuXG4gIGRpc3BsYXlXaXRoKGZvcmVpZ25fbW9kZWwpIHtcbiAgICByZXR1cm4gKGl0ZW06IGFueSk6IHN0cmluZyA9PiB7XG4gICAgICByZXR1cm4gaXRlbVtmb3JlaWduX21vZGVsLmV4dGVybmFsX25hbWVfZmllbGRdO1xuICAgIH07XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25DaGFuZ2VzLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgc3RhcnRXaXRoIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyAgTW9kZWwgfSBmcm9tICcuLi8uLi9zY3JlZW5zJztcbmltcG9ydCB7IFJlZ2lzdHJ5IH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuLi8uLi9mb3Jtcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLWNydWQtZm9yZWlnbi1rZXktZmllbGQnLFxuICB0ZW1wbGF0ZTogYDxtYXQtZm9ybS1maWVsZD5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBtYXRJbnB1dCBbZm9ybUNvbnRyb2xOYW1lXT1cImZpZWxkLmtleVwiIFttYXRBdXRvY29tcGxldGVdPVwiYXV0b1wiPlxuPC9tYXQtZm9ybS1maWVsZD5cblxuPG1hdC1hdXRvY29tcGxldGUgI2F1dG89XCJtYXRBdXRvY29tcGxldGVcIiBbZGlzcGxheVdpdGhdPVwiZGlzcGxheUZuXCI+XG4gICAgPG1hdC1vcHRpb24gKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBjaG9pY2VzXCIgW3ZhbHVlXT1cIm9wdGlvblttb2RlbC5leHRlcm5hbF92YWx1ZV9maWVsZF1cIj5cbiAgICAgICAge3sgb3B0aW9uW21vZGVsLmV4dGVybmFsX25hbWVfZmllbGRdIH19XG4gICAgPC9tYXQtb3B0aW9uPlxuPC9tYXQtYXV0b2NvbXBsZXRlPmBcbn0pXG5leHBvcnQgY2xhc3MgRm9yZWlnbktleUZpZWxkQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICBASW5wdXQoKSBmb3JtR3JvdXA6IEZvcm1Hcm91cDtcbiAgQElucHV0KCkgZm9yY2VkU2VhcmNoUGFyYW1zOiBhbnkgPSBbXTtcbiAgQElucHV0KCkgZmllbGQ6IEZpZWxkO1xuICBjaG9pY2VzID0gW107XG4gIGZpbHRlcmVkT3B0aW9uczogIE9ic2VydmFibGU8YW55W10+O1xuICBtb2RlbD86IE1vZGVsO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBpOiBBcGlTZXJ2aWNlLCBwcml2YXRlIHJlZzogUmVnaXN0cnkpIHtcbiAgfVxuXG4vLyAgIG5nT25Jbml0KCkge1xuLy8gICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgaWYgKCF0aGlzLmZvcm1Hcm91cCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHRoaXMuZm9ybUdyb3VwLCB0aGlzLmZpZWxkLmtleSwgdGhpcy5mb3JtR3JvdXAuZ2V0KHRoaXMuZmllbGQua2V5KSk7XG4gICAgdGhpcy5maWx0ZXJlZE9wdGlvbnMgPSAodGhpcy5mb3JtR3JvdXAuZ2V0KHRoaXMuZmllbGQua2V5KSBhcyBGb3JtQ29udHJvbCkudmFsdWVDaGFuZ2VzLnBpcGUoXG4gICAgICAgIHN0YXJ0V2l0aCgnJyksXG4gICAgICAgIG1hcCh2YWx1ZSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgPyB2YWx1ZVsnY29kZSddIDogdmFsdWU7XG4gICAgICAgIH0pLFxuICAgICAgICBtYXAoY29kZSA9PiBjb2RlID8gdGhpcy5fZmlsdGVyKG5hbWUpIDogdGhpcy5jaG9pY2VzLnNsaWNlKCkpXG4gICAgKTtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuZm9ybUdyb3VwKTtcbiAgICAgIGNvbnN0IHBhdGggPSB0aGlzLmZpZWxkLmZvcmVpZ25fbW9kZWxfcGF0aC5zcGxpdCgnLicpO1xuICAgICAgdGhpcy5tb2RlbCA9IHRoaXMucmVnLmdldE1vZGVsKHBhdGhbMF0sIHBhdGhbMV0sIHBhdGhbMl0pO1xuICAgICAgdGhpcy5hcGkuZmV0Y2goYCR7dGhpcy5tb2RlbC5hcGl9YCwgW10pLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICB0aGlzLmNob2ljZXMgPSByZXM7XG4gICAgICB9KTtcbiAgfVxuXG4gIGRpc3BsYXlGbihvcHRpb24pIHtcbiAgICByZXR1cm4gb3B0aW9uID8gb3B0aW9uLmNvZGUgOiBvcHRpb247XG4gIH1cblxuICBfZmlsdGVyKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBmaWx0ZXJWYWx1ZSA9IHZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgY29uc29sZS5sb2coZmlsdGVyVmFsdWUpO1xuXG4gICAgcmV0dXJuIHRoaXMuY2hvaWNlcy5maWx0ZXIob3B0aW9uID0+IG9wdGlvbi5jb2RlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihmaWx0ZXJWYWx1ZSkgPT09IDApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNb21lbnRNb2R1bGUgfSBmcm9tICduZ3gtbW9tZW50JztcblxuaW1wb3J0IHtcbiAgTWF0VG9vbGJhck1vZHVsZSxcbiAgTWF0U2lkZW5hdk1vZHVsZSxcbiAgTWF0TGlzdE1vZHVsZSxcbiAgTWF0SWNvbk1vZHVsZSxcbiAgTWF0VGFibGVNb2R1bGUsXG4gIE1hdENhcmRNb2R1bGUsXG4gIE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgTWF0QnV0dG9uTW9kdWxlLFxuICBNYXRNZW51TW9kdWxlLFxuICBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcbiAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICBNYXRJbnB1dE1vZHVsZSxcbiAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLFxuICBNYXRHcmlkTGlzdE1vZHVsZSxcbiAgTWF0U25hY2tCYXJNb2R1bGUsXG4gIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gIE1hdFNlbGVjdE1vZHVsZSxcbiAgTWF0VGFic01vZHVsZSxcbiAgTWF0RXhwYW5zaW9uTW9kdWxlLFxuICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuXG5pbXBvcnQgeyBMaXN0aW5nQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2xpc3RpbmcvbGlzdGluZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTW9kZWxGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL21vZGVsLWZvcm0vbW9kZWwtZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTW9kZWxGb3JtU2NyZWVuQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL21vZGVsLWZvcm0tc2NyZWVuL21vZGVsLWZvcm0tc2NyZWVuLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGb3JtRmllbGRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZm9ybS1maWVsZC9mb3JtLWZpZWxkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGb3Jtc2V0Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Zvcm1zZXQvZm9ybXNldC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXV0b0NvbXBsZXRlRmllbGRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYXV0by1jb21wbGV0ZS1maWVsZC9hdXRvLWNvbXBsZXRlLWZpZWxkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGb3JlaWduS2V5RmllbGRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZm9yZWlnbi1rZXktZmllbGQvZm9yZWlnbi1rZXktZmllbGQuY29tcG9uZW50JztcblxuaW1wb3J0IHsgQXBwU2NyZWVuQ29tcG9uZW50IH0gZnJvbSAnLi9jb250YWluZXJzL2FwcC1zY3JlZW4vYXBwLXNjcmVlbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTGlzdGluZ1NjcmVlbkNvbXBvbmVudCB9IGZyb20gJy4vY29udGFpbmVycy9saXN0aW5nLXNjcmVlbi9saXN0aW5nLXNjcmVlbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTGlzdGluZ0RpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vY29udGFpbmVycy9saXN0aW5nLWRpYWxvZy9saXN0aW5nLWRpYWxvZy5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgSHR0cENsaWVudE1vZHVsZSxcbiAgICBNb21lbnRNb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIC8vXG4gICAgTWF0VG9vbGJhck1vZHVsZSxcbiAgICBNYXRTaWRlbmF2TW9kdWxlLFxuICAgIE1hdExpc3RNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRUYWJsZU1vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLFxuICAgIE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcbiAgICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gICAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsXG4gICAgTWF0R3JpZExpc3RNb2R1bGUsXG4gICAgTWF0U25hY2tCYXJNb2R1bGUsXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcbiAgICBNYXROYXRpdmVEYXRlTW9kdWxlLFxuICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICBNYXRUYWJzTW9kdWxlLFxuICAgIE1hdEV4cGFuc2lvbk1vZHVsZSxcbiAgICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEZvcm1GaWVsZENvbXBvbmVudCxcbiAgICBBdXRvQ29tcGxldGVGaWVsZENvbXBvbmVudCxcbiAgICBMaXN0aW5nQ29tcG9uZW50LFxuICAgIE1vZGVsRm9ybUNvbXBvbmVudCxcbiAgICBBcHBTY3JlZW5Db21wb25lbnQsXG4gICAgTGlzdGluZ1NjcmVlbkNvbXBvbmVudCxcbiAgICBNb2RlbEZvcm1TY3JlZW5Db21wb25lbnQsXG4gICAgRm9ybXNldENvbXBvbmVudCxcbiAgICBGb3JlaWduS2V5RmllbGRDb21wb25lbnQsXG4gICAgTGlzdGluZ0RpYWxvZ0NvbXBvbmVudCxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIEF1dG9Db21wbGV0ZUZpZWxkQ29tcG9uZW50LFxuICAgIE1hdFRvb2xiYXJNb2R1bGUsXG4gICAgTWF0U2lkZW5hdk1vZHVsZSxcbiAgICBNYXRMaXN0TW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0VGFibGVNb2R1bGUsXG4gICAgTWF0Q2FyZE1vZHVsZSxcbiAgICBNYXRQYWdpbmF0b3JNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdE1lbnVNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdENoZWNrYm94TW9kdWxlLFxuICAgIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLFxuICAgIE1hdEdyaWRMaXN0TW9kdWxlLFxuICAgIE1hdFNuYWNrQmFyTW9kdWxlLFxuICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgTWF0VGFic01vZHVsZSxcbiAgICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXG4gICAgTWF0RXhwYW5zaW9uTW9kdWxlLFxuICAgIEZvcm1GaWVsZENvbXBvbmVudCxcbiAgICBMaXN0aW5nQ29tcG9uZW50LFxuICAgIE1vZGVsRm9ybUNvbXBvbmVudCxcbiAgICBBcHBTY3JlZW5Db21wb25lbnQsXG4gICAgTGlzdGluZ1NjcmVlbkNvbXBvbmVudCxcbiAgICBNb2RlbEZvcm1TY3JlZW5Db21wb25lbnQsXG4gICAgRm9ybXNldENvbXBvbmVudCxcbiAgICBGb3JlaWduS2V5RmllbGRDb21wb25lbnQsXG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1xuICAgIExpc3RpbmdEaWFsb2dDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBDcnVkTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbIkJlaGF2aW9yU3ViamVjdCIsInRzbGliXzEuX192YWx1ZXMiLCJGb3JtQ29udHJvbCIsIkZvcm1Hcm91cCIsIkluamVjdGFibGUiLCJyb3V0ZXIiLCJDb21wb25lbnQiLCJSb3V0ZXIiLCJBY3RpdmF0ZWRSb3V0ZSIsIkV2ZW50RW1pdHRlciIsIkh0dHBQYXJhbXMiLCJIdHRwQ2xpZW50IiwidHNsaWJfMS5fX2V4dGVuZHMiLCJNYXRTbmFja0JhciIsIkZvcm1BcnJheSIsIk1hdFRhYmxlRGF0YVNvdXJjZSIsIklucHV0IiwiT3V0cHV0IiwiTWF0RGlhbG9nUmVmIiwiSW5qZWN0IiwiTUFUX0RJQUxPR19EQVRBIiwiZGlhbG9nIiwib2YiLCJzdGFydFdpdGgiLCJkZWJvdW5jZVRpbWUiLCJkaXN0aW5jdFVudGlsQ2hhbmdlZCIsInN3aXRjaE1hcCIsIk9ic2VydmFibGUiLCJtYXAiLCJNYXREaWFsb2ciLCJvYnNlcnZhYmxlT2YiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIkZvcm1zTW9kdWxlIiwiUmVhY3RpdmVGb3Jtc01vZHVsZSIsIkh0dHBDbGllbnRNb2R1bGUiLCJNb21lbnRNb2R1bGUiLCJSb3V0ZXJNb2R1bGUiLCJNYXRUb29sYmFyTW9kdWxlIiwiTWF0U2lkZW5hdk1vZHVsZSIsIk1hdExpc3RNb2R1bGUiLCJNYXRJY29uTW9kdWxlIiwiTWF0VGFibGVNb2R1bGUiLCJNYXRDYXJkTW9kdWxlIiwiTWF0UGFnaW5hdG9yTW9kdWxlIiwiTWF0QnV0dG9uTW9kdWxlIiwiTWF0TWVudU1vZHVsZSIsIk1hdFByb2dyZXNzQmFyTW9kdWxlIiwiTWF0Rm9ybUZpZWxkTW9kdWxlIiwiTWF0SW5wdXRNb2R1bGUiLCJNYXRDaGVja2JveE1vZHVsZSIsIk1hdFNsaWRlVG9nZ2xlTW9kdWxlIiwiTWF0R3JpZExpc3RNb2R1bGUiLCJNYXRTbmFja0Jhck1vZHVsZSIsIk1hdERhdGVwaWNrZXJNb2R1bGUiLCJNYXROYXRpdmVEYXRlTW9kdWxlIiwiTWF0U2VsZWN0TW9kdWxlIiwiTWF0VGFic01vZHVsZSIsIk1hdEV4cGFuc2lvbk1vZHVsZSIsIk1hdEF1dG9jb21wbGV0ZU1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQUE7Ozs7Ozs7Ozs7Ozs7O0lBY0E7SUFFQSxJQUFJLGFBQWEsR0FBRyxVQUFTLENBQUMsRUFBRSxDQUFDO1FBQzdCLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYzthQUNoQyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM1RSxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUFFLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7b0JBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDL0UsT0FBTyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQztBQUVGLHVCQUEwQixDQUFDLEVBQUUsQ0FBQztRQUMxQixhQUFhLENBQUMsQ0FBQyxFQUFFLENB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
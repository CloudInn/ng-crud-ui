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
class Registry {
    constructor() {
        this.forms = {};
        this.registry = {};
        this.isReady = new BehaviorSubject(false);
    }
    /**
     * @param {?} metadata
     * @param {?} formClass
     * @return {?}
     */
    registerForm(metadata, formClass) {
        const /** @type {?} */ ctrls = {};
        for (const /** @type {?} */ ctrl of metadata.controls) {
            ctrls[ctrl.name] = new FormControl({}, ctrl.validators);
        }
        const /** @type {?} */ f = new FormGroup(ctrls);
        this.forms[metadata.name] = f;
    }
    /**
     * @param {?} meta
     * @return {?}
     */
    register(meta) {
        this.registry = meta;
        this.isReady.next(true);
    }
    /**
     * @return {?}
     */
    getModules() {
        return this.registry;
    }
    /**
     * @param {?} moduleName
     * @param {?} app
     * @param {?} key
     * @return {?}
     */
    getModel(moduleName, app, key) {
        return this.registry[moduleName].apps.filter((a) => a.key === app)[0]
            .models.filter(m => m.key === key)[0];
    }
    /**
     * @param {?} moduleName
     * @param {?} app
     * @return {?}
     */
    getApp(moduleName, app) {
        return this.registry[moduleName].apps.filter(a => a.key === app)[0];
    }
    /**
     * @param {?} moduleName
     * @param {?} app
     * @return {?}
     */
    getAppModels(moduleName, app) {
        return this.registry[moduleName].apps.filter(a => a.key === app).models;
    }
}
Registry.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
Registry.ctorParameters = () => [];
/** @nocollapse */ Registry.ngInjectableDef = defineInjectable({ factory: function Registry_Factory() { return new Registry(); }, token: Registry, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ListingScreenComponent {
    /**
     * @param {?} reg
     * @param {?} router
     * @param {?} route
     */
    constructor(reg, router, route) {
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
    ngOnInit() {
        // keep listening for route params changes, in case of
        // the model name changed, e.g: another model clicked from
        // the nav menu
        this.route.params.subscribe(params => {
            const /** @type {?} */ parentParams = this.route.parent.snapshot.params;
            this.moduleName = parentParams['module'];
            this.appName = parentParams['app'];
            this.modelName = params['model_name'];
        });
    }
}
ListingScreenComponent.decorators = [
    { type: Component, args: [{
                template: `<section class="app-settings" *ngIf="modelName">

  <ng-crud-listing [modelName]="modelName" [appName]="appName" [moduleName]="moduleName">

  </ng-crud-listing>
</section>
`,
                styles: [`#custom-header{padding-top:12px;margin-bottom:12px}.page-title a{color:#333}.mat-tab-nav-bar,mat-tab-nav-bar{border:none!important}.tabs-bar a{color:#fff}`]
            },] },
];
/** @nocollapse */
ListingScreenComponent.ctorParameters = () => [
    { type: Registry },
    { type: Router },
    { type: ActivatedRoute }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Navigator {
    constructor() {
        this.navItems = new EventEmitter();
        this.activeNavItem = null;
        this.path = new EventEmitter();
    }
}
Navigator.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
Navigator.ctorParameters = () => [];
/** @nocollapse */ Navigator.ngInjectableDef = defineInjectable({ factory: function Navigator_Factory() { return new Navigator(); }, token: Navigator, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AppScreenComponent {
    /**
     * @param {?} reg
     * @param {?} router
     * @param {?} route
     * @param {?} navigator
     */
    constructor(reg, router, route, navigator) {
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
    ngOnInit() {
        const /** @type {?} */ params = this.route.snapshot.params;
        this.moduleName = params['module'];
        this.app = this.reg.getApp(this.moduleName, params['app']);
        this.models = this.app.models;
        this.renderSidebar();
        if (!this.route.firstChild) {
            // this.renderSidebar();
            this.navigator.path.emit([params['module'], params['app'], this.models[0].key]);
            this.router.navigate([`/${params['module']}`, params['app'], this.models[0].key]);
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
    }
    /**
     * @return {?}
     */
    renderSidebar() {
        const /** @type {?} */ items = [];
        const /** @type {?} */ item = { title: this.app.label, type: 'subheading' };
        items.push(item);
        this.models.forEach(m => {
            const /** @type {?} */ i = { title: `${m.verbose_name}s`, url: `/${this.moduleName}/${this.app.key}/${m.key}` };
            items.push(i);
        });
        this.navigator.navItems.next(items);
    }
}
AppScreenComponent.decorators = [
    { type: Component, args: [{
                template: `<section class="app-settings">
  
  <!-- <mat-card>
    <p class="mat-subheading-1">Welcome to Cloudinn Settings</p>
  </mat-card> -->
  <div class="container">
    <router-outlet></router-outlet>
  </div>
</section>
`,
                styles: [`#custom-header{padding-top:12px;margin-bottom:12px}.page-title a{color:#333}.mat-tab-nav-bar,mat-tab-nav-bar{border:none!important}.tabs-bar a{color:#fff}`]
            },] },
];
/** @nocollapse */
AppScreenComponent.ctorParameters = () => [
    { type: Registry },
    { type: Router },
    { type: ActivatedRoute },
    { type: Navigator }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ApiService {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
    }
    /**
     * @param {?} api
     * @param {?=} params
     * @return {?}
     */
    fetch(api, params) {
        let /** @type {?} */ opts = new HttpParams();
        Object.keys(params).forEach(p => {
            if (params[p]) {
                opts = opts.set(p, params[p]);
            }
        });
        return this.http.get(api, { params: opts });
    }
    /**
     * @param {?} api
     * @param {?} body
     * @param {?=} params
     * @return {?}
     */
    put(api, body, params = {}) {
        let /** @type {?} */ opts = new HttpParams();
        Object.keys(params).forEach(p => {
            if (params[p]) {
                opts = opts.set(p, params[p]);
            }
        });
        return this.http.put(api, body, { params: opts });
    }
    /**
     * @param {?} api
     * @param {?} body
     * @param {?=} params
     * @return {?}
     */
    post(api, body, params = {}) {
        let /** @type {?} */ opts = new HttpParams();
        Object.keys(params).forEach(p => {
            if (params[p]) {
                opts = opts.set(p, params[p]);
            }
        });
        return this.http.post(api, body, { params: opts });
    }
}
ApiService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
ApiService.ctorParameters = () => [
    { type: HttpClient }
];
/** @nocollapse */ ApiService.ngInjectableDef = defineInjectable({ factory: function ApiService_Factory() { return new ApiService(inject(HttpClient)); }, token: ApiService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
FieldType[FieldType.Text] = "Text";
FieldType[FieldType.Number] = "Number";
FieldType[FieldType.Date] = "Date";
FieldType[FieldType.DateTime] = "DateTime";
FieldType[FieldType.Time] = "Time";
FieldType[FieldType.Boolean] = "Boolean";
FieldType[FieldType.ForeignKey] = "ForeignKey";
FieldType[FieldType.ManyToMany] = "ManyToMany";
FieldType[FieldType.File] = "File";
class Field {
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
class Fieldset {
    constructor() {
        this.is_fieldset = true;
    }
}
class Formset {
}
/**
 * @template T
 */
class AutoCompleteField extends FormControl {
    constructor() {
        super(...arguments);
        this.label = 'some label';
    }
}
class DefaultCrudForm {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ModelFormScreenComponent {
    /**
     * @param {?} api
     * @param {?} reg
     * @param {?} router
     * @param {?} route
     * @param {?} snackbar
     */
    constructor(api, reg, router, route, snackbar) {
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
    ngOnInit() {
        this.route.parent.params.subscribe(params => {
            this.module = params['module'];
            this.appName = params['app'];
        });
        this.route.params.subscribe(params => {
            this.modelName = params['model_name'];
            this.model = this.reg.getModel(this.module, this.appName, this.modelName);
            this.id = params['id'];
            if (this.id != null && this.id !== 'new') {
                this.mode = 'edit';
            }
        });
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onSubmit(e) {
        let /** @type {?} */ req = null;
        if (this.mode === 'edit') {
            req = this.api.put(this.model.api + this.id + '/', e);
        }
        else {
            req = this.api.post(this.model.api, e);
        }
        req.subscribe(res => {
            this.snackbar.open('Saved Successfully', 'Dismiss');
            this.router.navigate([this.module, this.appName, this.modelName]);
        }, err => {
            this.snackbar.open('Failed to save', 'Dismiss');
        });
    }
}
ModelFormScreenComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-crud-model-form-screen',
                template: `<!-- <mat-progress-bar *ngIf="isLoading" mode="query"></mat-progress-bar> -->

<!--<form>-->
<div class="wrapper">
    <mat-toolbar>
        <a routerLink="/" mat-icon-button class="mat-caption"><mat-icon>home</mat-icon></a>
        <mat-icon>keyboard_arrow_right</mat-icon>
        <a mat-button [routerLink]="'/'+module+'/'+appName" class="mat-caption">{{ appName }}</a>
        <mat-icon>keyboard_arrow_right</mat-icon>
        <a mat-button class="mat-caption" [routerLink]="'/'+module+'/'+appName+'/'+modelName">{{ model.verbose_name }}s</a>
        <mat-icon>keyboard_arrow_right</mat-icon>
        <span *ngIf="mode === 'edit'" class="mat-caption">{{ id }}</span>
        <span *ngIf="mode === 'create'" class="mat-caption">Creating new {{ modelName }}</span>
        <span class="toolbar-fill-remaining-space"></span>
    </mat-toolbar>

    <mat-card>
        <mat-card-content>
            <ng-crud-model-form [moduleName]="module" [appName]="appName" [mode]='mode'
                [modelName]="modelName" (submit)="onSubmit($event)" [id]="id"></ng-crud-model-form>
        </mat-card-content>
    </mat-card>
</div>`,
                styles: [`.wrapper {
    padding: 24px;
  }`],
                exportAs: 'ngcrudui-model-form-screen'
            },] },
];
/** @nocollapse */
ModelFormScreenComponent.ctorParameters = () => [
    { type: ApiService },
    { type: Registry },
    { type: Router },
    { type: ActivatedRoute },
    { type: MatSnackBar }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Module {
    constructor() {
        this.apps = [];
    }
}
class App {
    constructor() {
        this.models = [];
    }
}
class Model {
    constructor() {
        this.fields = [];
        this.formsets = [];
        this.actions = [];
        this.bulk_actions = [];
        this.list_actions = [];
        this.pageSize = 20;
    }
}
class DefaultForm {
    /**
     * @param {?} model
     */
    constructor(model) {
        this.model = model;
    }
}
class ListingScreen {
}
class EditingScreen {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FormService {
    constructor() { }
    /**
     * @param {?} fields
     * @return {?}
     */
    toFormGroup(fields) {
        const /** @type {?} */ controls = {};
        for (const /** @type {?} */ field of fields) {
            if (field.control_type === 'formset') {
                controls[field.key] = this.toFormArray(field.fields, field._value);
            }
            else {
                controls[field.key] = new FormControl(field._value);
            }
        }
        return new FormGroup(controls);
    }
    /**
     * @param {?} fields
     * @param {?} values
     * @return {?}
     */
    toFormArray(fields, values) {
        if (!values) {
            values = [];
        }
        const /** @type {?} */ groups = [];
        values.forEach(v => {
            // assign value to fields
            fields.map(f => {
                f._value = v[f.key];
            });
            const /** @type {?} */ group = this.toFormGroup(fields);
            groups.push(g);
        });
        // always add an empty row
        const /** @type {?} */ g = this.toFormGroup(fields);
        const /** @type {?} */ emptyValues = {};
        for (const /** @type {?} */ f of fields) {
            emptyValues[f.key] = null;
        }
        g.setValue(emptyValues);
        groups.push(g);
        return new FormArray(groups);
    }
}
FormService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
FormService.ctorParameters = () => [];
/** @nocollapse */ FormService.ngInjectableDef = defineInjectable({ factory: function FormService_Factory() { return new FormService(); }, token: FormService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ListingComponent {
    /**
     * @param {?} api
     * @param {?} reg
     * @param {?} route
     * @param {?} router
     */
    constructor(api, reg, route, router) {
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
    ngOnChanges() {
        if (this.modelName) {
            this.populateDataTable();
        }
    }
    /**
     * @return {?}
     */
    prepareColumns() {
        if (this.mode !== 'pick') {
            this.columns = [{ 'columnDef': 'checked', 'header': '' }];
        }
        else {
            this.columns = [];
        }
        this.model.listing_fields.map(field => {
            const /** @type {?} */ f = this.model.fields.filter(ff => ff.key === field)[0];
            const /** @type {?} */ col = {};
            col['columnDef'] = f.key;
            col['header'] = f.label;
            col['cell'] = (element) => `${element[f.key]}`;
            if (this.model.external_name_field === field) {
                col['clickable'] = true;
            }
            this.columns.push(col);
        });
        if (this.mode !== 'pick') {
            this.columns.push({ 'columnDef': 'actions', 'header': '' });
        }
    }
    /**
     * @return {?}
     */
    populateDataTable() {
        this.model = this.reg.getModel(this.moduleName, this.appName, this.modelName);
        this.prepareColumns();
        this.displayColumns = this.columns.map(c => c.columnDef);
        this.resultsCount = 0;
        this.dataSource.data = [];
        // this.displayColumns.push('actions');
        this.searchParams = { page: 1 };
        this.fetch();
    }
    /**
     * @return {?}
     */
    fetch() {
        this.api.fetch(this.model.api, this.searchParams).subscribe(res => {
            let /** @type {?} */ newItems = [];
            if (res.results) {
                newItems = this.dataSource.data.concat(res.results);
            }
            else {
                newItems = this.dataSource.data.concat(res);
            }
            this.resultsCount = newItems.length;
            this.dataSource.data = newItems;
            this.isLoading = false;
        }, err => {
            this.isLoading = false;
        });
    }
    /**
     * @param {?} id
     * @return {?}
     */
    getLink(id) {
        return ['/', this.moduleName, this.appName, this.modelName, id];
    }
    /**
     * @param {?} columnName
     * @param {?} row
     * @return {?}
     */
    cellClicked(columnName, row) {
        if (columnName === this.model.external_name_field) {
            this.router.navigate(this.getLink(row.id));
        }
    }
    /**
     * @param {?} searchParams
     * @return {?}
     */
    onSearch(searchParams) {
        this.isLoading = true;
        this.dataSource.data = [];
        this.resultsCount = 0;
        this.searchParams = searchParams;
        this.searchParams.page = 1;
        this.fetch();
    }
    /**
     * @param {?} row
     * @return {?}
     */
    onChecked(row) {
        row['is_checked'] = true;
    }
    /**
     * @return {?}
     */
    onCheckAll() {
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _picked(value) {
        this.picked.next(value);
    }
}
ListingComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-crud-listing',
                template: `<!-- <mat-toolbar>
    <a routerLink="/" mat-icon-button class="mat-caption"><mat-icon>home</mat-icon></a>
    <mat-icon>keyboard_arrow_right</mat-icon>
    <a mat-button [routerLink]="'/'+moduleName+'/'+appName" class="mat-caption">{{ appName }}</a>
    <mat-icon>keyboard_arrow_right</mat-icon>
    <a mat-button class="mat-caption">{{ model.verbose_name }}s</a>
    <span class="toolbar-fill-remaining-space"></span>
    <a mat-button [routerLink]="'/'+moduleName+'/'+appName+'/'+modelName+'/new'" color="primary">Create</a>
    &nbsp;
    <button mat-button color="warn" [matMenuTriggerFor]="menu">Bulk Actions <mat-icon>arrow_drop_down</mat-icon></button>    
    <mat-menu #menu="matMenu" >
        <button mat-menu-item>Delete</button>
    </mat-menu>
</mat-toolbar> -->

<div class="row" *ngIf="mode !== 'pick'">
    <span class="fill-remaining-space"></span>
    <button mat-button color="warn" [matMenuTriggerFor]="menu">Bulk Actions <mat-icon>arrow_drop_down</mat-icon></button>    
    <mat-menu #menu="matMenu" >
        <button mat-menu-item>Delete</button>
    </mat-menu>
</div>

<mat-expansion-panel>
    <mat-expansion-panel-header>
        <mat-panel-title>
            <mat-icon>search</mat-icon>
        </mat-panel-title>
        <mat-panel-description>
            Search and filter restults
        </mat-panel-description>                
    </mat-expansion-panel-header>

    <ng-crud-model-form [moduleName]="moduleName" [appName]="appName" mode='search'
                 [modelName]="modelName" (submit)="onSearch($event)"></ng-crud-model-form>

</mat-expansion-panel>    

<mat-progress-bar *ngIf="isLoading" mode="query"></mat-progress-bar>

<mat-table [dataSource]="dataSource">
    <ng-container *ngFor="let column of columns" [matColumnDef]="column.columnDef">
        <ng-template [ngIf]="column.columnDef === 'checked'">
            <mat-header-cell *matHeaderCellDef (click)="onCheckAll()"><mat-checkbox></mat-checkbox></mat-header-cell>
            <mat-cell *matCellDef="let row"> <mat-checkbox></mat-checkbox> </mat-cell>
        </ng-template>
        <ng-template [ngIf]="column.columnDef !== 'checked' && column.columnDef !== 'actions'">
            <mat-header-cell *matHeaderCellDef>{{ column.header }}</mat-header-cell>
            <mat-cell *matCellDef="let row">
                <!-- <a *ngIf="column.clickable; else normal" [routerLink]="getLink(row.id)">{{ column.cell(row) }}</a>
                <ng-template #normal>{{ column.cell(row) }}</ng-template>     -->
                <a class="clickable" [routerLink]="[row.id]" *ngIf="(mode !== 'pick' && column.columnDef === model.external_name_field); else normalCell">
                    {{ column.cell(row) }}
                </a>
                <ng-template #normalCell>
                    {{ column.cell(row) }}
                </ng-template>
            </mat-cell>
        </ng-template>
        <ng-template [ngIf]="column.columnDef === 'actions'">
            <mat-header-cell *matHeaderCellDef>{{ column.header }}</mat-header-cell>
            <mat-cell *matCellDef="let row">
                <button mat-button *ngFor="let action of model.list_actions">
                    {{ action }}
                </button>
            </mat-cell>
            </ng-template>
    </ng-container>

    <mat-header-row *matHeaderRowDef="displayColumns"></mat-header-row>
    <mat-row  *matRowDef="let row; columns: displayColumns;" [ngClass]="{'clickable': mode === 'pick'}" (click)="_picked(row[this.model.external_value_field])"></mat-row>
</mat-table>

<mat-paginator #paginator
    [length]="resultsCount"
    [pageIndex]="searchParams.page - 1"
    [pageSize]="20">
</mat-paginator>`,
                styles: [`.clickable{color:#00f;cursor:pointer}`],
                exportAs: 'ngcrudui-listing'
            },] },
];
/** @nocollapse */
ListingComponent.ctorParameters = () => [
    { type: ApiService },
    { type: Registry },
    { type: ActivatedRoute },
    { type: Router }
];
ListingComponent.propDecorators = {
    moduleName: [{ type: Input, args: ['moduleName',] }],
    appName: [{ type: Input, args: ['appName',] }],
    modelName: [{ type: Input, args: ['modelName',] }],
    mode: [{ type: Input }],
    forcedSearchParams: [{ type: Input }],
    picked: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ModelFormComponent {
    /**
     * @param {?} api
     * @param {?} reg
     * @param {?} formService
     */
    constructor(api, reg, formService) {
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
    ngOnChanges() {
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
    }
    /**
     * @return {?}
     */
    _onSubmit() {
        this.submit.emit(this.form.value);
    }
    /**
     * @param {?} values
     * @return {?}
     */
    buildForm(values) {
        if (values !== null) {
            this.fields.map(f => {
                f._value = values[f.key];
                return f;
            });
        }
        this.form = this.formService.toFormGroup(this.fields);
        // Check if the model has formsets, render them beneath the main form
        if (this.mode !== 'search' && this.model.formsets) {
            for (const /** @type {?} */ formset of this.model.formsets) {
                const /** @type {?} */ fs = this.formService.toFormArray(formset.fields, values[formset.key]);
                this.formsets.push(fs);
                this.form.addControl(formset.key, fs);
            }
        }
        this.is_ready = true;
    }
}
ModelFormComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-crud-model-form',
                template: `<!-- <mat-progress-bar *ngIf="isLoading" mode="query"></mat-progress-bar> -->

<ng-template [ngIf]="is_ready">
    <!-- <div class="form-container"> -->
    <div class="row">
        <ng-container *ngFor="let field of fields">
            <ng-crud-form-field  [form]="form" [field]="field"></ng-crud-form-field>
        </ng-container>
    </div>


    <div *ngFor="let formarray of formsets; let i=index">
        <mat-divider></mat-divider>
        <ng-crud-formset  [model]="model" [config]="model.formsets[i]"  [formarray]="formarray" [form]="form"></ng-crud-formset>        
    </div>

    <div class="row">
        <button mat-raised-button color="primary" class="submit-button" (click)="_onSubmit()">
            <span *ngIf="mode === 'search'">Search</span>
            <span *ngIf="mode === 'create'">Create</span>
            <span *ngIf="mode === 'edit'">Update</span>
        </button>
    </div>
</ng-template>`,
                styles: [`.row{display:flex;flex:1 1 auto;flex-flow:row wrap}.submit-button{align-self:flex-end}`],
                exportAs: 'ngcrudui-model-form'
            },] },
];
/** @nocollapse */
ModelFormComponent.ctorParameters = () => [
    { type: ApiService },
    { type: Registry },
    { type: FormService }
];
ModelFormComponent.propDecorators = {
    moduleName: [{ type: Input }],
    appName: [{ type: Input }],
    modelName: [{ type: Input }],
    mode: [{ type: Input }],
    id: [{ type: Input }],
    submit: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ListingDialogComponent {
    /**
     * @param {?} reg
     * @param {?} ref
     * @param {?} data
     */
    constructor(reg, ref, data) {
        this.reg = reg;
        this.ref = ref;
        this.data = data;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.moduleName = this.data['moduleName'];
        this.appName = this.data['appName'];
        this.modelName = this.data['modelName'];
    }
    /**
     * @param {?} value
     * @return {?}
     */
    picked(value) {
        console.log('picked', value);
        this.ref.close(value);
    }
}
ListingDialogComponent.decorators = [
    { type: Component, args: [{
                template: `<section class="app-settings" *ngIf="modelName">

  <ng-crud-listing (picked)="picked($event)" [modelName]="modelName" [appName]="appName" [moduleName]="moduleName" mode="pick">

  </ng-crud-listing>
</section>`,
                styles: [`#custom-header{padding-top:12px;margin-bottom:12px}.page-title a{color:#333}.mat-tab-nav-bar,mat-tab-nav-bar{border:none!important}.tabs-bar a{color:#fff}`]
            },] },
];
/** @nocollapse */
ListingDialogComponent.ctorParameters = () => [
    { type: Registry },
    { type: MatDialogRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
let /** @type {?} */ CHOICES = [];
let /** @type {?} */ FOREIGN_MODEL;
class FormFieldComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FormsetComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AutoCompleteFieldComponent {
    /**
     * @param {?} api
     * @param {?} reg
     */
    constructor(api, reg) {
        this.api = api;
        this.reg = reg;
        this.choices = [];
        this.dataSource = new Array();
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        if (!this.foreign_model) {
            return;
        }
        this.searchParams = { page: 1 };
        this.ctrl = /** @type {?} */ (this.form.get(this.field.key));
        console.log('foreign key value', this.ctrl.value);
        this.filteredOptions = of(this.choices);
        this.filteredOptions = this.ctrl.valueChanges.pipe(startWith(''), map((val) => this.filter(val)));
        // this.api.fetch(this.model.api, this.searchParams).subscribe(res => {
        //   this.dataSource.push(res['results']);
        // });
    }
    /**
     * @param {?} text
     * @return {?}
     */
    filter(text) {
        return this.choices.filter(option => {
            console.log(text);
            const /** @type {?} */ val = option[this.foreign_model.external_name_field];
            return val ? val.toLowerCase().indexOf(text.toLowerCase()) === 0 : false;
        });
    }
    /**
     * @param {?} data
     * @return {?}
     */
    valueFormatter(data) {
        return `(${data[this.model.external_value_field]}) ${data[this.model.external_name_field]}`;
    }
    /**
     * @param {?} foreign_model
     * @return {?}
     */
    displayWith(foreign_model) {
        return (item) => {
            return item[foreign_model.external_name_field];
        };
    }
}
AutoCompleteFieldComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-crud-autocomplete',
                template: `<mat-form-field [formGroup]="form">
  <input type="text" matInput [placeholder]="field.label" [formControl]="ctrl" [matAutocomplete]="auto">
  <mat-autocomplete #auto="matAutocomplete" [displayWith]="displayWith(foreign_model)">
      <mat-option *ngFor="let c of filteredOptions | async" [value]="c[foreign_model.external_value_field]">
        {{ c[foreign_model.external_name_field] }}
      </mat-option>
    </mat-autocomplete>
</mat-form-field>`,
                exportAs: 'ngcrudui-autocomplete'
            },] },
];
/** @nocollapse */
AutoCompleteFieldComponent.ctorParameters = () => [
    { type: ApiService },
    { type: Registry }
];
AutoCompleteFieldComponent.propDecorators = {
    model: [{ type: Input }],
    field: [{ type: Input }],
    foreign_model: [{ type: Input }],
    form: [{ type: Input }],
    choices: [{ type: Input }],
    forcedSearchParams: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ForeignKeyFieldComponent {
    /**
     * @param {?} api
     * @param {?} reg
     */
    constructor(api, reg) {
        this.api = api;
        this.reg = reg;
        this.forcedSearchParams = [];
        this.choices = [];
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        if (!this.formGroup) {
            return;
        }
        console.log(this.formGroup, this.field.key, this.formGroup.get(this.field.key));
        this.filteredOptions = (/** @type {?} */ (this.formGroup.get(this.field.key))).valueChanges.pipe(startWith(''), map(value => {
            console.log(value);
            return value ? value['code'] : value;
        }), map(code => code ? this._filter(name) : this.choices.slice()));
        console.log(this.formGroup);
        const /** @type {?} */ path = this.field.foreign_model_path.split('.');
        this.model = this.reg.getModel(path[0], path[1], path[2]);
        this.api.fetch(`${this.model.api}`, []).subscribe(res => {
            this.choices = res;
        });
    }
    /**
     * @param {?} option
     * @return {?}
     */
    displayFn(option) {
        return option ? option.code : option;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _filter(value) {
        const /** @type {?} */ filterValue = value.toLowerCase();
        console.log(filterValue);
        return this.choices.filter(option => option.code.toLowerCase().indexOf(filterValue) === 0);
    }
}
ForeignKeyFieldComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-crud-foreign-key-field',
                template: `<mat-form-field>
    <input type="text" matInput [formControlName]="field.key" [matAutocomplete]="auto">
</mat-form-field>

<mat-autocomplete #auto="matAutocomplete" [displayWith]="displayFn">
    <mat-option *ngFor="let option of choices" [value]="option[model.external_value_field]">
        {{ option[model.external_name_field] }}
    </mat-option>
</mat-autocomplete>`
            },] },
];
/** @nocollapse */
ForeignKeyFieldComponent.ctorParameters = () => [
    { type: ApiService },
    { type: Registry }
];
ForeignKeyFieldComponent.propDecorators = {
    formGroup: [{ type: Input }],
    forcedSearchParams: [{ type: Input }],
    field: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CrudModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { ListingScreenComponent, AppScreenComponent, ModelFormScreenComponent, Module, App, Model, DefaultForm, ListingScreen, EditingScreen, FieldType, Field, Fieldset, Formset, AutoCompleteField, DefaultCrudForm, Registry, Navigator, ApiService, FormService, CrudModule, AutoCompleteFieldComponent as ɵb, ForeignKeyFieldComponent as ɵf, FormFieldComponent as ɵa, FormsetComponent as ɵe, ListingComponent as ɵc, ModelFormComponent as ɵd, ListingDialogComponent as ɵg };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J1ZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vY3J1ZC9saWIvc2VydmljZXMvcmVnaXN0cnkuc2VydmljZS50cyIsIm5nOi8vY3J1ZC9saWIvY29udGFpbmVycy9saXN0aW5nLXNjcmVlbi9saXN0aW5nLXNjcmVlbi5jb21wb25lbnQudHMiLCJuZzovL2NydWQvbGliL3NlcnZpY2VzL25hdmlnYXRvci5zZXJ2aWNlLnRzIiwibmc6Ly9jcnVkL2xpYi9jb250YWluZXJzL2FwcC1zY3JlZW4vYXBwLXNjcmVlbi5jb21wb25lbnQudHMiLCJuZzovL2NydWQvbGliL3NlcnZpY2VzL2FwaS5zZXJ2aWNlLnRzIiwibmc6Ly9jcnVkL2xpYi9mb3Jtcy50cyIsIm5nOi8vY3J1ZC9saWIvY29tcG9uZW50cy9tb2RlbC1mb3JtLXNjcmVlbi9tb2RlbC1mb3JtLXNjcmVlbi5jb21wb25lbnQudHMiLCJuZzovL2NydWQvbGliL3NjcmVlbnMudHMiLCJuZzovL2NydWQvbGliL3NlcnZpY2VzL2Zvcm0uc2VydmljZS50cyIsIm5nOi8vY3J1ZC9saWIvY29tcG9uZW50cy9saXN0aW5nL2xpc3RpbmcuY29tcG9uZW50LnRzIiwibmc6Ly9jcnVkL2xpYi9jb21wb25lbnRzL21vZGVsLWZvcm0vbW9kZWwtZm9ybS5jb21wb25lbnQudHMiLCJuZzovL2NydWQvbGliL2NvbnRhaW5lcnMvbGlzdGluZy1kaWFsb2cvbGlzdGluZy1kaWFsb2cuY29tcG9uZW50LnRzIiwibmc6Ly9jcnVkL2xpYi9jb21wb25lbnRzL2Zvcm0tZmllbGQvZm9ybS1maWVsZC5jb21wb25lbnQudHMiLCJuZzovL2NydWQvbGliL2NvbXBvbmVudHMvZm9ybXNldC9mb3Jtc2V0LmNvbXBvbmVudC50cyIsIm5nOi8vY3J1ZC9saWIvY29tcG9uZW50cy9hdXRvLWNvbXBsZXRlLWZpZWxkL2F1dG8tY29tcGxldGUtZmllbGQuY29tcG9uZW50LnRzIiwibmc6Ly9jcnVkL2xpYi9jb21wb25lbnRzL2ZvcmVpZ24ta2V5LWZpZWxkL2ZvcmVpZ24ta2V5LWZpZWxkLmNvbXBvbmVudC50cyIsIm5nOi8vY3J1ZC9saWIvY3J1ZC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSAsICBTdWJqZWN0ICwgIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRmllbGQsIENydWRGb3JtIH0gZnJvbSAnLi4vZm9ybXMnO1xuaW1wb3J0IHsgQXBwLCBNb2RlbCB9IGZyb20gJy4uL3NjcmVlbnMnO1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFJlZ2lzdHJ5IHtcblxuICBwdWJsaWMgZm9ybXM6IHtba2V5OiBzdHJpbmddOiBGb3JtR3JvdXB9ID0ge307XG4gIHByaXZhdGUgcmVnaXN0cnk6IGFueSA9IHt9O1xuICBwdWJsaWMgaXNSZWFkeTogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIHJlZ2lzdGVyRm9ybShtZXRhZGF0YTogQ3J1ZEZvcm0sIGZvcm1DbGFzczogYW55KSB7XG4gICAgY29uc3QgY3RybHMgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGN0cmwgb2YgbWV0YWRhdGEuY29udHJvbHMpIHtcbiAgICAgIGN0cmxzW2N0cmwubmFtZV0gPSBuZXcgRm9ybUNvbnRyb2woe30sIGN0cmwudmFsaWRhdG9ycyk7XG4gICAgfVxuICAgIGNvbnN0IGYgPSBuZXcgRm9ybUdyb3VwKGN0cmxzKTtcbiAgICB0aGlzLmZvcm1zW21ldGFkYXRhLm5hbWVdID0gZjtcbiAgfVxuXG4gIHJlZ2lzdGVyKG1ldGE6IHt9KSB7XG4gICAgdGhpcy5yZWdpc3RyeSA9IG1ldGE7XG4gICAgdGhpcy5pc1JlYWR5Lm5leHQodHJ1ZSk7XG4gIH1cblxuICBnZXRNb2R1bGVzKCkge1xuICAgIHJldHVybiB0aGlzLnJlZ2lzdHJ5O1xuICB9XG5cbiAgZ2V0TW9kZWwobW9kdWxlTmFtZTogc3RyaW5nLCBhcHA6IHN0cmluZywga2V5OiBzdHJpbmcpOiBNb2RlbCB7XG4gICAgcmV0dXJuIHRoaXMucmVnaXN0cnlbbW9kdWxlTmFtZV0uYXBwcy5maWx0ZXIoKGE6IEFwcCkgPT4gYS5rZXkgPT09IGFwcClbMF1cbiAgICAgIC5tb2RlbHMuZmlsdGVyKG0gPT4gbS5rZXkgPT09IGtleSlbMF07XG4gIH1cblxuICBnZXRBcHAobW9kdWxlTmFtZTogc3RyaW5nLCBhcHA6IHN0cmluZyk6IEFwcCB7XG4gICAgcmV0dXJuIHRoaXMucmVnaXN0cnlbbW9kdWxlTmFtZV0uYXBwcy5maWx0ZXIoYSA9PiBhLmtleSA9PT0gYXBwKVswXTtcbiAgfVxuXG4gIGdldEFwcE1vZGVscyhtb2R1bGVOYW1lOiBzdHJpbmcsIGFwcDogc3RyaW5nKToge3N0cmluZzogTW9kZWx9IHtcbiAgICByZXR1cm4gdGhpcy5yZWdpc3RyeVttb2R1bGVOYW1lXS5hcHBzLmZpbHRlcihhID0+IGEua2V5ID09PSBhcHApLm1vZGVscztcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlICwgUm91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBSZWdpc3RyeSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3JlZ2lzdHJ5LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgdGVtcGxhdGU6IGA8c2VjdGlvbiBjbGFzcz1cImFwcC1zZXR0aW5nc1wiICpuZ0lmPVwibW9kZWxOYW1lXCI+XG5cbiAgPG5nLWNydWQtbGlzdGluZyBbbW9kZWxOYW1lXT1cIm1vZGVsTmFtZVwiIFthcHBOYW1lXT1cImFwcE5hbWVcIiBbbW9kdWxlTmFtZV09XCJtb2R1bGVOYW1lXCI+XG5cbiAgPC9uZy1jcnVkLWxpc3Rpbmc+XG48L3NlY3Rpb24+XG5gLFxuICBzdHlsZXM6IFtgI2N1c3RvbS1oZWFkZXJ7cGFkZGluZy10b3A6MTJweDttYXJnaW4tYm90dG9tOjEycHh9LnBhZ2UtdGl0bGUgYXtjb2xvcjojMzMzfS5tYXQtdGFiLW5hdi1iYXIsbWF0LXRhYi1uYXYtYmFye2JvcmRlcjpub25lIWltcG9ydGFudH0udGFicy1iYXIgYXtjb2xvcjojZmZmfWBdXG59KVxuZXhwb3J0IGNsYXNzIExpc3RpbmdTY3JlZW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgYXBwTmFtZTogc3RyaW5nID0gbnVsbDtcbiAgICBtb2R1bGVOYW1lOiBzdHJpbmcgPSBudWxsO1xuICAgIG1vZGVsTmFtZTogc3RyaW5nID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSByZWc6IFJlZ2lzdHJ5LFxuICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgLy8ga2VlcCBsaXN0ZW5pbmcgZm9yIHJvdXRlIHBhcmFtcyBjaGFuZ2VzLCBpbiBjYXNlIG9mXG4gICAgICAvLyB0aGUgbW9kZWwgbmFtZSBjaGFuZ2VkLCBlLmc6IGFub3RoZXIgbW9kZWwgY2xpY2tlZCBmcm9tXG4gICAgICAvLyB0aGUgbmF2IG1lbnVcbiAgICAgIHRoaXMucm91dGUucGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xuICAgICAgICBjb25zdCBwYXJlbnRQYXJhbXMgPSB0aGlzLnJvdXRlLnBhcmVudC5zbmFwc2hvdC5wYXJhbXM7XG4gICAgICAgIHRoaXMubW9kdWxlTmFtZSA9IHBhcmVudFBhcmFtc1snbW9kdWxlJ107XG4gICAgICAgIHRoaXMuYXBwTmFtZSA9IHBhcmVudFBhcmFtc1snYXBwJ107XG4gICAgICAgIHRoaXMubW9kZWxOYW1lID0gcGFyYW1zWydtb2RlbF9uYW1lJ107XG4gICAgICB9KTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBGb3JtQXJyYXkgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlICwgIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi4vZm9ybXMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5hdmlnYXRvciB7XG5cbiAgICBuYXZJdGVtczogRXZlbnRFbWl0dGVyPGFueVtdPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBhY3RpdmVOYXZJdGVtID0gbnVsbDtcbiAgICBwYXRoOiBFdmVudEVtaXR0ZXI8c3RyaW5nW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmdbXT4oKTtcblxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IFJlZ2lzdHJ5IH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQgeyBOYXZpZ2F0b3IgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9uYXZpZ2F0b3Iuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICB0ZW1wbGF0ZTogYDxzZWN0aW9uIGNsYXNzPVwiYXBwLXNldHRpbmdzXCI+XG4gIFxuICA8IS0tIDxtYXQtY2FyZD5cbiAgICA8cCBjbGFzcz1cIm1hdC1zdWJoZWFkaW5nLTFcIj5XZWxjb21lIHRvIENsb3VkaW5uIFNldHRpbmdzPC9wPlxuICA8L21hdC1jYXJkPiAtLT5cbiAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgIDxyb3V0ZXItb3V0bGV0Pjwvcm91dGVyLW91dGxldD5cbiAgPC9kaXY+XG48L3NlY3Rpb24+XG5gLFxuICBzdHlsZXM6IFtgI2N1c3RvbS1oZWFkZXJ7cGFkZGluZy10b3A6MTJweDttYXJnaW4tYm90dG9tOjEycHh9LnBhZ2UtdGl0bGUgYXtjb2xvcjojMzMzfS5tYXQtdGFiLW5hdi1iYXIsbWF0LXRhYi1uYXYtYmFye2JvcmRlcjpub25lIWltcG9ydGFudH0udGFicy1iYXIgYXtjb2xvcjojZmZmfWBdXG59KVxuZXhwb3J0IGNsYXNzIEFwcFNjcmVlbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgYXBwOiBhbnkgPSBudWxsO1xuICBtb2R1bGVOYW1lID0gbnVsbDtcbiAgbW9kZWxzID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWc6IFJlZ2lzdHJ5LFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgcHJpdmF0ZSBuYXZpZ2F0b3I6IE5hdmlnYXRvcixcbiAgKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBjb25zdCBwYXJhbXMgPSB0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtcztcbiAgICB0aGlzLm1vZHVsZU5hbWUgPSBwYXJhbXNbJ21vZHVsZSddO1xuICAgIHRoaXMuYXBwID0gdGhpcy5yZWcuZ2V0QXBwKHRoaXMubW9kdWxlTmFtZSwgcGFyYW1zWydhcHAnXSk7XG4gICAgdGhpcy5tb2RlbHMgPSB0aGlzLmFwcC5tb2RlbHM7XG5cbiAgICB0aGlzLnJlbmRlclNpZGViYXIoKTtcbiAgICBpZiAoIXRoaXMucm91dGUuZmlyc3RDaGlsZCkge1xuICAgICAgLy8gdGhpcy5yZW5kZXJTaWRlYmFyKCk7XG4gICAgICB0aGlzLm5hdmlnYXRvci5wYXRoLmVtaXQoW3BhcmFtc1snbW9kdWxlJ10sIHBhcmFtc1snYXBwJ10sIHRoaXMubW9kZWxzWzBdLmtleV0pO1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW2AvJHtwYXJhbXNbJ21vZHVsZSddfWAsIHBhcmFtc1snYXBwJ10sIHRoaXMubW9kZWxzWzBdLmtleV0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm5hdmlnYXRvci5wYXRoLmVtaXQoW3BhcmFtc1snbW9kdWxlJ10sIHBhcmFtc1snYXBwJ10sIHRoaXMucm91dGUuZmlyc3RDaGlsZC5zbmFwc2hvdC5wYXJhbXNbJ21vZGVsX25hbWUnXV0pO1xuXG4gICAgLy8gdGhpcy5yb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgLy8gICBjb25zb2xlLmxvZyhyZXMpO1xuICAgIC8vIH0pO1xuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucm91dGUuZmlyc3RDaGlsZC5zbmFwc2hvdC5wYXJhbXMpO1xuXG4gICAgLy8gaWYgKCFwYXJhbXNbJ21vZGVsX25hbWUnXSkge1xuICAgIC8vICAgdGhpcy5yZW5kZXJTaWRlYmFyKCk7XG4gICAgLy8gICAvLyB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbYC8ke3BhcmFtc1snbW9kdWxlJ119YCwgcGFyYW1zWydhcHAnXSwgdGhpcy5tb2RlbHNbMF0ua2V5XSk7XG4gICAgLy8gICByZXR1cm47XG4gICAgLy8gfVxuICB9XG5cbiAgLy8gbmdPbkNoYW5nZXMoKSB7XG4gIC8vICAgdGhpcy5yb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XG4gIC8vICAgICB0aGlzLm1vZHVsZU5hbWUgPSBwYXJhbXNbJ3BhcmVudF9hcHAnXTtcbiAgLy8gICAgIHRoaXMuYXBwID0gdGhpcy5yZWcuZ2V0QXBwKHBhcmFtc1snYXBwJ10pO1xuICAvLyAgICAgdGhpcy5tb2RlbHMgPSB0aGlzLnJlZy5nZXRBcHBNb2RlbHMocGFyYW1zWydhcHAnXSk7XG4gIC8vICAgfSk7XG4gIC8vIH1cbiAgcmVuZGVyU2lkZWJhcigpIHtcbiAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgIGNvbnN0IGl0ZW0gPSB7IHRpdGxlOiB0aGlzLmFwcC5sYWJlbCwgdHlwZTogJ3N1YmhlYWRpbmcnIH07XG4gICAgaXRlbXMucHVzaChpdGVtKTtcbiAgICB0aGlzLm1vZGVscy5mb3JFYWNoKG0gPT4ge1xuICAgICAgY29uc3QgaSA9IHt0aXRsZTogYCR7bS52ZXJib3NlX25hbWV9c2AsIHVybDogYC8ke3RoaXMubW9kdWxlTmFtZX0vJHt0aGlzLmFwcC5rZXl9LyR7bS5rZXl9YCB9O1xuICAgICAgaXRlbXMucHVzaChpKTtcbiAgICB9KTtcbiAgICB0aGlzLm5hdmlnYXRvci5uYXZJdGVtcy5uZXh0KGl0ZW1zKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBcGlTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkgeyB9XG5cbiAgICBwdWJsaWMgZmV0Y2goYXBpOiBzdHJpbmcsIHBhcmFtcz86IGFueSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGxldCBvcHRzID0gbmV3IEh0dHBQYXJhbXMoKTtcbiAgICAgICAgT2JqZWN0LmtleXMocGFyYW1zKS5mb3JFYWNoKHAgPT4ge1xuICAgICAgICAgICAgaWYgKHBhcmFtc1twXSkge1xuICAgICAgICAgICAgICAgIG9wdHMgPSBvcHRzLnNldChwLCBwYXJhbXNbcF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChhcGksIHtwYXJhbXM6IG9wdHN9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcHV0KGFwaTogc3RyaW5nLCBib2R5LCBwYXJhbXMgPSB7fSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGxldCBvcHRzID0gbmV3IEh0dHBQYXJhbXMoKTtcbiAgICAgICAgT2JqZWN0LmtleXMocGFyYW1zKS5mb3JFYWNoKHAgPT4ge1xuICAgICAgICAgICAgaWYgKHBhcmFtc1twXSkge1xuICAgICAgICAgICAgICAgIG9wdHMgPSBvcHRzLnNldChwLCBwYXJhbXNbcF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dChhcGksIGJvZHksIHtwYXJhbXM6IG9wdHN9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcG9zdChhcGk6IHN0cmluZywgYm9keSwgcGFyYW1zID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICBsZXQgb3B0cyA9IG5ldyBIdHRwUGFyYW1zKCk7XG4gICAgICAgIE9iamVjdC5rZXlzKHBhcmFtcykuZm9yRWFjaChwID0+IHtcbiAgICAgICAgICAgIGlmIChwYXJhbXNbcF0pIHtcbiAgICAgICAgICAgICAgICBvcHRzID0gb3B0cy5zZXQocCwgcGFyYW1zW3BdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KGFwaSwgYm9keSwge3BhcmFtczogb3B0c30pO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmFzZUZpZWxkIHtcbiAgbGFiZWw6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDcnVkRmllbGQge1xuICBuYW1lOiBzdHJpbmc7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHZhbGlkYXRvcnM/OiBhbnlbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDcnVkRm9ybSB7XG4gIG5hbWU6IHN0cmluZztcbiAgY29udHJvbHM6IENydWRGaWVsZFtdO1xufVxuXG5leHBvcnQgZW51bSBGaWVsZFR5cGUge1xuICBUZXh0LFxuICBOdW1iZXIsXG4gIERhdGUsXG4gIERhdGVUaW1lLFxuICBUaW1lLFxuICBCb29sZWFuLFxuICBGb3JlaWduS2V5LFxuICBNYW55VG9NYW55LFxuICAvLyBGb3JtU2V0LFxuICBGaWxlLFxufVxuXG5leHBvcnQgY2xhc3MgRmllbGQgaW1wbGVtZW50cyBCYXNlRmllbGQge1xuICBrZXk6IHN0cmluZztcbiAgbGFiZWw6IHN0cmluZztcbiAgdmFsdWVfdHlwZTogc3RyaW5nO1xuICBjb250cm9sX3R5cGU6IHN0cmluZztcbiAgaXNfZWRpdGFibGUgPSB0cnVlO1xuICBpc19zZWFyY2hhYmxlID0gdHJ1ZTtcbiAgaXNfaGlkZGVuID0gZmFsc2U7XG4gIC8vIGZvcmVpZ24ga2V5IGluZm9ybWF0aW9uXG4gIC8vIGZvcmVpZ25fbW9kZWw/OiBhbnkgPSBudWxsOyAvLyBldmFsdWF0ZWQgaW4gcnVuIHRpbWVcbiAgZm9yZWlnbl9tb2RlbF9wYXRoPzogc3RyaW5nO1xuICAvLyBjaG9pY2VzPzogYW55W107XG4gIGZpZWxkczogRmllbGRbXTtcbiAgY2hvaWNlczogYW55O1xuICBjb2xzcGFuID0gMTtcbiAgcm93c3BhbiA9IDE7XG5cbiAgX3ZhbHVlOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgbGFiZWw6IHN0cmluZyxcbiAgICBrZXk6IHN0cmluZyxcbiAgICB0eXBlOiBzdHJpbmcsXG4gICAgaXNfZWRpdGFibGU/OiBib29sZWFuLFxuICAgIGlzX3NlYXJjaGFibGU/OiBib29sZWFuLFxuICAgIGZvcmVpZ25fbW9kZWw/OiBhbnksXG4gICAgY29sb3JzPzogYW55XG4gICkge1xuICAgIHRoaXMua2V5ID0ga2V5O1xuICAgIHRoaXMubGFiZWwgPSBsYWJlbDtcbiAgICB0aGlzLnZhbHVlX3R5cGUgPSB0eXBlO1xuICAgIHRoaXMuaXNfZWRpdGFibGUgPSBpc19lZGl0YWJsZTtcbiAgICB0aGlzLmlzX3NlYXJjaGFibGUgPSBpc19zZWFyY2hhYmxlO1xuICAgIC8vIHRoaXMuZm9yZWlnbl9tb2RlbCA9IGZvcmVpZ25fbW9kZWw7XG4gIH1cblxufVxuXG5leHBvcnQgY2xhc3MgRmllbGRzZXQgaW1wbGVtZW50cyBCYXNlRmllbGQge1xuICBsYWJlbDogc3RyaW5nO1xuICBpc19maWVsZHNldCA9IHRydWU7XG4gIGZpZWxkczogRmllbGRbXTtcbn1cblxuZXhwb3J0IGNsYXNzIEZvcm1zZXQgaW1wbGVtZW50cyBCYXNlRmllbGQge1xuICBsYWJlbDogc3RyaW5nO1xuICBtb2RlbDogYW55O1xufVxuXG5leHBvcnQgY2xhc3MgQXV0b0NvbXBsZXRlRmllbGQ8VD4gZXh0ZW5kcyBGb3JtQ29udHJvbCB7XG4gIHZhbHVlOiBUO1xuICBsYWJlbCA9ICdzb21lIGxhYmVsJztcbn1cblxuZXhwb3J0IGNsYXNzIERlZmF1bHRDcnVkRm9ybSBpbXBsZW1lbnRzIENydWRGb3JtIHtcbiAgcHVibGljIG5hbWUgPSAnJztcbiAgcHVibGljIGNvbnRyb2xzID0gW107XG5cbiAgY29uc3RydWN0b3IocHVibGljIG1vZGVsOiBhbnkpIHtcbiAgICAgIHRoaXMubmFtZSA9IG1vZGVsLm5hbWU7XG4gICAgICBPYmplY3Qua2V5cyhtb2RlbCkuZm9yRWFjaCh2ID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyh2KTtcbiAgICAgICAgICB0aGlzLmNvbnRyb2xzLnB1c2gobmV3IEZvcm1Db250cm9sKHt9KSk7XG4gICAgICB9KTtcbiAgfVxufSIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgTWF0U25hY2tCYXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbmFjay1iYXInO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlICwgIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVnaXN0cnkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9yZWdpc3RyeS5zZXJ2aWNlJztcblxuXG5pbXBvcnQgeyBGaWVsZFR5cGUsIEZpZWxkIH0gZnJvbSAnLi4vLi4vZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy1jcnVkLW1vZGVsLWZvcm0tc2NyZWVuJyxcbiAgdGVtcGxhdGU6IGA8IS0tIDxtYXQtcHJvZ3Jlc3MtYmFyICpuZ0lmPVwiaXNMb2FkaW5nXCIgbW9kZT1cInF1ZXJ5XCI+PC9tYXQtcHJvZ3Jlc3MtYmFyPiAtLT5cblxuPCEtLTxmb3JtPi0tPlxuPGRpdiBjbGFzcz1cIndyYXBwZXJcIj5cbiAgICA8bWF0LXRvb2xiYXI+XG4gICAgICAgIDxhIHJvdXRlckxpbms9XCIvXCIgbWF0LWljb24tYnV0dG9uIGNsYXNzPVwibWF0LWNhcHRpb25cIj48bWF0LWljb24+aG9tZTwvbWF0LWljb24+PC9hPlxuICAgICAgICA8bWF0LWljb24+a2V5Ym9hcmRfYXJyb3dfcmlnaHQ8L21hdC1pY29uPlxuICAgICAgICA8YSBtYXQtYnV0dG9uIFtyb3V0ZXJMaW5rXT1cIicvJyttb2R1bGUrJy8nK2FwcE5hbWVcIiBjbGFzcz1cIm1hdC1jYXB0aW9uXCI+e3sgYXBwTmFtZSB9fTwvYT5cbiAgICAgICAgPG1hdC1pY29uPmtleWJvYXJkX2Fycm93X3JpZ2h0PC9tYXQtaWNvbj5cbiAgICAgICAgPGEgbWF0LWJ1dHRvbiBjbGFzcz1cIm1hdC1jYXB0aW9uXCIgW3JvdXRlckxpbmtdPVwiJy8nK21vZHVsZSsnLycrYXBwTmFtZSsnLycrbW9kZWxOYW1lXCI+e3sgbW9kZWwudmVyYm9zZV9uYW1lIH19czwvYT5cbiAgICAgICAgPG1hdC1pY29uPmtleWJvYXJkX2Fycm93X3JpZ2h0PC9tYXQtaWNvbj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJtb2RlID09PSAnZWRpdCdcIiBjbGFzcz1cIm1hdC1jYXB0aW9uXCI+e3sgaWQgfX08L3NwYW4+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwibW9kZSA9PT0gJ2NyZWF0ZSdcIiBjbGFzcz1cIm1hdC1jYXB0aW9uXCI+Q3JlYXRpbmcgbmV3IHt7IG1vZGVsTmFtZSB9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ0b29sYmFyLWZpbGwtcmVtYWluaW5nLXNwYWNlXCI+PC9zcGFuPlxuICAgIDwvbWF0LXRvb2xiYXI+XG5cbiAgICA8bWF0LWNhcmQ+XG4gICAgICAgIDxtYXQtY2FyZC1jb250ZW50PlxuICAgICAgICAgICAgPG5nLWNydWQtbW9kZWwtZm9ybSBbbW9kdWxlTmFtZV09XCJtb2R1bGVcIiBbYXBwTmFtZV09XCJhcHBOYW1lXCIgW21vZGVdPSdtb2RlJ1xuICAgICAgICAgICAgICAgIFttb2RlbE5hbWVdPVwibW9kZWxOYW1lXCIgKHN1Ym1pdCk9XCJvblN1Ym1pdCgkZXZlbnQpXCIgW2lkXT1cImlkXCI+PC9uZy1jcnVkLW1vZGVsLWZvcm0+XG4gICAgICAgIDwvbWF0LWNhcmQtY29udGVudD5cbiAgICA8L21hdC1jYXJkPlxuPC9kaXY+YCxcbiAgc3R5bGVzOiBbYC53cmFwcGVyIHtcbiAgICBwYWRkaW5nOiAyNHB4O1xuICB9YF0sXG4gIGV4cG9ydEFzOiAnbmdjcnVkdWktbW9kZWwtZm9ybS1zY3JlZW4nXG59KVxuZXhwb3J0IGNsYXNzIE1vZGVsRm9ybVNjcmVlbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBtb2R1bGU6IHN0cmluZztcbiAgICBhcHBOYW1lOiBzdHJpbmc7XG4gICAgbW9kZWxOYW1lOiBzdHJpbmc7XG4gICAgaWQ6IGFueSA9IG51bGw7XG4gICAgbW9kZSA9ICdjcmVhdGUnO1xuICAgIG5nTW9kZWw6IGFueSA9IHt9O1xuICAgIG1vZGVsOiBhbnk7XG4gICAgZmllbGRUeXBlOiB0eXBlb2YgRmllbGRUeXBlID0gRmllbGRUeXBlO1xuICAgIGVkaXRhYmxlRmllbGRzOiBGaWVsZFtdID0gW107XG4gICAgY2hvaWNlcyA9IHt9O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhcGk6IEFwaVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByZWc6IFJlZ2lzdHJ5LFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBzbmFja2JhcjogTWF0U25hY2tCYXIsXG4gICAgKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMucm91dGUucGFyZW50LnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcbiAgICAgICAgICAgIHRoaXMubW9kdWxlID0gcGFyYW1zWydtb2R1bGUnXTtcbiAgICAgICAgICAgIHRoaXMuYXBwTmFtZSA9IHBhcmFtc1snYXBwJ107XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcbiAgICAgICAgICAgIHRoaXMubW9kZWxOYW1lID0gcGFyYW1zWydtb2RlbF9uYW1lJ107XG4gICAgICAgICAgICB0aGlzLm1vZGVsID0gdGhpcy5yZWcuZ2V0TW9kZWwodGhpcy5tb2R1bGUsIHRoaXMuYXBwTmFtZSwgdGhpcy5tb2RlbE5hbWUpO1xuICAgICAgICAgICAgdGhpcy5pZCA9IHBhcmFtc1snaWQnXTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlkICE9IG51bGwgJiYgdGhpcy5pZCAhPT0gJ25ldycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGUgPSAnZWRpdCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgfVxuXG4gICAgb25TdWJtaXQoZSkge1xuICAgICAgICBsZXQgcmVxOiBPYnNlcnZhYmxlPGFueT4gPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5tb2RlID09PSAnZWRpdCcpIHtcbiAgICAgICAgICAgIHJlcSA9IHRoaXMuYXBpLnB1dCh0aGlzLm1vZGVsLmFwaSArIHRoaXMuaWQgKyAnLycsIGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVxID0gdGhpcy5hcGkucG9zdCh0aGlzLm1vZGVsLmFwaSwgZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVxLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgdGhpcy5zbmFja2Jhci5vcGVuKCdTYXZlZCBTdWNjZXNzZnVsbHknLCAnRGlzbWlzcycpO1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMubW9kdWxlLCB0aGlzLmFwcE5hbWUsIHRoaXMubW9kZWxOYW1lXSk7XG4gICAgICAgIH0sIGVyciA9PiB7XG4gICAgICAgICAgICB0aGlzLnNuYWNrYmFyLm9wZW4oJ0ZhaWxlZCB0byBzYXZlJywgJ0Rpc21pc3MnKTtcbiAgICAgICAgfSk7XG4gICB9XG5cbn1cbiIsImltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi9mb3Jtcyc7XG5cblxuZXhwb3J0IGNsYXNzIE1vZHVsZSB7XG4gICAgbGFiZWw6IHN0cmluZztcbiAgICBhcHBzOiBBcHBbXSA9IFtdO1xufVxuXG5leHBvcnQgY2xhc3MgQXBwIHtcbiAgICBrZXk6IHN0cmluZztcbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIGljb246IHN0cmluZztcbiAgICBtb2RlbHM6IE1vZGVsW10gPSBbXTtcbn1cblxuZXhwb3J0IGNsYXNzIE1vZGVsIHtcbiAgICBrZXk6IHN0cmluZztcbiAgICBhcGk6IHN0cmluZztcbiAgICB2ZXJib3NlX25hbWU6IHN0cmluZztcbiAgICBmaWVsZHM6IEZpZWxkW10gPSBbXTtcbiAgICBmb3Jtc2V0czogRmllbGRbXSA9IFtdO1xuICAgIGV4dGVybmFsX3ZhbHVlX2ZpZWxkOiBzdHJpbmc7XG4gICAgZXh0ZXJuYWxfbmFtZV9maWVsZDogc3RyaW5nO1xuICAgIGxpc3RpbmdfZmllbGRzOiBzdHJpbmdbXTtcblxuICAgIGFjdGlvbnM6IHN0cmluZ1tdID0gW107XG4gICAgYnVsa19hY3Rpb25zOiBzdHJpbmdbXSA9IFtdO1xuICAgIGxpc3RfYWN0aW9uczogc3RyaW5nW10gPSBbXTtcbiAgICBwYWdlU2l6ZTogTnVtYmVyID0gMjA7XG59XG5cbmV4cG9ydCBjbGFzcyBEZWZhdWx0Rm9ybSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIG1vZGVsOiBNb2RlbCkge31cbn1cblxuZXhwb3J0IGNsYXNzIExpc3RpbmdTY3JlZW4ge1xuICAgIG1vZGVsOiBNb2RlbDtcbn1cblxuXG5leHBvcnQgY2xhc3MgRWRpdGluZ1NjcmVlbiB7XG4gICAgbW9kZWw6IE1vZGVsO1xufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wsIEZvcm1BcnJheSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUgLCAgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuLi9mb3Jtcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1TZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgdG9Gb3JtR3JvdXAoZmllbGRzOiBGaWVsZFtdKTogRm9ybUdyb3VwIHtcbiAgICBjb25zdCBjb250cm9scyA9IHt9O1xuICAgIGZvciAoY29uc3QgZmllbGQgb2YgZmllbGRzKSB7XG4gICAgICBpZiAoZmllbGQuY29udHJvbF90eXBlID09PSAnZm9ybXNldCcpIHtcbiAgICAgICAgY29udHJvbHNbZmllbGQua2V5XSA9IHRoaXMudG9Gb3JtQXJyYXkoZmllbGQuZmllbGRzLCBmaWVsZC5fdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29udHJvbHNbZmllbGQua2V5XSA9IG5ldyBGb3JtQ29udHJvbChmaWVsZC5fdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3IEZvcm1Hcm91cChjb250cm9scyk7XG4gIH1cblxuICB0b0Zvcm1BcnJheShmaWVsZHM6IEZpZWxkW10sIHZhbHVlczogYW55W10pIHtcbiAgICBpZiAoIXZhbHVlcykge1xuICAgICAgdmFsdWVzID0gW107XG4gICAgfVxuICAgIGNvbnN0IGdyb3VwczogRm9ybUdyb3VwW10gPSBbXTtcbiAgICB2YWx1ZXMuZm9yRWFjaCh2ID0+IHtcbiAgICAgIC8vIGFzc2lnbiB2YWx1ZSB0byBmaWVsZHNcbiAgICAgIGZpZWxkcy5tYXAoZiA9PiB7XG4gICAgICAgIGYuX3ZhbHVlID0gdltmLmtleV07XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGdyb3VwID0gdGhpcy50b0Zvcm1Hcm91cChmaWVsZHMpO1xuICAgICAgZ3JvdXBzLnB1c2goZyk7XG4gICAgfSk7XG4gICAgLy8gYWx3YXlzIGFkZCBhbiBlbXB0eSByb3dcbiAgICBjb25zdCBnID0gdGhpcy50b0Zvcm1Hcm91cChmaWVsZHMpO1xuICAgIGNvbnN0IGVtcHR5VmFsdWVzID0ge307XG4gICAgZm9yIChjb25zdCBmIG9mIGZpZWxkcykge1xuICAgICAgZW1wdHlWYWx1ZXNbZi5rZXldID0gbnVsbDtcbiAgICB9XG4gICAgZy5zZXRWYWx1ZShlbXB0eVZhbHVlcyk7XG4gICAgZ3JvdXBzLnB1c2goZyk7XG4gICAgcmV0dXJuIG5ldyBGb3JtQXJyYXkoZ3JvdXBzKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uQ2hhbmdlcywgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE1hdFRhYmxlRGF0YVNvdXJjZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYmxlJztcblxuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IFJlZ2lzdHJ5IH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQgeyAgTW9kZWwgfSBmcm9tICcuLi8uLi9zY3JlZW5zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctY3J1ZC1saXN0aW5nJyxcbiAgdGVtcGxhdGU6IGA8IS0tIDxtYXQtdG9vbGJhcj5cbiAgICA8YSByb3V0ZXJMaW5rPVwiL1wiIG1hdC1pY29uLWJ1dHRvbiBjbGFzcz1cIm1hdC1jYXB0aW9uXCI+PG1hdC1pY29uPmhvbWU8L21hdC1pY29uPjwvYT5cbiAgICA8bWF0LWljb24+a2V5Ym9hcmRfYXJyb3dfcmlnaHQ8L21hdC1pY29uPlxuICAgIDxhIG1hdC1idXR0b24gW3JvdXRlckxpbmtdPVwiJy8nK21vZHVsZU5hbWUrJy8nK2FwcE5hbWVcIiBjbGFzcz1cIm1hdC1jYXB0aW9uXCI+e3sgYXBwTmFtZSB9fTwvYT5cbiAgICA8bWF0LWljb24+a2V5Ym9hcmRfYXJyb3dfcmlnaHQ8L21hdC1pY29uPlxuICAgIDxhIG1hdC1idXR0b24gY2xhc3M9XCJtYXQtY2FwdGlvblwiPnt7IG1vZGVsLnZlcmJvc2VfbmFtZSB9fXM8L2E+XG4gICAgPHNwYW4gY2xhc3M9XCJ0b29sYmFyLWZpbGwtcmVtYWluaW5nLXNwYWNlXCI+PC9zcGFuPlxuICAgIDxhIG1hdC1idXR0b24gW3JvdXRlckxpbmtdPVwiJy8nK21vZHVsZU5hbWUrJy8nK2FwcE5hbWUrJy8nK21vZGVsTmFtZSsnL25ldydcIiBjb2xvcj1cInByaW1hcnlcIj5DcmVhdGU8L2E+XG4gICAgJm5ic3A7XG4gICAgPGJ1dHRvbiBtYXQtYnV0dG9uIGNvbG9yPVwid2FyblwiIFttYXRNZW51VHJpZ2dlckZvcl09XCJtZW51XCI+QnVsayBBY3Rpb25zIDxtYXQtaWNvbj5hcnJvd19kcm9wX2Rvd248L21hdC1pY29uPjwvYnV0dG9uPiAgICBcbiAgICA8bWF0LW1lbnUgI21lbnU9XCJtYXRNZW51XCIgPlxuICAgICAgICA8YnV0dG9uIG1hdC1tZW51LWl0ZW0+RGVsZXRlPC9idXR0b24+XG4gICAgPC9tYXQtbWVudT5cbjwvbWF0LXRvb2xiYXI+IC0tPlxuXG48ZGl2IGNsYXNzPVwicm93XCIgKm5nSWY9XCJtb2RlICE9PSAncGljaydcIj5cbiAgICA8c3BhbiBjbGFzcz1cImZpbGwtcmVtYWluaW5nLXNwYWNlXCI+PC9zcGFuPlxuICAgIDxidXR0b24gbWF0LWJ1dHRvbiBjb2xvcj1cIndhcm5cIiBbbWF0TWVudVRyaWdnZXJGb3JdPVwibWVudVwiPkJ1bGsgQWN0aW9ucyA8bWF0LWljb24+YXJyb3dfZHJvcF9kb3duPC9tYXQtaWNvbj48L2J1dHRvbj4gICAgXG4gICAgPG1hdC1tZW51ICNtZW51PVwibWF0TWVudVwiID5cbiAgICAgICAgPGJ1dHRvbiBtYXQtbWVudS1pdGVtPkRlbGV0ZTwvYnV0dG9uPlxuICAgIDwvbWF0LW1lbnU+XG48L2Rpdj5cblxuPG1hdC1leHBhbnNpb24tcGFuZWw+XG4gICAgPG1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyPlxuICAgICAgICA8bWF0LXBhbmVsLXRpdGxlPlxuICAgICAgICAgICAgPG1hdC1pY29uPnNlYXJjaDwvbWF0LWljb24+XG4gICAgICAgIDwvbWF0LXBhbmVsLXRpdGxlPlxuICAgICAgICA8bWF0LXBhbmVsLWRlc2NyaXB0aW9uPlxuICAgICAgICAgICAgU2VhcmNoIGFuZCBmaWx0ZXIgcmVzdHVsdHNcbiAgICAgICAgPC9tYXQtcGFuZWwtZGVzY3JpcHRpb24+ICAgICAgICAgICAgICAgIFxuICAgIDwvbWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXI+XG5cbiAgICA8bmctY3J1ZC1tb2RlbC1mb3JtIFttb2R1bGVOYW1lXT1cIm1vZHVsZU5hbWVcIiBbYXBwTmFtZV09XCJhcHBOYW1lXCIgbW9kZT0nc2VhcmNoJ1xuICAgICAgICAgICAgICAgICBbbW9kZWxOYW1lXT1cIm1vZGVsTmFtZVwiIChzdWJtaXQpPVwib25TZWFyY2goJGV2ZW50KVwiPjwvbmctY3J1ZC1tb2RlbC1mb3JtPlxuXG48L21hdC1leHBhbnNpb24tcGFuZWw+ICAgIFxuXG48bWF0LXByb2dyZXNzLWJhciAqbmdJZj1cImlzTG9hZGluZ1wiIG1vZGU9XCJxdWVyeVwiPjwvbWF0LXByb2dyZXNzLWJhcj5cblxuPG1hdC10YWJsZSBbZGF0YVNvdXJjZV09XCJkYXRhU291cmNlXCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGNvbHVtbnNcIiBbbWF0Q29sdW1uRGVmXT1cImNvbHVtbi5jb2x1bW5EZWZcIj5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImNvbHVtbi5jb2x1bW5EZWYgPT09ICdjaGVja2VkJ1wiPlxuICAgICAgICAgICAgPG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZiAoY2xpY2spPVwib25DaGVja0FsbCgpXCI+PG1hdC1jaGVja2JveD48L21hdC1jaGVja2JveD48L21hdC1oZWFkZXItY2VsbD5cbiAgICAgICAgICAgIDxtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCByb3dcIj4gPG1hdC1jaGVja2JveD48L21hdC1jaGVja2JveD4gPC9tYXQtY2VsbD5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImNvbHVtbi5jb2x1bW5EZWYgIT09ICdjaGVja2VkJyAmJiBjb2x1bW4uY29sdW1uRGVmICE9PSAnYWN0aW9ucydcIj5cbiAgICAgICAgICAgIDxtYXQtaGVhZGVyLWNlbGwgKm1hdEhlYWRlckNlbGxEZWY+e3sgY29sdW1uLmhlYWRlciB9fTwvbWF0LWhlYWRlci1jZWxsPlxuICAgICAgICAgICAgPG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IHJvd1wiPlxuICAgICAgICAgICAgICAgIDwhLS0gPGEgKm5nSWY9XCJjb2x1bW4uY2xpY2thYmxlOyBlbHNlIG5vcm1hbFwiIFtyb3V0ZXJMaW5rXT1cImdldExpbmsocm93LmlkKVwiPnt7IGNvbHVtbi5jZWxsKHJvdykgfX08L2E+XG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNub3JtYWw+e3sgY29sdW1uLmNlbGwocm93KSB9fTwvbmctdGVtcGxhdGU+ICAgICAtLT5cbiAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImNsaWNrYWJsZVwiIFtyb3V0ZXJMaW5rXT1cIltyb3cuaWRdXCIgKm5nSWY9XCIobW9kZSAhPT0gJ3BpY2snICYmIGNvbHVtbi5jb2x1bW5EZWYgPT09IG1vZGVsLmV4dGVybmFsX25hbWVfZmllbGQpOyBlbHNlIG5vcm1hbENlbGxcIj5cbiAgICAgICAgICAgICAgICAgICAge3sgY29sdW1uLmNlbGwocm93KSB9fVxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI25vcm1hbENlbGw+XG4gICAgICAgICAgICAgICAgICAgIHt7IGNvbHVtbi5jZWxsKHJvdykgfX1cbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9tYXQtY2VsbD5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImNvbHVtbi5jb2x1bW5EZWYgPT09ICdhY3Rpb25zJ1wiPlxuICAgICAgICAgICAgPG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZj57eyBjb2x1bW4uaGVhZGVyIH19PC9tYXQtaGVhZGVyLWNlbGw+XG4gICAgICAgICAgICA8bWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgcm93XCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uICpuZ0Zvcj1cImxldCBhY3Rpb24gb2YgbW9kZWwubGlzdF9hY3Rpb25zXCI+XG4gICAgICAgICAgICAgICAgICAgIHt7IGFjdGlvbiB9fVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9tYXQtY2VsbD5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9uZy1jb250YWluZXI+XG5cbiAgICA8bWF0LWhlYWRlci1yb3cgKm1hdEhlYWRlclJvd0RlZj1cImRpc3BsYXlDb2x1bW5zXCI+PC9tYXQtaGVhZGVyLXJvdz5cbiAgICA8bWF0LXJvdyAgKm1hdFJvd0RlZj1cImxldCByb3c7IGNvbHVtbnM6IGRpc3BsYXlDb2x1bW5zO1wiIFtuZ0NsYXNzXT1cInsnY2xpY2thYmxlJzogbW9kZSA9PT0gJ3BpY2snfVwiIChjbGljayk9XCJfcGlja2VkKHJvd1t0aGlzLm1vZGVsLmV4dGVybmFsX3ZhbHVlX2ZpZWxkXSlcIj48L21hdC1yb3c+XG48L21hdC10YWJsZT5cblxuPG1hdC1wYWdpbmF0b3IgI3BhZ2luYXRvclxuICAgIFtsZW5ndGhdPVwicmVzdWx0c0NvdW50XCJcbiAgICBbcGFnZUluZGV4XT1cInNlYXJjaFBhcmFtcy5wYWdlIC0gMVwiXG4gICAgW3BhZ2VTaXplXT1cIjIwXCI+XG48L21hdC1wYWdpbmF0b3I+YCxcbiAgc3R5bGVzOiBbYC5jbGlja2FibGV7Y29sb3I6IzAwZjtjdXJzb3I6cG9pbnRlcn1gXSxcbiAgZXhwb3J0QXM6ICduZ2NydWR1aS1saXN0aW5nJ1xufSlcbmV4cG9ydCBjbGFzcyBMaXN0aW5nQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICAgIEBJbnB1dCgnbW9kdWxlTmFtZScpIG1vZHVsZU5hbWU6IHN0cmluZztcbiAgICBASW5wdXQoJ2FwcE5hbWUnKSBhcHBOYW1lOiBzdHJpbmc7XG4gICAgQElucHV0KCdtb2RlbE5hbWUnKSBtb2RlbE5hbWU6IHN0cmluZztcbiAgICBASW5wdXQoKSBtb2RlID0gJ25vcm1hbCc7IC8vIG90aGVyIG1vZGVzOiAncGljaydcbiAgICBpc19hY3Rpb25zX3NldCA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGZvcmNlZFNlYXJjaFBhcmFtczogYW55O1xuICAgIGRhdGFTb3VyY2UgPSBuZXcgTWF0VGFibGVEYXRhU291cmNlKCk7XG4gICAgc2VhcmNoUGFyYW1zID0ge1xuICAgICAgICBwYWdlOiAxLFxuICAgIH07XG4gICAgbW9kZWw6IE1vZGVsO1xuICAgIGNvbHVtbnMgPSBbXTtcbiAgICBkaXNwbGF5Q29sdW1uczogc3RyaW5nW10gPSBbXTtcbiAgICByZXN1bHRzQ291bnQgPSAwO1xuICAgIGlzTG9hZGluZyA9IHRydWU7XG4gICAgQE91dHB1dCgpIHBpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBpOiBBcGlTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcmVnOiBSZWdpc3RyeSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7fVxuXG4gICAgbmdPbkNoYW5nZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLm1vZGVsTmFtZSkge1xuICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZURhdGFUYWJsZSgpO1xuICAgICAgICB9XG4gICB9XG5cbiAgICBwcml2YXRlIHByZXBhcmVDb2x1bW5zKCkge1xuICAgICAgICBpZiAodGhpcy5tb2RlICE9PSAncGljaycpIHtcbiAgICAgICAgICAgIHRoaXMuY29sdW1ucyA9IFt7J2NvbHVtbkRlZic6ICdjaGVja2VkJywgJ2hlYWRlcic6ICcnfV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvbHVtbnMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1vZGVsLmxpc3RpbmdfZmllbGRzLm1hcChmaWVsZCA9PiB7XG4gICAgICAgICAgICBjb25zdCBmID0gdGhpcy5tb2RlbC5maWVsZHMuZmlsdGVyKGZmID0+IGZmLmtleSA9PT0gZmllbGQpWzBdO1xuICAgICAgICAgICAgY29uc3QgY29sID0ge307XG4gICAgICAgICAgICBjb2xbJ2NvbHVtbkRlZiddID0gZi5rZXk7XG4gICAgICAgICAgICBjb2xbJ2hlYWRlciddID0gZi5sYWJlbDtcbiAgICAgICAgICAgIGNvbFsnY2VsbCddID0gKGVsZW1lbnQ6IEVsZW1lbnQpID0+IGAke2VsZW1lbnRbZi5rZXldfWA7XG4gICAgICAgICAgICBpZiAodGhpcy5tb2RlbC5leHRlcm5hbF9uYW1lX2ZpZWxkID09PSBmaWVsZCkge1xuICAgICAgICAgICAgICAgIGNvbFsnY2xpY2thYmxlJ10gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb2x1bW5zLnB1c2goY29sKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh0aGlzLm1vZGUgIT09ICdwaWNrJykge1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5zLnB1c2goeydjb2x1bW5EZWYnOiAnYWN0aW9ucycsICdoZWFkZXInOiAnJ30pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwb3B1bGF0ZURhdGFUYWJsZSgpIHtcbiAgICAgICAgdGhpcy5tb2RlbCA9IHRoaXMucmVnLmdldE1vZGVsKHRoaXMubW9kdWxlTmFtZSwgdGhpcy5hcHBOYW1lLCB0aGlzLm1vZGVsTmFtZSk7XG4gICAgICAgIHRoaXMucHJlcGFyZUNvbHVtbnMoKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5Q29sdW1ucyA9IHRoaXMuY29sdW1ucy5tYXAoYyA9PiBjLmNvbHVtbkRlZik7XG4gICAgICAgIHRoaXMucmVzdWx0c0NvdW50ID0gMDtcbiAgICAgICAgdGhpcy5kYXRhU291cmNlLmRhdGEgPSBbXTtcbiAgICAgICAgLy8gdGhpcy5kaXNwbGF5Q29sdW1ucy5wdXNoKCdhY3Rpb25zJyk7XG4gICAgICAgIHRoaXMuc2VhcmNoUGFyYW1zID0ge3BhZ2U6IDF9O1xuICAgICAgICB0aGlzLmZldGNoKCk7XG4gICAgfVxuXG4gICAgZmV0Y2goKSB7XG4gICAgICAgIHRoaXMuYXBpLmZldGNoKHRoaXMubW9kZWwuYXBpLCB0aGlzLnNlYXJjaFBhcmFtcykuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICBsZXQgbmV3SXRlbXMgPSBbXTtcbiAgICAgICAgICAgIGlmIChyZXMucmVzdWx0cykge1xuICAgICAgICAgICAgICAgIG5ld0l0ZW1zID0gdGhpcy5kYXRhU291cmNlLmRhdGEuY29uY2F0KHJlcy5yZXN1bHRzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3SXRlbXMgPSB0aGlzLmRhdGFTb3VyY2UuZGF0YS5jb25jYXQocmVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmVzdWx0c0NvdW50ID0gbmV3SXRlbXMubGVuZ3RoO1xuICAgICAgICAgICAgdGhpcy5kYXRhU291cmNlLmRhdGEgPSBuZXdJdGVtcztcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH0sIGVyciA9PiB7XG4gICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgIGdldExpbmsoaWQpOiBzdHJpbmdbXSB7XG4gICAgICAgcmV0dXJuIFsnLycsIHRoaXMubW9kdWxlTmFtZSwgdGhpcy5hcHBOYW1lLCB0aGlzLm1vZGVsTmFtZSwgaWRdO1xuICAgfVxuXG4gICBjZWxsQ2xpY2tlZChjb2x1bW5OYW1lOiBzdHJpbmcsIHJvdzogYW55KSB7XG4gICAgICAgaWYgKGNvbHVtbk5hbWUgPT09IHRoaXMubW9kZWwuZXh0ZXJuYWxfbmFtZV9maWVsZCkge1xuICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZSh0aGlzLmdldExpbmsocm93LmlkKSk7XG4gICAgICAgfVxuICAgfVxuXG4gICAgb25TZWFyY2goc2VhcmNoUGFyYW1zKSB7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5kYXRhU291cmNlLmRhdGEgPSBbXTtcbiAgICAgICAgdGhpcy5yZXN1bHRzQ291bnQgPSAwO1xuICAgICAgICB0aGlzLnNlYXJjaFBhcmFtcyA9IHNlYXJjaFBhcmFtcztcbiAgICAgICAgdGhpcy5zZWFyY2hQYXJhbXMucGFnZSA9IDE7XG4gICAgICAgIHRoaXMuZmV0Y2goKTtcbiAgICB9XG5cbiAgICBvbkNoZWNrZWQocm93KSB7XG4gICAgICAgIHJvd1snaXNfY2hlY2tlZCddID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBvbkNoZWNrQWxsKCkge1xuXG4gICAgfVxuXG4gICAgX3BpY2tlZCh2YWx1ZSkge1xuICAgICAgICB0aGlzLnBpY2tlZC5uZXh0KHZhbHVlKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25DaGFuZ2VzLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgRm9ybUdyb3VwLCBGb3JtQnVpbGRlciwgRm9ybUNvbnRyb2wsIEZvcm1BcnJheSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSAsICBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IFJlZ2lzdHJ5IH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQgeyBNb2RlbCB9IGZyb20gJy4uLy4uL3NjcmVlbnMnO1xuaW1wb3J0IHsgRm9ybVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9mb3JtLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmllbGRUeXBlLCBGaWVsZCwgQXV0b0NvbXBsZXRlRmllbGQgfSBmcm9tICcuLi8uLi9mb3Jtcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLWNydWQtbW9kZWwtZm9ybScsXG4gIHRlbXBsYXRlOiBgPCEtLSA8bWF0LXByb2dyZXNzLWJhciAqbmdJZj1cImlzTG9hZGluZ1wiIG1vZGU9XCJxdWVyeVwiPjwvbWF0LXByb2dyZXNzLWJhcj4gLS0+XG5cbjxuZy10ZW1wbGF0ZSBbbmdJZl09XCJpc19yZWFkeVwiPlxuICAgIDwhLS0gPGRpdiBjbGFzcz1cImZvcm0tY29udGFpbmVyXCI+IC0tPlxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZmllbGQgb2YgZmllbGRzXCI+XG4gICAgICAgICAgICA8bmctY3J1ZC1mb3JtLWZpZWxkICBbZm9ybV09XCJmb3JtXCIgW2ZpZWxkXT1cImZpZWxkXCI+PC9uZy1jcnVkLWZvcm0tZmllbGQ+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PlxuXG5cbiAgICA8ZGl2ICpuZ0Zvcj1cImxldCBmb3JtYXJyYXkgb2YgZm9ybXNldHM7IGxldCBpPWluZGV4XCI+XG4gICAgICAgIDxtYXQtZGl2aWRlcj48L21hdC1kaXZpZGVyPlxuICAgICAgICA8bmctY3J1ZC1mb3Jtc2V0ICBbbW9kZWxdPVwibW9kZWxcIiBbY29uZmlnXT1cIm1vZGVsLmZvcm1zZXRzW2ldXCIgIFtmb3JtYXJyYXldPVwiZm9ybWFycmF5XCIgW2Zvcm1dPVwiZm9ybVwiPjwvbmctY3J1ZC1mb3Jtc2V0PiAgICAgICAgXG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgIDxidXR0b24gbWF0LXJhaXNlZC1idXR0b24gY29sb3I9XCJwcmltYXJ5XCIgY2xhc3M9XCJzdWJtaXQtYnV0dG9uXCIgKGNsaWNrKT1cIl9vblN1Ym1pdCgpXCI+XG4gICAgICAgICAgICA8c3BhbiAqbmdJZj1cIm1vZGUgPT09ICdzZWFyY2gnXCI+U2VhcmNoPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJtb2RlID09PSAnY3JlYXRlJ1wiPkNyZWF0ZTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwibW9kZSA9PT0gJ2VkaXQnXCI+VXBkYXRlPC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbjwvbmctdGVtcGxhdGU+YCxcbiAgc3R5bGVzOiBbYC5yb3d7ZGlzcGxheTpmbGV4O2ZsZXg6MSAxIGF1dG87ZmxleC1mbG93OnJvdyB3cmFwfS5zdWJtaXQtYnV0dG9ue2FsaWduLXNlbGY6ZmxleC1lbmR9YF0sXG4gIGV4cG9ydEFzOiAnbmdjcnVkdWktbW9kZWwtZm9ybSdcbn0pXG5leHBvcnQgY2xhc3MgTW9kZWxGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICAgIEBJbnB1dCgpIG1vZHVsZU5hbWU6IHN0cmluZztcbiAgICBASW5wdXQoKSBhcHBOYW1lOiBzdHJpbmc7XG4gICAgQElucHV0KCkgbW9kZWxOYW1lOiBzdHJpbmc7XG4gICAgQElucHV0KCkgbW9kZSA9ICdzZWFyY2gnO1xuICAgIEBJbnB1dCgpIGlkOiBudW1iZXIgPSBudWxsO1xuICAgIG5nTW9kZWw6IGFueSA9IHt9O1xuICAgIG1vZGVsOiBNb2RlbDtcbiAgICBmaWVsZFR5cGU6IHR5cGVvZiBGaWVsZFR5cGUgPSBGaWVsZFR5cGU7XG4gICAgQXV0b0NvbXBsZXRlRmllbGQ6IHR5cGVvZiBBdXRvQ29tcGxldGVGaWVsZCA9IEF1dG9Db21wbGV0ZUZpZWxkO1xuICAgIGZpZWxkczogRmllbGRbXSA9IFtdO1xuICAgIGNob2ljZXMgPSB7fTtcbiAgICBAT3V0cHV0KCkgc3VibWl0ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgZm9ybTogRm9ybUdyb3VwID0gbmV3IEZvcm1Hcm91cCh7fSk7XG4gICAgZm9ybXNldDogRm9ybUFycmF5ID0gbmV3IEZvcm1BcnJheShbXSk7XG4gICAgZm9ybXNldHM6IEZvcm1BcnJheVtdID0gbmV3IEFycmF5PEZvcm1BcnJheT4oKTtcbiAgICBpc19yZWFkeSA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgYXBpOiBBcGlTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHJlZzogUmVnaXN0cnksXG4gICAgICAgIHByaXZhdGUgZm9ybVNlcnZpY2U6IEZvcm1TZXJ2aWNlLFxuICAgICkge1xuXG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoKSB7XG4gICAgICAgIGlmICghdGhpcy5hcHBOYW1lIHx8ICF0aGlzLm1vZGVsTmFtZSB8fCAhdGhpcy5tb2R1bGVOYW1lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mb3JtID0gdGhpcy5yZWcuZm9ybXNbdGhpcy5tb2RlbE5hbWVdO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmZvcm0pO1xuICAgICAgICAvLyB0aGlzLm1vZGVsID0gdGhpcy5yZWcuZ2V0TW9kZWwodGhpcy5tb2R1bGVOYW1lLCB0aGlzLmFwcE5hbWUsIHRoaXMubW9kZWxOYW1lKTtcbiAgICAgICAgLy8gaWYgKHRoaXMubW9kZSA9PT0gJ3NlYXJjaCcpIHtcbiAgICAgICAgLy8gICAgIHRoaXMuZmllbGRzID0gdGhpcy5tb2RlbC5maWVsZHMuZmlsdGVyKChmOiBGaWVsZCkgPT4gIShmLmlzX3NlYXJjaGFibGUgPT09IGZhbHNlKSk7XG4gICAgICAgIC8vICAgICB0aGlzLmJ1aWxkRm9ybShudWxsKTtcbiAgICAgICAgLy8gfSBlbHNlIGlmICh0aGlzLm1vZGUgPT09ICdlZGl0Jykge1xuICAgICAgICAvLyAgICAgLy8gZWRpdCBtb2RlXG4gICAgICAgIC8vICAgICBjb25zdCBhcGkgPSBgJHt0aGlzLm1vZGVsLmFwaX0ke3RoaXMuaWR9L2A7XG4gICAgICAgIC8vICAgICAvLyByZW1vdmUgdGhlIHVuZWRpdGFibGUgZmllbGRzXG4gICAgICAgIC8vICAgICB0aGlzLmZpZWxkcyA9IHRoaXMubW9kZWwuZmllbGRzLmZpbHRlcihmID0+IHtcbiAgICAgICAgLy8gICAgICAgICByZXR1cm4gIShmLmlzX2VkaXRhYmxlID09PSBmYWxzZSk7XG4gICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgLy8gICAgIHRoaXMuYXBpLmZldGNoKGFwaSwge30pLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuYnVpbGRGb3JtKHJlcyk7XG4gICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgLy8gICAgIHRoaXMuYnVpbGRGb3JtKG51bGwpO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgLy8gLy8gaWYgKHRoaXMubW9kZWwuZm9ybV90eXBlID09PSAnZm9ybXNldCcpIHtcbiAgICAgICAgLy8gLy8gICAgIHRoaXMuZm9ybXNldCA9IHRoaXMuZm9ybVNlcnZpY2UudG9Gb3JtQXJyYXkodGhpcy5maWVsZHMsIFtdKTtcbiAgICAgICAgLy8gLy8gfSBlbHNlIHtcbiAgICAgICAgLy8gLy8gICAgIHRoaXMuZm9ybSA9IHRoaXMuZm9ybVNlcnZpY2UudG9Gb3JtR3JvdXAodGhpcy5maWVsZHMpO1xuICAgICAgICAvLyAvLyB9XG4gICAgfVxuXG4gICAgX29uU3VibWl0KCkge1xuICAgICAgICB0aGlzLnN1Ym1pdC5lbWl0KHRoaXMuZm9ybS52YWx1ZSk7XG4gICAgfVxuXG4gICAgYnVpbGRGb3JtKHZhbHVlczogYW55KSB7XG4gICAgICAgIGlmICh2YWx1ZXMgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZmllbGRzLm1hcChmID0+IHtcbiAgICAgICAgICAgICAgICBmLl92YWx1ZSA9IHZhbHVlc1tmLmtleV07XG4gICAgICAgICAgICAgICAgcmV0dXJuIGY7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZvcm0gPSB0aGlzLmZvcm1TZXJ2aWNlLnRvRm9ybUdyb3VwKHRoaXMuZmllbGRzKTtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIG1vZGVsIGhhcyBmb3Jtc2V0cywgcmVuZGVyIHRoZW0gYmVuZWF0aCB0aGUgbWFpbiBmb3JtXG4gICAgICAgIGlmICh0aGlzLm1vZGUgIT09ICdzZWFyY2gnICYmIHRoaXMubW9kZWwuZm9ybXNldHMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgZm9ybXNldCBvZiB0aGlzLm1vZGVsLmZvcm1zZXRzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZnMgPSB0aGlzLmZvcm1TZXJ2aWNlLnRvRm9ybUFycmF5KGZvcm1zZXQuZmllbGRzLCB2YWx1ZXNbZm9ybXNldC5rZXldKTtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm1zZXRzLnB1c2goZnMpO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9ybS5hZGRDb250cm9sKGZvcm1zZXQua2V5LCBmcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pc19yZWFkeSA9IHRydWU7XG4gICAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSAsIFJvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE1BVF9ESUFMT0dfREFUQSwgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcblxuaW1wb3J0IHsgUmVnaXN0cnkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9yZWdpc3RyeS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHRlbXBsYXRlOiBgPHNlY3Rpb24gY2xhc3M9XCJhcHAtc2V0dGluZ3NcIiAqbmdJZj1cIm1vZGVsTmFtZVwiPlxuXG4gIDxuZy1jcnVkLWxpc3RpbmcgKHBpY2tlZCk9XCJwaWNrZWQoJGV2ZW50KVwiIFttb2RlbE5hbWVdPVwibW9kZWxOYW1lXCIgW2FwcE5hbWVdPVwiYXBwTmFtZVwiIFttb2R1bGVOYW1lXT1cIm1vZHVsZU5hbWVcIiBtb2RlPVwicGlja1wiPlxuXG4gIDwvbmctY3J1ZC1saXN0aW5nPlxuPC9zZWN0aW9uPmAsXG4gIHN0eWxlczogW2AjY3VzdG9tLWhlYWRlcntwYWRkaW5nLXRvcDoxMnB4O21hcmdpbi1ib3R0b206MTJweH0ucGFnZS10aXRsZSBhe2NvbG9yOiMzMzN9Lm1hdC10YWItbmF2LWJhcixtYXQtdGFiLW5hdi1iYXJ7Ym9yZGVyOm5vbmUhaW1wb3J0YW50fS50YWJzLWJhciBhe2NvbG9yOiNmZmZ9YF1cbn0pXG5leHBvcnQgY2xhc3MgTGlzdGluZ0RpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBtb2R1bGVOYW1lOiBzdHJpbmc7XG4gICAgYXBwTmFtZTogc3RyaW5nO1xuICAgIG1vZGVsTmFtZTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIHJlZzogUmVnaXN0cnksXG4gICAgICBwcml2YXRlIHJlZjogTWF0RGlhbG9nUmVmPExpc3RpbmdEaWFsb2dDb21wb25lbnQ+LFxuICAgICAgQEluamVjdChNQVRfRElBTE9HX0RBVEEpIHB1YmxpYyBkYXRhOiBhbnksXG4gICAgKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICB0aGlzLm1vZHVsZU5hbWUgPSB0aGlzLmRhdGFbJ21vZHVsZU5hbWUnXTtcbiAgICAgIHRoaXMuYXBwTmFtZSA9IHRoaXMuZGF0YVsnYXBwTmFtZSddO1xuICAgICAgdGhpcy5tb2RlbE5hbWUgPSB0aGlzLmRhdGFbJ21vZGVsTmFtZSddO1xuICAgIH1cblxuICAgIHBpY2tlZCh2YWx1ZSkge1xuICAgICAgY29uc29sZS5sb2coJ3BpY2tlZCcsIHZhbHVlKTtcbiAgICAgIHRoaXMucmVmLmNsb3NlKHZhbHVlKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25DaGFuZ2VzLCBJbnB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHN0YXJ0V2l0aCwgZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWF0RGlhbG9nIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcblxuaW1wb3J0IHsgIE1vZGVsIH0gZnJvbSAnLi4vLi4vc2NyZWVucyc7XG5pbXBvcnQgeyBSZWdpc3RyeSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3JlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi4vLi4vZm9ybXMnO1xuaW1wb3J0IHsgTGlzdGluZ0RpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvbnRhaW5lcnMvbGlzdGluZy1kaWFsb2cvbGlzdGluZy1kaWFsb2cuY29tcG9uZW50JztcblxubGV0IENIT0lDRVMgPSBbXTtcbmxldCBGT1JFSUdOX01PREVMO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy1jcnVkLWZvcm0tZmllbGQnLFxuICB0ZW1wbGF0ZTogYDxkaXYgW25nU3dpdGNoXT1cImZpZWxkLmNvbnRyb2xfdHlwZVwiIGNsYXNzPVwiZm9ybS1maWVsZC13cmFwcGVyXCIgW2Zvcm1Hcm91cF09XCJmb3JtXCI+XG5cbiAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInc3dpdGNoJ1wiPlxuICAgICAgICA8bWF0LXNsaWRlLXRvZ2dsZSBtYXRJbnB1dCBbZm9ybUNvbnRyb2xOYW1lXT1cImZpZWxkLmtleVwiPnt7IGZpZWxkLmxhYmVsIH19PC9tYXQtc2xpZGUtdG9nZ2xlPlxuICAgIDwvZGl2PlxuXG4gICAgPG1hdC1mb3JtLWZpZWxkICpuZ1N3aXRjaENhc2U9XCIndGV4dGFyZWEnXCI+XG4gICAgICAgIDxtYXQtbGFiZWw+e3sgZmllbGQubGFiZWwgfX08L21hdC1sYWJlbD5cbiAgICAgICAgPHRleHRhcmVhIG1hdElucHV0IG1hdFRleHRhcmVhQXV0b3NpemUgW2Zvcm1Db250cm9sTmFtZV09XCJmaWVsZC5rZXlcIlxuICAgICAgICAgICAgW3Jvd3NdPVwiZmllbGQucm93c3BhbiB8fCAxXCI+PC90ZXh0YXJlYT5cbiAgICA8L21hdC1mb3JtLWZpZWxkPlxuXG4gICAgPG1hdC1mb3JtLWZpZWxkICpuZ1N3aXRjaENhc2U9XCInc2VsZWN0J1wiPlxuICAgICAgICA8bWF0LWxhYmVsPnt7IGZpZWxkLmxhYmVsIH19PC9tYXQtbGFiZWw+XG4gICAgICAgIDxtYXQtc2VsZWN0IFtmb3JtQ29udHJvbE5hbWVdPVwiZmllbGQua2V5XCI+XG4gICAgICAgICAgICA8bWF0LW9wdGlvbj48L21hdC1vcHRpb24+XG4gICAgICAgICAgICA8bWF0LW9wdGlvbiBbdmFsdWVdPVwiYy52YWx1ZVwiICpuZ0Zvcj1cImxldCBjIG9mIGZpZWxkLmNob2ljZXNcIj5cbiAgICAgICAgICAgICAgICB7eyBjLmxhYmVsIH19XG4gICAgICAgICAgICA8L21hdC1vcHRpb24+XG4gICAgICAgIDwvbWF0LXNlbGVjdD5cbiAgICA8L21hdC1mb3JtLWZpZWxkPlxuXG4gICAgPG1hdC1mb3JtLWZpZWxkICpuZ1N3aXRjaENhc2U9XCInZGF0ZSdcIj5cbiAgICAgICAgPG1hdC1sYWJlbD57eyBmaWVsZC5sYWJlbCB9fTwvbWF0LWxhYmVsPlxuICAgICAgICA8aW5wdXQgIG1hdElucHV0IFtmb3JtQ29udHJvbE5hbWVdPVwiZmllbGQua2V5XCIgIFttYXREYXRlcGlja2VyXT1cIm15RGF0ZXBpY2tlclwiIC8+XG4gICAgICAgIDxtYXQtZGF0ZXBpY2tlci10b2dnbGUgbWF0U3VmZml4IFtmb3JdPVwibXlEYXRlcGlja2VyXCI+PC9tYXQtZGF0ZXBpY2tlci10b2dnbGU+XG4gICAgICAgIDxtYXQtZGF0ZXBpY2tlciAjbXlEYXRlcGlja2VyPjwvbWF0LWRhdGVwaWNrZXI+XG4gICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICBcbiAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCInZm9yZWlnbl9rZXknXCI+XG4gICAgICAgIDxtYXQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgIDxtYXQtbGFiZWw+e3sgZmllbGQubGFiZWwgfX08L21hdC1sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG1hdElucHV0IFtmb3JtQ29udHJvbE5hbWVdPVwiZmllbGQua2V5XCIgW21hdEF1dG9jb21wbGV0ZV09XCJhdXRvXCI+XG4gICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgICAgIDwhLS0gPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gKGNsaWNrKT1cIm9wZW5MaXN0aW5nRGlhbG9nKClcIj48bWF0LWljb24+c2VhcmNoPC9tYXQtaWNvbj48L2J1dHRvbj4gLS0+XG4gICAgICAgIFxuICAgICAgICA8bWF0LWF1dG9jb21wbGV0ZSAjYXV0bz1cIm1hdEF1dG9jb21wbGV0ZVwiIFtkaXNwbGF5V2l0aF09XCJkaXNwbGF5Rm5cIj5cbiAgICAgICAgICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgZmlsdGVyZWRPcHRpb25zIHwgYXN5bmNcIiBbdmFsdWVdPVwib3B0aW9uW2ZvcmVpZ25fbW9kZWwuZXh0ZXJuYWxfdmFsdWVfZmllbGRdXCI+XG4gICAgICAgICAgICAgICAge3sgb3B0aW9uW2ZvcmVpZ25fbW9kZWwuZXh0ZXJuYWxfbmFtZV9maWVsZF0gfX1cbiAgICAgICAgICAgIDwvbWF0LW9wdGlvbj5cbiAgICAgICAgPC9tYXQtYXV0b2NvbXBsZXRlPlxuICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgPCEtLSB0aGlzIGZhbGxzYmFjayBmcm9tIG51bWJlciBhbmQgdGV4dCAtLT5cbiAgICA8bWF0LWZvcm0tZmllbGQgKm5nU3dpdGNoRGVmYXVsdD5cbiAgICAgICAgPG1hdC1sYWJlbD57eyBmaWVsZC5sYWJlbCB9fTwvbWF0LWxhYmVsPlxuICAgICAgICA8aW5wdXQgIG1hdElucHV0IFtmb3JtQ29udHJvbE5hbWVdPVwiZmllbGQua2V5XCJcbiAgICAgICAgICAgICAgICBbdHlwZV09XCJmaWVsZC5jb250cm9sX3R5cGUgfHwgZmllbGQudmFsdWVfdHlwZSB8fCAndGV4dCdcIiAvPlxuICAgIDwvbWF0LWZvcm0tZmllbGQ+XG5cbjwvZGl2PmAsXG4gIGV4cG9ydEFzOiAnbmdjcnVkdWktZm9ybS1maWVsZCcsXG4gIHN0eWxlczogWycuZm9ybS1maWVsZC13cmFwcGVye21hcmdpbi1yaWdodDogIDI0cHh9J11cbn0pXG5leHBvcnQgY2xhc3MgRm9ybUZpZWxkQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICBASW5wdXQoKSBmb3JtOiBBYnN0cmFjdENvbnRyb2w7XG4gIEBJbnB1dCgpIGZvcmNlZFNlYXJjaFBhcmFtczogYW55ID0gW107XG4gIEBJbnB1dCgpIGZpZWxkOiBGaWVsZDtcbiAgQElucHV0KCkgY2hvaWNlcztcbiAgZmlsdGVyZWRPcHRpb25zOiBPYnNlcnZhYmxlPGFueVtdPjtcbiAgZm9yZWlnbl9tb2RlbD86IE1vZGVsO1xuICBwcml2YXRlIG1vZGVsUGF0aDogc3RyaW5nW10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRpYWxvZzogTWF0RGlhbG9nLCBwcml2YXRlIGFwaTogQXBpU2VydmljZSwgcHJpdmF0ZSByZWc6IFJlZ2lzdHJ5KSB7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKHRoaXMuZmllbGQuY29udHJvbF90eXBlID09PSAnZm9yZWlnbl9rZXknKSB7XG4gICAgICBjb25zb2xlLmxvZygnZmlyc3QgY2hhbmdlJywgdGhpcy5jaG9pY2VzKTtcbiAgICAgIGNvbnN0IHBhdGggPSB0aGlzLmZpZWxkLmZvcmVpZ25fbW9kZWxfcGF0aC5zcGxpdCgnLicpO1xuICAgICAgdGhpcy5tb2RlbFBhdGggPSBwYXRoO1xuICAgICAgdGhpcy5mb3JlaWduX21vZGVsID0gdGhpcy5yZWcuZ2V0TW9kZWwocGF0aFswXSwgcGF0aFsxXSwgcGF0aFsyXSk7XG4gICAgICBGT1JFSUdOX01PREVMID0gdGhpcy5mb3JlaWduX21vZGVsO1xuICAgICAgaWYgKHRoaXMuY2hvaWNlcykge1xuICAgICAgICBjb25zb2xlLmxvZygnZm91bmQgY2hvaWNlcycpO1xuICAgICAgICB0aGlzLmZpbHRlcmVkT3B0aW9ucyA9IG9mKHRoaXMuY2hvaWNlcyk7XG4gICAgICB9XG4gICAgICAvLyB0aGlzLmFwaS5mZXRjaChgJHt0aGlzLmZvcmVpZ25fbW9kZWwuYXBpfWAsIFtdKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgIC8vICAgdGhpcy5jaG9pY2VzID0gcmVzO1xuICAgICAgLy8gICBDSE9JQ0VTID0gcmVzO1xuICAgICAgLy8gfSk7XG4gICAgICBjb25zdCBjdHJsID0gdGhpcy5mb3JtLmdldCh0aGlzLmZpZWxkLmtleSk7XG4gICAgICB0aGlzLmZpbHRlcmVkT3B0aW9ucyA9IGN0cmwudmFsdWVDaGFuZ2VzLnBpcGUoXG4gICAgICAgIHN0YXJ0V2l0aCgnJyksXG4gICAgICAgIGRlYm91bmNlVGltZSgyMDApLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgICBzd2l0Y2hNYXAodmFsID0+IHRoaXMuX2ZpbHRlcih2YWwgfHwgbnVsbCkpXG4gICAgICApO1xuICAgICAgLy8gaWYgKHRoaXMuZm9ybS52YWx1ZVt0aGlzLmZpZWxkLmtleV0pIHtcbiAgICAgIC8vICAgY29uc29sZS5sb2coJ3NldHRpbmcgY3RybCB2YWx1ZScsIHRoaXMuZm9ybS52YWx1ZVt0aGlzLmZpZWxkLmtleV0pO1xuICAgICAgLy8gICBjdHJsLnNldFZhbHVlKHRoaXMuZm9ybS52YWx1ZVt0aGlzLmZpZWxkLmtleV0pO1xuICAgICAgLy8gfVxuICAgIH1cbiAgfVxuXG4gIGdldEZvcm1Db250cm9sKGZpZWxkX25hbWU6IHN0cmluZyk6IEZvcm1Db250cm9sIHtcbiAgICByZXR1cm4gdGhpcy5mb3JtLmdldChmaWVsZF9uYW1lKSBhcyBGb3JtQ29udHJvbDtcbiAgfVxuXG4gIGRpc3BsYXlGbihvcHRpb24pIHtcbiAgICBmb3IgKGNvbnN0IGMgb2YgQ0hPSUNFUykge1xuICAgICAgaWYgKGNbJ2lkJ10gPT09IG9wdGlvbikge1xuICAgICAgICByZXR1cm4gY1tGT1JFSUdOX01PREVMWydleHRlcm5hbF9uYW1lX2ZpZWxkJ11dO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyByZXR1cm4gb3B0aW9uID8gb3B0aW9uLmNvZGUgOiBvcHRpb247XG4gIH1cblxuICBfZmlsdGVyKHZhbHVlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueVtdPiB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgpO1xuICAgIH1cbiAgICBjb25zdCBmaWx0ZXJWYWx1ZSA9IHZhbHVlID8gdmFsdWUudG9Mb3dlckNhc2UoKSA6IG51bGw7XG4gICAgY29uc3QgcGFyYW1zID0ge307XG4gICAgcGFyYW1zW3RoaXMuZm9yZWlnbl9tb2RlbC5leHRlcm5hbF9uYW1lX2ZpZWxkXSA9IGZpbHRlclZhbHVlO1xuICAgIHJldHVybiB0aGlzLmFwaS5mZXRjaChgJHt0aGlzLmZvcmVpZ25fbW9kZWwuYXBpfWAsIHBhcmFtcykucGlwZShcbiAgICAgIG1hcChyZXMgPT4ge1xuICAgICAgICAgIENIT0lDRVMgPSByZXM7XG4gICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH0pXG4gICAgKTtcbiAgICAvLyByZXR1cm4gdGhpcy5jaG9pY2VzLmZpbHRlcihvcHRpb24gPT4gb3B0aW9uLmNvZGUudG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlclZhbHVlKSA9PT0gMCk7XG4gIH1cblxuICBvcGVuTGlzdGluZ0RpYWxvZygpIHtcbiAgICBjb25zdCByZWYgPSB0aGlzLmRpYWxvZy5vcGVuKExpc3RpbmdEaWFsb2dDb21wb25lbnQsIHtcbiAgICAgIHdpZHRoOiAnOTAlJyxcbiAgICAgIGhlaWdodDogJzkwJScsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIG1vZHVsZU5hbWU6IHRoaXMubW9kZWxQYXRoWzBdLFxuICAgICAgICBhcHBOYW1lOiB0aGlzLm1vZGVsUGF0aFsxXSxcbiAgICAgICAgbW9kZWxOYW1lOiB0aGlzLm1vZGVsUGF0aFsyXVxuICAgICAgfVxuICAgIH0pO1xuICAgIHJlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICB0aGlzLmZvcm0uZ2V0KHRoaXMuZmllbGQua2V5KS5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25DaGFuZ2VzLCBJbnB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQXJyYXkgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7ICBNb2RlbCB9IGZyb20gJy4uLy4uL3NjcmVlbnMnO1xuaW1wb3J0IHsgUmVnaXN0cnkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9yZWdpc3RyeS5zZXJ2aWNlJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBGb3JtU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2Zvcm0uc2VydmljZSc7XG5pbXBvcnQgeyBGaWVsZCB9IGZyb20gJy4uLy4uL2Zvcm1zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctY3J1ZC1mb3Jtc2V0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IFtmb3JtR3JvdXBdPVwiZm9ybVwiICpuZ0lmPVwiZm9ybWFycmF5XCIgY2xhc3M9XCJmb3Jtc2V0XCI+XG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICA8aDQ+IHt7IGNvbmZpZy5sYWJlbCB9fTwvaDQ+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwic3BhY2VyXCI+PC9zcGFuPlxuICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiAoY2xpY2spPVwiYWRkRm9ybSgpXCI+XG4gICAgICAgICAgICA8bWF0LWljb24+YWRkX2NpcmNsZTwvbWF0LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgW2Zvcm1BcnJheU5hbWVdPVwiY29uZmlnLmtleVwiPlxuICAgICAgICA8bWF0LWdyaWQtbGlzdCBndXR0ZXJTaXplPVwiMTJcIiBbY29sc109XCJjb25maWcuZmllbGRzLmxlbmd0aFwiIHJvd0hlaWdodD1cIjYwXCIgICpuZ0Zvcj1cImxldCBjdHJsIG9mIGZvcm1hcnJheS5jb250cm9sczsgbGV0IGk9aW5kZXhcIiBbZm9ybUdyb3VwTmFtZV09XCJpXCI+XG4gICAgICAgICAgICA8bWF0LWdyaWQtdGlsZSAgKm5nRm9yPVwibGV0IGYgb2YgY29uZmlnLmZpZWxkc1wiPlxuICAgICAgICAgICAgICAgIHt7IGYuIGtleSB9fVxuICAgICAgICAgICAgICAgIDxuZy1jcnVkLWZvcm0tZmllbGQgW2Nob2ljZXNdPVwiY2hvaWNlc1tmLmtleV1cIiBbZm9ybV09XCJjdHJsXCIgW2ZpZWxkXT1cImZcIj48L25nLWNydWQtZm9ybS1maWVsZD5cbiAgICAgICAgICAgIDwvbWF0LWdyaWQtdGlsZT5cbiAgICAgICAgPC9tYXQtZ3JpZC1saXN0PlxuICAgIDwvZGl2PlxuPC9kaXY+YCxcbiAgc3R5bGVzOiBbYC5mb3Jtc2V0e3BhZGRpbmctdG9wOjEycHh9LnJvd3tkaXNwbGF5OmZsZXg7ZmxleDoxIDEgYXV0b30uc3BhY2Vye2ZsZXg6MSAxIGF1dG99YF0sXG4gIGV4cG9ydEFzOiAnbmdjcnVkdWktZm9ybXNldCdcbn0pXG5leHBvcnQgY2xhc3MgRm9ybXNldENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KCkgZm9ybTogRm9ybUdyb3VwO1xuICBASW5wdXQoKSBtb2RlbDogTW9kZWw7XG4gIEBJbnB1dCgpIGZvcm1hcnJheTogRm9ybUFycmF5O1xuICBASW5wdXQoKSBjb25maWc6IEZpZWxkO1xuICBjaG9pY2VzID0ge307XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhcGk6IEFwaVNlcnZpY2UsIHByaXZhdGUgcmVnOiBSZWdpc3RyeSwgcHJpdmF0ZSBmb3JtU2VydmljZTogRm9ybVNlcnZpY2UpIHtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5jb25maWcuZmlyc3RDaGFuZ2UpIHtcbiAgICAgIGZvciAoY29uc3QgZmllbGQgb2YgY2hhbmdlcy5jb25maWcuY3VycmVudFZhbHVlLmZpZWxkcykge1xuICAgICAgICBpZiAoZmllbGRbJ2NvbnRyb2xfdHlwZSddID09PSAnZm9yZWlnbl9rZXknKSB7XG4gICAgICAgICAgdGhpcy5nZXRDaG9pY2VzKGZpZWxkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFkZEZvcm0oKSB7XG4gICAgY29uc3QgY3RybCA9IHRoaXMuZm9ybVNlcnZpY2UudG9Gb3JtR3JvdXAodGhpcy5jb25maWcuZmllbGRzKTtcbiAgICB0aGlzLmZvcm1hcnJheS5wdXNoKGN0cmwpO1xuICB9XG5cbiAgZ2V0Q2hvaWNlcyhmaWVsZDogRmllbGQpIHtcbiAgICBjb25zdCBwYXRoID0gZmllbGQuZm9yZWlnbl9tb2RlbF9wYXRoLnNwbGl0KCcuJyk7XG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLnJlZy5nZXRNb2RlbChwYXRoWzBdLCBwYXRoWzFdLCBwYXRoWzJdKTtcbiAgICB0aGlzLmFwaS5mZXRjaChtb2RlbC5hcGksIHt9KS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgIHRoaXMuY2hvaWNlc1tmaWVsZC5rZXldID0gcmVzO1xuICAgICAgY29uc29sZS5sb2codGhpcy5jaG9pY2VzKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkNoYW5nZXMsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgYXMgb2JzZXJ2YWJsZU9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzdGFydFdpdGgsIG1hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyAgTW9kZWwgfSBmcm9tICcuLi8uLi9zY3JlZW5zJztcbmltcG9ydCB7IFJlZ2lzdHJ5IH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuLi8uLi9mb3Jtcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLWNydWQtYXV0b2NvbXBsZXRlJyxcbiAgdGVtcGxhdGU6IGA8bWF0LWZvcm0tZmllbGQgW2Zvcm1Hcm91cF09XCJmb3JtXCI+XG4gIDxpbnB1dCB0eXBlPVwidGV4dFwiIG1hdElucHV0IFtwbGFjZWhvbGRlcl09XCJmaWVsZC5sYWJlbFwiIFtmb3JtQ29udHJvbF09XCJjdHJsXCIgW21hdEF1dG9jb21wbGV0ZV09XCJhdXRvXCI+XG4gIDxtYXQtYXV0b2NvbXBsZXRlICNhdXRvPVwibWF0QXV0b2NvbXBsZXRlXCIgW2Rpc3BsYXlXaXRoXT1cImRpc3BsYXlXaXRoKGZvcmVpZ25fbW9kZWwpXCI+XG4gICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgYyBvZiBmaWx0ZXJlZE9wdGlvbnMgfCBhc3luY1wiIFt2YWx1ZV09XCJjW2ZvcmVpZ25fbW9kZWwuZXh0ZXJuYWxfdmFsdWVfZmllbGRdXCI+XG4gICAgICAgIHt7IGNbZm9yZWlnbl9tb2RlbC5leHRlcm5hbF9uYW1lX2ZpZWxkXSB9fVxuICAgICAgPC9tYXQtb3B0aW9uPlxuICAgIDwvbWF0LWF1dG9jb21wbGV0ZT5cbjwvbWF0LWZvcm0tZmllbGQ+YCxcbiAgZXhwb3J0QXM6ICduZ2NydWR1aS1hdXRvY29tcGxldGUnXG59KVxuZXhwb3J0IGNsYXNzIEF1dG9Db21wbGV0ZUZpZWxkQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICBASW5wdXQoKSBtb2RlbDogTW9kZWw7XG4gIEBJbnB1dCgpIGZpZWxkOiBGaWVsZDtcbiAgQElucHV0KCkgZm9yZWlnbl9tb2RlbDogTW9kZWw7XG4gIEBJbnB1dCgpIGZvcm06IEZvcm1Hcm91cDtcbiAgQElucHV0KCkgY2hvaWNlczogYW55W10gPSBbXTtcbiAgQElucHV0KCkgZm9yY2VkU2VhcmNoUGFyYW1zOiBhbnk7XG4gIGRhdGFTb3VyY2U6IGFueVtdID0gbmV3IEFycmF5KCk7XG4gIHNlYXJjaFBhcmFtczoge307XG4gIGZpbHRlcmVkT3B0aW9uczogT2JzZXJ2YWJsZTxhbnlbXT47XG4gIGN0cmw6IEZvcm1Db250cm9sO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBpOiBBcGlTZXJ2aWNlLCBwcml2YXRlIHJlZzogUmVnaXN0cnkpIHtcbiAgfVxuXG4gICBuZ09uQ2hhbmdlcygpIHtcbiAgICAgaWYgKCF0aGlzLmZvcmVpZ25fbW9kZWwpIHtcbiAgICAgICByZXR1cm47XG4gICAgIH1cbiAgICAgIHRoaXMuc2VhcmNoUGFyYW1zID0ge3BhZ2U6IDF9O1xuICAgICAgdGhpcy5jdHJsID0gdGhpcy5mb3JtLmdldCh0aGlzLmZpZWxkLmtleSkgYXMgRm9ybUNvbnRyb2w7XG4gICAgICBjb25zb2xlLmxvZygnZm9yZWlnbiBrZXkgdmFsdWUnLCB0aGlzLmN0cmwudmFsdWUpO1xuICAgICAgdGhpcy5maWx0ZXJlZE9wdGlvbnMgPSBvYnNlcnZhYmxlT2YodGhpcy5jaG9pY2VzKTtcbiAgICAgIHRoaXMuZmlsdGVyZWRPcHRpb25zID0gdGhpcy5jdHJsLnZhbHVlQ2hhbmdlcy5waXBlKFxuICAgICAgICBzdGFydFdpdGgoJycpLFxuICAgICAgICBtYXAoKHZhbDogc3RyaW5nKSA9PiB0aGlzLmZpbHRlcih2YWwpKVxuICAgICAgKTtcbiAgICAgIC8vIHRoaXMuYXBpLmZldGNoKHRoaXMubW9kZWwuYXBpLCB0aGlzLnNlYXJjaFBhcmFtcykuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAvLyAgIHRoaXMuZGF0YVNvdXJjZS5wdXNoKHJlc1sncmVzdWx0cyddKTtcbiAgICAgIC8vIH0pO1xuICAgfVxuXG4gICBmaWx0ZXIodGV4dDogc3RyaW5nKTogYW55W10ge1xuICAgIHJldHVybiB0aGlzLmNob2ljZXMuZmlsdGVyKG9wdGlvbiA9PiB7XG4gICAgICBjb25zb2xlLmxvZyh0ZXh0KTtcbiAgICAgIGNvbnN0IHZhbCA9IG9wdGlvblt0aGlzLmZvcmVpZ25fbW9kZWwuZXh0ZXJuYWxfbmFtZV9maWVsZF07XG4gICAgICByZXR1cm4gdmFsID8gdmFsLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih0ZXh0LnRvTG93ZXJDYXNlKCkpID09PSAwIDogZmFsc2U7XG4gICAgfSk7XG4gICB9XG5cbiAgIHZhbHVlRm9ybWF0dGVyKGRhdGE6IGFueSk6IHN0cmluZyB7XG4gICAgICByZXR1cm4gYCgke2RhdGFbdGhpcy5tb2RlbC5leHRlcm5hbF92YWx1ZV9maWVsZF19KSAke2RhdGFbdGhpcy5tb2RlbC5leHRlcm5hbF9uYW1lX2ZpZWxkXX1gO1xuICAgIH1cblxuICBkaXNwbGF5V2l0aChmb3JlaWduX21vZGVsKSB7XG4gICAgcmV0dXJuIChpdGVtOiBhbnkpOiBzdHJpbmcgPT4ge1xuICAgICAgcmV0dXJuIGl0ZW1bZm9yZWlnbl9tb2RlbC5leHRlcm5hbF9uYW1lX2ZpZWxkXTtcbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uQ2hhbmdlcywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgIE1vZGVsIH0gZnJvbSAnLi4vLi4vc2NyZWVucyc7XG5pbXBvcnQgeyBSZWdpc3RyeSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3JlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi4vLi4vZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy1jcnVkLWZvcmVpZ24ta2V5LWZpZWxkJyxcbiAgdGVtcGxhdGU6IGA8bWF0LWZvcm0tZmllbGQ+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbWF0SW5wdXQgW2Zvcm1Db250cm9sTmFtZV09XCJmaWVsZC5rZXlcIiBbbWF0QXV0b2NvbXBsZXRlXT1cImF1dG9cIj5cbjwvbWF0LWZvcm0tZmllbGQ+XG5cbjxtYXQtYXV0b2NvbXBsZXRlICNhdXRvPVwibWF0QXV0b2NvbXBsZXRlXCIgW2Rpc3BsYXlXaXRoXT1cImRpc3BsYXlGblwiPlxuICAgIDxtYXQtb3B0aW9uICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgY2hvaWNlc1wiIFt2YWx1ZV09XCJvcHRpb25bbW9kZWwuZXh0ZXJuYWxfdmFsdWVfZmllbGRdXCI+XG4gICAgICAgIHt7IG9wdGlvblttb2RlbC5leHRlcm5hbF9uYW1lX2ZpZWxkXSB9fVxuICAgIDwvbWF0LW9wdGlvbj5cbjwvbWF0LWF1dG9jb21wbGV0ZT5gXG59KVxuZXhwb3J0IGNsYXNzIEZvcmVpZ25LZXlGaWVsZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KCkgZm9ybUdyb3VwOiBGb3JtR3JvdXA7XG4gIEBJbnB1dCgpIGZvcmNlZFNlYXJjaFBhcmFtczogYW55ID0gW107XG4gIEBJbnB1dCgpIGZpZWxkOiBGaWVsZDtcbiAgY2hvaWNlcyA9IFtdO1xuICBmaWx0ZXJlZE9wdGlvbnM6ICBPYnNlcnZhYmxlPGFueVtdPjtcbiAgbW9kZWw/OiBNb2RlbDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwaTogQXBpU2VydmljZSwgcHJpdmF0ZSByZWc6IFJlZ2lzdHJ5KSB7XG4gIH1cblxuLy8gICBuZ09uSW5pdCgpIHtcbi8vICAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIGlmICghdGhpcy5mb3JtR3JvdXApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyh0aGlzLmZvcm1Hcm91cCwgdGhpcy5maWVsZC5rZXksIHRoaXMuZm9ybUdyb3VwLmdldCh0aGlzLmZpZWxkLmtleSkpO1xuICAgIHRoaXMuZmlsdGVyZWRPcHRpb25zID0gKHRoaXMuZm9ybUdyb3VwLmdldCh0aGlzLmZpZWxkLmtleSkgYXMgRm9ybUNvbnRyb2wpLnZhbHVlQ2hhbmdlcy5waXBlKFxuICAgICAgICBzdGFydFdpdGgoJycpLFxuICAgICAgICBtYXAodmFsdWUgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2codmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlID8gdmFsdWVbJ2NvZGUnXSA6IHZhbHVlO1xuICAgICAgICB9KSxcbiAgICAgICAgbWFwKGNvZGUgPT4gY29kZSA/IHRoaXMuX2ZpbHRlcihuYW1lKSA6IHRoaXMuY2hvaWNlcy5zbGljZSgpKVxuICAgICk7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmZvcm1Hcm91cCk7XG4gICAgICBjb25zdCBwYXRoID0gdGhpcy5maWVsZC5mb3JlaWduX21vZGVsX3BhdGguc3BsaXQoJy4nKTtcbiAgICAgIHRoaXMubW9kZWwgPSB0aGlzLnJlZy5nZXRNb2RlbChwYXRoWzBdLCBwYXRoWzFdLCBwYXRoWzJdKTtcbiAgICAgIHRoaXMuYXBpLmZldGNoKGAke3RoaXMubW9kZWwuYXBpfWAsIFtdKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgdGhpcy5jaG9pY2VzID0gcmVzO1xuICAgICAgfSk7XG4gIH1cblxuICBkaXNwbGF5Rm4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIG9wdGlvbiA/IG9wdGlvbi5jb2RlIDogb3B0aW9uO1xuICB9XG5cbiAgX2ZpbHRlcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgY29uc3QgZmlsdGVyVmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnNvbGUubG9nKGZpbHRlclZhbHVlKTtcblxuICAgIHJldHVybiB0aGlzLmNob2ljZXMuZmlsdGVyKG9wdGlvbiA9PiBvcHRpb24uY29kZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdGVyVmFsdWUpID09PSAwKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTW9tZW50TW9kdWxlIH0gZnJvbSAnbmd4LW1vbWVudCc7XG5cbmltcG9ydCB7XG4gIE1hdFRvb2xiYXJNb2R1bGUsXG4gIE1hdFNpZGVuYXZNb2R1bGUsXG4gIE1hdExpc3RNb2R1bGUsXG4gIE1hdEljb25Nb2R1bGUsXG4gIE1hdFRhYmxlTW9kdWxlLFxuICBNYXRDYXJkTW9kdWxlLFxuICBNYXRQYWdpbmF0b3JNb2R1bGUsXG4gIE1hdEJ1dHRvbk1vZHVsZSxcbiAgTWF0TWVudU1vZHVsZSxcbiAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgTWF0SW5wdXRNb2R1bGUsXG4gIE1hdENoZWNrYm94TW9kdWxlLFxuICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxcbiAgTWF0R3JpZExpc3RNb2R1bGUsXG4gIE1hdFNuYWNrQmFyTW9kdWxlLFxuICBNYXREYXRlcGlja2VyTW9kdWxlLFxuICBNYXROYXRpdmVEYXRlTW9kdWxlLFxuICBNYXRTZWxlY3RNb2R1bGUsXG4gIE1hdFRhYnNNb2R1bGUsXG4gIE1hdEV4cGFuc2lvbk1vZHVsZSxcbiAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cblxuaW1wb3J0IHsgTGlzdGluZ0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9saXN0aW5nL2xpc3RpbmcuY29tcG9uZW50JztcbmltcG9ydCB7IE1vZGVsRm9ybUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9tb2RlbC1mb3JtL21vZGVsLWZvcm0uY29tcG9uZW50JztcbmltcG9ydCB7IE1vZGVsRm9ybVNjcmVlbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9tb2RlbC1mb3JtLXNjcmVlbi9tb2RlbC1mb3JtLXNjcmVlbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgRm9ybUZpZWxkQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Zvcm0tZmllbGQvZm9ybS1maWVsZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRm9ybXNldENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9mb3Jtc2V0L2Zvcm1zZXQuY29tcG9uZW50JztcbmltcG9ydCB7IEF1dG9Db21wbGV0ZUZpZWxkQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2F1dG8tY29tcGxldGUtZmllbGQvYXV0by1jb21wbGV0ZS1maWVsZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRm9yZWlnbktleUZpZWxkQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2ZvcmVpZ24ta2V5LWZpZWxkL2ZvcmVpZ24ta2V5LWZpZWxkLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IEFwcFNjcmVlbkNvbXBvbmVudCB9IGZyb20gJy4vY29udGFpbmVycy9hcHAtc2NyZWVuL2FwcC1zY3JlZW4uY29tcG9uZW50JztcbmltcG9ydCB7IExpc3RpbmdTY3JlZW5Db21wb25lbnQgfSBmcm9tICcuL2NvbnRhaW5lcnMvbGlzdGluZy1zY3JlZW4vbGlzdGluZy1zY3JlZW4uY29tcG9uZW50JztcbmltcG9ydCB7IExpc3RpbmdEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2NvbnRhaW5lcnMvbGlzdGluZy1kaWFsb2cvbGlzdGluZy1kaWFsb2cuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgTW9tZW50TW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICAvL1xuICAgIE1hdFRvb2xiYXJNb2R1bGUsXG4gICAgTWF0U2lkZW5hdk1vZHVsZSxcbiAgICBNYXRMaXN0TW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0VGFibGVNb2R1bGUsXG4gICAgTWF0Q2FyZE1vZHVsZSxcbiAgICBNYXRQYWdpbmF0b3JNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdE1lbnVNb2R1bGUsXG4gICAgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdENoZWNrYm94TW9kdWxlLFxuICAgIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLFxuICAgIE1hdEdyaWRMaXN0TW9kdWxlLFxuICAgIE1hdFNuYWNrQmFyTW9kdWxlLFxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gICAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgICBNYXRTZWxlY3RNb2R1bGUsXG4gICAgTWF0VGFic01vZHVsZSxcbiAgICBNYXRFeHBhbnNpb25Nb2R1bGUsXG4gICAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBGb3JtRmllbGRDb21wb25lbnQsXG4gICAgQXV0b0NvbXBsZXRlRmllbGRDb21wb25lbnQsXG4gICAgTGlzdGluZ0NvbXBvbmVudCxcbiAgICBNb2RlbEZvcm1Db21wb25lbnQsXG4gICAgQXBwU2NyZWVuQ29tcG9uZW50LFxuICAgIExpc3RpbmdTY3JlZW5Db21wb25lbnQsXG4gICAgTW9kZWxGb3JtU2NyZWVuQ29tcG9uZW50LFxuICAgIEZvcm1zZXRDb21wb25lbnQsXG4gICAgRm9yZWlnbktleUZpZWxkQ29tcG9uZW50LFxuICAgIExpc3RpbmdEaWFsb2dDb21wb25lbnQsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICBdLFxuICBleHBvcnRzOiBbXG4gICAgSHR0cENsaWVudE1vZHVsZSxcbiAgICBBdXRvQ29tcGxldGVGaWVsZENvbXBvbmVudCxcbiAgICBNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdFNpZGVuYXZNb2R1bGUsXG4gICAgTWF0TGlzdE1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdFRhYmxlTW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsXG4gICAgTWF0UGFnaW5hdG9yTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRNZW51TW9kdWxlLFxuICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRDaGVja2JveE1vZHVsZSxcbiAgICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxcbiAgICBNYXRHcmlkTGlzdE1vZHVsZSxcbiAgICBNYXRTbmFja0Jhck1vZHVsZSxcbiAgICBNYXROYXRpdmVEYXRlTW9kdWxlLFxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgIE1hdFRhYnNNb2R1bGUsXG4gICAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxuICAgIE1hdEV4cGFuc2lvbk1vZHVsZSxcbiAgICBGb3JtRmllbGRDb21wb25lbnQsXG4gICAgTGlzdGluZ0NvbXBvbmVudCxcbiAgICBNb2RlbEZvcm1Db21wb25lbnQsXG4gICAgQXBwU2NyZWVuQ29tcG9uZW50LFxuICAgIExpc3RpbmdTY3JlZW5Db21wb25lbnQsXG4gICAgTW9kZWxGb3JtU2NyZWVuQ29tcG9uZW50LFxuICAgIEZvcm1zZXRDb21wb25lbnQsXG4gICAgRm9yZWlnbktleUZpZWxkQ29tcG9uZW50LFxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICBMaXN0aW5nRGlhbG9nQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgQ3J1ZE1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJvYnNlcnZhYmxlT2YiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFnQkU7cUJBSjJDLEVBQUU7d0JBQ3JCLEVBQUU7dUJBQ2lCLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQztLQUU5RDs7Ozs7O0lBRWhCLFlBQVksQ0FBQyxRQUFrQixFQUFF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
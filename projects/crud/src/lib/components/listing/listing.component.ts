import {
    Component, OnInit, Input,
    ComponentFactoryResolver,
    ViewChild, ViewContainerRef,
    AfterViewInit, ViewChildren,
    QueryList, SimpleChange,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { ApiService } from '../../services/api.service';
import { IFrameMode, ListViewer } from '../../models/views';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { IframeModalComponent } from '../iframe-modal/iframe-modal.component';
import { CustomEncoder } from '../../custom-encode';
import { SearchDialogComponent } from '../../containers/search-dialog/search-dialog.component';
import { ListingDialogComponent } from '../../containers/listing-dialog/listing-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'ng-crud-listing',
    templateUrl: './listing.component.html',
    styleUrls: ['./listing.component.scss'],
    exportAs: 'ngcrudui-listing'
})
export class ListingComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @Input() viewConfig: ListViewer;
    mode;
    is_actions_set = false;
    openComponent: boolean = false;
    @Input() forcedSearchParams: any;
    dataSource = new MatTableDataSource();
    searchParams = new HttpParams({ encoder: new CustomEncoder() });
    columns = [];
    displayColumns: string[] = [];
    selectedRows = [];
    resultsCount = 0;
    isLoading = false;
    initialLoading = true;
    userHasPermission = true;
    defaultFilters= {};
    queryParams = {};
    pages: number;
    @ViewChild('searchComponent', { read: ViewContainerRef, static: false }) searchComponent: ViewContainerRef;
    @ViewChild('customComponent', { read: ViewContainerRef }) customComponent: ViewContainerRef;
    @ViewChildren('customElement', { read: ViewContainerRef }) customElement: QueryList<ViewContainerRef>;

    selection = new SelectionModel<any>(true, []);

    constructor(private api: ApiService,
        private viewContainerRef: ViewContainerRef,
        private dialog: MatDialog,
        private resolver: ComponentFactoryResolver,
        private listingDialogRef: MatDialogRef<ListingDialogComponent>,
        private router: Router,
        private activeRoute: ActivatedRoute
    ) {
        this.activeRoute.queryParams.subscribe(params=>{
            this.queryParams = params;
        });
     }

    ngOnInit() {
        if (this.viewConfig.pagination.enabled) {
            this.searchParams = this.searchParams.set('page', String(1));
        }
        this.pages = Number(this.searchParams.get('page'));
        this.mode = this.viewConfig.search.mode ? this.viewConfig.search.mode : 'normal';
        this.populateDataTable();
    }
    ngAfterViewInit() {
        if (this.viewConfig.search.enabled) {
            const factory = this.resolver.resolveComponentFactory(this.viewConfig.search.view.component);
            const component = this.viewContainerRef.createComponent(factory);
            component.instance.viewConfig = this.viewConfig.search.view;
            component.instance.submit.subscribe(ev => {
                if (ev.reset) {
                    this.isLoading = true;
                    this.searchParams = new HttpParams();
                    this.searchParams = this.searchParams.set('page', String(1));
                    this.populateParams();
                } else {
                    this.searchClicked(ev);
                }
                this.paginator.pageIndex = 0;
            });
            component.instance.mode = 'search';
            this.searchComponent.insert(component.hostView);
        }
    }
    private prepareColumns() {
        this.columns = [];
        this.viewConfig.metadata.listingFields.map(field => {
            const meta_field = this.viewConfig.metadata.fields.filter(ff => ff.name === field);
            meta_field.forEach(f => {
                const col = {};
                col['columnDef'] = this.generateCode(f.name);
                col['header'] = f.label;
                col['type'] = f.type;
                col['isTranslated'] = f.translate;
                col['cellStyle'] = f.cellStyle;
                col['cell'] = (element: Element) => {
                    if (element[field] === null || element[field] === undefined) {
                        element[field] = '';
                    }
                    if (f.isClickable) {
                        col['clickable'] = true;
                    }
                    let finalArray;
                    if (f.listFrom && Array.isArray(element[f.name])) {
                        finalArray = element[field].map((obj) => {
                            if (f.displayFrom) {
                                let value = obj[f.listFrom] !== null ? obj[f.listFrom][f.displayFrom[0]] : obj[f.listFrom];
                                for (let i = 1; i < f.displayFrom.length; i++) {
                                    value = value[f.displayFrom[i]];
                                }
                                return value;
                            } else {
                                return obj[f.listFrom];
                            }
                        });
                    } else if (f.displayFrom && element[field] !== null) {
                        let value = element[f.name][f.displayFrom[0]];
                        for (let i = 1; i < f.displayFrom.length; i++) {
                            value = value[f.displayFrom[i]];
                        }
                        return value;
                    } else {
                        if (typeof element[f.name] === 'boolean' && element[f.name]) {
                            element[f.name] = 'boolean';
                        }
                    }
                    return finalArray ? finalArray : element ? element[f.name] : '';
                };
                this.columns.push(col);
            });

        });
        if (this.viewConfig.metadata.applyFunctions) {
            this.columns.push({
                'columnDef': 'edit',
                'header': '',
                'Def': 'functions',
                'cell': (element: Element) => {
                    return '';
                }
            },
                {
                    'columnDef': 'delete',
                    'header': '',
                    'Def': 'functions',
                    'cell': (element: Element) => {
                        return '';
                    }
                }
            );
        }
        if (this.mode !== 'pick' && this.viewConfig.metadata.formActions?.length) {
            this.columns.push({ 'columnDef': 'actions', 'header': '' });
            this.columns.push({ 'columnDef': 'checked', 'header': '' });
        }
    }


    private generateCode(column_name) {
        return `${column_name + '_' + Math.random()}`;
    }
    private populateDataTable() {
        this.prepareColumns();
        this.displayColumns = this.columns.map(c => c.columnDef);
        this.resultsCount = 0;
        this.dataSource.data = [];
        this.populateParams(this.viewConfig.metadata.default_filters);
    }

    populateParams(defaultFilter?) {
        if (this.queryParams) {
            Object.keys(this.queryParams).forEach(paramKey => {
                if(defaultFilter){
                    defaultFilter.push(
                        {
                            filter: paramKey,
                            value: this.queryParams[paramKey]

                        },
                    )
                } else {
                    this.defaultFilters = [
                        {
                            filter: paramKey,
                            value: this.queryParams[paramKey]

                        }
                    ]
                }
            });
        }
        if (this.viewConfig.metadata.includeParams) {
            this.viewConfig.metadata.queryParams.forEach((field) => {
                this.searchParams = this.searchParams.append('include[]', field);
            });
        }
        if (this.viewConfig.metadata.sortBy) {
            this.searchParams = this.searchParams.append('sort[]', this.viewConfig.metadata.sortBy);
        }
        const foreignKeyMultipleFields = this.viewConfig.metadata.fields.filter(f => f.keyOnSearch).map(f => f.name);
        if (defaultFilter && defaultFilter.length > 0) {
            defaultFilter.forEach(f => {
                this.defaultFilters[f.filter] = f.value;
                if (f.value && f.value !== '') {
                    if (f.value.id) {
                        f.value = f.value.id;
                    }
                    if (foreignKeyMultipleFields.indexOf(f.filter) !== -1) {
                        this.searchParams = this.searchParams.append(`filter{${f.filter}.id.regex}`, `^(${f.value.toString().replace(/,/g, '|')})$`);
                    } else {
                        this.searchParams = this.searchParams.append(`filter{${f.filter}}`, f.value);
                    }
                }
            });
        }
        this.fetch();
    }


    changeView(view) {
        this.dialog.open(IframeModalComponent, {
            height: '95vh',
            width: '100vw',
            data: {
                'src': `${view}`,
                'title': 'Import Guest Profiles',
                'color': 'grey'
            }
        });
    }

    getColId(id: string): string {
        if (id) {
            return id.replace(/[&\/\\#,+()$~%.'":*?<>{}/ /]/g, '');
        }
    }

    openEditView(id: number): void {
        if (this.viewConfig.iframeMode === IFrameMode.POP_UP) {
            const src = `${this.viewConfig.external_link.link}` + `${id}/?ispopup=1&` + `${this.viewConfig.external_link.params.join('&')}`;
            this.dialog.open(IframeModalComponent, {
                height: '95vh',
                width: '100vw',
                panelClass: 'edit-view-popup',
                data: {
                    'src': `${src}`,
                    'title': this.viewConfig?.title,
                    'color': 'grey'
                }
            }).afterClosed().subscribe((res)=> {
                if(res) {
                    window.postMessage("refreshForm", "*");
                }
            });
        } else {
            this.router.navigate([id], { relativeTo: this.activeRoute });
        }
    }

    fetch() {
        this.api.fetch(this.viewConfig.metadata.api, this.searchParams).subscribe(res => {
            let newItems = [];
            if (this.viewConfig.pagination.enabled) {
                const keys = this.viewConfig.search.search_key;
                let value = res.results ? res.results[keys[0]] : res[keys[0]];
                for (let i = 1; i < keys.length; i++) {
                    value = value[keys[i]];
                }
                newItems = value;
                this.resultsCount = res.count;
            } else {
                newItems = res;
                this.resultsCount = newItems.length;
            }
            this.dataSource.data = newItems;
            if (this.viewConfig.metadata.returnRecordsIDS) {
                this.viewConfig.metadata.rows.next({ IDs: this.dataSource.data.map(item => item['id']) });
            }
            this.addCustomElementColumnsToTemplate();
            this.userHasPermission = true;
            this.isLoading = false;
            this.initialLoading = false;
        }, err => {
            if(err?.status === 403 || err?.status === 401){
                this.userHasPermission = false;
            } else {
                this.userHasPermission = true;
            }
            this.isLoading = false;
            this.initialLoading = false;
        });
    }

    addCustomElementColumnsToTemplate(): void {
        const customElementField = this.viewConfig.metadata.fields.find(f => f.type === 'custom_element');
        this.customElement?.changes.subscribe(element => {
            element.forEach((item, index) => {
                this.viewContainerRef.clear();
                const componentFactory = this.resolver.resolveComponentFactory(customElementField.customElement.component);
                const componentRef = this.viewContainerRef.createComponent(componentFactory);
                const componentInstance = componentRef.instance as any;
                const changes = {};
                // Bind component inputs if exists
                customElementField.customElement?.inputs?.forEach(input => {
                    componentRef.instance[input.key] = input.value ?? this.dataSource.data[index][input.readValueFrom];
                    changes[input.key] = new SimpleChange(undefined, input.value ??
                        this.dataSource.data[index][input.readValueFrom], false);
                });
                // Bind component outputs if exists
                customElementField.customElement?.outputs?.forEach(output => {
                    componentRef.instance[output.name].subscribe(response => {
                        output.functionToExcute(response);
                    });
                });
                // Trigger onChanges for the inputs to reflect
                if(componentInstance.ngOnChanges) {
                    componentInstance?.ngOnChanges(changes);
                }
                item.clear();
                item.insert(componentRef.hostView);
            });
        });
    }

    addCustomComponent(value) {
        const customCoponentField = this.viewConfig.metadata.fields.find(f => f.type === 'custom_component');
        this.viewContainerRef.clear();
        const componentFactory = this.resolver.resolveComponentFactory(customCoponentField.customComponent.component);
        const componentRef = this.viewContainerRef.createComponent(componentFactory);
        const componentInstance = componentRef.instance as any;

        const changes = {};
        // Bind component inputs if exists
        customCoponentField.customComponent?.inputs?.forEach(input => {
            componentRef.instance[input.key] = input.value ?? value[input.readValueFrom];
            changes[input.key] = new SimpleChange(undefined, input.value ??
                value[input.readValueFrom], false);
        });
        // Bind component outputs if exists
        customCoponentField.customComponent?.outputs?.forEach(output => {
            componentRef.instance[output.name].subscribe(response => {
                output.functionToExcute(response);
            });
        });
        // Trigger onChanges for the inputs to reflect
        if (componentInstance.ngOnChanges) {
            componentInstance?.ngOnChanges(changes);
        }
    }

    onChange(ev: PageEvent) {
        if (this.searchParams.toString().includes('filter')) {
            this.searchParams = this.searchParams.delete('page');
            this.searchParams = this.searchParams.append('page', String(ev.pageIndex + 1));
        } else {
            this.searchParams = new HttpParams();
            this.searchParams = this.searchParams.set('page', String(ev.pageIndex + 1));
        }

        this.populateParams(this.viewConfig.metadata.default_filters);
    }

    searchClicked(searchParams) {
        this.isLoading = true;
        this.dataSource.data = [];
        this.resultsCount = 0;
        this.searchParams = this.searchParams.delete('page');
        if (this.viewConfig.metadata.filter) {
            Object.keys(searchParams).forEach(p => {
                if (searchParams[p] === null || searchParams[p] === 'All') {
                    searchParams[p] = '';
                }
                if (p !== 'iContains') {
                    let containes = false;
                    searchParams['iContains'].forEach(key => {
                        if (key.name === p) {
                            containes = true;
                            if (searchParams[p] !== '') {
                                this.searchParams = this.searchParams.set(`filter{${p}.icontains}`, searchParams[p]);
                            } else {
                                this.searchParams = this.searchParams.delete(`filter{${p}.icontains}`);
                            }

                        }
                    });
                    if (!containes) {
                        if (searchParams[p] !== '') {
                            if (p.includes('regex') && Array.isArray(searchParams[p])) {
                                this.searchParams = this.setMultipleForeignFieldParams(p, searchParams[p]);
                            } else {
                                this.searchParams = this.searchParams.set(`filter{${p}}`, searchParams[p]);
                            }
                        } else {
                            this.searchParams = this.searchParams.delete(`filter{${p}}`);
                        }
                    }
                }
            });
        } else {
            Object.keys(searchParams).forEach(p => {
                if (searchParams[p] !== null && p !== 'iContains') {
                    this.searchParams = this.searchParams.append(p, searchParams[p]);
                }
            });
        }
        this.fetch();
    }

    setMultipleForeignFieldParams(paramKey: string, paramValue: any): HttpParams {
        if (paramValue?.length) {
            return this.searchParams.set(`filter{${paramKey}}`, `^(${paramValue.toString().replace(/,/g, '|')})$`);
        }
        return this.searchParams.delete(`filter{${paramKey}}`);
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: any): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }

    onAction(action) {
        if (action.type === 'dialog') {
            this.viewConfig.metadata.rows.next({
                rows: this.selection.selected,
                action: action
            });
        } else {
            this.api[action.type](this.viewConfig.metadata.api, this.selection.selected, true).subscribe(res => {
                res.forEach(el => {
                    if (el instanceof HttpErrorResponse) {
                    } else {
                        this.fetch();
                    }
                });
            });
        }
    }

    _picked(value) {
        if (this.viewConfig.metadata.containsComponent) {
            if(this.defaultFilters) {
                value.api_start_date = this.defaultFilters["start_date.lte"];
                value.api_end_date = this.defaultFilters["end_date.gte"];
            }
            this.addCustomComponent(value);
            this.openComponent = true;
        }
        else {
            if (this.viewConfig.metadata.rows) {
                this.viewConfig.metadata.rows.next({
                    'value': value,
                    'dataSource': this.dataSource.data,
                });
            }
            this.listingDialogRef.close({
                'value': value,
                'dataSource': this.dataSource.data,
            });
        }
    }
    cancel() {
        this.viewConfig.metadata.rows.next();
        this.listingDialogRef.close();
    }
    deleteRow(id) {
        const messg = confirm(`Are you sure you want to delete the ${this.viewConfig.title}`);
        if (messg) {
            this.api.delete(this.viewConfig.metadata.api, id).subscribe(res => {
                this.fetch();
            });
        }
    }

    isString(val: any): boolean {
        return typeof (val) === 'string';
    }
    openCreationPopUp(): void {
        const ref = this.dialog.open(SearchDialogComponent, {
            width: '90%',
            height: '95%',
            data: {
                viewConfig: this.viewConfig,
            },
            disableClose: true
        }).afterClosed().subscribe(response => {
            if (response) {
                this.viewConfig.metadata.rows.next({
                    'value': response,
                    'dataSource': this.dataSource.data,
                });
                this.dialog.closeAll();
            }
        });
    }
}

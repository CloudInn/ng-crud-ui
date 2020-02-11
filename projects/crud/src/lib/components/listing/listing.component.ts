import {
    Component, OnInit, Input, Output, EventEmitter,
    ComponentFactoryResolver, ViewChild, ViewContainerRef, AfterContentChecked, AfterViewInit
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { ApiService } from '../../services/api.service';
import { ListViewer } from '../../models/views';
import { HttpParams } from '@angular/common/http';
import { MatPaginator, PageEvent } from '@angular/material';

@Component({
    selector: 'ng-crud-listing',
    templateUrl: './listing.component.html',
    styleUrls: ['./listing.component.scss'],
    exportAs: 'ngcrudui-listing'
})
export class ListingComponent implements OnInit, AfterViewInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;

    @Input() viewConfig: ListViewer;
    mode;
    is_actions_set = false;
    @Input() forcedSearchParams: any;
    dataSource = new MatTableDataSource();
    searchParams = new HttpParams();
    columns = [];
    displayColumns: string[] = [];
    resultsCount = 0;
    isLoading = true;
    pages: number;
    @ViewChild('searchComponent', { read: ViewContainerRef }) searchComponent: ViewContainerRef;

    constructor(private api: ApiService,
        private container: ViewContainerRef,
        private resolver: ComponentFactoryResolver) { }

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
            const component = this.container.createComponent(factory);
            component.instance.viewConfig = this.viewConfig.search.view;
            component.instance.submit.subscribe(ev => {
                if (ev.reset) {
                    this.searchParams = new HttpParams();
                    this.searchParams = this.searchParams.set('page', String(1));
                    this.populateParams(this.viewConfig.metadata.default_filters);
                } else {
                    this.searchClicked(ev);
                }

            });
            component.instance.mode = 'search';
            this.searchComponent.insert(component.hostView);
        }
    }
    private prepareColumns() {
        if (this.mode !== 'pick') {
            // this.columns = [{ 'columnDef': 'checked', 'header': '' }];
        } else {
            this.columns = [];
        }
        this.viewConfig.metadata.listingFields.map(field => {
            const f = this.viewConfig.metadata.fields.filter(ff => ff.name === field)[0];
            const col = {};
            col['columnDef'] = f.name;
            col['header'] = f.label;
            col['type'] = f.type;
            col['cell'] = (element: Element) => {
                if (element[field] === null || element[field] === undefined) {
                    element[field] = '';
                }
                let finalArray;
                if (f.listFrom && Array.isArray(element[f.name])) {
                    finalArray = element[field].map((obj) => {
                        return obj[f.listFrom];
                    });
                }
                if (f.displayFrom && element[field] !== null) {
                    let value = element[f.name][f.displayFrom[0]];
                    for (let i = 1; i < f.displayFrom.length; i++) {
                        value = value[f.displayFrom[i]];
                    }
                    return value;
                } else {
                    if (typeof element[f.name] === 'boolean' && element[f.name]) {
                        element[f.name] = 'boolean';
                    }
                    return finalArray ? finalArray : element ? element[f.name] : '';
                }
            };
            if (this.viewConfig.metadata.externalNameField === field) {
                col['clickable'] = true;
            }
            this.columns.push(col);
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
        if (this.mode !== 'pick') {
            this.columns.push({ 'columnDef': 'actions', 'header': '' });
        }
    }

    private populateDataTable() {
        this.prepareColumns();
        this.displayColumns = this.columns.map(c => c.columnDef);
        this.resultsCount = 0;
        this.dataSource.data = [];
        this.populateParams(this.viewConfig.metadata.default_filters);
    }

    populateParams(defaultFilter) {
        if (this.viewConfig.metadata.includeParams) {
            this.viewConfig.metadata.queryParams.forEach((field) => {
                this.searchParams = this.searchParams.append('include[]', field);
            });
        }
        if (defaultFilter && defaultFilter.length > 0) {
            defaultFilter.forEach(f => {
                this.searchParams = this.searchParams.append(`filter{${f.filter}}`, f.value);
            });
        }
        this.fetch();
    }

    fetch() {
        this.api.fetch(this.viewConfig.metadata.api, this.searchParams).subscribe(res => {
            let newItems = [];
            if (this.viewConfig.pagination.enabled) {
                if (res.results) {
                    const keys = this.viewConfig.search.search_key;
                    let value = res.results[keys[0]]; // search_key is an array of keys
                    for (let i = 1; i < keys.length; i++) {
                        value = value[keys[i]];
                    }
                    newItems = value;
                    this.resultsCount = res.count;
                }
            } else {
                newItems = res;
                this.resultsCount = newItems.length;
            }
            this.dataSource.data = newItems;
            this.isLoading = false;
        }, err => {
            this.isLoading = false;
        });
    }

    onChange(ev: PageEvent) {
        this.searchParams = new HttpParams();
        this.searchParams = this.searchParams.set('page', String(ev.pageIndex + 1));
        this.populateParams(this.viewConfig.metadata.default_filters);
    }

    searchClicked(searchParams) {
        this.isLoading = true;
        this.dataSource.data = [];
        this.resultsCount = 0;
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
                            this.searchParams = this.searchParams.set(`filter{${p}}`, searchParams[p]);
                        } else {
                            this.searchParams = this.searchParams.delete(`filter{${p}}`);
                        }
                    }
                }
            });
        } else {
            Object.keys(searchParams).forEach(p => {
                if (searchParams[p] !== null) {
                    this.searchParams = this.searchParams.append(p, searchParams[p]);
                }
            });
        }
        this.fetch();
    }

    onChecked(row) {
        row['is_checked'] = true;
    }

    onCheckAll() {

    }

    _picked(value) {
        if (this.viewConfig.metadata.rows) {
            this.viewConfig.metadata.rows.next({
                'value': value,
                'dataSource': this.dataSource.data,
            });
        }
    }
    cancel() {
        this.viewConfig.metadata.rows.next(undefined);
    }
    deleteRow(id) {
        const messg = confirm(`Are you sure you want to delete the ${this.viewConfig.title}`);
        if (messg) {
            this.api.delete(this.viewConfig.metadata.api, id).subscribe(res => {
                this.fetch();
            });
        }
    }
}

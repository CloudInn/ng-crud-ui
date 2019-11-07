import {
    Component, OnInit, Input, Output, EventEmitter,
    ComponentFactoryResolver, ViewChild, ViewContainerRef
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
export class ListingComponent implements OnInit {
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
    @Output() picked = new EventEmitter();
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
        if (this.viewConfig.search.enabled) {
            const factory = this.resolver.resolveComponentFactory(this.viewConfig.search.view.component);
            const component = this.container.createComponent(factory);
            component.instance.viewConfig = this.viewConfig.search.view;
            component.instance.submit.subscribe(ev => {
                this.searchClicked(ev);
            });
            component.instance.mode = 'search';
            this.searchComponent.insert(component.hostView);
        }
        this.picked.subscribe(res => {
            this.viewConfig.metadata.rows.next(res.value)
        });
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
            col['cell'] = (element: Element) => {
                return element ? `${element[f.name]}` : '';
            };
            if (this.viewConfig.metadata.externalNameField === field) {
                col['clickable'] = true;
            }
            this.columns.push(col);
        });
        if (this.mode !== 'pick') {
            this.columns.push({ 'columnDef': 'actions', 'header': '' });
        }
    }

    private populateDataTable() {
        this.prepareColumns();
        this.displayColumns = this.columns.map(c => c.columnDef);
        this.resultsCount = 0;
        this.dataSource.data = [];
        this.populateParams();
    }

    populateParams() {
        if (this.viewConfig.metadata.includeParams) {
            this.viewConfig.metadata.queryParams.forEach((field) => {
                this.searchParams = this.searchParams.append('include[]', field);
            });
        }
        this.fetch();
    }

    fetch() {
        this.api.fetch(this.viewConfig.metadata.api, this.searchParams).subscribe(res => {
            let newItems = [];
            if (this.viewConfig.pagination.enabled) {
                if (res.results) {
                    newItems = res.results[this.viewConfig.search.search_key];
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
        this.populateParams();
    }

    searchClicked(searchParams) {
        this.isLoading = true;
        this.dataSource.data = [];
        this.resultsCount = 0;
        if (this.viewConfig.metadata.filter) {
            Object.keys(searchParams).forEach(p => {
                if (searchParams[p] !== null) {
                    this.searchParams = this.searchParams.append(`filter{${p}}`, searchParams[p]);
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
        this.picked.next({
            'value': value,
            'dataSource': this.dataSource.data,
        });
    }

}

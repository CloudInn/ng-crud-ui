import { Component, OnInit, Input, Output, EventEmitter,
    ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { ApiService } from '../../services/api.service';
import { ListViewer } from '../../models/views';

@Component({
    selector: 'ng-crud-listing',
    templateUrl: './listing.component.html',
    styleUrls: ['./listing.component.scss'],
    exportAs: 'ngcrudui-listing'
})
export class ListingComponent implements OnInit {

    @Input() viewConfig: ListViewer;
    @Input() mode = 'normal'; // other modes: 'pick'
    is_actions_set = false;
    @Input() forcedSearchParams: any;
    dataSource = new MatTableDataSource();
    searchParams: {page?: number} = {
    };
    // model: Model;
    columns = [];
    displayColumns: string[] = [];
    resultsCount = 0;
    isLoading = true;
    @Output() picked = new EventEmitter();
    @ViewChild('searchComponent', { read: ViewContainerRef }) searchComponent: ViewContainerRef;

    constructor(private api: ApiService,
        private container: ViewContainerRef,
        private resolver: ComponentFactoryResolver) { }

    ngOnInit() {
        this.populateDataTable();
    }

    ngOnChanges() {
        if (this.viewConfig.pagination.enabled) {
            this.searchParams['page'] = 1;
        }
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
        // this.model = this.reg.getModel(this.moduleName, this.appName, this.modelName);
        // this.model = this.viewConfig.metadata;
        this.prepareColumns();
        this.displayColumns = this.columns.map(c => c.columnDef);
        this.resultsCount = 0;
        this.dataSource.data = [];
        // this.displayColumns.push('actions');
        this.searchParams = { page: 1 };
        this.fetch();
    }

    fetch() {
        this.api.fetch(this.viewConfig.metadata.api, this.searchParams).subscribe(res => {
            let newItems = [];
            if (this.viewConfig.pagination.enabled) {
                newItems = this.dataSource.data.concat(res.data);
            } else {
                newItems = res;
            }
            this.resultsCount = newItems.length;
            this.dataSource.data = newItems;
            this.isLoading = false;
        }, err => {
            this.isLoading = false;
        });
    }

    // getLink(id): string[] {
    //     return ['/'];
    //     // return ['/', this.moduleName, this.appName, this.modelName, id];
    // }

    // cellClicked(columnName: string, row: any) {
    //     if (columnName === this.viewConfig.metadata.externalNameField) {
    //         this.router.navigate(this.getLink(row.id));
    //     }
    // }

    searchClicked(searchParams) {
        this.isLoading = true;
        this.dataSource.data = [];
        this.resultsCount = 0;
        this.searchParams = searchParams;
        if (this.viewConfig.pagination.enabled) {
            this.searchParams['page'] = 1;
        }
        this.fetch();
    }

    onChecked(row) {
        row['is_checked'] = true;
    }

    onCheckAll() {

    }

    _picked(value) {
        this.picked.next(value);
    }

}

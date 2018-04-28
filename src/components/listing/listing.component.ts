import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ApiService, Registry } from '../../services';
import { MatTable } from '@angular/material/table';
import { Model } from '../../services';

const items = new BehaviorSubject<any[]>([]);

class ModelDataSource extends DataSource<any> {
    connect(): Observable<any> {
        return items;
    }

    disconnect() {
    }
}


@Component({
  selector: 'ngcrudui-listing',
  templateUrl: './listing.component.html'
})
export class ListingComponent implements OnChanges {

    @Input('moduleName') moduleName: string;
    @Input('appName') appName: string;
    @Input('modelName') modelName: string;
    is_actions_set = false;
    @Input() forcedSearchParams: any;
    dataSource = new ModelDataSource();
    searchParams = {
        page: 1,
    };
    model: Model;
    columns = [];
    displayColumns: string[] = [];
    resultsCount = 0;
    @Output() rowClicked = new EventEmitter();
    isLoading = true;

    constructor(private api: ApiService,
                private reg: Registry,
                private route: ActivatedRoute,
                private router: Router) {}

    ngOnChanges() {
        if (this.modelName) {
            this.populateDataTable();
        }
   }

    private prepareColumns() {
        this.columns = [{'columnDef': 'checked', 'header': ''}];
        this.model.listing_fields.map(field => {
            const f = this.model.fields.filter(ff => ff.key === field)[0];
            const col = {};
            col['columnDef'] = f.key;
            col['header'] = f.label;
            col['cell'] = (element: Element) => `${element[f.key]}`;
            this.columns.push(col);
        });
        this.columns.push({'columnDef': 'actions', 'header': ''});
    }

    private populateDataTable() {
        items.next([]);
        this.model = this.reg.getModel(this.moduleName, this.appName, this.modelName);
        this.prepareColumns();
        this.displayColumns = this.columns.map(c => c.columnDef);
        // this.displayColumns.push('actions');
        this.searchParams = {page: 1};
        this.fetch();
    }

    fetch() {
        this.api.fetch(this.model.api, this.searchParams).subscribe(res => {
            let newItems = [];
            if (res.results) {
                newItems = items.value.concat(res.results);
            } else {
                newItems = items.value.concat(res);
            }
            this.resultsCount = newItems.length;
            items.next(newItems);
            this.isLoading = false;
        }, err => {
            this.isLoading = false;
        });
    }

   _rowClicked(row) {
       this.router.navigate(['/', this.moduleName, this.appName, this.modelName, row.id]);
   }

    onSearch(searchParams) {
        this.isLoading = true;
        items.next([]);
        this.searchParams = searchParams;
        this.searchParams.page = 1;
        this.fetch();
    }

    onChecked(row) {
    }

    onCheckAll() {
    }

}

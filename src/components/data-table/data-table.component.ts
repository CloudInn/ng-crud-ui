import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ApiService, Registry } from '../../services';


const items = new BehaviorSubject<any[]>([]);

class ModelDataSource extends DataSource<any> {
    connect(): Observable<any> {
        return items;
    }

    disconnect() {}
}


@Component({
  selector: 'ngcrudui-data-table',
  templateUrl: './data-table.component.html'
})
export class DataTableComponent implements OnInit, OnChanges {

    @Input() appName: string;
    @Input() modelName: string;
    ngModel: any = {};
    @Input() forcedSearchParams: any;
    dataSource = new ModelDataSource();
    searchParams = {
        page: 1,
    };
    model: any;
    displayColumns: string[] = [];
    resultsCount = 0;
    @Output() rowClicked = new EventEmitter();

    constructor(private api: ApiService, private reg: Registry) {}

    ngOnChanges(changes) {
        if (this.appName != null && this.modelName != null) {
            console.log(this.appName, this.modelName);
            this.populateDataTable();
        }
    }

    ngOnInit() {
   }

   private populateDataTable() {
       items.next([]);
       this.model = this.reg.getModel(this.appName, this.modelName).model;

        this.displayColumns = this.model.fields.map(f => f.key);
        this.displayColumns.push('actions');
        this.ngModel = this.model.getModel();
        this.searchParams = {page: 1};
        this.api.fetch(this.model.api, this.searchParams).subscribe(res => {
            let newItems = [];
            if (res.results) {
                newItems = items.value.concat(res.results);
            } else {
                newItems = items.value.concat(res);
            }
            this.resultsCount = newItems.length;
            items.next(newItems);
        });
   }

   _rowClicked(row) {
       this.rowClicked.emit(row);
   }

   ngOnDestroy() {
        // items.unsubscribe();
        // this.dataSource.disconnect();
   }
}

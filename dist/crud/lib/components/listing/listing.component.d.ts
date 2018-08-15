import { OnChanges, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { Registry } from '../../services/registry.service';
import { Model } from '../../screens';
export declare class ListingComponent implements OnChanges {
    private api;
    private reg;
    private route;
    private router;
    moduleName: string;
    appName: string;
    modelName: string;
    mode: string;
    is_actions_set: boolean;
    forcedSearchParams: any;
    dataSource: MatTableDataSource<{}>;
    searchParams: {
        page: number;
    };
    model: Model;
    columns: any[];
    displayColumns: string[];
    resultsCount: number;
    isLoading: boolean;
    picked: EventEmitter<{}>;
    constructor(api: ApiService, reg: Registry, route: ActivatedRoute, router: Router);
    ngOnChanges(): void;
    private prepareColumns();
    private populateDataTable();
    fetch(): void;
    getLink(id: any): string[];
    cellClicked(columnName: string, row: any): void;
    onSearch(searchParams: any): void;
    onChecked(row: any): void;
    onCheckAll(): void;
    _picked(value: any): void;
}

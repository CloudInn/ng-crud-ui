/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { Registry } from '../../services/registry.service';
export class ListingComponent {
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
function ListingComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    ListingComponent.prototype.moduleName;
    /** @type {?} */
    ListingComponent.prototype.appName;
    /** @type {?} */
    ListingComponent.prototype.modelName;
    /** @type {?} */
    ListingComponent.prototype.mode;
    /** @type {?} */
    ListingComponent.prototype.is_actions_set;
    /** @type {?} */
    ListingComponent.prototype.forcedSearchParams;
    /** @type {?} */
    ListingComponent.prototype.dataSource;
    /** @type {?} */
    ListingComponent.prototype.searchParams;
    /** @type {?} */
    ListingComponent.prototype.model;
    /** @type {?} */
    ListingComponent.prototype.columns;
    /** @type {?} */
    ListingComponent.prototype.displayColumns;
    /** @type {?} */
    ListingComponent.prototype.resultsCount;
    /** @type {?} */
    ListingComponent.prototype.isLoading;
    /** @type {?} */
    ListingComponent.prototype.picked;
    /** @type {?} */
    ListingComponent.prototype.api;
    /** @type {?} */
    ListingComponent.prototype.reg;
    /** @type {?} */
    ListingComponent.prototype.route;
    /** @type {?} */
    ListingComponent.prototype.router;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdGluZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9jcnVkLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbGlzdGluZy9saXN0aW5nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRTdELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFzRjNELE1BQU07Ozs7Ozs7SUFtQkYsWUFBb0IsR0FBZSxFQUNmLEtBQ0EsT0FDQTtRQUhBLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFDZixRQUFHLEdBQUgsR0FBRztRQUNILFVBQUssR0FBTCxLQUFLO1FBQ0wsV0FBTSxHQUFOLE1BQU07b0JBakJWLFFBQVE7OEJBQ1AsS0FBSzswQkFFVCxJQUFJLGtCQUFrQixFQUFFOzRCQUN0QjtZQUNYLElBQUksRUFBRSxDQUFDO1NBQ1Y7dUJBRVMsRUFBRTs4QkFDZSxFQUFFOzRCQUNkLENBQUM7eUJBQ0osSUFBSTtzQkFDRyxJQUFJLFlBQVksRUFBRTtLQUtDOzs7O0lBRXRDLFdBQVc7UUFDUCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUM1QjtLQUNMOzs7O0lBRVEsY0FBYztRQUNsQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxD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LENBQUM7S0FDM0I7OztZQS9MSixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQkE2RUs7Z0JBQ2YsTUFBTSxFQUFFLENBQUMsdUNBQXVDLENBQUM7Z0JBQ2pELFFBQVEsRUFBRSxrQkFBa0I7YUFDN0I7Ozs7WUF0RlEsVUFBVTtZQUNWLFFBQVE7WUFKUixjQUFjO1lBQUUsTUFBTTs7O3lCQTRGMUIsS0FBSyxTQUFDLFlBQVk7c0JBQ2xCLEtBQUssU0FBQyxTQUFTO3dCQUNmLEtBQUssU0FBQyxXQUFXO21CQUNqQixLQUFLO2lDQUVMLEtBQUs7cUJBVUwsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25DaGFuZ2VzLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgTWF0VGFibGVEYXRhU291cmNlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdGFibGUnO1xuXG5pbXBvcnQgeyBBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVnaXN0cnkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9yZWdpc3RyeS5zZXJ2aWNlJztcbmltcG9ydCB7ICBNb2RlbCB9IGZyb20gJy4uLy4uL3NjcmVlbnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy1jcnVkLWxpc3RpbmcnLFxuICB0ZW1wbGF0ZTogYDwhLS0gPG1hdC10b29sYmFyPlxuICAgIDxhIHJvdXRlckxpbms9XCIvXCIgbWF0LWljb24tYnV0dG9uIGNsYXNzPVwibWF0LWNhcHRpb25cIj48bWF0LWljb24+aG9tZTwvbWF0LWljb24+PC9hPlxuICAgIDxtYXQtaWNvbj5rZXlib2FyZF9hcnJvd19yaWdodDwvbWF0LWljb24+XG4gICAgPGEgbWF0LWJ1dHRvbiBbcm91dGVyTGlua109XCInLycrbW9kdWxlTmFtZSsnLycrYXBwTmFtZVwiIGNsYXNzPVwibWF0LWNhcHRpb25cIj57eyBhcHBOYW1lIH19PC9hPlxuICAgIDxtYXQtaWNvbj5rZXlib2FyZF9hcnJvd19yaWdodDwvbWF0LWljb24+XG4gICAgPGEgbWF0LWJ1dHRvbiBjbGFzcz1cIm1hdC1jYXB0aW9uXCI+e3sgbW9kZWwudmVyYm9zZV9uYW1lIH19czwvYT5cbiAgICA8c3BhbiBjbGFzcz1cInRvb2xiYXItZmlsbC1yZW1haW5pbmctc3BhY2VcIj48L3NwYW4+XG4gICAgPGEgbWF0LWJ1dHRvbiBbcm91dGVyTGlua109XCInLycrbW9kdWxlTmFtZSsnLycrYXBwTmFtZSsnLycrbW9kZWxOYW1lKycvbmV3J1wiIGNvbG9yPVwicHJpbWFyeVwiPkNyZWF0ZTwvYT5cbiAgICAmbmJzcDtcbiAgICA8YnV0dG9uIG1hdC1idXR0b24gY29sb3I9XCJ3YXJuXCIgW21hdE1lbnVUcmlnZ2VyRm9yXT1cIm1lbnVcIj5CdWxrIEFjdGlvbnMgPG1hdC1pY29uPmFycm93X2Ryb3BfZG93bjwvbWF0LWljb24+PC9idXR0b24+ICAgIFxuICAgIDxtYXQtbWVudSAjbWVudT1cIm1hdE1lbnVcIiA+XG4gICAgICAgIDxidXR0b24gbWF0LW1lbnUtaXRlbT5EZWxldGU8L2J1dHRvbj5cbiAgICA8L21hdC1tZW51PlxuPC9tYXQtdG9vbGJhcj4gLS0+XG5cbjxkaXYgY2xhc3M9XCJyb3dcIiAqbmdJZj1cIm1vZGUgIT09ICdwaWNrJ1wiPlxuICAgIDxzcGFuIGNsYXNzPVwiZmlsbC1yZW1haW5pbmctc3BhY2VcIj48L3NwYW4+XG4gICAgPGJ1dHRvbiBtYXQtYnV0dG9uIGNvbG9yPVwid2FyblwiIFttYXRNZW51VHJpZ2dlckZvcl09XCJtZW51XCI+QnVsayBBY3Rpb25zIDxtYXQtaWNvbj5hcnJvd19kcm9wX2Rvd248L21hdC1pY29uPjwvYnV0dG9uPiAgICBcbiAgICA8bWF0LW1lbnUgI21lbnU9XCJtYXRNZW51XCIgPlxuICAgICAgICA8YnV0dG9uIG1hdC1tZW51LWl0ZW0+RGVsZXRlPC9idXR0b24+XG4gICAgPC9tYXQtbWVudT5cbjwvZGl2PlxuXG48bWF0LWV4cGFuc2lvbi1wYW5lbD5cbiAgICA8bWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXI+XG4gICAgICAgIDxtYXQtcGFuZWwtdGl0bGU+XG4gICAgICAgICAgICA8bWF0LWljb24+c2VhcmNoPC9tYXQtaWNvbj5cbiAgICAgICAgPC9tYXQtcGFuZWwtdGl0bGU+XG4gICAgICAgIDxtYXQtcGFuZWwtZGVzY3JpcHRpb24+XG4gICAgICAgICAgICBTZWFyY2ggYW5kIGZpbHRlciByZXN0dWx0c1xuICAgICAgICA8L21hdC1wYW5lbC1kZXNjcmlwdGlvbj4gICAgICAgICAgICAgICAgXG4gICAgPC9tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlcj5cblxuICAgIDxuZy1jcnVkLW1vZGVsLWZvcm0gW21vZHVsZU5hbWVdPVwibW9kdWxlTmFtZVwiIFthcHBOYW1lXT1cImFwcE5hbWVcIiBtb2RlPSdzZWFyY2gnXG4gICAgICAgICAgICAgICAgIFttb2RlbE5hbWVdPVwibW9kZWxOYW1lXCIgKHN1Ym1pdCk9XCJvblNlYXJjaCgkZXZlbnQpXCI+PC9uZy1jcnVkLW1vZGVsLWZvcm0+XG5cbjwvbWF0LWV4cGFuc2lvbi1wYW5lbD4gICAgXG5cbjxtYXQtcHJvZ3Jlc3MtYmFyICpuZ0lmPVwiaXNMb2FkaW5nXCIgbW9kZT1cInF1ZXJ5XCI+PC9tYXQtcHJvZ3Jlc3MtYmFyPlxuXG48bWF0LXRhYmxlIFtkYXRhU291cmNlXT1cImRhdGFTb3VyY2VcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgY29sdW1uc1wiIFttYXRDb2x1bW5EZWZdPVwiY29sdW1uLmNvbHVtbkRlZlwiPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiY29sdW1uLmNvbHVtbkRlZiA9PT0gJ2NoZWNrZWQnXCI+XG4gICAgICAgICAgICA8bWF0LWhlYWRlci1jZWxsICptYXRIZWFkZXJDZWxsRGVmIChjbGljayk9XCJvbkNoZWNrQWxsKClcIj48bWF0LWNoZWNrYm94PjwvbWF0LWNoZWNrYm94PjwvbWF0LWhlYWRlci1jZWxsPlxuICAgICAgICAgICAgPG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IHJvd1wiPiA8bWF0LWNoZWNrYm94PjwvbWF0LWNoZWNrYm94PiA8L21hdC1jZWxsPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiY29sdW1uLmNvbHVtbkRlZiAhPT0gJ2NoZWNrZWQnICYmIGNvbHVtbi5jb2x1bW5EZWYgIT09ICdhY3Rpb25zJ1wiPlxuICAgICAgICAgICAgPG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZj57eyBjb2x1bW4uaGVhZGVyIH19PC9tYXQtaGVhZGVyLWNlbGw+XG4gICAgICAgICAgICA8bWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgcm93XCI+XG4gICAgICAgICAgICAgICAgPCEtLSA8YSAqbmdJZj1cImNvbHVtbi5jbGlja2FibGU7IGVsc2Ugbm9ybWFsXCIgW3JvdXRlckxpbmtdPVwiZ2V0TGluayhyb3cuaWQpXCI+e3sgY29sdW1uLmNlbGwocm93KSB9fTwvYT5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI25vcm1hbD57eyBjb2x1bW4uY2VsbChyb3cpIH19PC9uZy10ZW1wbGF0ZT4gICAgIC0tPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwiY2xpY2thYmxlXCIgW3JvdXRlckxpbmtdPVwiW3Jvdy5pZF1cIiAqbmdJZj1cIihtb2RlICE9PSAncGljaycgJiYgY29sdW1uLmNvbHVtbkRlZiA9PT0gbW9kZWwuZXh0ZXJuYWxfbmFtZV9maWVsZCk7IGVsc2Ugbm9ybWFsQ2VsbFwiPlxuICAgICAgICAgICAgICAgICAgICB7eyBjb2x1bW4uY2VsbChyb3cpIH19XG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjbm9ybWFsQ2VsbD5cbiAgICAgICAgICAgICAgICAgICAge3sgY29sdW1uLmNlbGwocm93KSB9fVxuICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8L21hdC1jZWxsPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiY29sdW1uLmNvbHVtbkRlZiA9PT0gJ2FjdGlvbnMnXCI+XG4gICAgICAgICAgICA8bWF0LWhlYWRlci1jZWxsICptYXRIZWFkZXJDZWxsRGVmPnt7IGNvbHVtbi5oZWFkZXIgfX08L21hdC1oZWFkZXItY2VsbD5cbiAgICAgICAgICAgIDxtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCByb3dcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1idXR0b24gKm5nRm9yPVwibGV0IGFjdGlvbiBvZiBtb2RlbC5saXN0X2FjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICAgICAge3sgYWN0aW9uIH19XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L21hdC1jZWxsPlxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgIDxtYXQtaGVhZGVyLXJvdyAqbWF0SGVhZGVyUm93RGVmPVwiZGlzcGxheUNvbHVtbnNcIj48L21hdC1oZWFkZXItcm93PlxuICAgIDxtYXQtcm93ICAqbWF0Um93RGVmPVwibGV0IHJvdzsgY29sdW1uczogZGlzcGxheUNvbHVtbnM7XCIgW25nQ2xhc3NdPVwieydjbGlja2FibGUnOiBtb2RlID09PSAncGljayd9XCIgKGNsaWNrKT1cIl9waWNrZWQocm93W3RoaXMubW9kZWwuZXh0ZXJuYWxfdmFsdWVfZmllbGRdKVwiPjwvbWF0LXJvdz5cbjwvbWF0LXRhYmxlPlxuXG48bWF0LXBhZ2luYXRvciAjcGFnaW5hdG9yXG4gICAgW2xlbmd0aF09XCJyZXN1bHRzQ291bnRcIlxuICAgIFtwYWdlSW5kZXhdPVwic2VhcmNoUGFyYW1zLnBhZ2UgLSAxXCJcbiAgICBbcGFnZVNpemVdPVwiMjBcIj5cbjwvbWF0LXBhZ2luYXRvcj5gLFxuICBzdHlsZXM6IFtgLmNsaWNrYWJsZXtjb2xvcjojMDBmO2N1cnNvcjpwb2ludGVyfWBdLFxuICBleHBvcnRBczogJ25nY3J1ZHVpLWxpc3RpbmcnXG59KVxuZXhwb3J0IGNsYXNzIExpc3RpbmdDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gICAgQElucHV0KCdtb2R1bGVOYW1lJykgbW9kdWxlTmFtZTogc3RyaW5nO1xuICAgIEBJbnB1dCgnYXBwTmFtZScpIGFwcE5hbWU6IHN0cmluZztcbiAgICBASW5wdXQoJ21vZGVsTmFtZScpIG1vZGVsTmFtZTogc3RyaW5nO1xuICAgIEBJbnB1dCgpIG1vZGUgPSAnbm9ybWFsJzsgLy8gb3RoZXIgbW9kZXM6ICdwaWNrJ1xuICAgIGlzX2FjdGlvbnNfc2V0ID0gZmFsc2U7XG4gICAgQElucHV0KCkgZm9yY2VkU2VhcmNoUGFyYW1zOiBhbnk7XG4gICAgZGF0YVNvdXJjZSA9IG5ldyBNYXRUYWJsZURhdGFTb3VyY2UoKTtcbiAgICBzZWFyY2hQYXJhbXMgPSB7XG4gICAgICAgIHBhZ2U6IDEsXG4gICAgfTtcbiAgICBtb2RlbDogTW9kZWw7XG4gICAgY29sdW1ucyA9IFtdO1xuICAgIGRpc3BsYXlDb2x1bW5zOiBzdHJpbmdbXSA9IFtdO1xuICAgIHJlc3VsdHNDb3VudCA9IDA7XG4gICAgaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICBAT3V0cHV0KCkgcGlja2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhcGk6IEFwaVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByZWc6IFJlZ2lzdHJ5LFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHt9XG5cbiAgICBuZ09uQ2hhbmdlcygpIHtcbiAgICAgICAgaWYgKHRoaXMubW9kZWxOYW1lKSB7XG4gICAgICAgICAgICB0aGlzLnBvcHVsYXRlRGF0YVRhYmxlKCk7XG4gICAgICAgIH1cbiAgIH1cblxuICAgIHByaXZhdGUgcHJlcGFyZUNvbHVtbnMoKSB7XG4gICAgICAgIGlmICh0aGlzLm1vZGUgIT09ICdwaWNrJykge1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5zID0gW3snY29sdW1uRGVmJzogJ2NoZWNrZWQnLCAnaGVhZGVyJzogJyd9XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29sdW1ucyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubW9kZWwubGlzdGluZ19maWVsZHMubWFwKGZpZWxkID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGYgPSB0aGlzLm1vZGVsLmZpZWxkcy5maWx0ZXIoZmYgPT4gZmYua2V5ID09PSBmaWVsZClbMF07XG4gICAgICAgICAgICBjb25zdCBjb2wgPSB7fTtcbiAgICAgICAgICAgIGNvbFsnY29sdW1uRGVmJ10gPSBmLmtleTtcbiAgICAgICAgICAgIGNvbFsnaGVhZGVyJ10gPSBmLmxhYmVsO1xuICAgICAgICAgICAgY29sWydjZWxsJ10gPSAoZWxlbWVudDogRWxlbWVudCkgPT4gYCR7ZWxlbWVudFtmLmtleV19YDtcbiAgICAgICAgICAgIGlmICh0aGlzLm1vZGVsLmV4dGVybmFsX25hbWVfZmllbGQgPT09IGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgY29sWydjbGlja2FibGUnXSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNvbHVtbnMucHVzaChjb2wpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRoaXMubW9kZSAhPT0gJ3BpY2snKSB7XG4gICAgICAgICAgICB0aGlzLmNvbHVtbnMucHVzaCh7J2NvbHVtbkRlZic6ICdhY3Rpb25zJywgJ2hlYWRlcic6ICcnfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHBvcHVsYXRlRGF0YVRhYmxlKCkge1xuICAgICAgICB0aGlzLm1vZGVsID0gdGhpcy5yZWcuZ2V0TW9kZWwodGhpcy5tb2R1bGVOYW1lLCB0aGlzLmFwcE5hbWUsIHRoaXMubW9kZWxOYW1lKTtcbiAgICAgICAgdGhpcy5wcmVwYXJlQ29sdW1ucygpO1xuICAgICAgICB0aGlzLmRpc3BsYXlDb2x1bW5zID0gdGhpcy5jb2x1bW5zLm1hcChjID0+IGMuY29sdW1uRGVmKTtcbiAgICAgICAgdGhpcy5yZXN1bHRzQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2UuZGF0YSA9IFtdO1xuICAgICAgICAvLyB0aGlzLmRpc3BsYXlDb2x1bW5zLnB1c2goJ2FjdGlvbnMnKTtcbiAgICAgICAgdGhpcy5zZWFyY2hQYXJhbXMgPSB7cGFnZTogMX07XG4gICAgICAgIHRoaXMuZmV0Y2goKTtcbiAgICB9XG5cbiAgICBmZXRjaCgpIHtcbiAgICAgICAgdGhpcy5hcGkuZmV0Y2godGhpcy5tb2RlbC5hcGksIHRoaXMuc2VhcmNoUGFyYW1zKS5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgICAgIGxldCBuZXdJdGVtcyA9IFtdO1xuICAgICAgICAgICAgaWYgKHJlcy5yZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgbmV3SXRlbXMgPSB0aGlzLmRhdGFTb3VyY2UuZGF0YS5jb25jYXQocmVzLnJlc3VsdHMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdJdGVtcyA9IHRoaXMuZGF0YVNvdXJjZS5kYXRhLmNvbmNhdChyZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5yZXN1bHRzQ291bnQgPSBuZXdJdGVtcy5sZW5ndGg7XG4gICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2UuZGF0YSA9IG5ld0l0ZW1zO1xuICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSwgZXJyID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgZ2V0TGluayhpZCk6IHN0cmluZ1tdIHtcbiAgICAgICByZXR1cm4gWycvJywgdGhpcy5tb2R1bGVOYW1lLCB0aGlzLmFwcE5hbWUsIHRoaXMubW9kZWxOYW1lLCBpZF07XG4gICB9XG5cbiAgIGNlbGxDbGlja2VkKGNvbHVtbk5hbWU6IHN0cmluZywgcm93OiBhbnkpIHtcbiAgICAgICBpZiAoY29sdW1uTmFtZSA9PT0gdGhpcy5tb2RlbC5leHRlcm5hbF9uYW1lX2ZpZWxkKSB7XG4gICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKHRoaXMuZ2V0TGluayhyb3cuaWQpKTtcbiAgICAgICB9XG4gICB9XG5cbiAgICBvblNlYXJjaChzZWFyY2hQYXJhbXMpIHtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmRhdGFTb3VyY2UuZGF0YSA9IFtdO1xuICAgICAgICB0aGlzLnJlc3VsdHNDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuc2VhcmNoUGFyYW1zID0gc2VhcmNoUGFyYW1zO1xuICAgICAgICB0aGlzLnNlYXJjaFBhcmFtcy5wYWdlID0gMTtcbiAgICAgICAgdGhpcy5mZXRjaCgpO1xuICAgIH1cblxuICAgIG9uQ2hlY2tlZChyb3cpIHtcbiAgICAgICAgcm93Wydpc19jaGVja2VkJ10gPSB0cnVlO1xuICAgIH1cblxuICAgIG9uQ2hlY2tBbGwoKSB7XG5cbiAgICB9XG5cbiAgICBfcGlja2VkKHZhbHVlKSB7XG4gICAgICAgIHRoaXMucGlja2VkLm5leHQodmFsdWUpO1xuICAgIH1cblxufVxuIl19
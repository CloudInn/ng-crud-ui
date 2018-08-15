/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { Registry } from '../../services/registry.service';
var ListingComponent = /** @class */ (function () {
    function ListingComponent(api, reg, route, router) {
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
        { type: Component, args: [{
                    selector: 'ng-crud-listing',
                    template: "<!-- <mat-toolbar>\n    <a routerLink=\"/\" mat-icon-button class=\"mat-caption\"><mat-icon>home</mat-icon></a>\n    <mat-icon>keyboard_arrow_right</mat-icon>\n    <a mat-button [routerLink]=\"'/'+moduleName+'/'+appName\" class=\"mat-caption\">{{ appName }}</a>\n    <mat-icon>keyboard_arrow_right</mat-icon>\n    <a mat-button class=\"mat-caption\">{{ model.verbose_name }}s</a>\n    <span class=\"toolbar-fill-remaining-space\"></span>\n    <a mat-button [routerLink]=\"'/'+moduleName+'/'+appName+'/'+modelName+'/new'\" color=\"primary\">Create</a>\n    &nbsp;\n    <button mat-button color=\"warn\" [matMenuTriggerFor]=\"menu\">Bulk Actions <mat-icon>arrow_drop_down</mat-icon></button>    \n    <mat-menu #menu=\"matMenu\" >\n        <button mat-menu-item>Delete</button>\n    </mat-menu>\n</mat-toolbar> -->\n\n<div class=\"row\" *ngIf=\"mode !== 'pick'\">\n    <span class=\"fill-remaining-space\"></span>\n    <button mat-button color=\"warn\" [matMenuTriggerFor]=\"menu\">Bulk Actions <mat-icon>arrow_drop_down</mat-icon></button>    \n    <mat-menu #menu=\"matMenu\" >\n        <button mat-menu-item>Delete</button>\n    </mat-menu>\n</div>\n\n<mat-expansion-panel>\n    <mat-expansion-panel-header>\n        <mat-panel-title>\n            <mat-icon>search</mat-icon>\n        </mat-panel-title>\n        <mat-panel-description>\n            Search and filter restults\n        </mat-panel-description>                \n    </mat-expansion-panel-header>\n\n    <ng-crud-model-form [moduleName]=\"moduleName\" [appName]=\"appName\" mode='search'\n                 [modelName]=\"modelName\" (submit)=\"onSearch($event)\"></ng-crud-model-form>\n\n</mat-expansion-panel>    \n\n<mat-progress-bar *ngIf=\"isLoading\" mode=\"query\"></mat-progress-bar>\n\n<mat-table [dataSource]=\"dataSource\">\n    <ng-container *ngFor=\"let column of columns\" [matColumnDef]=\"column.columnDef\">\n        <ng-template [ngIf]=\"column.columnDef === 'checked'\">\n            <mat-header-cell *matHeaderCellDef (click)=\"onCheckAll()\"><mat-checkbox></mat-checkbox></mat-header-cell>\n            <mat-cell *matCellDef=\"let row\"> <mat-checkbox></mat-checkbox> </mat-cell>\n        </ng-template>\n        <ng-template [ngIf]=\"column.columnDef !== 'checked' && column.columnDef !== 'actions'\">\n            <mat-header-cell *matHeaderCellDef>{{ column.header }}</mat-header-cell>\n            <mat-cell *matCellDef=\"let row\">\n                <!-- <a *ngIf=\"column.clickable; else normal\" [routerLink]=\"getLink(row.id)\">{{ column.cell(row) }}</a>\n                <ng-template #normal>{{ column.cell(row) }}</ng-template>     -->\n                <a class=\"clickable\" [routerLink]=\"[row.id]\" *ngIf=\"(mode !== 'pick' && column.columnDef === model.external_name_field); else normalCell\">\n                    {{ column.cell(row) }}\n                </a>\n                <ng-template #normalCell>\n                    {{ column.cell(row) }}\n                </ng-template>\n            </mat-cell>\n        </ng-template>\n        <ng-template [ngIf]=\"column.columnDef === 'actions'\">\n            <mat-header-cell *matHeaderCellDef>{{ column.header }}</mat-header-cell>\n            <mat-cell *matCellDef=\"let row\">\n                <button mat-button *ngFor=\"let action of model.list_actions\">\n                    {{ action }}\n                </button>\n            </mat-cell>\n            </ng-template>\n    </ng-container>\n\n    <mat-header-row *matHeaderRowDef=\"displayColumns\"></mat-header-row>\n    <mat-row  *matRowDef=\"let row; columns: displayColumns;\" [ngClass]=\"{'clickable': mode === 'pick'}\" (click)=\"_picked(row[this.model.external_value_field])\"></mat-row>\n</mat-table>\n\n<mat-paginator #paginator\n    [length]=\"resultsCount\"\n    [pageIndex]=\"searchParams.page - 1\"\n    [pageSize]=\"20\">\n</mat-paginator>",
                    styles: [".clickable{color:#00f;cursor:pointer}"],
                    exportAs: 'ngcrudui-listing'
                },] },
    ];
    /** @nocollapse */
    ListingComponent.ctorParameters = function () { return [
        { type: ApiService },
        { type: Registry },
        { type: ActivatedRoute },
        { type: Router }
    ]; };
    ListingComponent.propDecorators = {
        moduleName: [{ type: Input, args: ['moduleName',] }],
        appName: [{ type: Input, args: ['appName',] }],
        modelName: [{ type: Input, args: ['modelName',] }],
        mode: [{ type: Input }],
        forcedSearchParams: [{ type: Input }],
        picked: [{ type: Output }]
    };
    return ListingComponent;
}());
export { ListingComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdGluZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9jcnVkLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbGlzdGluZy9saXN0aW5nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRTdELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUNBQWlDLENBQUM7O0lBeUd2RCwwQkFBb0IsR0FBZSxFQUNmLEtBQ0EsT0FDQTtRQUhBLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFDZixRQUFHLEdBQUgsR0FBRztRQUNILFVBQUssR0FBTCxLQUFLO1FBQ0wsV0FBTSxHQUFOLE1BQU07b0JBakJWLFFBQVE7OEJBQ1AsS0FBSzswQkFFVCxJQUFJLGtCQUFrQixFQUFFOzRCQUN0QjtZQUNYLElBQUksRUFBRSxDQUFDO1NBQ1Y7dUJBRVMsRUFBRTs4QkFDZSxFQUFFOzRCQUNkLENBQUM7eUJBQ0osSUFBSTtzQkFDRyxJQUFJLFlBQVksRUFBRTtLQUtDOzs7O0lBRXRDLHNDQUFXOzs7SUFBWDtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzVCO0tBQ0w7Ozs7SUFFUSx5Q0FBYzs7Ozs7UUFDbEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FB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O0tBRUM7Ozs7O0lBRUQsa0NBQU87Ozs7SUFBUCxVQUFRLEtBQUs7UUFDVCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUMzQjs7Z0JBL0xKLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixRQUFRLEVBQUUsK3dIQTZFSztvQkFDZixNQUFNLEVBQUUsQ0FBQyx1Q0FBdUMsQ0FBQztvQkFDakQsUUFBUSxFQUFFLGtCQUFrQjtpQkFDN0I7Ozs7Z0JBdEZRLFVBQVU7Z0JBQ1YsUUFBUTtnQkFKUixjQUFjO2dCQUFFLE1BQU07Ozs2QkE0RjFCLEtBQUssU0FBQyxZQUFZOzBCQUNsQixLQUFLLFNBQUMsU0FBUzs0QkFDZixLQUFLLFNBQUMsV0FBVzt1QkFDakIsS0FBSztxQ0FFTCxLQUFLO3lCQVVMLE1BQU07OzJCQTVHWDs7U0EyRmEsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkNoYW5nZXMsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBNYXRUYWJsZURhdGFTb3VyY2UgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90YWJsZSc7XG5cbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBSZWdpc3RyeSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3JlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHsgIE1vZGVsIH0gZnJvbSAnLi4vLi4vc2NyZWVucyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLWNydWQtbGlzdGluZycsXG4gIHRlbXBsYXRlOiBgPCEtLSA8bWF0LXRvb2xiYXI+XG4gICAgPGEgcm91dGVyTGluaz1cIi9cIiBtYXQtaWNvbi1idXR0b24gY2xhc3M9XCJtYXQtY2FwdGlvblwiPjxtYXQtaWNvbj5ob21lPC9tYXQtaWNvbj48L2E+XG4gICAgPG1hdC1pY29uPmtleWJvYXJkX2Fycm93X3JpZ2h0PC9tYXQtaWNvbj5cbiAgICA8YSBtYXQtYnV0dG9uIFtyb3V0ZXJMaW5rXT1cIicvJyttb2R1bGVOYW1lKycvJythcHBOYW1lXCIgY2xhc3M9XCJtYXQtY2FwdGlvblwiPnt7IGFwcE5hbWUgfX08L2E+XG4gICAgPG1hdC1pY29uPmtleWJvYXJkX2Fycm93X3JpZ2h0PC9tYXQtaWNvbj5cbiAgICA8YSBtYXQtYnV0dG9uIGNsYXNzPVwibWF0LWNhcHRpb25cIj57eyBtb2RlbC52ZXJib3NlX25hbWUgfX1zPC9hPlxuICAgIDxzcGFuIGNsYXNzPVwidG9vbGJhci1maWxsLXJlbWFpbmluZy1zcGFjZVwiPjwvc3Bhbj5cbiAgICA8YSBtYXQtYnV0dG9uIFtyb3V0ZXJMaW5rXT1cIicvJyttb2R1bGVOYW1lKycvJythcHBOYW1lKycvJyttb2RlbE5hbWUrJy9uZXcnXCIgY29sb3I9XCJwcmltYXJ5XCI+Q3JlYXRlPC9hPlxuICAgICZuYnNwO1xuICAgIDxidXR0b24gbWF0LWJ1dHRvbiBjb2xvcj1cIndhcm5cIiBbbWF0TWVudVRyaWdnZXJGb3JdPVwibWVudVwiPkJ1bGsgQWN0aW9ucyA8bWF0LWljb24+YXJyb3dfZHJvcF9kb3duPC9tYXQtaWNvbj48L2J1dHRvbj4gICAgXG4gICAgPG1hdC1tZW51ICNtZW51PVwibWF0TWVudVwiID5cbiAgICAgICAgPGJ1dHRvbiBtYXQtbWVudS1pdGVtPkRlbGV0ZTwvYnV0dG9uPlxuICAgIDwvbWF0LW1lbnU+XG48L21hdC10b29sYmFyPiAtLT5cblxuPGRpdiBjbGFzcz1cInJvd1wiICpuZ0lmPVwibW9kZSAhPT0gJ3BpY2snXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJmaWxsLXJlbWFpbmluZy1zcGFjZVwiPjwvc3Bhbj5cbiAgICA8YnV0dG9uIG1hdC1idXR0b24gY29sb3I9XCJ3YXJuXCIgW21hdE1lbnVUcmlnZ2VyRm9yXT1cIm1lbnVcIj5CdWxrIEFjdGlvbnMgPG1hdC1pY29uPmFycm93X2Ryb3BfZG93bjwvbWF0LWljb24+PC9idXR0b24+ICAgIFxuICAgIDxtYXQtbWVudSAjbWVudT1cIm1hdE1lbnVcIiA+XG4gICAgICAgIDxidXR0b24gbWF0LW1lbnUtaXRlbT5EZWxldGU8L2J1dHRvbj5cbiAgICA8L21hdC1tZW51PlxuPC9kaXY+XG5cbjxtYXQtZXhwYW5zaW9uLXBhbmVsPlxuICAgIDxtYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlcj5cbiAgICAgICAgPG1hdC1wYW5lbC10aXRsZT5cbiAgICAgICAgICAgIDxtYXQtaWNvbj5zZWFyY2g8L21hdC1pY29uPlxuICAgICAgICA8L21hdC1wYW5lbC10aXRsZT5cbiAgICAgICAgPG1hdC1wYW5lbC1kZXNjcmlwdGlvbj5cbiAgICAgICAgICAgIFNlYXJjaCBhbmQgZmlsdGVyIHJlc3R1bHRzXG4gICAgICAgIDwvbWF0LXBhbmVsLWRlc2NyaXB0aW9uPiAgICAgICAgICAgICAgICBcbiAgICA8L21hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyPlxuXG4gICAgPG5nLWNydWQtbW9kZWwtZm9ybSBbbW9kdWxlTmFtZV09XCJtb2R1bGVOYW1lXCIgW2FwcE5hbWVdPVwiYXBwTmFtZVwiIG1vZGU9J3NlYXJjaCdcbiAgICAgICAgICAgICAgICAgW21vZGVsTmFtZV09XCJtb2RlbE5hbWVcIiAoc3VibWl0KT1cIm9uU2VhcmNoKCRldmVudClcIj48L25nLWNydWQtbW9kZWwtZm9ybT5cblxuPC9tYXQtZXhwYW5zaW9uLXBhbmVsPiAgICBcblxuPG1hdC1wcm9ncmVzcy1iYXIgKm5nSWY9XCJpc0xvYWRpbmdcIiBtb2RlPVwicXVlcnlcIj48L21hdC1wcm9ncmVzcy1iYXI+XG5cbjxtYXQtdGFibGUgW2RhdGFTb3VyY2VdPVwiZGF0YVNvdXJjZVwiPlxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBjb2x1bW5zXCIgW21hdENvbHVtbkRlZl09XCJjb2x1bW4uY29sdW1uRGVmXCI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJjb2x1bW4uY29sdW1uRGVmID09PSAnY2hlY2tlZCdcIj5cbiAgICAgICAgICAgIDxtYXQtaGVhZGVyLWNlbGwgKm1hdEhlYWRlckNlbGxEZWYgKGNsaWNrKT1cIm9uQ2hlY2tBbGwoKVwiPjxtYXQtY2hlY2tib3g+PC9tYXQtY2hlY2tib3g+PC9tYXQtaGVhZGVyLWNlbGw+XG4gICAgICAgICAgICA8bWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgcm93XCI+IDxtYXQtY2hlY2tib3g+PC9tYXQtY2hlY2tib3g+IDwvbWF0LWNlbGw+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJjb2x1bW4uY29sdW1uRGVmICE9PSAnY2hlY2tlZCcgJiYgY29sdW1uLmNvbHVtbkRlZiAhPT0gJ2FjdGlvbnMnXCI+XG4gICAgICAgICAgICA8bWF0LWhlYWRlci1jZWxsICptYXRIZWFkZXJDZWxsRGVmPnt7IGNvbHVtbi5oZWFkZXIgfX08L21hdC1oZWFkZXItY2VsbD5cbiAgICAgICAgICAgIDxtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCByb3dcIj5cbiAgICAgICAgICAgICAgICA8IS0tIDxhICpuZ0lmPVwiY29sdW1uLmNsaWNrYWJsZTsgZWxzZSBub3JtYWxcIiBbcm91dGVyTGlua109XCJnZXRMaW5rKHJvdy5pZClcIj57eyBjb2x1bW4uY2VsbChyb3cpIH19PC9hPlxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjbm9ybWFsPnt7IGNvbHVtbi5jZWxsKHJvdykgfX08L25nLXRlbXBsYXRlPiAgICAgLS0+XG4gICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJjbGlja2FibGVcIiBbcm91dGVyTGlua109XCJbcm93LmlkXVwiICpuZ0lmPVwiKG1vZGUgIT09ICdwaWNrJyAmJiBjb2x1bW4uY29sdW1uRGVmID09PSBtb2RlbC5leHRlcm5hbF9uYW1lX2ZpZWxkKTsgZWxzZSBub3JtYWxDZWxsXCI+XG4gICAgICAgICAgICAgICAgICAgIHt7IGNvbHVtbi5jZWxsKHJvdykgfX1cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNub3JtYWxDZWxsPlxuICAgICAgICAgICAgICAgICAgICB7eyBjb2x1bW4uY2VsbChyb3cpIH19XG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvbWF0LWNlbGw+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJjb2x1bW4uY29sdW1uRGVmID09PSAnYWN0aW9ucydcIj5cbiAgICAgICAgICAgIDxtYXQtaGVhZGVyLWNlbGwgKm1hdEhlYWRlckNlbGxEZWY+e3sgY29sdW1uLmhlYWRlciB9fTwvbWF0LWhlYWRlci1jZWxsPlxuICAgICAgICAgICAgPG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IHJvd1wiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiAqbmdGb3I9XCJsZXQgYWN0aW9uIG9mIG1vZGVsLmxpc3RfYWN0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgICB7eyBhY3Rpb24gfX1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvbWF0LWNlbGw+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgPG1hdC1oZWFkZXItcm93ICptYXRIZWFkZXJSb3dEZWY9XCJkaXNwbGF5Q29sdW1uc1wiPjwvbWF0LWhlYWRlci1yb3c+XG4gICAgPG1hdC1yb3cgICptYXRSb3dEZWY9XCJsZXQgcm93OyBjb2x1bW5zOiBkaXNwbGF5Q29sdW1ucztcIiBbbmdDbGFzc109XCJ7J2NsaWNrYWJsZSc6IG1vZGUgPT09ICdwaWNrJ31cIiAoY2xpY2spPVwiX3BpY2tlZChyb3dbdGhpcy5tb2RlbC5leHRlcm5hbF92YWx1ZV9maWVsZF0pXCI+PC9tYXQtcm93PlxuPC9tYXQtdGFibGU+XG5cbjxtYXQtcGFnaW5hdG9yICNwYWdpbmF0b3JcbiAgICBbbGVuZ3RoXT1cInJlc3VsdHNDb3VudFwiXG4gICAgW3BhZ2VJbmRleF09XCJzZWFyY2hQYXJhbXMucGFnZSAtIDFcIlxuICAgIFtwYWdlU2l6ZV09XCIyMFwiPlxuPC9tYXQtcGFnaW5hdG9yPmAsXG4gIHN0eWxlczogW2AuY2xpY2thYmxle2NvbG9yOiMwMGY7Y3Vyc29yOnBvaW50ZXJ9YF0sXG4gIGV4cG9ydEFzOiAnbmdjcnVkdWktbGlzdGluZydcbn0pXG5leHBvcnQgY2xhc3MgTGlzdGluZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgICBASW5wdXQoJ21vZHVsZU5hbWUnKSBtb2R1bGVOYW1lOiBzdHJpbmc7XG4gICAgQElucHV0KCdhcHBOYW1lJykgYXBwTmFtZTogc3RyaW5nO1xuICAgIEBJbnB1dCgnbW9kZWxOYW1lJykgbW9kZWxOYW1lOiBzdHJpbmc7XG4gICAgQElucHV0KCkgbW9kZSA9ICdub3JtYWwnOyAvLyBvdGhlciBtb2RlczogJ3BpY2snXG4gICAgaXNfYWN0aW9uc19zZXQgPSBmYWxzZTtcbiAgICBASW5wdXQoKSBmb3JjZWRTZWFyY2hQYXJhbXM6IGFueTtcbiAgICBkYXRhU291cmNlID0gbmV3IE1hdFRhYmxlRGF0YVNvdXJjZSgpO1xuICAgIHNlYXJjaFBhcmFtcyA9IHtcbiAgICAgICAgcGFnZTogMSxcbiAgICB9O1xuICAgIG1vZGVsOiBNb2RlbDtcbiAgICBjb2x1bW5zID0gW107XG4gICAgZGlzcGxheUNvbHVtbnM6IHN0cmluZ1tdID0gW107XG4gICAgcmVzdWx0c0NvdW50ID0gMDtcbiAgICBpc0xvYWRpbmcgPSB0cnVlO1xuICAgIEBPdXRwdXQoKSBwaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwaTogQXBpU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJlZzogUmVnaXN0cnksXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge31cblxuICAgIG5nT25DaGFuZ2VzKCkge1xuICAgICAgICBpZiAodGhpcy5tb2RlbE5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMucG9wdWxhdGVEYXRhVGFibGUoKTtcbiAgICAgICAgfVxuICAgfVxuXG4gICAgcHJpdmF0ZSBwcmVwYXJlQ29sdW1ucygpIHtcbiAgICAgICAgaWYgKHRoaXMubW9kZSAhPT0gJ3BpY2snKSB7XG4gICAgICAgICAgICB0aGlzLmNvbHVtbnMgPSBbeydjb2x1bW5EZWYnOiAnY2hlY2tlZCcsICdoZWFkZXInOiAnJ31dO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5zID0gW107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tb2RlbC5saXN0aW5nX2ZpZWxkcy5tYXAoZmllbGQgPT4ge1xuICAgICAgICAgICAgY29uc3QgZiA9IHRoaXMubW9kZWwuZmllbGRzLmZpbHRlcihmZiA9PiBmZi5rZXkgPT09IGZpZWxkKVswXTtcbiAgICAgICAgICAgIGNvbnN0IGNvbCA9IHt9O1xuICAgICAgICAgICAgY29sWydjb2x1bW5EZWYnXSA9IGYua2V5O1xuICAgICAgICAgICAgY29sWydoZWFkZXInXSA9IGYubGFiZWw7XG4gICAgICAgICAgICBjb2xbJ2NlbGwnXSA9IChlbGVtZW50OiBFbGVtZW50KSA9PiBgJHtlbGVtZW50W2Yua2V5XX1gO1xuICAgICAgICAgICAgaWYgKHRoaXMubW9kZWwuZXh0ZXJuYWxfbmFtZV9maWVsZCA9PT0gZmllbGQpIHtcbiAgICAgICAgICAgICAgICBjb2xbJ2NsaWNrYWJsZSddID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY29sdW1ucy5wdXNoKGNvbCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy5tb2RlICE9PSAncGljaycpIHtcbiAgICAgICAgICAgIHRoaXMuY29sdW1ucy5wdXNoKHsnY29sdW1uRGVmJzogJ2FjdGlvbnMnLCAnaGVhZGVyJzogJyd9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcG9wdWxhdGVEYXRhVGFibGUoKSB7XG4gICAgICAgIHRoaXMubW9kZWwgPSB0aGlzLnJlZy5nZXRNb2RlbCh0aGlzLm1vZHVsZU5hbWUsIHRoaXMuYXBwTmFtZSwgdGhpcy5tb2RlbE5hbWUpO1xuICAgICAgICB0aGlzLnByZXBhcmVDb2x1bW5zKCk7XG4gICAgICAgIHRoaXMuZGlzcGxheUNvbHVtbnMgPSB0aGlzLmNvbHVtbnMubWFwKGMgPT4gYy5jb2x1bW5EZWYpO1xuICAgICAgICB0aGlzLnJlc3VsdHNDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5kYXRhID0gW107XG4gICAgICAgIC8vIHRoaXMuZGlzcGxheUNvbHVtbnMucHVzaCgnYWN0aW9ucycpO1xuICAgICAgICB0aGlzLnNlYXJjaFBhcmFtcyA9IHtwYWdlOiAxfTtcbiAgICAgICAgdGhpcy5mZXRjaCgpO1xuICAgIH1cblxuICAgIGZldGNoKCkge1xuICAgICAgICB0aGlzLmFwaS5mZXRjaCh0aGlzLm1vZGVsLmFwaSwgdGhpcy5zZWFyY2hQYXJhbXMpLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgbGV0IG5ld0l0ZW1zID0gW107XG4gICAgICAgICAgICBpZiAocmVzLnJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgICBuZXdJdGVtcyA9IHRoaXMuZGF0YVNvdXJjZS5kYXRhLmNvbmNhdChyZXMucmVzdWx0cyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld0l0ZW1zID0gdGhpcy5kYXRhU291cmNlLmRhdGEuY29uY2F0KHJlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnJlc3VsdHNDb3VudCA9IG5ld0l0ZW1zLmxlbmd0aDtcbiAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZS5kYXRhID0gbmV3SXRlbXM7XG4gICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9LCBlcnIgPT4ge1xuICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICBnZXRMaW5rKGlkKTogc3RyaW5nW10ge1xuICAgICAgIHJldHVybiBbJy8nLCB0aGlzLm1vZHVsZU5hbWUsIHRoaXMuYXBwTmFtZSwgdGhpcy5tb2RlbE5hbWUsIGlkXTtcbiAgIH1cblxuICAgY2VsbENsaWNrZWQoY29sdW1uTmFtZTogc3RyaW5nLCByb3c6IGFueSkge1xuICAgICAgIGlmIChjb2x1bW5OYW1lID09PSB0aGlzLm1vZGVsLmV4dGVybmFsX25hbWVfZmllbGQpIHtcbiAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUodGhpcy5nZXRMaW5rKHJvdy5pZCkpO1xuICAgICAgIH1cbiAgIH1cblxuICAgIG9uU2VhcmNoKHNlYXJjaFBhcmFtcykge1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5kYXRhID0gW107XG4gICAgICAgIHRoaXMucmVzdWx0c0NvdW50ID0gMDtcbiAgICAgICAgdGhpcy5zZWFyY2hQYXJhbXMgPSBzZWFyY2hQYXJhbXM7XG4gICAgICAgIHRoaXMuc2VhcmNoUGFyYW1zLnBhZ2UgPSAxO1xuICAgICAgICB0aGlzLmZldGNoKCk7XG4gICAgfVxuXG4gICAgb25DaGVja2VkKHJvdykge1xuICAgICAgICByb3dbJ2lzX2NoZWNrZWQnXSA9IHRydWU7XG4gICAgfVxuXG4gICAgb25DaGVja0FsbCgpIHtcblxuICAgIH1cblxuICAgIF9waWNrZWQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5waWNrZWQubmV4dCh2YWx1ZSk7XG4gICAgfVxuXG59XG4iXX0=
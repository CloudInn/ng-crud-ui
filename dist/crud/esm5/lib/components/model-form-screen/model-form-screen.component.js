/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';
import { Registry } from '../../services/registry.service';
import { FieldType } from '../../forms';
var ModelFormScreenComponent = /** @class */ (function () {
    function ModelFormScreenComponent(api, reg, router, route, snackbar) {
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
    ModelFormScreenComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.route.parent.params.subscribe(function (params) {
            _this.module = params['module'];
            _this.appName = params['app'];
        });
        this.route.params.subscribe(function (params) {
            _this.modelName = params['model_name'];
            _this.model = _this.reg.getModel(_this.module, _this.appName, _this.modelName);
            _this.id = params['id'];
            if (_this.id != null && _this.id !== 'new') {
                _this.mode = 'edit';
            }
        });
    };
    /**
     * @param {?} e
     * @return {?}
     */
    ModelFormScreenComponent.prototype.onSubmit = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        var _this = this;
        var /** @type {?} */ req = null;
        if (this.mode === 'edit') {
            req = this.api.put(this.model.api + this.id + '/', e);
        }
        else {
            req = this.api.post(this.model.api, e);
        }
        req.subscribe(function (res) {
            _this.snackbar.open('Saved Successfully', 'Dismiss');
            _this.router.navigate([_this.module, _this.appName, _this.modelName]);
        }, function (err) {
            _this.snackbar.open('Failed to save', 'Dismiss');
        });
    };
    ModelFormScreenComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ng-crud-model-form-screen',
                    template: "<!-- <mat-progress-bar *ngIf=\"isLoading\" mode=\"query\"></mat-progress-bar> -->\n\n<!--<form>-->\n<div class=\"wrapper\">\n    <mat-toolbar>\n        <a routerLink=\"/\" mat-icon-button class=\"mat-caption\"><mat-icon>home</mat-icon></a>\n        <mat-icon>keyboard_arrow_right</mat-icon>\n        <a mat-button [routerLink]=\"'/'+module+'/'+appName\" class=\"mat-caption\">{{ appName }}</a>\n        <mat-icon>keyboard_arrow_right</mat-icon>\n        <a mat-button class=\"mat-caption\" [routerLink]=\"'/'+module+'/'+appName+'/'+modelName\">{{ model.verbose_name }}s</a>\n        <mat-icon>keyboard_arrow_right</mat-icon>\n        <span *ngIf=\"mode === 'edit'\" class=\"mat-caption\">{{ id }}</span>\n        <span *ngIf=\"mode === 'create'\" class=\"mat-caption\">Creating new {{ modelName }}</span>\n        <span class=\"toolbar-fill-remaining-space\"></span>\n    </mat-toolbar>\n\n    <mat-card>\n        <mat-card-content>\n            <ng-crud-model-form [moduleName]=\"module\" [appName]=\"appName\" [mode]='mode'\n                [modelName]=\"modelName\" (submit)=\"onSubmit($event)\" [id]=\"id\"></ng-crud-model-form>\n        </mat-card-content>\n    </mat-card>\n</div>",
                    styles: [".wrapper {\n    padding: 24px;\n  }"],
                    exportAs: 'ngcrudui-model-form-screen'
                },] },
    ];
    /** @nocollapse */
    ModelFormScreenComponent.ctorParameters = function () { return [
        { type: ApiService },
        { type: Registry },
        { type: Router },
        { type: ActivatedRoute },
        { type: MatSnackBar }
    ]; };
    return ModelFormScreenComponent;
}());
export { ModelFormScreenComponent };
function ModelFormScreenComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    ModelFormScreenComponent.prototype.module;
    /** @type {?} */
    ModelFormScreenComponent.prototype.appName;
    /** @type {?} */
    ModelFormScreenComponent.prototype.modelName;
    /** @type {?} */
    ModelFormScreenComponent.prototype.id;
    /** @type {?} */
    ModelFormScreenComponent.prototype.mode;
    /** @type {?} */
    ModelFormScreenComponent.prototype.ngModel;
    /** @type {?} */
    ModelFormScreenComponent.prototype.model;
    /** @type {?} */
    ModelFormScreenComponent.prototype.fieldType;
    /** @type {?} */
    ModelFormScreenComponent.prototype.editableFields;
    /** @type {?} */
    ModelFormScreenComponent.prototype.choices;
    /** @type {?} */
    ModelFormScreenComponent.prototype.api;
    /** @type {?} */
    ModelFormScreenComponent.prototype.reg;
    /** @type {?} */
    ModelFormScreenComponent.prototype.router;
    /** @type {?} */
    ModelFormScreenComponent.prototype.route;
    /** @type {?} */
    ModelFormScreenComponent.prototype.snackbar;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWwtZm9ybS1zY3JlZW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vY3J1ZC8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL21vZGVsLWZvcm0tc2NyZWVuL21vZGVsLWZvcm0tc2NyZWVuLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBdUMsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFJMUQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUczRCxPQUFPLEVBQUUsU0FBUyxFQUFTLE1BQU0sYUFBYSxDQUFDOztJQTZDM0Msa0NBQW9CLEdBQWUsRUFDZixLQUNBLFFBQ0EsT0FDQTtRQUpBLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFDZixRQUFHLEdBQUgsR0FBRztRQUNILFdBQU0sR0FBTixNQUFNO1FBQ04sVUFBSyxHQUFMLEtBQUs7UUFDTCxhQUFRLEdBQVIsUUFBUTtrQkFabEIsSUFBSTtvQkFDUCxRQUFRO3VCQUNBLEVBQUU7eUJBRWEsU0FBUzs4QkFDYixFQUFFO3VCQUNsQixFQUFFO0tBT1I7Ozs7SUFFSiwyQ0FBUTs7O0lBQVI7UUFBQSxpQkFhQTtRQVpJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQ3JDLEtBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQy9CLEtBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2hDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDOUIsS0FBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDdEMsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsTUFBTSxFQUFFLEtBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzFFLEtBQUksQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZCLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxJQUFJLEtBQUksQ0FBQyxFQUFFLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsS0FBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7YUFDdEI7U0FDSixDQUFDLENBQUM7S0FDUDs7Ozs7SUFFQSwyQ0FBUTs7OztJQUFSLFVBQVMsQ0FBQztRQUFWLGlCQWFBO1FBWkkscUJBQUksR0FBRyxHQUFvQixJQUFJLENBQUM7UUFDaEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUN6RDtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzFDO1FBQ0QsR0FBRyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUc7WUFDYixLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNwRCxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSSxDQUFDLE9BQU8sRUFBRSxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztTQUNyRSxFQUFFLFVBQUEsR0FBRztZQUNGLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ25ELENBQUMsQ0FBQztLQUNQOztnQkE5RUgsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLFFBQVEsRUFBRSxvcUNBc0JMO29CQUNMLE1BQU0sRUFBRSxDQUFDLHFDQUVQLENBQUM7b0JBQ0gsUUFBUSxFQUFFLDRCQUE0QjtpQkFDdkM7Ozs7Z0JBbkNRLFVBQVU7Z0JBQ1YsUUFBUTtnQkFOUSxNQUFNO2dCQUF0QixjQUFjO2dCQUNkLFdBQVc7O21DQUZwQjs7U0EwQ2Esd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBNYXRTbmFja0JhciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NuYWNrLWJhcic7XG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7IE9ic2VydmFibGUgLCAgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBSZWdpc3RyeSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3JlZ2lzdHJ5LnNlcnZpY2UnO1xuXG5cbmltcG9ydCB7IEZpZWxkVHlwZSwgRmllbGQgfSBmcm9tICcuLi8uLi9mb3Jtcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nLWNydWQtbW9kZWwtZm9ybS1zY3JlZW4nLFxuICB0ZW1wbGF0ZTogYDwhLS0gPG1hdC1wcm9ncmVzcy1iYXIgKm5nSWY9XCJpc0xvYWRpbmdcIiBtb2RlPVwicXVlcnlcIj48L21hdC1wcm9ncmVzcy1iYXI+IC0tPlxuXG48IS0tPGZvcm0+LS0+XG48ZGl2IGNsYXNzPVwid3JhcHBlclwiPlxuICAgIDxtYXQtdG9vbGJhcj5cbiAgICAgICAgPGEgcm91dGVyTGluaz1cIi9cIiBtYXQtaWNvbi1idXR0b24gY2xhc3M9XCJtYXQtY2FwdGlvblwiPjxtYXQtaWNvbj5ob21lPC9tYXQtaWNvbj48L2E+XG4gICAgICAgIDxtYXQtaWNvbj5rZXlib2FyZF9hcnJvd19yaWdodDwvbWF0LWljb24+XG4gICAgICAgIDxhIG1hdC1idXR0b24gW3JvdXRlckxpbmtdPVwiJy8nK21vZHVsZSsnLycrYXBwTmFtZVwiIGNsYXNzPVwibWF0LWNhcHRpb25cIj57eyBhcHBOYW1lIH19PC9hPlxuICAgICAgICA8bWF0LWljb24+a2V5Ym9hcmRfYXJyb3dfcmlnaHQ8L21hdC1pY29uPlxuICAgICAgICA8YSBtYXQtYnV0dG9uIGNsYXNzPVwibWF0LWNhcHRpb25cIiBbcm91dGVyTGlua109XCInLycrbW9kdWxlKycvJythcHBOYW1lKycvJyttb2RlbE5hbWVcIj57eyBtb2RlbC52ZXJib3NlX25hbWUgfX1zPC9hPlxuICAgICAgICA8bWF0LWljb24+a2V5Ym9hcmRfYXJyb3dfcmlnaHQ8L21hdC1pY29uPlxuICAgICAgICA8c3BhbiAqbmdJZj1cIm1vZGUgPT09ICdlZGl0J1wiIGNsYXNzPVwibWF0LWNhcHRpb25cIj57eyBpZCB9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJtb2RlID09PSAnY3JlYXRlJ1wiIGNsYXNzPVwibWF0LWNhcHRpb25cIj5DcmVhdGluZyBuZXcge3sgbW9kZWxOYW1lIH19PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInRvb2xiYXItZmlsbC1yZW1haW5pbmctc3BhY2VcIj48L3NwYW4+XG4gICAgPC9tYXQtdG9vbGJhcj5cblxuICAgIDxtYXQtY2FyZD5cbiAgICAgICAgPG1hdC1jYXJkLWNvbnRlbnQ+XG4gICAgICAgICAgICA8bmctY3J1ZC1tb2RlbC1mb3JtIFttb2R1bGVOYW1lXT1cIm1vZHVsZVwiIFthcHBOYW1lXT1cImFwcE5hbWVcIiBbbW9kZV09J21vZGUnXG4gICAgICAgICAgICAgICAgW21vZGVsTmFtZV09XCJtb2RlbE5hbWVcIiAoc3VibWl0KT1cIm9uU3VibWl0KCRldmVudClcIiBbaWRdPVwiaWRcIj48L25nLWNydWQtbW9kZWwtZm9ybT5cbiAgICAgICAgPC9tYXQtY2FyZC1jb250ZW50PlxuICAgIDwvbWF0LWNhcmQ+XG48L2Rpdj5gLFxuICBzdHlsZXM6IFtgLndyYXBwZXIge1xuICAgIHBhZGRpbmc6IDI0cHg7XG4gIH1gXSxcbiAgZXhwb3J0QXM6ICduZ2NydWR1aS1tb2RlbC1mb3JtLXNjcmVlbidcbn0pXG5leHBvcnQgY2xhc3MgTW9kZWxGb3JtU2NyZWVuQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIG1vZHVsZTogc3RyaW5nO1xuICAgIGFwcE5hbWU6IHN0cmluZztcbiAgICBtb2RlbE5hbWU6IHN0cmluZztcbiAgICBpZDogYW55ID0gbnVsbDtcbiAgICBtb2RlID0gJ2NyZWF0ZSc7XG4gICAgbmdNb2RlbDogYW55ID0ge307XG4gICAgbW9kZWw6IGFueTtcbiAgICBmaWVsZFR5cGU6IHR5cGVvZiBGaWVsZFR5cGUgPSBGaWVsZFR5cGU7XG4gICAgZWRpdGFibGVGaWVsZHM6IEZpZWxkW10gPSBbXTtcbiAgICBjaG9pY2VzID0ge307XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwaTogQXBpU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJlZzogUmVnaXN0cnksXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHNuYWNrYmFyOiBNYXRTbmFja0JhcixcbiAgICApIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5yb3V0ZS5wYXJlbnQucGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xuICAgICAgICAgICAgdGhpcy5tb2R1bGUgPSBwYXJhbXNbJ21vZHVsZSddO1xuICAgICAgICAgICAgdGhpcy5hcHBOYW1lID0gcGFyYW1zWydhcHAnXTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucm91dGUucGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xuICAgICAgICAgICAgdGhpcy5tb2RlbE5hbWUgPSBwYXJhbXNbJ21vZGVsX25hbWUnXTtcbiAgICAgICAgICAgIHRoaXMubW9kZWwgPSB0aGlzLnJlZy5nZXRNb2RlbCh0aGlzLm1vZHVsZSwgdGhpcy5hcHBOYW1lLCB0aGlzLm1vZGVsTmFtZSk7XG4gICAgICAgICAgICB0aGlzLmlkID0gcGFyYW1zWydpZCddO1xuICAgICAgICAgICAgaWYgKHRoaXMuaWQgIT0gbnVsbCAmJiB0aGlzLmlkICE9PSAnbmV3Jykge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kZSA9ICdlZGl0JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICB9XG5cbiAgICBvblN1Ym1pdChlKSB7XG4gICAgICAgIGxldCByZXE6IE9ic2VydmFibGU8YW55PiA9IG51bGw7XG4gICAgICAgIGlmICh0aGlzLm1vZGUgPT09ICdlZGl0Jykge1xuICAgICAgICAgICAgcmVxID0gdGhpcy5hcGkucHV0KHRoaXMubW9kZWwuYXBpICsgdGhpcy5pZCArICcvJywgZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXEgPSB0aGlzLmFwaS5wb3N0KHRoaXMubW9kZWwuYXBpLCBlKTtcbiAgICAgICAgfVxuICAgICAgICByZXEuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgICAgICB0aGlzLnNuYWNrYmFyLm9wZW4oJ1NhdmVkIFN1Y2Nlc3NmdWxseScsICdEaXNtaXNzJyk7XG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5tb2R1bGUsIHRoaXMuYXBwTmFtZSwgdGhpcy5tb2RlbE5hbWVdKTtcbiAgICAgICAgfSwgZXJyID0+IHtcbiAgICAgICAgICAgIHRoaXMuc25hY2tiYXIub3BlbignRmFpbGVkIHRvIHNhdmUnLCAnRGlzbWlzcycpO1xuICAgICAgICB9KTtcbiAgIH1cblxufVxuIl19
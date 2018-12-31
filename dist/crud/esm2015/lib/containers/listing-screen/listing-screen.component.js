/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registry } from '../../services/registry.service';
export class ListingScreenComponent {
    /**
     * @param {?} reg
     * @param {?} router
     * @param {?} route
     */
    constructor(reg, router, route) {
        this.reg = reg;
        this.router = router;
        this.route = route;
        this.appName = null;
        this.moduleName = null;
        this.modelName = null;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // keep listening for route params changes, in case of
        // the model name changed, e.g: another model clicked from
        // the nav menu
        this.route.params.subscribe(params => {
            const /** @type {?} */ parentParams = this.route.parent.snapshot.params;
            this.moduleName = parentParams['module'];
            this.appName = parentParams['app'];
            this.modelName = params['model_name'];
        });
    }
}
ListingScreenComponent.decorators = [
    { type: Component, args: [{
                template: `<section class="app-settings" *ngIf="modelName">

  <ng-crud-listing [modelName]="modelName" [appName]="appName" [moduleName]="moduleName">

  </ng-crud-listing>
</section>
`,
                styles: [`#custom-header{padding-top:12px;margin-bottom:12px}.page-title a{color:#333}.mat-tab-nav-bar,mat-tab-nav-bar{border:none!important}.tabs-bar a{color:#fff}`]
            },] },
];
/** @nocollapse */
ListingScreenComponent.ctorParameters = () => [
    { type: Registry },
    { type: Router },
    { type: ActivatedRoute }
];
function ListingScreenComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    ListingScreenComponent.prototype.appName;
    /** @type {?} */
    ListingScreenComponent.prototype.moduleName;
    /** @type {?} */
    ListingScreenComponent.prototype.modelName;
    /** @type {?} */
    ListingScreenComponent.prototype.reg;
    /** @type {?} */
    ListingScreenComponent.prototype.router;
    /** @type {?} */
    ListingScreenComponent.prototype.route;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdGluZy1zY3JlZW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vY3J1ZC8iLCJzb3VyY2VzIjpbImxpYi9jb250YWluZXJzL2xpc3Rpbmctc2NyZWVuL2xpc3Rpbmctc2NyZWVuLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBRyxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUV6RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFZM0QsTUFBTTs7Ozs7O0lBTUYsWUFDVSxLQUNBLFFBQ0E7UUFGQSxRQUFHLEdBQUgsR0FBRztRQUNILFdBQU0sR0FBTixNQUFNO1FBQ04sVUFBSyxHQUFMLEtBQUs7dUJBUEcsSUFBSTswQkFDRCxJQUFJO3lCQUNMLElBQUk7S0FNcEI7Ozs7SUFFSixRQUFROzs7O1FBSU4sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ25DLHVCQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQ3ZELElBQUksQ0FBQyxVQUFVLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3ZDLENBQUMsQ0FBQztLQUNKOzs7WUFoQ0osU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRTs7Ozs7O0NBTVg7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsNEpBQTRKLENBQUM7YUFDdks7Ozs7WUFYUSxRQUFRO1lBRlMsTUFBTTtZQUF2QixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSAsIFJvdXRlcn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgUmVnaXN0cnkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9yZWdpc3RyeS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHRlbXBsYXRlOiBgPHNlY3Rpb24gY2xhc3M9XCJhcHAtc2V0dGluZ3NcIiAqbmdJZj1cIm1vZGVsTmFtZVwiPlxuXG4gIDxuZy1jcnVkLWxpc3RpbmcgW21vZGVsTmFtZV09XCJtb2RlbE5hbWVcIiBbYXBwTmFtZV09XCJhcHBOYW1lXCIgW21vZHVsZU5hbWVdPVwibW9kdWxlTmFtZVwiPlxuXG4gIDwvbmctY3J1ZC1saXN0aW5nPlxuPC9zZWN0aW9uPlxuYCxcbiAgc3R5bGVzOiBbYCNjdXN0b20taGVhZGVye3BhZGRpbmctdG9wOjEycHg7bWFyZ2luLWJvdHRvbToxMnB4fS5wYWdlLXRpdGxlIGF7Y29sb3I6IzMzM30ubWF0LXRhYi1uYXYtYmFyLG1hdC10YWItbmF2LWJhcntib3JkZXI6bm9uZSFpbXBvcnRhbnR9LnRhYnMtYmFyIGF7Y29sb3I6I2ZmZn1gXVxufSlcbmV4cG9ydCBjbGFzcyBMaXN0aW5nU2NyZWVuQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIGFwcE5hbWU6IHN0cmluZyA9IG51bGw7XG4gICAgbW9kdWxlTmFtZTogc3RyaW5nID0gbnVsbDtcbiAgICBtb2RlbE5hbWU6IHN0cmluZyA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgcmVnOiBSZWdpc3RyeSxcbiAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICApIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgIC8vIGtlZXAgbGlzdGVuaW5nIGZvciByb3V0ZSBwYXJhbXMgY2hhbmdlcywgaW4gY2FzZSBvZlxuICAgICAgLy8gdGhlIG1vZGVsIG5hbWUgY2hhbmdlZCwgZS5nOiBhbm90aGVyIG1vZGVsIGNsaWNrZWQgZnJvbVxuICAgICAgLy8gdGhlIG5hdiBtZW51XG4gICAgICB0aGlzLnJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcbiAgICAgICAgY29uc3QgcGFyZW50UGFyYW1zID0gdGhpcy5yb3V0ZS5wYXJlbnQuc25hcHNob3QucGFyYW1zO1xuICAgICAgICB0aGlzLm1vZHVsZU5hbWUgPSBwYXJlbnRQYXJhbXNbJ21vZHVsZSddO1xuICAgICAgICB0aGlzLmFwcE5hbWUgPSBwYXJlbnRQYXJhbXNbJ2FwcCddO1xuICAgICAgICB0aGlzLm1vZGVsTmFtZSA9IHBhcmFtc1snbW9kZWxfbmFtZSddO1xuICAgICAgfSk7XG4gICAgfVxuXG59XG4iXX0=
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registry } from '../../services/registry.service';
var ListingScreenComponent = /** @class */ (function () {
    function ListingScreenComponent(reg, router, route) {
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
    ListingScreenComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // keep listening for route params changes, in case of
        // the model name changed, e.g: another model clicked from
        // the nav menu
        this.route.params.subscribe(function (params) {
            var /** @type {?} */ parentParams = _this.route.parent.snapshot.params;
            _this.moduleName = parentParams['module'];
            _this.appName = parentParams['app'];
            _this.modelName = params['model_name'];
        });
    };
    ListingScreenComponent.decorators = [
        { type: Component, args: [{
                    template: "<section class=\"app-settings\" *ngIf=\"modelName\">\n\n  <ng-crud-listing [modelName]=\"modelName\" [appName]=\"appName\" [moduleName]=\"moduleName\">\n\n  </ng-crud-listing>\n</section>\n",
                    styles: ["#custom-header{padding-top:12px;margin-bottom:12px}.page-title a{color:#333}.mat-tab-nav-bar,mat-tab-nav-bar{border:none!important}.tabs-bar a{color:#fff}"]
                },] },
    ];
    /** @nocollapse */
    ListingScreenComponent.ctorParameters = function () { return [
        { type: Registry },
        { type: Router },
        { type: ActivatedRoute }
    ]; };
    return ListingScreenComponent;
}());
export { ListingScreenComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdGluZy1zY3JlZW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vY3J1ZC8iLCJzb3VyY2VzIjpbImxpYi9jb250YWluZXJzL2xpc3Rpbmctc2NyZWVuL2xpc3Rpbmctc2NyZWVuLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBRyxNQUFNLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUV6RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUNBQWlDLENBQUM7O0lBa0J2RCxnQ0FDVSxLQUNBLFFBQ0E7UUFGQSxRQUFHLEdBQUgsR0FBRztRQUNILFdBQU0sR0FBTixNQUFNO1FBQ04sVUFBSyxHQUFMLEtBQUs7dUJBUEcsSUFBSTswQkFDRCxJQUFJO3lCQUNMLElBQUk7S0FNcEI7Ozs7SUFFSix5Q0FBUTs7O0lBQVI7UUFBQSxpQkFVQzs7OztRQU5DLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDaEMscUJBQU0sWUFBWSxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDdkQsS0FBSSxDQUFDLFVBQVUsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDekMsS0FBSSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkMsS0FBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDdkMsQ0FBQyxDQUFDO0tBQ0o7O2dCQWhDSixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLCtMQU1YO29CQUNDLE1BQU0sRUFBRSxDQUFDLDRKQUE0SixDQUFDO2lCQUN2Szs7OztnQkFYUSxRQUFRO2dCQUZTLE1BQU07Z0JBQXZCLGNBQWM7O2lDQUR2Qjs7U0FlYSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlICwgUm91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBSZWdpc3RyeSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3JlZ2lzdHJ5LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgdGVtcGxhdGU6IGA8c2VjdGlvbiBjbGFzcz1cImFwcC1zZXR0aW5nc1wiICpuZ0lmPVwibW9kZWxOYW1lXCI+XG5cbiAgPG5nLWNydWQtbGlzdGluZyBbbW9kZWxOYW1lXT1cIm1vZGVsTmFtZVwiIFthcHBOYW1lXT1cImFwcE5hbWVcIiBbbW9kdWxlTmFtZV09XCJtb2R1bGVOYW1lXCI+XG5cbiAgPC9uZy1jcnVkLWxpc3Rpbmc+XG48L3NlY3Rpb24+XG5gLFxuICBzdHlsZXM6IFtgI2N1c3RvbS1oZWFkZXJ7cGFkZGluZy10b3A6MTJweDttYXJnaW4tYm90dG9tOjEycHh9LnBhZ2UtdGl0bGUgYXtjb2xvcjojMzMzfS5tYXQtdGFiLW5hdi1iYXIsbWF0LXRhYi1uYXYtYmFye2JvcmRlcjpub25lIWltcG9ydGFudH0udGFicy1iYXIgYXtjb2xvcjojZmZmfWBdXG59KVxuZXhwb3J0IGNsYXNzIExpc3RpbmdTY3JlZW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgYXBwTmFtZTogc3RyaW5nID0gbnVsbDtcbiAgICBtb2R1bGVOYW1lOiBzdHJpbmcgPSBudWxsO1xuICAgIG1vZGVsTmFtZTogc3RyaW5nID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSByZWc6IFJlZ2lzdHJ5LFxuICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgLy8ga2VlcCBsaXN0ZW5pbmcgZm9yIHJvdXRlIHBhcmFtcyBjaGFuZ2VzLCBpbiBjYXNlIG9mXG4gICAgICAvLyB0aGUgbW9kZWwgbmFtZSBjaGFuZ2VkLCBlLmc6IGFub3RoZXIgbW9kZWwgY2xpY2tlZCBmcm9tXG4gICAgICAvLyB0aGUgbmF2IG1lbnVcbiAgICAgIHRoaXMucm91dGUucGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xuICAgICAgICBjb25zdCBwYXJlbnRQYXJhbXMgPSB0aGlzLnJvdXRlLnBhcmVudC5zbmFwc2hvdC5wYXJhbXM7XG4gICAgICAgIHRoaXMubW9kdWxlTmFtZSA9IHBhcmVudFBhcmFtc1snbW9kdWxlJ107XG4gICAgICAgIHRoaXMuYXBwTmFtZSA9IHBhcmVudFBhcmFtc1snYXBwJ107XG4gICAgICAgIHRoaXMubW9kZWxOYW1lID0gcGFyYW1zWydtb2RlbF9uYW1lJ107XG4gICAgICB9KTtcbiAgICB9XG5cbn1cbiJdfQ==
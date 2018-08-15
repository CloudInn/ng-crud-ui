/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registry } from '../../services/registry.service';
import { Navigator } from '../../services/navigator.service';
var AppScreenComponent = /** @class */ (function () {
    function AppScreenComponent(reg, router, route, navigator) {
        this.reg = reg;
        this.router = router;
        this.route = route;
        this.navigator = navigator;
        this.app = null;
        this.moduleName = null;
        this.models = [];
    }
    /**
     * @return {?}
     */
    AppScreenComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ params = this.route.snapshot.params;
        this.moduleName = params['module'];
        this.app = this.reg.getApp(this.moduleName, params['app']);
        this.models = this.app.models;
        this.renderSidebar();
        if (!this.route.firstChild) {
            // this.renderSidebar();
            this.navigator.path.emit([params['module'], params['app'], this.models[0].key]);
            this.router.navigate(["/" + params['module'], params['app'], this.models[0].key]);
            return;
        }
        this.navigator.path.emit([params['module'], params['app'], this.route.firstChild.snapshot.params['model_name']]);
        // this.route.params.subscribe(res => {
        //   console.log(res);
        // });
        // console.log(this.route.firstChild.snapshot.params);
        // if (!params['model_name']) {
        //   this.renderSidebar();
        //   // this.router.navigate([`/${params['module']}`, params['app'], this.models[0].key]);
        //   return;
        // }
    };
    // ngOnChanges() {
    //   this.route.params.subscribe(params => {
    //     this.moduleName = params['parent_app'];
    //     this.app = this.reg.getApp(params['app']);
    //     this.models = this.reg.getAppModels(params['app']);
    //   });
    // }
    /**
     * @return {?}
     */
    AppScreenComponent.prototype.renderSidebar = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ items = [];
        var /** @type {?} */ item = { title: this.app.label, type: 'subheading' };
        items.push(item);
        this.models.forEach(function (m) {
            var /** @type {?} */ i = { title: m.verbose_name + "s", url: "/" + _this.moduleName + "/" + _this.app.key + "/" + m.key };
            items.push(i);
        });
        this.navigator.navItems.next(items);
    };
    AppScreenComponent.decorators = [
        { type: Component, args: [{
                    template: "<section class=\"app-settings\">\n  \n  <!-- <mat-card>\n    <p class=\"mat-subheading-1\">Welcome to Cloudinn Settings</p>\n  </mat-card> -->\n  <div class=\"container\">\n    <router-outlet></router-outlet>\n  </div>\n</section>\n",
                    styles: ["#custom-header{padding-top:12px;margin-bottom:12px}.page-title a{color:#333}.mat-tab-nav-bar,mat-tab-nav-bar{border:none!important}.tabs-bar a{color:#fff}"]
                },] },
    ];
    /** @nocollapse */
    AppScreenComponent.ctorParameters = function () { return [
        { type: Registry },
        { type: Router },
        { type: ActivatedRoute },
        { type: Navigator }
    ]; };
    return AppScreenComponent;
}());
export { AppScreenComponent };
function AppScreenComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    AppScreenComponent.prototype.app;
    /** @type {?} */
    AppScreenComponent.prototype.moduleName;
    /** @type {?} */
    AppScreenComponent.prototype.models;
    /** @type {?} */
    AppScreenComponent.prototype.reg;
    /** @type {?} */
    AppScreenComponent.prototype.router;
    /** @type {?} */
    AppScreenComponent.prototype.route;
    /** @type {?} */
    AppScreenComponent.prototype.navigator;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXNjcmVlbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9jcnVkLyIsInNvdXJjZXMiOlsibGliL2NvbnRhaW5lcnMvYXBwLXNjcmVlbi9hcHAtc2NyZWVuLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV6RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDM0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGtDQUFrQyxDQUFDOztJQXFCM0QsNEJBQ1UsS0FDQSxRQUNBLE9BQ0E7UUFIQSxRQUFHLEdBQUgsR0FBRztRQUNILFdBQU0sR0FBTixNQUFNO1FBQ04sVUFBSyxHQUFMLEtBQUs7UUFDTCxjQUFTLEdBQVQsU0FBUzttQkFSUixJQUFJOzBCQUNGLElBQUk7c0JBQ1IsRUFBRTtLQVFWOzs7O0lBRUQscUNBQVE7OztJQUFSO1FBQ0UscUJBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUMxQyxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUU5QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7O1lBRTNCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2hGLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBSSxNQUFNLENBQUMsUUFBUSxDQUFHLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNsRixNQUFNLENBQUM7U0FDUjtRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7S0FZbEg7SUFFRCxrQkFBa0I7SUFDbEIsNENBQTRDO0lBQzVDLDhDQUE4QztJQUM5QyxpREFBaUQ7SUFDakQsMERBQTBEO0lBQzFELFFBQVE7SUFDUixJQUFJOzs7O0lBQ0osMENBQWE7OztJQUFiO1FBQUEsaUJBU0M7UUFSQyxxQkFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLHFCQUFNLElBQUksR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLENBQUM7UUFDM0QsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7WUFDbkIscUJBQU0sQ0FBQyxHQUFHLEVBQUMsS0FBSyxFQUFLLENBQUMsQ0FBQyxZQUFZLE1BQUcsRUFBRSxHQUFHLEVBQUUsTUFBSSxLQUFJLENBQUMsVUFBVSxTQUFJLEtBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFJLENBQUMsQ0FBQyxHQUFLLEVBQUUsQ0FBQztZQUM5RixLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2YsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3JDOztnQkF0RUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSwwT0FTWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyw0SkFBNEosQ0FBQztpQkFDdks7Ozs7Z0JBZlEsUUFBUTtnQkFGUSxNQUFNO2dCQUF0QixjQUFjO2dCQUdkLFNBQVM7OzZCQUpsQjs7U0FtQmEsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgUmVnaXN0cnkgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9yZWdpc3RyeS5zZXJ2aWNlJztcbmltcG9ydCB7IE5hdmlnYXRvciB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL25hdmlnYXRvci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHRlbXBsYXRlOiBgPHNlY3Rpb24gY2xhc3M9XCJhcHAtc2V0dGluZ3NcIj5cbiAgXG4gIDwhLS0gPG1hdC1jYXJkPlxuICAgIDxwIGNsYXNzPVwibWF0LXN1YmhlYWRpbmctMVwiPldlbGNvbWUgdG8gQ2xvdWRpbm4gU2V0dGluZ3M8L3A+XG4gIDwvbWF0LWNhcmQ+IC0tPlxuICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgPHJvdXRlci1vdXRsZXQ+PC9yb3V0ZXItb3V0bGV0PlxuICA8L2Rpdj5cbjwvc2VjdGlvbj5cbmAsXG4gIHN0eWxlczogW2AjY3VzdG9tLWhlYWRlcntwYWRkaW5nLXRvcDoxMnB4O21hcmdpbi1ib3R0b206MTJweH0ucGFnZS10aXRsZSBhe2NvbG9yOiMzMzN9Lm1hdC10YWItbmF2LWJhcixtYXQtdGFiLW5hdi1iYXJ7Ym9yZGVyOm5vbmUhaW1wb3J0YW50fS50YWJzLWJhciBhe2NvbG9yOiNmZmZ9YF1cbn0pXG5leHBvcnQgY2xhc3MgQXBwU2NyZWVuQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBhcHA6IGFueSA9IG51bGw7XG4gIG1vZHVsZU5hbWUgPSBudWxsO1xuICBtb2RlbHMgPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlZzogUmVnaXN0cnksXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICBwcml2YXRlIG5hdmlnYXRvcjogTmF2aWdhdG9yLFxuICApIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMucm91dGUuc25hcHNob3QucGFyYW1zO1xuICAgIHRoaXMubW9kdWxlTmFtZSA9IHBhcmFtc1snbW9kdWxlJ107XG4gICAgdGhpcy5hcHAgPSB0aGlzLnJlZy5nZXRBcHAodGhpcy5tb2R1bGVOYW1lLCBwYXJhbXNbJ2FwcCddKTtcbiAgICB0aGlzLm1vZGVscyA9IHRoaXMuYXBwLm1vZGVscztcblxuICAgIHRoaXMucmVuZGVyU2lkZWJhcigpO1xuICAgIGlmICghdGhpcy5yb3V0ZS5maXJzdENoaWxkKSB7XG4gICAgICAvLyB0aGlzLnJlbmRlclNpZGViYXIoKTtcbiAgICAgIHRoaXMubmF2aWdhdG9yLnBhdGguZW1pdChbcGFyYW1zWydtb2R1bGUnXSwgcGFyYW1zWydhcHAnXSwgdGhpcy5tb2RlbHNbMF0ua2V5XSk7XG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbYC8ke3BhcmFtc1snbW9kdWxlJ119YCwgcGFyYW1zWydhcHAnXSwgdGhpcy5tb2RlbHNbMF0ua2V5XSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMubmF2aWdhdG9yLnBhdGguZW1pdChbcGFyYW1zWydtb2R1bGUnXSwgcGFyYW1zWydhcHAnXSwgdGhpcy5yb3V0ZS5maXJzdENoaWxkLnNuYXBzaG90LnBhcmFtc1snbW9kZWxfbmFtZSddXSk7XG5cbiAgICAvLyB0aGlzLnJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAvLyAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgLy8gfSk7XG4gICAgLy8gY29uc29sZS5sb2codGhpcy5yb3V0ZS5maXJzdENoaWxkLnNuYXBzaG90LnBhcmFtcyk7XG5cbiAgICAvLyBpZiAoIXBhcmFtc1snbW9kZWxfbmFtZSddKSB7XG4gICAgLy8gICB0aGlzLnJlbmRlclNpZGViYXIoKTtcbiAgICAvLyAgIC8vIHRoaXMucm91dGVyLm5hdmlnYXRlKFtgLyR7cGFyYW1zWydtb2R1bGUnXX1gLCBwYXJhbXNbJ2FwcCddLCB0aGlzLm1vZGVsc1swXS5rZXldKTtcbiAgICAvLyAgIHJldHVybjtcbiAgICAvLyB9XG4gIH1cblxuICAvLyBuZ09uQ2hhbmdlcygpIHtcbiAgLy8gICB0aGlzLnJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcbiAgLy8gICAgIHRoaXMubW9kdWxlTmFtZSA9IHBhcmFtc1sncGFyZW50X2FwcCddO1xuICAvLyAgICAgdGhpcy5hcHAgPSB0aGlzLnJlZy5nZXRBcHAocGFyYW1zWydhcHAnXSk7XG4gIC8vICAgICB0aGlzLm1vZGVscyA9IHRoaXMucmVnLmdldEFwcE1vZGVscyhwYXJhbXNbJ2FwcCddKTtcbiAgLy8gICB9KTtcbiAgLy8gfVxuICByZW5kZXJTaWRlYmFyKCkge1xuICAgIGNvbnN0IGl0ZW1zID0gW107XG4gICAgY29uc3QgaXRlbSA9IHsgdGl0bGU6IHRoaXMuYXBwLmxhYmVsLCB0eXBlOiAnc3ViaGVhZGluZycgfTtcbiAgICBpdGVtcy5wdXNoKGl0ZW0pO1xuICAgIHRoaXMubW9kZWxzLmZvckVhY2gobSA9PiB7XG4gICAgICBjb25zdCBpID0ge3RpdGxlOiBgJHttLnZlcmJvc2VfbmFtZX1zYCwgdXJsOiBgLyR7dGhpcy5tb2R1bGVOYW1lfS8ke3RoaXMuYXBwLmtleX0vJHttLmtleX1gIH07XG4gICAgICBpdGVtcy5wdXNoKGkpO1xuICAgIH0pO1xuICAgIHRoaXMubmF2aWdhdG9yLm5hdkl0ZW1zLm5leHQoaXRlbXMpO1xuICB9XG59XG4iXX0=
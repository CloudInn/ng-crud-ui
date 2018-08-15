/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
var Registry = /** @class */ (function () {
    function Registry() {
        this.forms = {};
        this.registry = {};
        this.isReady = new BehaviorSubject(false);
    }
    /**
     * @param {?} metadata
     * @param {?} formClass
     * @return {?}
     */
    Registry.prototype.registerForm = /**
     * @param {?} metadata
     * @param {?} formClass
     * @return {?}
     */
    function (metadata, formClass) {
        var /** @type {?} */ ctrls = {};
        try {
            for (var _a = tslib_1.__values(metadata.controls), _b = _a.next(); !_b.done; _b = _a.next()) {
                var ctrl = _b.value;
                ctrls[ctrl.name] = new FormControl({}, ctrl.validators);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var /** @type {?} */ f = new FormGroup(ctrls);
        this.forms[metadata.name] = f;
        var e_1, _c;
    };
    /**
     * @param {?} meta
     * @return {?}
     */
    Registry.prototype.register = /**
     * @param {?} meta
     * @return {?}
     */
    function (meta) {
        this.registry = meta;
        this.isReady.next(true);
    };
    /**
     * @return {?}
     */
    Registry.prototype.getModules = /**
     * @return {?}
     */
    function () {
        return this.registry;
    };
    /**
     * @param {?} moduleName
     * @param {?} app
     * @param {?} key
     * @return {?}
     */
    Registry.prototype.getModel = /**
     * @param {?} moduleName
     * @param {?} app
     * @param {?} key
     * @return {?}
     */
    function (moduleName, app, key) {
        return this.registry[moduleName].apps.filter(function (a) { return a.key === app; })[0]
            .models.filter(function (m) { return m.key === key; })[0];
    };
    /**
     * @param {?} moduleName
     * @param {?} app
     * @return {?}
     */
    Registry.prototype.getApp = /**
     * @param {?} moduleName
     * @param {?} app
     * @return {?}
     */
    function (moduleName, app) {
        return this.registry[moduleName].apps.filter(function (a) { return a.key === app; })[0];
    };
    /**
     * @param {?} moduleName
     * @param {?} app
     * @return {?}
     */
    Registry.prototype.getAppModels = /**
     * @param {?} moduleName
     * @param {?} app
     * @return {?}
     */
    function (moduleName, app) {
        return this.registry[moduleName].apps.filter(function (a) { return a.key === app; }).models;
    };
    Registry.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    Registry.ctorParameters = function () { return []; };
    /** @nocollapse */ Registry.ngInjectableDef = i0.defineInjectable({ factory: function Registry_Factory() { return new Registry(); }, token: Registry, providedIn: "root" });
    return Registry;
}());
export { Registry };
function Registry_tsickle_Closure_declarations() {
    /** @type {?} */
    Registry.prototype.forms;
    /** @type {?} */
    Registry.prototype.registry;
    /** @type {?} */
    Registry.prototype.isReady;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2NydWQvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvcmVnaXN0cnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFjLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEUsT0FBTyxFQUEyQixlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7OztJQWM5RDtxQkFKMkMsRUFBRTt3QkFDckIsRUFBRTt1QkFDaUIsSUFBSSxlQUFlLENBQVUsS0FBSyxDQUFDO0tBRTlEOzs7Ozs7SUFFaEIsK0JBQVk7Ozs7O0lBQVosVUFBYSxRQUFrQixFQUFFLFNBQWM7UUFDN0MscUJBQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQzs7WUFDakIsR0FBRyxDQUFDLENBQWUsSUFBQSxLQUFBLGlCQUFBLFFBQVEsQ0FBQyxRQUFRLENBQUEsZ0JBQUE7Z0JBQS9CLElBQU0sSUFBSSxXQUFBO2dCQUNiLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUN6RDs7Ozs7Ozs7O1FBQ0QscUJBQU0sQ0FBQyxHQUFHLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzs7S0FDL0I7Ozs7O0lBRUQsMkJBQVE7Ozs7SUFBUixVQUFTLElBQVE7UUFDZixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN6Qjs7OztJQUVELDZCQUFVOzs7SUFBVjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0tBQ3RCOzs7Ozs7O0lBRUQsMkJBQVE7Ozs7OztJQUFSLFVBQVMsVUFBa0IsRUFBRSxHQUFXLEVBQUUsR0FBVztRQUNuRCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBTSxJQUFLLE9BQUEsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLEVBQWIsQ0FBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3ZFLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsRUFBYixDQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN6Qzs7Ozs7O0lBRUQseUJBQU07Ozs7O0lBQU4sVUFBTyxVQUFrQixFQUFFLEdBQVc7UUFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxFQUFiLENBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3JFOzs7Ozs7SUFFRCwrQkFBWTs7Ozs7SUFBWixVQUFhLFVBQWtCLEVBQUUsR0FBVztRQUMxQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLEVBQWIsQ0FBYSxDQUFDLENBQUMsTUFBTSxDQUFDO0tBQ3pFOztnQkF4Q0YsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7Ozs7bUJBVEQ7O1NBVWEsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUgLCAgU3ViamVjdCAsICBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEZpZWxkLCBDcnVkRm9ybSB9IGZyb20gJy4uL2Zvcm1zJztcbmltcG9ydCB7IEFwcCwgTW9kZWwgfSBmcm9tICcuLi9zY3JlZW5zJztcblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBSZWdpc3RyeSB7XG5cbiAgcHVibGljIGZvcm1zOiB7W2tleTogc3RyaW5nXTogRm9ybUdyb3VwfSA9IHt9O1xuICBwcml2YXRlIHJlZ2lzdHJ5OiBhbnkgPSB7fTtcbiAgcHVibGljIGlzUmVhZHk6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICByZWdpc3RlckZvcm0obWV0YWRhdGE6IENydWRGb3JtLCBmb3JtQ2xhc3M6IGFueSkge1xuICAgIGNvbnN0IGN0cmxzID0ge307XG4gICAgZm9yIChjb25zdCBjdHJsIG9mIG1ldGFkYXRhLmNvbnRyb2xzKSB7XG4gICAgICBjdHJsc1tjdHJsLm5hbWVdID0gbmV3IEZvcm1Db250cm9sKHt9LCBjdHJsLnZhbGlkYXRvcnMpO1xuICAgIH1cbiAgICBjb25zdCBmID0gbmV3IEZvcm1Hcm91cChjdHJscyk7XG4gICAgdGhpcy5mb3Jtc1ttZXRhZGF0YS5uYW1lXSA9IGY7XG4gIH1cblxuICByZWdpc3RlcihtZXRhOiB7fSkge1xuICAgIHRoaXMucmVnaXN0cnkgPSBtZXRhO1xuICAgIHRoaXMuaXNSZWFkeS5uZXh0KHRydWUpO1xuICB9XG5cbiAgZ2V0TW9kdWxlcygpIHtcbiAgICByZXR1cm4gdGhpcy5yZWdpc3RyeTtcbiAgfVxuXG4gIGdldE1vZGVsKG1vZHVsZU5hbWU6IHN0cmluZywgYXBwOiBzdHJpbmcsIGtleTogc3RyaW5nKTogTW9kZWwge1xuICAgIHJldHVybiB0aGlzLnJlZ2lzdHJ5W21vZHVsZU5hbWVdLmFwcHMuZmlsdGVyKChhOiBBcHApID0+IGEua2V5ID09PSBhcHApWzBdXG4gICAgICAubW9kZWxzLmZpbHRlcihtID0+IG0ua2V5ID09PSBrZXkpWzBdO1xuICB9XG5cbiAgZ2V0QXBwKG1vZHVsZU5hbWU6IHN0cmluZywgYXBwOiBzdHJpbmcpOiBBcHAge1xuICAgIHJldHVybiB0aGlzLnJlZ2lzdHJ5W21vZHVsZU5hbWVdLmFwcHMuZmlsdGVyKGEgPT4gYS5rZXkgPT09IGFwcClbMF07XG4gIH1cblxuICBnZXRBcHBNb2RlbHMobW9kdWxlTmFtZTogc3RyaW5nLCBhcHA6IHN0cmluZyk6IHtzdHJpbmc6IE1vZGVsfSB7XG4gICAgcmV0dXJuIHRoaXMucmVnaXN0cnlbbW9kdWxlTmFtZV0uYXBwcy5maWx0ZXIoYSA9PiBhLmtleSA9PT0gYXBwKS5tb2RlbHM7XG4gIH1cblxufVxuIl19
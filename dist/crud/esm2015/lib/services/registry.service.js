/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export class Registry {
    constructor() {
        this.forms = {};
        this.registry = {};
        this.isReady = new BehaviorSubject(false);
    }
    /**
     * @param {?} metadata
     * @param {?} formClass
     * @return {?}
     */
    registerForm(metadata, formClass) {
        const /** @type {?} */ ctrls = {};
        for (const /** @type {?} */ ctrl of metadata.controls) {
            ctrls[ctrl.name] = new FormControl({}, ctrl.validators);
        }
        const /** @type {?} */ f = new FormGroup(ctrls);
        this.forms[metadata.name] = f;
    }
    /**
     * @param {?} meta
     * @return {?}
     */
    register(meta) {
        this.registry = meta;
        this.isReady.next(true);
    }
    /**
     * @return {?}
     */
    getModules() {
        return this.registry;
    }
    /**
     * @param {?} moduleName
     * @param {?} app
     * @param {?} key
     * @return {?}
     */
    getModel(moduleName, app, key) {
        return this.registry[moduleName].apps.filter((a) => a.key === app)[0]
            .models.filter(m => m.key === key)[0];
    }
    /**
     * @param {?} moduleName
     * @param {?} app
     * @return {?}
     */
    getApp(moduleName, app) {
        return this.registry[moduleName].apps.filter(a => a.key === app)[0];
    }
    /**
     * @param {?} moduleName
     * @param {?} app
     * @return {?}
     */
    getAppModels(moduleName, app) {
        return this.registry[moduleName].apps.filter(a => a.key === app).models;
    }
}
Registry.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
Registry.ctorParameters = () => [];
/** @nocollapse */ Registry.ngInjectableDef = i0.defineInjectable({ factory: function Registry_Factory() { return new Registry(); }, token: Registry, providedIn: "root" });
function Registry_tsickle_Closure_declarations() {
    /** @type {?} */
    Registry.prototype.forms;
    /** @type {?} */
    Registry.prototype.registry;
    /** @type {?} */
    Registry.prototype.isReady;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2NydWQvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvcmVnaXN0cnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQWMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRSxPQUFPLEVBQTJCLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFRaEUsTUFBTTtJQU1KO3FCQUoyQyxFQUFFO3dCQUNyQixFQUFFO3VCQUNpQixJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUM7S0FFOUQ7Ozs7OztJQUVoQixZQUFZLENBQUMsUUFBa0IsRUFBRSxTQUFjO1FBQzdDLHVCQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDakIsR0FBRyxDQUFDLENBQUMsdUJBQU0sSUFBSSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUN6RDtRQUNELHVCQUFNLENBQUMsR0FBRyxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDL0I7Ozs7O0lBRUQsUUFBUSxDQUFDLElBQVE7UUFDZixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN6Qjs7OztJQUVELFVBQVU7UUFDUixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztLQUN0Qjs7Ozs7OztJQUVELFFBQVEsQ0FBQyxVQUFrQixFQUFFLEdBQVcsRUFBRSxHQUFXO1FBQ25ELE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3ZFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3pDOzs7Ozs7SUFFRCxNQUFNLENBQUMsVUFBa0IsRUFBRSxHQUFXO1FBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3JFOzs7Ozs7SUFFRCxZQUFZLENBQUMsVUFBa0IsRUFBRSxHQUFXO1FBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztLQUN6RTs7O1lBeENGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUgLCAgU3ViamVjdCAsICBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEZpZWxkLCBDcnVkRm9ybSB9IGZyb20gJy4uL2Zvcm1zJztcbmltcG9ydCB7IEFwcCwgTW9kZWwgfSBmcm9tICcuLi9zY3JlZW5zJztcblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBSZWdpc3RyeSB7XG5cbiAgcHVibGljIGZvcm1zOiB7W2tleTogc3RyaW5nXTogRm9ybUdyb3VwfSA9IHt9O1xuICBwcml2YXRlIHJlZ2lzdHJ5OiBhbnkgPSB7fTtcbiAgcHVibGljIGlzUmVhZHk6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICByZWdpc3RlckZvcm0obWV0YWRhdGE6IENydWRGb3JtLCBmb3JtQ2xhc3M6IGFueSkge1xuICAgIGNvbnN0IGN0cmxzID0ge307XG4gICAgZm9yIChjb25zdCBjdHJsIG9mIG1ldGFkYXRhLmNvbnRyb2xzKSB7XG4gICAgICBjdHJsc1tjdHJsLm5hbWVdID0gbmV3IEZvcm1Db250cm9sKHt9LCBjdHJsLnZhbGlkYXRvcnMpO1xuICAgIH1cbiAgICBjb25zdCBmID0gbmV3IEZvcm1Hcm91cChjdHJscyk7XG4gICAgdGhpcy5mb3Jtc1ttZXRhZGF0YS5uYW1lXSA9IGY7XG4gIH1cblxuICByZWdpc3RlcihtZXRhOiB7fSkge1xuICAgIHRoaXMucmVnaXN0cnkgPSBtZXRhO1xuICAgIHRoaXMuaXNSZWFkeS5uZXh0KHRydWUpO1xuICB9XG5cbiAgZ2V0TW9kdWxlcygpIHtcbiAgICByZXR1cm4gdGhpcy5yZWdpc3RyeTtcbiAgfVxuXG4gIGdldE1vZGVsKG1vZHVsZU5hbWU6IHN0cmluZywgYXBwOiBzdHJpbmcsIGtleTogc3RyaW5nKTogTW9kZWwge1xuICAgIHJldHVybiB0aGlzLnJlZ2lzdHJ5W21vZHVsZU5hbWVdLmFwcHMuZmlsdGVyKChhOiBBcHApID0+IGEua2V5ID09PSBhcHApWzBdXG4gICAgICAubW9kZWxzLmZpbHRlcihtID0+IG0ua2V5ID09PSBrZXkpWzBdO1xuICB9XG5cbiAgZ2V0QXBwKG1vZHVsZU5hbWU6IHN0cmluZywgYXBwOiBzdHJpbmcpOiBBcHAge1xuICAgIHJldHVybiB0aGlzLnJlZ2lzdHJ5W21vZHVsZU5hbWVdLmFwcHMuZmlsdGVyKGEgPT4gYS5rZXkgPT09IGFwcClbMF07XG4gIH1cblxuICBnZXRBcHBNb2RlbHMobW9kdWxlTmFtZTogc3RyaW5nLCBhcHA6IHN0cmluZyk6IHtzdHJpbmc6IE1vZGVsfSB7XG4gICAgcmV0dXJuIHRoaXMucmVnaXN0cnlbbW9kdWxlTmFtZV0uYXBwcy5maWx0ZXIoYSA9PiBhLmtleSA9PT0gYXBwKS5tb2RlbHM7XG4gIH1cblxufVxuIl19
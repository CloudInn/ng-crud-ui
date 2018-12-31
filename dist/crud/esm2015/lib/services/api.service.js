/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class ApiService {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
    }
    /**
     * @param {?} api
     * @param {?=} params
     * @return {?}
     */
    fetch(api, params) {
        let /** @type {?} */ opts = new HttpParams();
        Object.keys(params).forEach(p => {
            if (params[p]) {
                opts = opts.set(p, params[p]);
            }
        });
        return this.http.get(api, { params: opts });
    }
    /**
     * @param {?} api
     * @param {?} body
     * @param {?=} params
     * @return {?}
     */
    put(api, body, params = {}) {
        let /** @type {?} */ opts = new HttpParams();
        Object.keys(params).forEach(p => {
            if (params[p]) {
                opts = opts.set(p, params[p]);
            }
        });
        return this.http.put(api, body, { params: opts });
    }
    /**
     * @param {?} api
     * @param {?} body
     * @param {?=} params
     * @return {?}
     */
    post(api, body, params = {}) {
        let /** @type {?} */ opts = new HttpParams();
        Object.keys(params).forEach(p => {
            if (params[p]) {
                opts = opts.set(p, params[p]);
            }
        });
        return this.http.post(api, body, { params: opts });
    }
}
ApiService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
ApiService.ctorParameters = () => [
    { type: HttpClient }
];
/** @nocollapse */ ApiService.ngInjectableDef = i0.defineInjectable({ factory: function ApiService_Factory() { return new ApiService(i0.inject(i1.HttpClient)); }, token: ApiService, providedIn: "root" });
function ApiService_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiService.prototype.http;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9jcnVkLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2FwaS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7OztBQU05RCxNQUFNOzs7O0lBRUYsWUFBb0IsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtLQUFLOzs7Ozs7SUFFbEMsS0FBSyxDQUFDLEdBQVcsRUFBRSxNQUFZO1FBQ2xDLHFCQUFJLElBQUksR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzVCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1osSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2pDO1NBQ0osQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDOzs7Ozs7OztJQUd2QyxHQUFHLENBQUMsR0FBVyxFQUFFLElBQUksRUFBRSxNQUFNLEdBQUcsRUFBRTtRQUNyQyxxQkFBSSxJQUFJLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUM1QixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNaLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNqQztTQUNKLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7Ozs7Ozs7O0lBRzdDLElBQUksQ0FBQyxHQUFXLEVBQUUsSUFBSSxFQUFFLE1BQU0sR0FBRyxFQUFFO1FBQ3RDLHFCQUFJLElBQUksR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzVCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1osSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2pDO1NBQ0osQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQzs7OztZQXJDeEQsVUFBVSxTQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCOzs7O1lBTFEsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQXBpU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHsgfVxuXG4gICAgcHVibGljIGZldGNoKGFwaTogc3RyaW5nLCBwYXJhbXM/OiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICBsZXQgb3B0cyA9IG5ldyBIdHRwUGFyYW1zKCk7XG4gICAgICAgIE9iamVjdC5rZXlzKHBhcmFtcykuZm9yRWFjaChwID0+IHtcbiAgICAgICAgICAgIGlmIChwYXJhbXNbcF0pIHtcbiAgICAgICAgICAgICAgICBvcHRzID0gb3B0cy5zZXQocCwgcGFyYW1zW3BdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYXBpLCB7cGFyYW1zOiBvcHRzfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHB1dChhcGk6IHN0cmluZywgYm9keSwgcGFyYW1zID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICBsZXQgb3B0cyA9IG5ldyBIdHRwUGFyYW1zKCk7XG4gICAgICAgIE9iamVjdC5rZXlzKHBhcmFtcykuZm9yRWFjaChwID0+IHtcbiAgICAgICAgICAgIGlmIChwYXJhbXNbcF0pIHtcbiAgICAgICAgICAgICAgICBvcHRzID0gb3B0cy5zZXQocCwgcGFyYW1zW3BdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQoYXBpLCBib2R5LCB7cGFyYW1zOiBvcHRzfSk7XG4gICAgfVxuXG4gICAgcHVibGljIHBvc3QoYXBpOiBzdHJpbmcsIGJvZHksIHBhcmFtcyA9IHt9KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgbGV0IG9wdHMgPSBuZXcgSHR0cFBhcmFtcygpO1xuICAgICAgICBPYmplY3Qua2V5cyhwYXJhbXMpLmZvckVhY2gocCA9PiB7XG4gICAgICAgICAgICBpZiAocGFyYW1zW3BdKSB7XG4gICAgICAgICAgICAgICAgb3B0cyA9IG9wdHMuc2V0KHAsIHBhcmFtc1twXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChhcGksIGJvZHksIHtwYXJhbXM6IG9wdHN9KTtcbiAgICB9XG5cbn1cbiJdfQ==
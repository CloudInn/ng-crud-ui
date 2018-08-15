/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
var ApiService = /** @class */ (function () {
    function ApiService(http) {
        this.http = http;
    }
    /**
     * @param {?} api
     * @param {?=} params
     * @return {?}
     */
    ApiService.prototype.fetch = /**
     * @param {?} api
     * @param {?=} params
     * @return {?}
     */
    function (api, params) {
        var /** @type {?} */ opts = new HttpParams();
        Object.keys(params).forEach(function (p) {
            if (params[p]) {
                opts = opts.set(p, params[p]);
            }
        });
        return this.http.get(api, { params: opts });
    };
    /**
     * @param {?} api
     * @param {?} body
     * @param {?=} params
     * @return {?}
     */
    ApiService.prototype.put = /**
     * @param {?} api
     * @param {?} body
     * @param {?=} params
     * @return {?}
     */
    function (api, body, params) {
        if (params === void 0) { params = {}; }
        var /** @type {?} */ opts = new HttpParams();
        Object.keys(params).forEach(function (p) {
            if (params[p]) {
                opts = opts.set(p, params[p]);
            }
        });
        return this.http.put(api, body, { params: opts });
    };
    /**
     * @param {?} api
     * @param {?} body
     * @param {?=} params
     * @return {?}
     */
    ApiService.prototype.post = /**
     * @param {?} api
     * @param {?} body
     * @param {?=} params
     * @return {?}
     */
    function (api, body, params) {
        if (params === void 0) { params = {}; }
        var /** @type {?} */ opts = new HttpParams();
        Object.keys(params).forEach(function (p) {
            if (params[p]) {
                opts = opts.set(p, params[p]);
            }
        });
        return this.http.post(api, body, { params: opts });
    };
    ApiService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    ApiService.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    /** @nocollapse */ ApiService.ngInjectableDef = i0.defineInjectable({ factory: function ApiService_Factory() { return new ApiService(i0.inject(i1.HttpClient)); }, token: ApiService, providedIn: "root" });
    return ApiService;
}());
export { ApiService };
function ApiService_tsickle_Closure_declarations() {
    /** @type {?} */
    ApiService.prototype.http;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9jcnVkLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2FwaS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7Ozs7SUFRMUQsb0JBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7S0FBSzs7Ozs7O0lBRWxDLDBCQUFLOzs7OztjQUFDLEdBQVcsRUFBRSxNQUFZO1FBQ2xDLHFCQUFJLElBQUksR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztZQUN6QixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNaLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNqQztTQUNKLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7SUFHdkMsd0JBQUc7Ozs7OztjQUFDLEdBQVcsRUFBRSxJQUFJLEVBQUUsTUFBVztRQUFYLHVCQUFBLEVBQUEsV0FBVztRQUNyQyxxQkFBSSxJQUFJLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztRQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7WUFDekIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDWixJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDakM7U0FDSixDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDOzs7Ozs7OztJQUc3Qyx5QkFBSTs7Ozs7O2NBQUMsR0FBVyxFQUFFLElBQUksRUFBRSxNQUFXO1FBQVgsdUJBQUEsRUFBQSxXQUFXO1FBQ3RDLHFCQUFJLElBQUksR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztZQUN6QixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNaLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNqQztTQUNKLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7OztnQkFyQ3hELFVBQVUsU0FBQztvQkFDUixVQUFVLEVBQUUsTUFBTTtpQkFDckI7Ozs7Z0JBTFEsVUFBVTs7O3FCQURuQjs7U0FPYSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFBhcmFtcyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBcGlTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkgeyB9XG5cbiAgICBwdWJsaWMgZmV0Y2goYXBpOiBzdHJpbmcsIHBhcmFtcz86IGFueSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGxldCBvcHRzID0gbmV3IEh0dHBQYXJhbXMoKTtcbiAgICAgICAgT2JqZWN0LmtleXMocGFyYW1zKS5mb3JFYWNoKHAgPT4ge1xuICAgICAgICAgICAgaWYgKHBhcmFtc1twXSkge1xuICAgICAgICAgICAgICAgIG9wdHMgPSBvcHRzLnNldChwLCBwYXJhbXNbcF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChhcGksIHtwYXJhbXM6IG9wdHN9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcHV0KGFwaTogc3RyaW5nLCBib2R5LCBwYXJhbXMgPSB7fSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIGxldCBvcHRzID0gbmV3IEh0dHBQYXJhbXMoKTtcbiAgICAgICAgT2JqZWN0LmtleXMocGFyYW1zKS5mb3JFYWNoKHAgPT4ge1xuICAgICAgICAgICAgaWYgKHBhcmFtc1twXSkge1xuICAgICAgICAgICAgICAgIG9wdHMgPSBvcHRzLnNldChwLCBwYXJhbXNbcF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dChhcGksIGJvZHksIHtwYXJhbXM6IG9wdHN9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcG9zdChhcGk6IHN0cmluZywgYm9keSwgcGFyYW1zID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICBsZXQgb3B0cyA9IG5ldyBIdHRwUGFyYW1zKCk7XG4gICAgICAgIE9iamVjdC5rZXlzKHBhcmFtcykuZm9yRWFjaChwID0+IHtcbiAgICAgICAgICAgIGlmIChwYXJhbXNbcF0pIHtcbiAgICAgICAgICAgICAgICBvcHRzID0gb3B0cy5zZXQocCwgcGFyYW1zW3BdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KGFwaSwgYm9keSwge3BhcmFtczogb3B0c30pO1xuICAgIH1cblxufVxuIl19
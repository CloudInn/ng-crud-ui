/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import * as i0 from "@angular/core";
var FormService = /** @class */ (function () {
    function FormService() {
    }
    /**
     * @param {?} fields
     * @return {?}
     */
    FormService.prototype.toFormGroup = /**
     * @param {?} fields
     * @return {?}
     */
    function (fields) {
        var /** @type {?} */ controls = {};
        try {
            for (var fields_1 = tslib_1.__values(fields), fields_1_1 = fields_1.next(); !fields_1_1.done; fields_1_1 = fields_1.next()) {
                var field = fields_1_1.value;
                if (field.control_type === 'formset') {
                    controls[field.key] = this.toFormArray(field.fields, field._value);
                }
                else {
                    controls[field.key] = new FormControl(field._value);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (fields_1_1 && !fields_1_1.done && (_a = fields_1.return)) _a.call(fields_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return new FormGroup(controls);
        var e_1, _a;
    };
    /**
     * @param {?} fields
     * @param {?} values
     * @return {?}
     */
    FormService.prototype.toFormArray = /**
     * @param {?} fields
     * @param {?} values
     * @return {?}
     */
    function (fields, values) {
        var _this = this;
        if (!values) {
            values = [];
        }
        var /** @type {?} */ groups = [];
        values.forEach(function (v) {
            // assign value to fields
            fields.map(function (f) {
                f._value = v[f.key];
            });
            var /** @type {?} */ group = _this.toFormGroup(fields);
            groups.push(g);
        });
        // always add an empty row
        var /** @type {?} */ g = this.toFormGroup(fields);
        var /** @type {?} */ emptyValues = {};
        try {
            for (var fields_2 = tslib_1.__values(fields), fields_2_1 = fields_2.next(); !fields_2_1.done; fields_2_1 = fields_2.next()) {
                var f = fields_2_1.value;
                emptyValues[f.key] = null;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (fields_2_1 && !fields_2_1.done && (_a = fields_2.return)) _a.call(fields_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        g.setValue(emptyValues);
        groups.push(g);
        return new FormArray(groups);
        var e_2, _a;
    };
    FormService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    FormService.ctorParameters = function () { return []; };
    /** @nocollapse */ FormService.ngInjectableDef = i0.defineInjectable({ factory: function FormService_Factory() { return new FormService(); }, token: FormService, providedIn: "root" });
    return FormService;
}());
export { FormService };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vY3J1ZC8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9mb3JtLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQW1CLFNBQVMsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztJQVNsRjtLQUFnQjs7Ozs7SUFFaEIsaUNBQVc7Ozs7SUFBWCxVQUFZLE1BQWU7UUFDekIscUJBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQzs7WUFDcEIsR0FBRyxDQUFDLENBQWdCLElBQUEsV0FBQSxpQkFBQSxNQUFNLENBQUEsOEJBQUE7Z0JBQXJCLElBQU0sS0FBSyxtQkFBQTtnQkFDZCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ3JDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDcEU7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ04sUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ3JEO2FBQ0Y7Ozs7Ozs7OztRQUNELE1BQU0sQ0FBQyxJQUFJLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7S0FDaEM7Ozs7OztJQUVELGlDQUFXOzs7OztJQUFYLFVBQVksTUFBZSxFQUFFLE1BQWE7UUFBMUMsaUJBc0JDO1FBckJDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNaLE1BQU0sR0FBRyxFQUFFLENBQUM7U0FDYjtRQUNELHFCQUFNLE1BQU0sR0FBZ0IsRUFBRSxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDOztZQUVkLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDO2dCQUNWLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNyQixDQUFDLENBQUM7WUFDSCxxQkFBTSxLQUFLLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2hCLENBQUMsQ0FBQzs7UUFFSCxxQkFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuQyxxQkFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDOztZQUN2QixHQUFHLENBQUMsQ0FBWSxJQUFBLFdBQUEsaUJBQUEsTUFBTSxDQUFBLDhCQUFBO2dCQUFqQixJQUFNLENBQUMsbUJBQUE7Z0JBQ1YsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7YUFDM0I7Ozs7Ozs7OztRQUNELENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNmLE1BQU0sQ0FBQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7S0FDOUI7O2dCQXpDRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7OztzQkFQRDs7U0FRYSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wsIEZvcm1BcnJheSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUgLCAgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuLi9mb3Jtcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1TZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgdG9Gb3JtR3JvdXAoZmllbGRzOiBGaWVsZFtdKTogRm9ybUdyb3VwIHtcbiAgICBjb25zdCBjb250cm9scyA9IHt9O1xuICAgIGZvciAoY29uc3QgZmllbGQgb2YgZmllbGRzKSB7XG4gICAgICBpZiAoZmllbGQuY29udHJvbF90eXBlID09PSAnZm9ybXNldCcpIHtcbiAgICAgICAgY29udHJvbHNbZmllbGQua2V5XSA9IHRoaXMudG9Gb3JtQXJyYXkoZmllbGQuZmllbGRzLCBmaWVsZC5fdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29udHJvbHNbZmllbGQua2V5XSA9IG5ldyBGb3JtQ29udHJvbChmaWVsZC5fdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3IEZvcm1Hcm91cChjb250cm9scyk7XG4gIH1cblxuICB0b0Zvcm1BcnJheShmaWVsZHM6IEZpZWxkW10sIHZhbHVlczogYW55W10pIHtcbiAgICBpZiAoIXZhbHVlcykge1xuICAgICAgdmFsdWVzID0gW107XG4gICAgfVxuICAgIGNvbnN0IGdyb3VwczogRm9ybUdyb3VwW10gPSBbXTtcbiAgICB2YWx1ZXMuZm9yRWFjaCh2ID0+IHtcbiAgICAgIC8vIGFzc2lnbiB2YWx1ZSB0byBmaWVsZHNcbiAgICAgIGZpZWxkcy5tYXAoZiA9PiB7XG4gICAgICAgIGYuX3ZhbHVlID0gdltmLmtleV07XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGdyb3VwID0gdGhpcy50b0Zvcm1Hcm91cChmaWVsZHMpO1xuICAgICAgZ3JvdXBzLnB1c2goZyk7XG4gICAgfSk7XG4gICAgLy8gYWx3YXlzIGFkZCBhbiBlbXB0eSByb3dcbiAgICBjb25zdCBnID0gdGhpcy50b0Zvcm1Hcm91cChmaWVsZHMpO1xuICAgIGNvbnN0IGVtcHR5VmFsdWVzID0ge307XG4gICAgZm9yIChjb25zdCBmIG9mIGZpZWxkcykge1xuICAgICAgZW1wdHlWYWx1ZXNbZi5rZXldID0gbnVsbDtcbiAgICB9XG4gICAgZy5zZXRWYWx1ZShlbXB0eVZhbHVlcyk7XG4gICAgZ3JvdXBzLnB1c2goZyk7XG4gICAgcmV0dXJuIG5ldyBGb3JtQXJyYXkoZ3JvdXBzKTtcbiAgfVxuXG59XG4iXX0=
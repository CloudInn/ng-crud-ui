/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import * as i0 from "@angular/core";
export class FormService {
    constructor() { }
    /**
     * @param {?} fields
     * @return {?}
     */
    toFormGroup(fields) {
        const /** @type {?} */ controls = {};
        for (const /** @type {?} */ field of fields) {
            if (field.control_type === 'formset') {
                controls[field.key] = this.toFormArray(field.fields, field._value);
            }
            else {
                controls[field.key] = new FormControl(field._value);
            }
        }
        return new FormGroup(controls);
    }
    /**
     * @param {?} fields
     * @param {?} values
     * @return {?}
     */
    toFormArray(fields, values) {
        if (!values) {
            values = [];
        }
        const /** @type {?} */ groups = [];
        values.forEach(v => {
            // assign value to fields
            fields.map(f => {
                f._value = v[f.key];
            });
            const /** @type {?} */ group = this.toFormGroup(fields);
            groups.push(g);
        });
        // always add an empty row
        const /** @type {?} */ g = this.toFormGroup(fields);
        const /** @type {?} */ emptyValues = {};
        for (const /** @type {?} */ f of fields) {
            emptyValues[f.key] = null;
        }
        g.setValue(emptyValues);
        groups.push(g);
        return new FormArray(groups);
    }
}
FormService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
FormService.ctorParameters = () => [];
/** @nocollapse */ FormService.ngInjectableDef = i0.defineInjectable({ factory: function FormService_Factory() { return new FormService(); }, token: FormService, providedIn: "root" });

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vY3J1ZC8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9mb3JtLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBbUIsU0FBUyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFPcEYsTUFBTTtJQUVKLGlCQUFnQjs7Ozs7SUFFaEIsV0FBVyxDQUFDLE1BQWU7UUFDekIsdUJBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNwQixHQUFHLENBQUMsQ0FBQyx1QkFBTSxLQUFLLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztZQUMzQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNwRTtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3JEO1NBQ0Y7UUFDRCxNQUFNLENBQUMsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDaEM7Ozs7OztJQUVELFdBQVcsQ0FBQyxNQUFlLEVBQUUsTUFBYTtRQUN4QyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDWixNQUFNLEdBQUcsRUFBRSxDQUFDO1NBQ2I7UUFDRCx1QkFBTSxNQUFNLEdBQWdCLEVBQUUsQ0FBQztRQUMvQixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFOztZQUVqQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNiLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNyQixDQUFDLENBQUM7WUFDSCx1QkFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2hCLENBQUMsQ0FBQzs7UUFFSCx1QkFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuQyx1QkFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLEdBQUcsQ0FBQyxDQUFDLHVCQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQzNCO1FBQ0QsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2YsTUFBTSxDQUFDLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzlCOzs7WUF6Q0YsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wsIEZvcm1BcnJheSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUgLCAgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuLi9mb3Jtcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1TZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgdG9Gb3JtR3JvdXAoZmllbGRzOiBGaWVsZFtdKTogRm9ybUdyb3VwIHtcbiAgICBjb25zdCBjb250cm9scyA9IHt9O1xuICAgIGZvciAoY29uc3QgZmllbGQgb2YgZmllbGRzKSB7XG4gICAgICBpZiAoZmllbGQuY29udHJvbF90eXBlID09PSAnZm9ybXNldCcpIHtcbiAgICAgICAgY29udHJvbHNbZmllbGQua2V5XSA9IHRoaXMudG9Gb3JtQXJyYXkoZmllbGQuZmllbGRzLCBmaWVsZC5fdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29udHJvbHNbZmllbGQua2V5XSA9IG5ldyBGb3JtQ29udHJvbChmaWVsZC5fdmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3IEZvcm1Hcm91cChjb250cm9scyk7XG4gIH1cblxuICB0b0Zvcm1BcnJheShmaWVsZHM6IEZpZWxkW10sIHZhbHVlczogYW55W10pIHtcbiAgICBpZiAoIXZhbHVlcykge1xuICAgICAgdmFsdWVzID0gW107XG4gICAgfVxuICAgIGNvbnN0IGdyb3VwczogRm9ybUdyb3VwW10gPSBbXTtcbiAgICB2YWx1ZXMuZm9yRWFjaCh2ID0+IHtcbiAgICAgIC8vIGFzc2lnbiB2YWx1ZSB0byBmaWVsZHNcbiAgICAgIGZpZWxkcy5tYXAoZiA9PiB7XG4gICAgICAgIGYuX3ZhbHVlID0gdltmLmtleV07XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGdyb3VwID0gdGhpcy50b0Zvcm1Hcm91cChmaWVsZHMpO1xuICAgICAgZ3JvdXBzLnB1c2goZyk7XG4gICAgfSk7XG4gICAgLy8gYWx3YXlzIGFkZCBhbiBlbXB0eSByb3dcbiAgICBjb25zdCBnID0gdGhpcy50b0Zvcm1Hcm91cChmaWVsZHMpO1xuICAgIGNvbnN0IGVtcHR5VmFsdWVzID0ge307XG4gICAgZm9yIChjb25zdCBmIG9mIGZpZWxkcykge1xuICAgICAgZW1wdHlWYWx1ZXNbZi5rZXldID0gbnVsbDtcbiAgICB9XG4gICAgZy5zZXRWYWx1ZShlbXB0eVZhbHVlcyk7XG4gICAgZ3JvdXBzLnB1c2goZyk7XG4gICAgcmV0dXJuIG5ldyBGb3JtQXJyYXkoZ3JvdXBzKTtcbiAgfVxuXG59XG4iXX0=
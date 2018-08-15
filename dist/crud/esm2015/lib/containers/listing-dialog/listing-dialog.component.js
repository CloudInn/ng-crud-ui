/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Registry } from '../../services/registry.service';
export class ListingDialogComponent {
    /**
     * @param {?} reg
     * @param {?} ref
     * @param {?} data
     */
    constructor(reg, ref, data) {
        this.reg = reg;
        this.ref = ref;
        this.data = data;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.moduleName = this.data['moduleName'];
        this.appName = this.data['appName'];
        this.modelName = this.data['modelName'];
    }
    /**
     * @param {?} value
     * @return {?}
     */
    picked(value) {
        console.log('picked', value);
        this.ref.close(value);
    }
}
ListingDialogComponent.decorators = [
    { type: Component, args: [{
                template: `<section class="app-settings" *ngIf="modelName">

  <ng-crud-listing (picked)="picked($event)" [modelName]="modelName" [appName]="appName" [moduleName]="moduleName" mode="pick">

  </ng-crud-listing>
</section>`,
                styles: [`#custom-header{padding-top:12px;margin-bottom:12px}.page-title a{color:#333}.mat-tab-nav-bar,mat-tab-nav-bar{border:none!important}.tabs-bar a{color:#fff}`]
            },] },
];
/** @nocollapse */
ListingDialogComponent.ctorParameters = () => [
    { type: Registry },
    { type: MatDialogRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
];
function ListingDialogComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    ListingDialogComponent.prototype.moduleName;
    /** @type {?} */
    ListingDialogComponent.prototype.appName;
    /** @type {?} */
    ListingDialogComponent.prototype.modelName;
    /** @type {?} */
    ListingDialogComponent.prototype.reg;
    /** @type {?} */
    ListingDialogComponent.prototype.ref;
    /** @type {?} */
    ListingDialogComponent.prototype.data;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdGluZy1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vY3J1ZC8iLCJzb3VyY2VzIjpbImxpYi9jb250YWluZXJzL2xpc3RpbmctZGlhbG9nL2xpc3RpbmctZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUV6RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFXM0QsTUFBTTs7Ozs7O0lBTUYsWUFDVSxLQUNBLEtBQ3dCLElBQVM7UUFGakMsUUFBRyxHQUFILEdBQUc7UUFDSCxRQUFHLEdBQUgsR0FBRztRQUNxQixTQUFJLEdBQUosSUFBSSxDQUFLO0tBQ3ZDOzs7O0lBRUosUUFBUTtRQUNOLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQ3pDOzs7OztJQUVELE1BQU0sQ0FBQyxLQUFLO1FBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDdkI7OztZQTlCSixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFOzs7OztXQUtEO2dCQUNULE1BQU0sRUFBRSxDQUFDLDRKQUE0SixDQUFDO2FBQ3ZLOzs7O1lBVlEsUUFBUTtZQUZTLFlBQVk7NENBc0IvQixNQUFNLFNBQUMsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlICwgUm91dGVyfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgTUFUX0RJQUxPR19EQVRBLCBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuXG5pbXBvcnQgeyBSZWdpc3RyeSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3JlZ2lzdHJ5LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgdGVtcGxhdGU6IGA8c2VjdGlvbiBjbGFzcz1cImFwcC1zZXR0aW5nc1wiICpuZ0lmPVwibW9kZWxOYW1lXCI+XG5cbiAgPG5nLWNydWQtbGlzdGluZyAocGlja2VkKT1cInBpY2tlZCgkZXZlbnQpXCIgW21vZGVsTmFtZV09XCJtb2RlbE5hbWVcIiBbYXBwTmFtZV09XCJhcHBOYW1lXCIgW21vZHVsZU5hbWVdPVwibW9kdWxlTmFtZVwiIG1vZGU9XCJwaWNrXCI+XG5cbiAgPC9uZy1jcnVkLWxpc3Rpbmc+XG48L3NlY3Rpb24+YCxcbiAgc3R5bGVzOiBbYCNjdXN0b20taGVhZGVye3BhZGRpbmctdG9wOjEycHg7bWFyZ2luLWJvdHRvbToxMnB4fS5wYWdlLXRpdGxlIGF7Y29sb3I6IzMzM30ubWF0LXRhYi1uYXYtYmFyLG1hdC10YWItbmF2LWJhcntib3JkZXI6bm9uZSFpbXBvcnRhbnR9LnRhYnMtYmFyIGF7Y29sb3I6I2ZmZn1gXVxufSlcbmV4cG9ydCBjbGFzcyBMaXN0aW5nRGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIG1vZHVsZU5hbWU6IHN0cmluZztcbiAgICBhcHBOYW1lOiBzdHJpbmc7XG4gICAgbW9kZWxOYW1lOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgcmVnOiBSZWdpc3RyeSxcbiAgICAgIHByaXZhdGUgcmVmOiBNYXREaWFsb2dSZWY8TGlzdGluZ0RpYWxvZ0NvbXBvbmVudD4sXG4gICAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IGFueSxcbiAgICApIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgIHRoaXMubW9kdWxlTmFtZSA9IHRoaXMuZGF0YVsnbW9kdWxlTmFtZSddO1xuICAgICAgdGhpcy5hcHBOYW1lID0gdGhpcy5kYXRhWydhcHBOYW1lJ107XG4gICAgICB0aGlzLm1vZGVsTmFtZSA9IHRoaXMuZGF0YVsnbW9kZWxOYW1lJ107XG4gICAgfVxuXG4gICAgcGlja2VkKHZhbHVlKSB7XG4gICAgICBjb25zb2xlLmxvZygncGlja2VkJywgdmFsdWUpO1xuICAgICAgdGhpcy5yZWYuY2xvc2UodmFsdWUpO1xuICAgIH1cblxufVxuIl19
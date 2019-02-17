import { Injectable } from '@angular/core';
import { Permissions, PermissionType } from '../models/permissions';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
    userPermissions: string[];
    PermissionsConfig: Permissions;

    constructor() {}


    setUserPermissions(permissions: string[]): void {
        this.userPermissions = permissions;
    }

    setPermissionsConfig(permissionsConfig: Permissions): void {
        this.PermissionsConfig = permissionsConfig;
    }

    checkPermission(name: string, type: PermissionType): boolean {
        if (this.PermissionsConfig && this.PermissionsConfig.permissions) {
            const item = this.PermissionsConfig.permissions.filter(p => p.name === name)[0];
            if (item && this.userPermissions) {
                return this.userPermissions.indexOf(item.permission[type]) !== -1;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}

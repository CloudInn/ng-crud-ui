import { Injectable } from '@angular/core';
import { PermissionType, Permission } from '../models/permissions';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
    userPermissions: string[];

    constructor() {}

    setUserPermissions(permissions: string[]): void {
        this.userPermissions = permissions;
    }

    getUserPermissions(): string[] {
        return this.userPermissions;
    }

    checkPermission(permissions: Permission, type: PermissionType): boolean {
        if (permissions) {
            return this.userPermissions.indexOf(permissions[type]) !== -1;
        } else {
            return true;
        }
    }
}

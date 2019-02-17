export interface Permission {
    name: string;
    permission: {
        create: string;
        read: string;
        update: string;
        delete: string;
    };
}

export interface Permissions {
    permissions: Permission[];
}

export enum PermissionType {
    create = 'create',
    read = 'read',
    update = 'update',
    delete = 'delete'
}

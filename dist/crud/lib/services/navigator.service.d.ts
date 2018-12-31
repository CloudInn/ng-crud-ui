import { EventEmitter } from '@angular/core';
export declare class Navigator {
    navItems: EventEmitter<any[]>;
    activeNavItem: any;
    path: EventEmitter<string[]>;
    constructor();
}

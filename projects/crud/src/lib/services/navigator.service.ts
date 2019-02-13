import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Navigator {

    navItems: EventEmitter<any[]> = new EventEmitter();
    activeNavItem = null;
    path: EventEmitter<string[]> = new EventEmitter<string[]>();

    constructor() { }

}

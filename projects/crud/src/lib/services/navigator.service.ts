import { Injectable, EventEmitter } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Observable ,  Subject } from 'rxjs';
import { Field } from '../forms';

@Injectable({
    providedIn: 'root'
})
export class Navigator {

    navItems: EventEmitter<any[]> = new EventEmitter();
    activeNavItem = null;
    path: EventEmitter<string[]> = new EventEmitter<string[]>();

    constructor() { }

}

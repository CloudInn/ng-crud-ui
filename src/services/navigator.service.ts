import { Injectable, EventEmitter } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Field } from '../forms';

@Injectable()
export class Navigator {

    navItems: EventEmitter<any[]> = new EventEmitter();

    constructor() { }

}

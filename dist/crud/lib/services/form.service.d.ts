import { FormGroup, FormArray } from '@angular/forms';
import { Field } from '../forms';
export declare class FormService {
    constructor();
    toFormGroup(fields: Field[]): FormGroup;
    toFormArray(fields: Field[], values: any[]): FormArray;
}

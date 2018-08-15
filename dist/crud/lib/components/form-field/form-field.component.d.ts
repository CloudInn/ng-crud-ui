import { OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Model } from '../../screens';
import { Registry } from '../../services/registry.service';
import { ApiService } from '../../services/api.service';
import { Field } from '../../forms';
export declare class FormFieldComponent implements OnChanges {
    private dialog;
    private api;
    private reg;
    form: AbstractControl;
    forcedSearchParams: any;
    field: Field;
    choices: any;
    filteredOptions: Observable<any[]>;
    foreign_model?: Model;
    private modelPath;
    constructor(dialog: MatDialog, api: ApiService, reg: Registry);
    ngOnChanges(changes: SimpleChanges): void;
    getFormControl(field_name: string): FormControl;
    displayFn(option: any): any;
    _filter(value: string): Observable<any[]>;
    openListingDialog(): void;
}

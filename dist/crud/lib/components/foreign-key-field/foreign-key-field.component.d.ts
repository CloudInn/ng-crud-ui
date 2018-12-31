import { OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Model } from '../../screens';
import { Registry } from '../../services/registry.service';
import { ApiService } from '../../services/api.service';
import { Field } from '../../forms';
export declare class ForeignKeyFieldComponent implements OnChanges {
    private api;
    private reg;
    formGroup: FormGroup;
    forcedSearchParams: any;
    field: Field;
    choices: any[];
    filteredOptions: Observable<any[]>;
    model?: Model;
    constructor(api: ApiService, reg: Registry);
    ngOnChanges(): void;
    displayFn(option: any): any;
    _filter(value: string): any[];
}

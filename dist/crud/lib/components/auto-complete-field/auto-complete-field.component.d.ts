import { OnChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Model } from '../../screens';
import { Registry } from '../../services/registry.service';
import { ApiService } from '../../services/api.service';
import { Field } from '../../forms';
export declare class AutoCompleteFieldComponent implements OnChanges {
    private api;
    private reg;
    model: Model;
    field: Field;
    foreign_model: Model;
    form: FormGroup;
    choices: any[];
    forcedSearchParams: any;
    dataSource: any[];
    searchParams: {};
    filteredOptions: Observable<any[]>;
    ctrl: FormControl;
    constructor(api: ApiService, reg: Registry);
    ngOnChanges(): void;
    filter(text: string): any[];
    valueFormatter(data: any): string;
    displayWith(foreign_model: any): (item: any) => string;
}

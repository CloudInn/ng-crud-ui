import { OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Model } from '../../screens';
import { Registry } from '../../services/registry.service';
import { ApiService } from '../../services/api.service';
import { FormService } from '../../services/form.service';
import { Field } from '../../forms';
export declare class FormsetComponent implements OnChanges {
    private api;
    private reg;
    private formService;
    form: FormGroup;
    model: Model;
    formarray: FormArray;
    config: Field;
    choices: {};
    constructor(api: ApiService, reg: Registry, formService: FormService);
    ngOnChanges(changes: SimpleChanges): void;
    addForm(): void;
    getChoices(field: Field): void;
}

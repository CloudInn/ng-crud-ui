import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';
import { Registry } from '../../services/registry.service';
import { FieldType, Field } from '../../forms';
export declare class ModelFormScreenComponent implements OnInit {
    private api;
    private reg;
    private router;
    private route;
    private snackbar;
    module: string;
    appName: string;
    modelName: string;
    id: any;
    mode: string;
    ngModel: any;
    model: any;
    fieldType: typeof FieldType;
    editableFields: Field[];
    choices: {};
    constructor(api: ApiService, reg: Registry, router: Router, route: ActivatedRoute, snackbar: MatSnackBar);
    ngOnInit(): void;
    onSubmit(e: any): void;
}

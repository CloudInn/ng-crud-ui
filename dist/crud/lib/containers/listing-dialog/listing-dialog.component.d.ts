import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Registry } from '../../services/registry.service';
export declare class ListingDialogComponent implements OnInit {
    private reg;
    private ref;
    data: any;
    moduleName: string;
    appName: string;
    modelName: string;
    constructor(reg: Registry, ref: MatDialogRef<ListingDialogComponent>, data: any);
    ngOnInit(): void;
    picked(value: any): void;
}

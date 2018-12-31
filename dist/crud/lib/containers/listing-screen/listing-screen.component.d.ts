import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registry } from '../../services/registry.service';
export declare class ListingScreenComponent implements OnInit {
    private reg;
    private router;
    private route;
    appName: string;
    moduleName: string;
    modelName: string;
    constructor(reg: Registry, router: Router, route: ActivatedRoute);
    ngOnInit(): void;
}

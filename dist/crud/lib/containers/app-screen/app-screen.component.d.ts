import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registry } from '../../services/registry.service';
import { Navigator } from '../../services/navigator.service';
export declare class AppScreenComponent implements OnInit {
    private reg;
    private router;
    private route;
    private navigator;
    app: any;
    moduleName: any;
    models: any[];
    constructor(reg: Registry, router: Router, route: ActivatedRoute, navigator: Navigator);
    ngOnInit(): void;
    renderSidebar(): void;
}

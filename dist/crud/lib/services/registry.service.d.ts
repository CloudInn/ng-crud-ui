import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CrudForm } from '../forms';
import { App, Model } from '../screens';
export declare class Registry {
    forms: {
        [key: string]: FormGroup;
    };
    private registry;
    isReady: BehaviorSubject<boolean>;
    constructor();
    registerForm(metadata: CrudForm, formClass: any): void;
    register(meta: {}): void;
    getModules(): any;
    getModel(moduleName: string, app: string, key: string): Model;
    getApp(moduleName: string, app: string): App;
    getAppModels(moduleName: string, app: string): {
        string: Model;
    };
}

import { Field } from './forms';
export declare class Module {
    label: string;
    apps: App[];
}
export declare class App {
    key: string;
    label: string;
    icon: string;
    models: Model[];
}
export declare class Model {
    key: string;
    api: string;
    verbose_name: string;
    fields: Field[];
    formsets: Field[];
    external_value_field: string;
    external_name_field: string;
    listing_fields: string[];
    actions: string[];
    bulk_actions: string[];
    list_actions: string[];
    pageSize: Number;
}
export declare class DefaultForm {
    model: Model;
    constructor(model: Model);
}
export declare class ListingScreen {
    model: Model;
}
export declare class EditingScreen {
    model: Model;
}

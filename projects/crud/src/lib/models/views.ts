import { Type } from '@angular/core';
import { ListingComponent } from '../components/listing/listing.component';
import { ModelFormComponent } from '../components/model-form/model-form.component';
import { Metadata, FieldConfig } from './metadata';

export interface ViewConfig {
    title: string;
    breadcrumbs: any[];
    metadata: Metadata;
    component: Type<any>;
}

export interface ListViewer extends ViewConfig {
    search: {
        enabled: boolean,
        view: FormViewer,
        search_key?: string[],
        mode?: string
    };
    dialog_mode?: boolean;
    pagination: {
        enabled: boolean,
        pageSize?: number,
    };
}

export interface FormViewer extends ViewConfig {
    layout: string; // horizontal or vertical
    controls: FieldConfig[];
    actions: { [key: string]: any };
}

export class FormView implements FormViewer {
    title = this.metadata.label;
    breadcrumbs = [];
    component = ModelFormComponent;
    layout = 'vertical';
    controls: FieldConfig[] = [];
    actions = this.metadata.formActions;

    constructor(public metadata: Metadata) {
        metadata.fields.filter(f => f.isEditable !== false).forEach(field => {
            this.controls.push(field as FieldConfig);
        });
    }
}

export class ListingView implements ListViewer {
    title = this.metadata.label;
    breadcrumbs = [];
    component = ListingComponent;
    search = {
        enabled: false,
        view: new FormView(this.metadata),
        search_key: [],
        mode: 'normal'
    };
    dialog_mode = false;
    pagination = {
        enabled: true,
        pageSize: 20,
    };
    defaults = {};
    constructor(public metadata: Metadata) {
    }
    setDefaults(values) {
        Object.keys(values).forEach(key => {
            this.search.view.controls.forEach(ctrl => {
                if (key === ctrl.name) {
                    ctrl.defaultValue = values[key];
                }
            });
            if (this.metadata.default_filters) {
                this.metadata.default_filters.push({
                    filter: key,
                    value: values[key]
                });
            }
        });
    }
}


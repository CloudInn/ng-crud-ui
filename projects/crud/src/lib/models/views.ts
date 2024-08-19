import { Type } from '@angular/core';
import { ListingComponent } from '../components/listing/listing.component';
import { ModelFormComponent } from '../components/model-form/model-form.component';
import { Metadata, FieldConfig } from './metadata';

export interface ViewConfig {
    title: string;
    breadcrumbs: any[];
    metadata: Metadata;
    component: Type<any>;
    iframeMode?: IFrameMode;
}

export interface ListViewer extends ViewConfig {
    search: {
        enabled: boolean,
        view: FormViewer,
        search_key?: string[],
        mode?: string,
        creationView?: FormView;
    };
    external_link?: {
        link: string,
        params: string[]
    };
    dialog_mode?: boolean;
    dialog_settings?: {
        add_new_btn?: boolean;
    };
    pagination?: {
        enabled: boolean,
        pageSize?: number,
    };
}
export interface FormActions {
    [key: string]: any;
}
export interface FormViewer extends ViewConfig {
    layout: string; // horizontal or vertical
    controls: FieldConfig[];
    actions: FormActions[];
    external_link?: {
        link: string;
        params: string[];
    };
    viewMode?: string;
}
export interface IframeOptions {
    external_link: {
      link: string;
      params: string[];
    };
    viewMode: string;
}

export enum IFrameMode {
    POP_UP = 'pop_up',
    NEW_PAGE = 'new_page'
}
export class FormView implements FormViewer {
    title = this.metadata.label;
    breadcrumbs = [];
    component = ModelFormComponent;
    layout = 'vertical';
    controls: FieldConfig[] = [];
    actions = this.metadata.formActions;
    search_key = this.metadata.search_key;
    viewMode = 'form'
    external_link;
    constructor(public metadata: Metadata, options?: IframeOptions) {
        metadata.fields.filter(f => f.isHidden !== true).forEach(field => {
            this.controls.push(field as FieldConfig);
        });
        if (options) {
            this.viewMode = options.viewMode;
            this.external_link = options.external_link;
        }
    }
}
export interface ViewSettingsObj {
    isDialog: boolean;
    dialog_settings?: {
        add_new_btn?: boolean;
    };
    search_settings: {
        enabled: boolean,
        search_key?: string[],
        mode: string,
        creationView?: FormView;
    };
    external_link?: {
        link: string,
        params: string[]
    };
    pagination?: {
        enabled: boolean,
        pageSize: number,
    };
    iframeMode?: IFrameMode;
}

export class ListingView implements ListViewer {
    title = this.metadata.label;
    breadcrumbs = [];
    component = ListingComponent;
    search = {
        enabled: this.viewSettings.search_settings.enabled,
        view: new FormView(this.metadata),
        search_key: this.viewSettings.search_settings.search_key,
        mode: this.viewSettings.search_settings.mode,
        creationView: this.viewSettings?.search_settings?.creationView
    };
    external_link = {
        ...this.viewSettings.external_link
    };
    dialog_mode = this.viewSettings.isDialog;
    dialog_settings = this.viewSettings.dialog_settings;
    pagination = this.viewSettings.pagination ? { ...this.viewSettings.pagination } : {
        enabled: false,
        pageSize: 0
    };
    defaults = {};
    iframeMode = this.viewSettings.iframeMode;
    constructor(
        public metadata: Metadata,
        public viewSettings: ViewSettingsObj) {
    }
    setDefaults(values) {
        this.metadata.default_filters = [];
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


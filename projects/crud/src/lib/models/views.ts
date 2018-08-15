import { Type, Component, ComponentRef } from '@angular/core';
import { ListingComponent } from '../components/listing/listing.component';
import { ModelFormComponent } from '../components/model-form/model-form.component';
import { Metadata, FieldConfig, FormsetConfig } from './metadata';

export interface ViewConfig {
    title: string;
    breadcrumbs: any[];
    metadata: Metadata;
    component: Type<any>;
}

export interface ListViewer extends ViewConfig {
    search?: {
        enabled: boolean,
        view: FormViewer
    };
    pagination: {
        enabled: boolean,
        pageSize?: number,
    };
}

export interface FormViewer extends ViewConfig {
    layout: string; // horizontal or vertical
    controls: FieldConfig[];
    actions: {[key: string]: any};
    formsets: FormsetConfig[];
}

export class ListingView implements ListViewer {

    title = this.metadata.label;
    breadcrumbs = [];
    component = ListingComponent;
    search = {
        enabled: true,
        view: new FormView(this.metadata),
    };
    pagination = {
        enabled: true,
        pageSize: 20,
    };

    constructor(public metadata: Metadata) { }
}

export class FormView implements FormViewer {
    title = this.metadata.label;
    breadcrumbs = [];
    component = ModelFormComponent;
    layout = 'vertical';
    controls = this.metadata.fields.filter(c => c.isEditable === true);
    actions = this.metadata.formActions;
    formsets = this.metadata.formsets;

    constructor(public metadata: Metadata) {}
}

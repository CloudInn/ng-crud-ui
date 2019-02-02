import { ViewConfig } from './views';

export interface ControlConfig {
    type?: string;
    metadata?: any;
    multiple?: boolean;
    autocomplete?: {
        api?: string;
        valueField: string,
        labelFields: string[],
    };
    rowSpan?: Number;
    choices?: {[key: string]: any}[]; // for select controls
    viewConfig?: ViewConfig;
    fields?: FieldConfig[];
}

export class FieldConfig {
    name: string;
    label: string;
    type?: 'text' | 'number' | 'boolean' | 'select' | 'date' | 'datetime' | 'foreignKey' | 'formset' | 'fieldset' = 'text';
    isEditable?: boolean = true;
    isSearchable?: boolean = true;
    isHidden? = false;
    control?: ControlConfig;
    validators?: any[];
    foreignModelPath?: string;
    valueType?: string;
    choices?: any[];
    // if fieldset
    fields?: FieldConfig[];
    // if foreignKey
    resolveValueFrom?: string;
}

export interface Fieldset extends FieldConfig {
    fields: FieldConfig[];
}

export interface FormsetConfig extends FieldConfig {
    fields: FieldConfig[];
}

export interface Metadata {
    name: string;
    label: string;
    api: string;
    model: any;
    fields: FieldConfig[];
    listingFields: string[];
    externalNameField: string;
    externalValueField: string;
    formActions: {[key: string]: any};
    formsets: FormsetConfig[];
}

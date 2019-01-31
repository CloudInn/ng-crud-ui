import { ViewConfig } from './views';

export interface ControlConfig {
    type: string;
    // type: 'input' | 'number' | 'select' | 'date' | 'datetime' | 'foreignKey';
    metadata?: any;
    multiple?: boolean;
    autocomplete?: {
        enabled: boolean,
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
    type?: string;
    isEditable?: boolean = true;
    isSearchable?: boolean = true;
    control?: ControlConfig;
    validators?: any[];
    foreignModelPath?: string;
    valueType?: string;
    choices?: any[];
    // if fieldset
    fields?: FieldConfig[];
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

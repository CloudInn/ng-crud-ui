import { ViewConfig } from './views';

export interface ControlConfig {
    type?: string;
}

export interface FieldSetControlConfig extends ControlConfig {
    fields: FieldConfig[];
}

export interface FormSetControlConfig extends ControlConfig {
    fields: FieldConfig[];
}

export interface ForeignKeyControlConfig extends ControlConfig {
    metadata: Metadata;
    viewConfig?: ViewConfig;
}

export interface SelectControlConfig extends ControlConfig {
    multiple?: boolean;
    choices: {
        [key: string]: any
    }[];
}

export interface AutoCompleteControlConfig extends SelectControlConfig {
    autocomplete: {
        api?: string;
        valueField: string,
        labelFields: string[],
    };
}

export interface TextAreaControlConfig extends ControlConfig {
    rowSpan?: Number;
}

export class FieldConfig {
    name: string;
    label: string;
    type?: 'text' | 'number' | 'boolean' | 'textArea' | 'select' |
    'date' | 'datetime' | 'foreignKey' | 'formset' | 'fieldset' = 'text';
    isEditable ? = true;
    isSearchable ? = true;
    isHidden ? = false;
    control?: ControlConfig | ForeignKeyControlConfig | TextAreaControlConfig |
    SelectControlConfig | AutoCompleteControlConfig | FormSetControlConfig | FieldSetControlConfig;
    validators?: any[];
    foreignModelPath?: string;
    valueType?: string;
    choices?: any[];
    // if foreignKey
    resolveValueFrom?: string;
}

export interface Metadata {
    name: string;
    optionName?:string;
    label: string;
    optionName?: string;
    api: string;
    model: any;
    fields: FieldConfig[];
    listingFields: string[];
    externalNameField: string;
    externalValueField: string;
    formActions: {[key: string]: any};
}

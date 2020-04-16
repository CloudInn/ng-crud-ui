import { ViewConfig } from './views';
import { Subject } from 'rxjs';

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


export interface TouchingFields {
    field: string;
    change_value: any;
    field_value: any;
}

export class FieldConfig {
    name: string;
    label: string;
    type?: 'text' | 'number' | 'boolean' | 'textArea' | 'select' |
        'date' | 'datetime' | 'foreignKey' | 'formset' | 'fieldset' | 'foreignKey_multiple' = 'text';
    isEditable?: boolean = true;
    isSearchable?: boolean = true;
    isHidden?: boolean = false;
    control?: ControlConfig | ForeignKeyControlConfig | TextAreaControlConfig |
        SelectControlConfig | AutoCompleteControlConfig | FormSetControlConfig | FieldSetControlConfig;
    validators?: any[];
    foreignModelPath?: string;
    valueType?: string;
    choices?: any[];
    defaultValue?: any = '';
    iContains?: boolean;
    isClickable?:boolean;
    // if foreignKey
    resolveValueFrom?: string;
    displayFrom?: string[]; // value displayed if field value is an object
    listFrom?: string; // if filed is an array of objects
    touching?: TouchingFields;
}

export interface Metadata {
    name: string;
    optionName?: string;
    queryParams?: string[];
    filter?: boolean;
    includeParams?: boolean;
    applyFunctions?: boolean;
    rows?: Subject<any>;
    label: string;
    api: string;
    model: any;
    fields: FieldConfig[];
    listingFields: string[];
    externalNameField: string;
    externalValueField: string;
    filter_key?: string[];
    default_filters?: any[];
    formActions: { [key: string]: any };
    bulkActions?: any[];
}

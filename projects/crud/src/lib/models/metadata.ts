import { ViewConfig, FormActions } from './views';
import { Subject } from 'rxjs';

export interface ControlConfig {
    type?: string;
    subFields?: FieldConfig[];
}

export interface FieldSetControlConfig extends ControlConfig {
    fields: FieldConfig[];
    collapsibleFields?: FieldConfig[];
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
    expanded?: boolean;
    disabled?: boolean;
    type?: 'text' | 'number' | 'boolean' | 'textArea' | 'select' | 'file' |
        'date' | 'datetime' | 'foreignKey' | 'formset' | 'datetime' | 'time' |
        'fieldset' | 'custom_element' | 'foreignKey_multiple' = 'text';
    isEditable?: boolean = true;
    customElement?: CustomElementConfig;
    isSearchable?: boolean = true;
    isHidden?: boolean = false;
    control?: ControlConfig | ForeignKeyControlConfig | TextAreaControlConfig |
        SelectControlConfig | AutoCompleteControlConfig | FormSetControlConfig | FieldSetControlConfig;
    validators?: any[];
    hasErrorWhen?: { field_name: string, error: string }[];
    choices?: any[];
    defaultValue?: any = '';
    iContains?: boolean;
    isClickable?: boolean;
    resolveValueFrom?: string;
    keyOnSearch?: string;
    displayFrom?: string[]; // value displayed if field value is an object
    listFrom?: string; // if filed is an array of objects
    touching?: TouchingFields;
    cssWidth?: string;
    maxlength?: string;
    equalsTo?: string;
    postSubmitHookActions?: PostSubmitAction[];
    translate?: boolean;
    errorMessages?: ErrorMessage[];
    cellStyle?: {};
    dropDownDisplay?: string;
    DatePickerStartAt?: any;
}

export interface CustomElementConfig {
    component: any;
    inputs?:
    {
        key: string;
        value?: any;
        readValueFrom?: string;
    }[];
    outputs?:
    {
        name: string;
        functionToExcute: Function;
    }[];
}

export interface ErrorMessage {
    type: string;
    message: string;
}

export interface PostSubmitAction {
    apiUrl: string;
    type: string;
}
export interface Metadata {
    name: string;
    optionName?: string;
    queryParams?: string[];
    filter?: boolean;
    includeParams?: boolean;
    search_key?: string;
    applyFunctions?: boolean;
    rows?: Subject<any>;
    label: string;
    api: string;
    model: any;
    fields: FieldConfig[];
    collapsibleFields?: FieldConfig[];
    subFields?: FieldConfig[];
    listingFields: string[];
    searchParam?: string;
    filter_key?: string[];
    default_filters?: any[];
    formActions: FormActions[];
    bulkActions?: any[];
    externalViews?: any[];
    isDialog?: boolean;
    sortBy?: string;
    returnRecordsIDS?: boolean;
    onDestroyFunction?: Function;
}

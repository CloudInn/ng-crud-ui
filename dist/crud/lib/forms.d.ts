import { FormControl } from '@angular/forms';
export interface BaseField {
    label: string;
}
export interface CrudField {
    name: string;
    label: string;
    validators?: any[];
}
export interface CrudForm {
    name: string;
    controls: CrudField[];
}
export declare enum FieldType {
    Text = 0,
    Number = 1,
    Date = 2,
    DateTime = 3,
    Time = 4,
    Boolean = 5,
    ForeignKey = 6,
    ManyToMany = 7,
    File = 8,
}
export declare class Field implements BaseField {
    key: string;
    label: string;
    value_type: string;
    control_type: string;
    is_editable: boolean;
    is_searchable: boolean;
    is_hidden: boolean;
    foreign_model_path?: string;
    fields: Field[];
    choices: any;
    colspan: number;
    rowspan: number;
    _value: any;
    constructor(label: string, key: string, type: string, is_editable?: boolean, is_searchable?: boolean, foreign_model?: any, colors?: any);
}
export declare class Fieldset implements BaseField {
    label: string;
    is_fieldset: boolean;
    fields: Field[];
}
export declare class Formset implements BaseField {
    label: string;
    model: any;
}
export declare class AutoCompleteField<T> extends FormControl {
    value: T;
    label: string;
}
export declare class DefaultCrudForm implements CrudForm {
    model: any;
    name: string;
    controls: any[];
    constructor(model: any);
}

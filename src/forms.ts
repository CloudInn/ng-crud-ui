export interface BaseField {
  label: string;
  key: string;
  type: FieldType;
}

export enum FieldType {
  Text,
  Number,
  Date,
  DateTime,
  Time,
  Boolean,
  ForeignKey,
  ManyToMany,
  Formset,
  Fieldset,
  File,
  Hidden,
}

export class Field implements BaseField {
  key: string;
  label: string;
  type: FieldType;
  is_editable: boolean = true;
  is_searchable: boolean = false;
  foreign_model: string = null;

  constructor(
    label: string,
    key: string,
    type: FieldType,
    is_editable?: boolean,
    is_searchable?: boolean,
    foreign_model?: any,
    colors?: any
  ) {
    this.key = key;
    this.label = label;
    this.type = type;
    this.is_editable = is_editable;
    this.is_searchable = is_searchable;
    this.foreign_model = foreign_model;
  }

}

export class Fieldset implements BaseField {
  label: string;
  key: string;
  type: FieldType.Fieldset;
  is_fieldset = true;
  fields: Field[];
}

export class Formset implements BaseField {
  label: string;
  key: string;
  model: any;
  type: FieldType.Formset;

  constructor(label: string, key: string, model: any) {

  }
}
export enum FieldType {
  Text,
  Number,
  ForeignKey,
  Date,
  DateTime,
  Time,
  Boolean,
}

export class InputBase {}

export class Field extends InputBase {
  key: string
  label: string
  type: FieldType
  is_editable: boolean = true
  is_searchable: boolean = false
  foreign_model_name: string = null

  constructor(
    label: string,
    key: string,
    type: FieldType,
    is_editable?: boolean,
    is_searchable?: boolean,
    foregin_model_name?: string,
    colors?: any
  ) {
    super();
    this.key = key
    this.label = label
    this.type = type
    this.is_editable = is_editable
    this.is_searchable = is_searchable
    this.foreign_model_name = foregin_model_name
  }

}

export class Fieldset extends InputBase {
  is_fieldset = true
  fields: Field[]
}

export class BaseModel {
  api: string
  fields: InputBase[]
  displayField: string
  valueField: string

  getModel(): any {
    let obj = {};
    for(let f of this.fields) {
      obj[f['key']] = null;
    }
    return obj;
  }
}
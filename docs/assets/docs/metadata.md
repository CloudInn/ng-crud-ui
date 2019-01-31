# Building MetaData

MetaData is the core and the heart of Ng Crud UI, you start by defining your MetaData
that would be used later on to build your forms and your views.

In order to write a metadata class we should take a look on the default class supplied by the library,
we are going to build one that implements it.

```typescript
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
```

The following example shows an example of building a metadata class for Terminal model,
don't worry if you don't everything there, we will break them down one by one.

```typescript
import { Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Metadata } from "crud";
import { Terminal } from "../models/terminal.model";

export class TerminalMetadata implements Metadata {
  name = "terminal";
  label = "Terminal";
  api = "/api/terminals";
  model = Terminal;
  listingFields = [
    "id",
    "number",
    "description",
    "rcrs_number",
    "last_invoice_id",
    "is_locked"
  ];
  externalNameField = "description";
  externalValueField = "id";
  formsets = [];
  fields = [
    {
      name: "id",
      label: "ID",
      type: "number",
      isSearchable: true
    },
    {
      name: "number",
      label: "Number",
      type: "number",
      isEditable: true,
      isSearchable: true
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      isEditable: true,
      isSearchable: true
    },
    {
      name: "rcrs_number",
      label: "RCRS",
      type: "string",
      validators: [
        Validators.required,
        Validators.maxLength(11),
        Validators.minLength(11)
      ],
      isEditable: true,
      isSearchable: true
    },
    {
      name: "last_invoice_id",
      label: "Last Invoice",
      type: "text",
      isEditable: false
    },
    {
      name: "is_locked",
      label: "Locked",
      type: "boolean",
      isEditable: false
    }
  ];
  formActions = {
    unlock: (http: HttpClient, id: number) => {
      return http.get(`/api/pos/terminal/${id}/unlock/`).subscribe(res => {
        return res;
      });
    }
  };
}
```

## MetaData Attributes

| #   | Attribute          | Type               |          | Description                                                                    |
| --- | ------------------ | ------------------ | -------- | ------------------------------------------------------------------------------ |
|     | name               | string             | required | Unique key for this metadata                                                   |
|     | label              | string             | required | Human readable Label                                                           |
|     | api                | string             | required | URL for CRUD API to consume                                                    |
|     | model              | object             | optional | Model                                                                          |
|     | listingFields      | string[]           | required | List of field keys that would be displayed in listing table                    |
|     | externalNameField  | string             | optional | Key of the field that should be used to display Label if used as a ForeignKey  |
|     | externalValueField | string             | optional | Key of the field that should be used to get value from if used as a ForeignKey |
|     | fields             | FieldConfig[]      | required | List of field definitions                                                      |
|     | formsets           | FieldConfig[]      | optional | List of formsets to be attached to MetaData form                               |
|     | formActions        | {string: function} | optional | map of functions that could be applied of group of records from this metadata  |

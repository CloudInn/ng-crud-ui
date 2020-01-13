# NgCrudUi (Under Heavy Development)

NgCrudUI is a library for Angular focused on building re-usable forms, formsets and views based on metadata definitions

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version >= 7.0.0.

The projects is splitted in two proejcts, one for the demo/examples project and one for the library itself,
the library itself is under projects/crud. You have to build the library first then run the development server
to check the demo app. using `
` to build the library. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
to publish your package to npm. change version of your package in package.json file in projects/crud , run ng build crud , cd dist/crud then run npm publish.

## Documentation

Check the docs at: [https://cloudinn.github.io/ng-crud-ui](https://cloudinn.github.io/ng-crud-ui)

## Development

1. Build `crud` project in watch mode: `ng build crud --watch`, any change made to `crud` will be reloaded automatically

2. run the json mock server to serve data to the example app, cd to `json-mock` directory and then `npm start`

3. Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Documentation

- [Installation](./projects/docs/src/assets/docs/installation.md)
- [Configuraation](./projects/docs/src/assets/docs/configuraation.md)
- [Building Metadata](./projects/docs/src/assets/docs/metadata.md)
- [Metadata Field Definitions](./projects/docs/src/assets/docs/fields.md)
- [Rendering Forms](./projects/docs/src/assets/docs/forms.md)
- [Foreign Keys](./projects/docs/src/assets/docs/foreignKeys.md)
- [Constructing Views](./projects/docs/src/assets/docs/views.md)
- [Reusable Components](./projects/docs/src/assets/docs/components.md)

### Model's Registry

example of metadata definition for `store` model:

```typescript
import { Validators } from "@angular/forms";
import { Metadata } from "crud";
import { Store } from "../models/store.model";
import { FieldConfig } from "crud/lib/models/metadata";

export class StoreMetadata implements Metadata {
  name = "store";
  label = "Store";
  api = "/api/stores";
  model = Store;
  listingFields = ["id", "code", "description"];
  externalNameField = "description";
  externalValueField = "id";
  formsets = [];
  fields: FieldConfig[] = [
    {
      name: "id",
      label: "ID",
      type: "number",
      isEditable: false
    },
    {
      name: "code",
      label: "Code",
      type: "number",
      isEditable: true
    },
    {
      name: "description",
      label: "Description",
      type: "text"
    },
    {
      name: "show_paymaster",
      label: "Show Paymaster",
      type: "boolean",
      control: {
        type: "switch"
      }
    }
  ];
  formActions = {};
}
```

### Reactive Model Form

Making use of the power of Angular's reactive forms, now forms are handled in the components logic
instead of the templates.

| #   | Field                           | Status |
| --- | ------------------------------- | ------ |
|     | ID Field                        |        |
|     | String Field                    |        |
|     | Date Field                      |        |
|     | DateTime Field                  |        |
|     | Switch Field                    |        |
|     | Select Field (single, multiple) |        |
|     | AutoComplete Field              |        |
|     | ForeignKey Field                |        |

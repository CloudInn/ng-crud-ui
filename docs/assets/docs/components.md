# Components

NgCrudUi provides some components that are used internally
and could be used as desired.

These components are configurable usually using configurations that implements
the `ViewConfig` interface.


FormField Component
--------

FormField is the smallest unit in our component set,
it is used to render different types of fields, it is used
within NgCrudUi to render fields within forms.

This component requires configuration that implements the `FieldConfig` interface, which is:

```typescript
export class FieldConfig {
    name: string;
    label: string;
    type?: string;
    isEditable?: boolean = true;
    isSearchable?: boolean = true;
    control?: ControlConfig;
    validators?: any[];
    foreignModelPath?: string;
    rowSpan?: Number;
    valueType?: string;
    choices?: any[];
    // if fieldset
    fields?: FieldConfig[];
}
```

You can get more info about each attribute from [The Fields Documentation](/fields).

To use the component in your templates:

```html
<ngcrudui-form-field [formGroup]="formGroup"
 [config]="fieldConfig"  />
```

<b>Inputs</b>

- formGroup: the `FormGroup` object from Angular forms

- config: Configuration that implements `FieldConfig` interface

- forcedSearchParams(optional): an object that enforces certain search params that the user can't change, used only in case of the field is a `ForeignKeyField`.

- choices: A List of options to be passed to dropdown menu,
if the field is a `SelectField`



Listing Component
--------

Listing component generates a table of records
for the given metadata based on view configuration
that implements `ListViewer` interface.

```typescript
export interface ViewConfig {
    title: string;
    breadcrumbs: any[];
    metadata: Metadata;
    component: Type<any>;
}

export interface ListViewer extends ViewConfig {
    search?: {
        enabled: boolean,
        view: FormViewer
        creationView?: FormView;
    };
    pagination: {
        enabled: boolean,
        pageSize?: number,
    };
    dialog_settings?: {
        add_new_btn?: boolean;
    };
}
```

These configuration could be exetnded for re-usability, it depends on your case, for example you can replace the search component used above the listing, or you can replace the listing component, or both.

here is an example from within NgCrudUi:

```typescript
export class ListingView implements ListViewer {

    title = this.metadata.label;
    breadcrumbs = [];
    component = ListingComponent;
    search = {
        enabled: true,
        view: new FormView(this.metadata),
        creationView: new FormView(this.metadata);
    };
    pagination = {
        enabled: true,
        pageSize: 20,
    };
    dialog_settings: {
        add_new_btn: true;
    };
    constructor(public metadata: Metadata) { }
}
```

Finally, to use the listing component in your templates

```html
<ngcrudui-listing [viewConfig]="listViewConfig"
 mode="normal"  />
```

<b>Inputs</b>

- viewConfig: the view configuration that implements `ListViewer` interface

- mode: a string that could be 'normal', or 'pick'

the pick mode is used within NgCrudUi for ForeignKey popup dialogs.

- forcedSearchParams(optional): an object that enforces certain search params that the user can't change, it would be used with pick mode for example.

<b>Outputs</b>

- picked: an EventEmitter that returns the id of the picked record from the listing

<b>to open the creation form in a dialog, in case of listing component is opened in a dialog</b>
all we need to do is : 
-  add the key `add_new_btn` with true value
```
   dialog_settings: {
        add_new_btn?: true;
    };
```
-    while registering the screen, just add the key `creationView` and pass to it the formView you'd like for it to be rendered
```
        creationView: new FormView(this.metadata);
```

ModelForm Component
--------

This component generates a form inside of it 
base on the configuration passed to it.

The configuration should implement the `FormViewer` interface.

```typescript
export interface ViewConfig {
    title: string;
    breadcrumbs: any[];
    metadata: Metadata;
    component: Type<any>;
}

export interface FormViewer extends ViewConfig {
    layout: string; // horizontal or vertical
    controls: FieldConfig[];
    actions: {[key: string]: any};
    formsets: FormsetConfig[];
}
```

These configuration could be extended to provide
values for re-usability, here is an example from inside
NgCrudUi:

```typescript
export class FormView implements FormViewer {
    title = this.metadata.label;
    breadcrumbs = [];
    component = ModelFormComponent;
    layout = 'vertical';
    controls: FieldConfig[] = [];
    actions = this.metadata.formActions;
    formsets = this.metadata.formsets;

    constructor(public metadata: Metadata) {
        metadata.fields.filter(f => f.isEditable !== false).forEach(field => {
            this.controls.push(field as FieldConfig);
        });
    }
}
````

Finally, to use the ModelFormComponent in your template:

```html
<ngcrudui-model-form [viewConfig]="formViewConfig" mode="search" />
```

<b>Attributes</b>

- viewConfig: the view configuration that implements `FormViewer` interface

- mode: a string that could be 'search', 'create', or 'edit'

- id: required in case of create or edit modes, in case 
of create mode it should be 'new', otherwise it should me integer, so that the data would be fetched from api for the corresponded record

# Field Definitions

There is different types of fields:

- String Field
- Int Field
- TextArea Field
- Select Field
- Date Field
- ForeignKey Field

When you are defining your metadata you need to define
fields, the config should extend the `FieldConfig`
class.

```typescript
export class FieldConfig {
    name: string;
    label: string;
    type?: string;
    isEditable?: boolean = true;
    isSearchable?: boolean = true;
    control?: ControlConfig;
    validators?: any[];
    rowSpan?: Number;
    valueType?: string;
    // if fieldset
    fields?: FieldConfig[];
}
```

## Required Attributes

As we see, `name` and `label` attributes are required,
the others are optional and vary from field type to
another.


## name Attribute

`name` should be a unique key, the same key as the key
in the API data coming from the metadata.

## type Attribute

For the `type` field, if not set, it will fall automatically to normal HTML `<input />` tag.

Available types:

- boolean (could be displayed as Switch control)
- textarea
- select
- date
- foreignKey
- default (default HTML input tag)

## isEditable attribute

`isEditable` deterimens if the field should appear in create/edit forms. true by default.

## isSearchable Attribute

`isSearchable` deterimens if the field should appear in search forms. true by default.

## validators attribute

`validators` accepts a list of validators from the Angular Forms module.


## rowSpan Attribute

`rowSpan` controls how many rows should be in the TextArea Field.


## valueType Attribute

`valueType` controls the type of the value that should be populated and stored (for example to be sent to the API endpoint).


## control Attribute

`control` is used to change/control the Control type or how its displayed, as an HTML tag for example, for example used to set choices for `Select`

```typescript
control: {
    type: 'select',
    choies: [
        {label: 'Debit', value: 'debit'},
        {label: 'Credit', value: 'credit'},
    ]
}
```

or for boolean values to display it as a switch

```typescript
{
    name: 'show_paymaster',
    label: 'Show Paymaster',
    type: 'boolean',
    control: {
        type: 'switch'
    }
}
```

or to configure foreign keys:

```typescript
{
    name: 'store',
    label: 'Outlet',
    type: 'foreignKey',
    control: {
        metadata: new StoreMetadata(),
        viewConfig: new StoreListView(),
    },
    isEditable: true,
    isSearchable: true,
}

```
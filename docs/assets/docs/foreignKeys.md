# Foreign Keys

You can use the ForeginKeyField component to create a field that automatically knows 
how to pull information of the given metadata of the foreign key.

You can use it inside your templates like this:

```html
<ngcrudui-foreign-key [formGroup]="formGroup" [config]="fieldConfig" ></ngcrudui-foreign-key>
```

There are more configuration that you can pass to it,
let's talk more about that:

The configuration should implement the `FieldConfig` interface with the `control` field to implement the 
`ForeignKeyControlConfig` interface:

```typescript
export interface ForeignKeyControlConfig extends ControlConfig {
    metadata: Metadata;
    viewConfig?: ViewConfig;
}
```

so let's take alook on an example for defining a ForeignKey Field:

```typescript
{
    name: 'store',
    label: 'Outlet',
    type: 'foreignKey',
    resolveValueFrom: 'store_id',
    control: {
        metadata: new StoreMetadata(),
        viewConfig: new (),
    }
}
```

As you cane see there is a `resolveValueFrom` that would tell NgCrudUi to get/set the value to another field -if you need to, and in the case there has to be a definition for another field, the `store_id` field, but we don't want it to be displayed in the forms, so we can set `isHidden` to true, here is the full example:

```typescript
{
    name: 'store_id',
    label: 'Outlet ID',
    type: 'number',
    isHidden: true,
},
{
    name: 'store',
    label: 'Outlet',
    type: 'foreignKey',
    resolveValueFrom: 'store_id',
    control: {
        metadata: new StoreMetadata(),
        viewConfig: new StoreListView(),
    },
    isEditable: true,
    isSearchable: true,
}
```
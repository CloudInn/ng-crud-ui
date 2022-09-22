# Custom Elements

You can use the customElement Field type if you have an already made angular custom element and you want to display it in the listing table.

All you need to do is add some configuration and pass to the metadata in order to display it,
like the following:

```typescript
{
        name: 'alerts',
        label: '',
        type: 'custom_element',
        customElement: {
            component: AlertsComponent,
            inputs: [
                {
                    key: 'reservationType',
                    value: AlertsModels.groupReservation
                },
                {
                    key: 'reservationID',
                    readValueFrom: 'id'
                },
            ],
            outputs: [
                {
                    name: 'updateCount',
                    functionToExcute: this.updateCount.bind(this)
                }
            ]
        },
        isEditable: false,
    },
```

the config `customElement` is what we care about most in this field's type, let's take a closer look on its config and what it represents


```typescript
customElement: {
    component: AlertsComponent,
    inputs: [
        {
            key: 'reservationType',
            value: AlertsModels.groupReservation
        },
        {
            key: 'reservationID',
            readValueFrom: 'id'
        },
    ],
    outputs: [
        {
            name: 'updateCount',
            functionToExcute: this.updateCount.bind(this)
        }
    ]
},
```
- `component` : takes the Component to be rendered in the table
- `inputs` : (Optional) An array of angular `@input()` to be added to the component when rendering it:
  - `key`: input name
  - `value`: input's value
  - `readValueFrom`: we use this in case we want to read the input's value from a key from the data displayed in the listing screen ie: record ID
    **note** : `value` takes presedence over `readValueFrom`, so if you set both value and readValueFrom, then the input would apply the `value` not the `readValueFrom`.
- `outputs` : (optional) An array of angular event Emitters `@output()` that can be subscribed to, and would be added to the rendered component
  - `name`: the name of the output variable in the component
  - `functionToExcute` : (function) the function to be excuted once this output is triggered.
# Angular Crud UI

ng-crud-ui is an angular module that provides you with common components and forms to help you rapidly implement editing and search forms based on models definitions and CRUD operations for REST apis.

## Installation

```bash
npm install --save @cloudinn/ng-crud-ui
```

## How NgCrudUi Works

- NgCrudUi has a registery service that registers modules > apps > models.
It means each module can have one or more apps, and each app can have one or more models.

- Making use of the registery service, NgCrudU compnents can understand models and retreive
models' information from that registery.

- Through importing `NgCrudUiModule` into your app, all the services and components will be
available to you to use.


## Importing the module

In your module, import the module

```typescript
import { NgCrudUiModule } from '@cloudinn/ng-crud-ui';
```

Then inside your module defenition

```typescript
{
	imports: [
		...
		NgCrudUiModule,
		...
	]
}
```


## Creating Models

First step is to start creating and registering your models,
For your models you need ti implement interface `BaseModelInterface`.

example:
```typescript
import { BaseModelInterface } from '@cloudinn/ng-crud-ui';
import { Store } from '../inventory';

export class Terminal implements BaseModelInterface {

  api = '/api/pos/terminal/';
  verbose_name = 'Terminal';
  fields = [
    new Field('ID', 'id', FieldType.Number, false, true),
    new Field('Number', 'number', FieldType.Text, true, true),
    new Field('Description', 'description', FieldType.Text, true, true),
    new Field('Store', 'store_id', FieldType.ForeignKey, true, true, new Store()),
  ];

  listing_fields = [
    'id', 'number', 'description', 'store'
  ];

  actions = [];

  bulk_actions = [];

  list_actions = [
    {title: 'Unlock', action: 'unlock'}
  ];

  unlock(id) {

  }

}
```

## Registering Models

In your `app.component.ts` import the register service, register a new module, register a new app
to that module, then register your model.

```typescript
import { Registery } from '@cloudinn/ng-crud-ui';
// import your models
import { Terminal, Store } from './models';
...

	constructor(private reg: Registery) {}


	ngOnInit() {
		// register module
		this.reg.registerModule('Inventory', 'inventory');

		// register app
		this.reg.registerApp('inventory', 'POS', 'pos', 'room_service');

		// register model
		this.registerModel('pos', 'terminal', new Terminal());
		this.registerModel('pos', 'store', new Store());
	}
```

## Field Types

 - Text
 - Number
 - Date
 - DateTime
 - Time
 - Boolean
 - ForeignKey
 - ManyToMany
 - Formset
 - Fieldset
 - File
 - Hidden

## Components 

 - ModelFormScreen
 - ModelForm
 - Listing
 - Formset

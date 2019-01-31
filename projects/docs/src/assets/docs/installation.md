# Installation

using the command line

```bash
npm install --save @cloudinn/ng-crud-ui
```


Import the CrudModule in your app.module.ts

```typescript
import { CrudModule } from '@cloudinn/ng-crud-ui';
```

Then add the module to list of imports inside the module definition

```typescript
@NgModule({
  declarations: [
      ...
  ],
  imports: [
    CrudModule,
  ],
  providers: [
      ...
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
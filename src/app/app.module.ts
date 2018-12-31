import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Route } from '@angular/router';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { SchemaService } from './schema.service';

import { CrudModule } from 'projects/crud/src/lib/crud.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';

export function setupSchemaFactory(http: HttpClient, schemaService: SchemaService): () => Promise<any> {
  return () => schemaService.load().toPromise();
}

const routes: Route[] = [
  {path: '', component: HomeComponent},
  // {path: ':module/:app/:model_name', component: ScreenWrapperComponent},
  // {path: ':module/:app', component: AppScreenComponent, children: [
  //   {path: ':model_name/new', component: ModelFormScreenComponent},
  //   {path: ':model_name/:id', component: ModelFormScreenComponent},
  //   {path: ':model_name', component: ListingScreenComponent},
  // ]}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CrudModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: setupSchemaFactory,
      deps: [HttpClient, SchemaService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

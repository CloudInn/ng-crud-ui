import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Route } from '@angular/router';
import { NgModule } from '@angular/core';

import { CrudModule } from 'crud';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';

const routes: Route[] = [
  {path: '', component: HomeComponent},
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
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

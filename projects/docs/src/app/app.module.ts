import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Route } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatToolbarModule } from '@angular/material/toolbar';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MdViewerComponent } from './md-viewer/md-viewer.component';


const routes: Route[] = [
  {path: '', component: HomeComponent},
  {path: ':filename', component: MdViewerComponent},
];

@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        MdViewerComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        CommonModule,
        NoopAnimationsModule,
        RouterModule.forRoot(routes, {}),
        MarkdownModule.forRoot({ loader: HttpClientModule }),
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatTableModule,
        MatButtonModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }

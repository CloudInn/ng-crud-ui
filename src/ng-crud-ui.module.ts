import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import 'rxjs/add/operator/map';

import {
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatTableModule,
  MatCardModule,
  MatPaginatorModule,
  MatButtonModule,
  MatMenuModule,
  MatProgressBarModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatGridListModule,
  MatSnackBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatTabsModule,
  MatExpansionModule,
  MatAutocompleteModule,
} from '@angular/material';

import { ApiService, Registry, FormService, Navigator } from './services';
import {
  AutoCompleteFieldComponent,
  ListingComponent,
  ModelFormComponent,
  ModelFormScreenComponent,
  FormFieldComponent,
  FormsetComponent,
} from './components';

import {
  AppSettingsContainer,
  ListingContainer,
} from './containers';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MomentModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatTabsModule,
    MatExpansionModule,
    MatAutocompleteModule,
    RouterModule,
  ],
  declarations: [
    FormFieldComponent,
    AutoCompleteFieldComponent,
    ListingComponent,
    ModelFormComponent,
    AppSettingsContainer,
    ListingContainer,
    ModelFormScreenComponent,
    FormsetComponent,
  ],
  providers: [
    ApiService,
    Registry,
    FormService,
    Navigator,
  ],
  exports: [
    HttpClientModule,
    AutoCompleteFieldComponent,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatExpansionModule,
    FormFieldComponent,
    ListingComponent,
    ModelFormComponent,
    AppSettingsContainer,
    ListingContainer,
    ModelFormScreenComponent,
    FormsetComponent,
  ]
})
export class NgCrudUiModule { }

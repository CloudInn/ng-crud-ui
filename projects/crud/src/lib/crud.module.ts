import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';

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
  MatDialogModule,
  MatChipsModule,
} from '@angular/material';


import { ListingComponent } from './components/listing/listing.component';
import { ModelFormComponent } from './components/model-form/model-form.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { FormsetComponent } from './components/formset/formset.component';
import { AutoCompleteFieldComponent } from './components/auto-complete-field/auto-complete-field.component';
import { ForeignKeyFieldComponent } from './components/foreign-key-field/foreign-key-field.component';
import { TextAreaFieldComponent } from './components/text-area-field/text-area-field.component';
import { SelectFieldComponent } from './components/select-field/select-field.component';

import { ScreenWrapperComponent } from './containers/screen-wrapper/screen-wrapper.component';
import { ListingDialogComponent } from './containers/listing-dialog/listing-dialog.component';
import { CookieInterceptor } from './cookie.interceptor';
import { CookieModule } from 'ngx-cookie';
import { ForeignKeyFiledMultipleComponent } from './components/foreign-key-filed-multiple/foreign-key-filed-multiple.component';
import { ErrorHandlingComponent } from './components/error-handling/error-handling.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MomentModule,
    RouterModule,
    CookieModule.forChild(),
    MatToolbarModule,
    MatSidenavModule,
    MatChipsModule,
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
    MatDialogModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTabsModule,
    MatExpansionModule,
    MatAutocompleteModule,
  ],
  declarations: [
    FormFieldComponent,
    AutoCompleteFieldComponent,
    ListingComponent,
    ModelFormComponent,
    ScreenWrapperComponent,
    FormsetComponent,
    ForeignKeyFieldComponent,
    ListingDialogComponent,
    TextAreaFieldComponent,
    SelectFieldComponent,
    ForeignKeyFiledMultipleComponent,
    ErrorHandlingComponent,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: CookieInterceptor, multi: true},
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
    ScreenWrapperComponent,
    FormsetComponent,
    ForeignKeyFieldComponent,
    TextAreaFieldComponent,
    SelectFieldComponent,
  ],
  entryComponents: [
    ListingComponent,
    ModelFormComponent,
    ListingDialogComponent,
    ScreenWrapperComponent,
  ]
})
export class CrudModule { }

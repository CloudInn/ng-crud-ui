import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
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
} from '@angular/material';


import { ListingComponent } from './components/listing/listing.component';
import { ModelFormComponent } from './components/model-form/model-form.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { FormsetComponent } from './components/formset/formset.component';
import { AutoCompleteFieldComponent } from './components/auto-complete-field/auto-complete-field.component';
import { ForeignKeyFieldComponent } from './components/foreign-key-field/foreign-key-field.component';

import { ScreenWrapperComponent } from './containers/screen-wrapper/screen-wrapper.component';
import { ListingDialogComponent } from './containers/listing-dialog/listing-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MomentModule,
    RouterModule,
    //
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
  ],
  providers: [
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
  ],
  entryComponents: [
    ListingComponent,
    ModelFormComponent,
    ListingDialogComponent,
    ScreenWrapperComponent,
  ]
})
export class CrudModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ListingComponent } from './components/listing/listing.component';
import { ModelFormComponent } from './components/model-form/model-form.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { FormsetComponent } from './components/formset/formset.component';
import { ForeignKeyFieldComponent } from './components/foreign-key-field/foreign-key-field.component';
import { TextAreaFieldComponent } from './components/text-area-field/text-area-field.component';
import { SelectFieldComponent } from './components/select-field/select-field.component';

import { ScreenWrapperComponent } from './containers/screen-wrapper/screen-wrapper.component';
import { ListingDialogComponent } from './containers/listing-dialog/listing-dialog.component';
import { CookieInterceptor } from './cookie.interceptor';
import { CookieModule } from 'ngx-cookie';
import { ForeignKeyFiledMultipleComponent } from './components/foreign-key-filed-multiple/foreign-key-filed-multiple.component';
import { ErrorHandlingComponent } from './components/error-handling/error-handling.component';
import { IframeModalComponent } from './components/iframe-modal/iframe-modal.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { DateTimePickerComponent } from './components/date-time-picker/date-time-picker.component';
import { TimePickerComponent } from './components/time-picker/time-picker.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AttachmentsComponent } from './components/attachments/attachments.component';
import { TranslateModule } from '@ngx-translate/core';
import { SearchDialogComponent } from './containers/search-dialog/search-dialog.component';
import { SafePipe } from './components/pipes/safe.pipe';
import { SelectAutocompleteModule } from 'mat-select-autocomplete-angular11';
import { ActionDialogComponent } from './components/action-dialog/action-dialog.component';
import { GetSelectorPipe } from './components/pipes/get-selector.pipe';
import { AmazingTimePickerModule } from '@jonijnm/amazing-time-picker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CustomDateAdapter, MY_FORMATS } from './custom-date-adapter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
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
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatGridListModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatSelectModule,
    MatTabsModule,
    MatExpansionModule,
    AmazingTimePickerModule,
    MatAutocompleteModule,
    SelectAutocompleteModule,
    TranslateModule.forRoot(),
  ],
  declarations: [
    FormFieldComponent,
    ListingComponent,
    ModelFormComponent,
    ScreenWrapperComponent,
    FormsetComponent,
    ForeignKeyFieldComponent,
    FileUploadComponent,
    DateTimePickerComponent,
    ListingDialogComponent,
    TextAreaFieldComponent,
    SelectFieldComponent,
    ForeignKeyFiledMultipleComponent,
    ErrorHandlingComponent,
    IframeModalComponent,
    TimePickerComponent,
    AttachmentsComponent,
    SearchDialogComponent,
    SafePipe,
    ActionDialogComponent,
    GetSelectorPipe,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CookieInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'en_US' },
    {
      provide: MatDialogRef,
      useValue: {}
    },
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
  exports: [
    HttpClientModule,
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
    MatButtonToggleModule,
    MatGridListModule,
    MatSnackBarModule,
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
    FileUploadComponent,
    DateTimePickerComponent,
    TimePickerComponent,
    TextAreaFieldComponent,
    SelectFieldComponent,
    AttachmentsComponent
  ],
  entryComponents: [
    ListingComponent,
    ModelFormComponent,
    ListingDialogComponent,
    ScreenWrapperComponent,
    IframeModalComponent,
    AttachmentsComponent
  ]
})
export class CrudModule { }

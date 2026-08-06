import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { CookieService } from 'ngx-cookie-service';
import { ForeignKeyFiledMultipleComponent } from './components/foreign-key-filed-multiple/foreign-key-filed-multiple.component';
import { ErrorHandlingComponent } from './components/error-handling/error-handling.component';
import { IframeModalComponent } from './components/iframe-modal/iframe-modal.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { DateTimePickerComponent } from './components/date-time-picker/date-time-picker.component';
import { TimePickerComponent } from './components/time-picker/time-picker.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyDialogModule as MatDialogModule, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AttachmentsComponent } from './components/attachments/attachments.component';
import { TranslateModule } from '@ngx-translate/core';
import { SearchDialogComponent } from './containers/search-dialog/search-dialog.component';
import { SafePipe } from './components/pipes/safe.pipe';
import { SelectAutocompleteModule } from '@cloudinn/mat-select-autocomplete';
import { ActionDialogComponent } from './components/action-dialog/action-dialog.component';
import { GetSelectorPipe } from './components/pipes/get-selector.pipe';
import { AmazingTimePickerModule } from '@cloudinn/amazing-time-picker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CustomDateAdapter, MY_FORMATS } from './custom-date-adapter';
import { HistoryComponent } from './components/history/history.component';
import { DateTimeFormatPipe } from './components/pipes/date-time-format.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
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
        HistoryComponent,
        DateTimeFormatPipe
    ],
    providers: [
        CookieService,
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
        AttachmentsComponent,
        HistoryComponent
    ]
})
export class CrudModule { }

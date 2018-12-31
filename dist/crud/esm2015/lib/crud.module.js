/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';
import { MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule, MatTableModule, MatCardModule, MatPaginatorModule, MatButtonModule, MatMenuModule, MatProgressBarModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSlideToggleModule, MatGridListModule, MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatTabsModule, MatExpansionModule, MatAutocompleteModule, } from '@angular/material';
import { ListingComponent } from './components/listing/listing.component';
import { ModelFormComponent } from './components/model-form/model-form.component';
import { ModelFormScreenComponent } from './components/model-form-screen/model-form-screen.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { FormsetComponent } from './components/formset/formset.component';
import { AutoCompleteFieldComponent } from './components/auto-complete-field/auto-complete-field.component';
import { ForeignKeyFieldComponent } from './components/foreign-key-field/foreign-key-field.component';
import { AppScreenComponent } from './containers/app-screen/app-screen.component';
import { ListingScreenComponent } from './containers/listing-screen/listing-screen.component';
import { ListingDialogComponent } from './containers/listing-dialog/listing-dialog.component';
export class CrudModule {
}
CrudModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    HttpClientModule,
                    MomentModule,
                    RouterModule,
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
                    AppScreenComponent,
                    ListingScreenComponent,
                    ModelFormScreenComponent,
                    FormsetComponent,
                    ForeignKeyFieldComponent,
                    ListingDialogComponent,
                ],
                providers: [],
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
                    AppScreenComponent,
                    ListingScreenComponent,
                    ModelFormScreenComponent,
                    FormsetComponent,
                    ForeignKeyFieldComponent,
                ],
                entryComponents: [
                    ListingDialogComponent
                ]
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J1ZC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9jcnVkLyIsInNvdXJjZXMiOlsibGliL2NydWQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFMUMsT0FBTyxFQUNMLGdCQUFnQixFQUNoQixnQkFBZ0IsRUFDaEIsYUFBYSxFQUNiLGFBQWEsRUFDYixjQUFjLEVBQ2QsYUFBYSxFQUNiLGtCQUFrQixFQUNsQixlQUFlLEVBQ2YsYUFBYSxFQUNiLG9CQUFvQixFQUNwQixrQkFBa0IsRUFDbEIsY0FBYyxFQUNkLGlCQUFpQixFQUNqQixvQkFBb0IsRUFDcEIsaUJBQWlCLEVBQ2pCLGlCQUFpQixFQUNqQixtQkFBbUIsRUFDbkIsbUJBQW1CLEVBQ25CLGVBQWUsRUFDZixhQUFhLEVBQ2Isa0JBQWtCLEVBQ2xCLHFCQUFxQixHQUN0QixNQUFNLG1CQUFtQixDQUFDO0FBRzNCLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDREQUE0RCxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzFFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGdFQUFnRSxDQUFDO0FBQzVHLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDREQUE0RCxDQUFDO0FBRXRHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQzlGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBc0Y5RixNQUFNOzs7WUFwRkwsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLFdBQVc7b0JBQ1gsbUJBQW1CO29CQUNuQixnQkFBZ0I7b0JBQ2hCLFlBQVk7b0JBQ1osWUFBWTtvQkFFWixnQkFBZ0I7b0JBQ2hCLGdCQUFnQjtvQkFDaEIsYUFBYTtvQkFDYixhQUFhO29CQUNiLGNBQWM7b0JBQ2QsYUFBYTtvQkFDYixrQkFBa0I7b0JBQ2xCLGVBQWU7b0JBQ2YsYUFBYTtvQkFDYixvQkFBb0I7b0JBQ3BCLGtCQUFrQjtvQkFDbEIsY0FBYztvQkFDZCxpQkFBaUI7b0JBQ2pCLG9CQUFvQjtvQkFDcEIsaUJBQWlCO29CQUNqQixpQkFBaUI7b0JBQ2pCLG1CQUFtQjtvQkFDbkIsbUJBQW1CO29CQUNuQixlQUFlO29CQUNmLGFBQWE7b0JBQ2Isa0JBQWtCO29CQUNsQixxQkFBcUI7aUJBQ3RCO2dCQUNELFlBQVksRUFBRTtvQkFDWixrQkFBa0I7b0JBQ2xCLDBCQUEwQjtvQkFDMUIsZ0JBQWdCO29CQUNoQixrQkFBa0I7b0JBQ2xCLGtCQUFrQjtvQkFDbEIsc0JBQXNCO29CQUN0Qix3QkFBd0I7b0JBQ3hCLGdCQUFnQjtvQkFDaEIsd0JBQXdCO29CQUN4QixzQkFBc0I7aUJBQ3ZCO2dCQUNELFNBQVMsRUFBRSxFQUNWO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxnQkFBZ0I7b0JBQ2hCLDBCQUEwQjtvQkFDMUIsZ0JBQWdCO29CQUNoQixnQkFBZ0I7b0JBQ2hCLGFBQWE7b0JBQ2IsYUFBYTtvQkFDYixjQUFjO29CQUNkLGFBQWE7b0JBQ2Isa0JBQWtCO29CQUNsQixlQUFlO29CQUNmLGFBQWE7b0JBQ2Isb0JBQW9CO29CQUNwQixrQkFBa0I7b0JBQ2xCLGNBQWM7b0JBQ2QsaUJBQWlCO29CQUNqQixvQkFBb0I7b0JBQ3BCLGlCQUFpQjtvQkFDakIsaUJBQWlCO29CQUNqQixtQkFBbUI7b0JBQ25CLG1CQUFtQjtvQkFDbkIsZUFBZTtvQkFDZixhQUFhO29CQUNiLHFCQUFxQjtvQkFDckIsa0JBQWtCO29CQUNsQixrQkFBa0I7b0JBQ2xCLGdCQUFnQjtvQkFDaEIsa0JBQWtCO29CQUNsQixrQkFBa0I7b0JBQ2xCLHNCQUFzQjtvQkFDdEIsd0JBQXdCO29CQUN4QixnQkFBZ0I7b0JBQ2hCLHdCQUF3QjtpQkFDekI7Z0JBQ0QsZUFBZSxFQUFFO29CQUNmLHNCQUFzQjtpQkFDdkI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1vbWVudE1vZHVsZSB9IGZyb20gJ25neC1tb21lbnQnO1xuXG5pbXBvcnQge1xuICBNYXRUb29sYmFyTW9kdWxlLFxuICBNYXRTaWRlbmF2TW9kdWxlLFxuICBNYXRMaXN0TW9kdWxlLFxuICBNYXRJY29uTW9kdWxlLFxuICBNYXRUYWJsZU1vZHVsZSxcbiAgTWF0Q2FyZE1vZHVsZSxcbiAgTWF0UGFnaW5hdG9yTW9kdWxlLFxuICBNYXRCdXR0b25Nb2R1bGUsXG4gIE1hdE1lbnVNb2R1bGUsXG4gIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gIE1hdElucHV0TW9kdWxlLFxuICBNYXRDaGVja2JveE1vZHVsZSxcbiAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsXG4gIE1hdEdyaWRMaXN0TW9kdWxlLFxuICBNYXRTbmFja0Jhck1vZHVsZSxcbiAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcbiAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgTWF0U2VsZWN0TW9kdWxlLFxuICBNYXRUYWJzTW9kdWxlLFxuICBNYXRFeHBhbnNpb25Nb2R1bGUsXG4gIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5cbmltcG9ydCB7IExpc3RpbmdDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbGlzdGluZy9saXN0aW5nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNb2RlbEZvcm1Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbW9kZWwtZm9ybS9tb2RlbC1mb3JtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNb2RlbEZvcm1TY3JlZW5Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbW9kZWwtZm9ybS1zY3JlZW4vbW9kZWwtZm9ybS1zY3JlZW4uY29tcG9uZW50JztcbmltcG9ydCB7IEZvcm1GaWVsZENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9mb3JtLWZpZWxkL2Zvcm0tZmllbGQuY29tcG9uZW50JztcbmltcG9ydCB7IEZvcm1zZXRDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZm9ybXNldC9mb3Jtc2V0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBdXRvQ29tcGxldGVGaWVsZENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9hdXRvLWNvbXBsZXRlLWZpZWxkL2F1dG8tY29tcGxldGUtZmllbGQuY29tcG9uZW50JztcbmltcG9ydCB7IEZvcmVpZ25LZXlGaWVsZENvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9mb3JlaWduLWtleS1maWVsZC9mb3JlaWduLWtleS1maWVsZC5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBBcHBTY3JlZW5Db21wb25lbnQgfSBmcm9tICcuL2NvbnRhaW5lcnMvYXBwLXNjcmVlbi9hcHAtc2NyZWVuLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMaXN0aW5nU2NyZWVuQ29tcG9uZW50IH0gZnJvbSAnLi9jb250YWluZXJzL2xpc3Rpbmctc2NyZWVuL2xpc3Rpbmctc2NyZWVuLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMaXN0aW5nRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9jb250YWluZXJzL2xpc3RpbmctZGlhbG9nL2xpc3RpbmctZGlhbG9nLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlLFxuICAgIE1vbWVudE1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgLy9cbiAgICBNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdFNpZGVuYXZNb2R1bGUsXG4gICAgTWF0TGlzdE1vZHVsZSxcbiAgICBNYXRJY29uTW9kdWxlLFxuICAgIE1hdFRhYmxlTW9kdWxlLFxuICAgIE1hdENhcmRNb2R1bGUsXG4gICAgTWF0UGFnaW5hdG9yTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRNZW51TW9kdWxlLFxuICAgIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxuICAgIE1hdEZvcm1GaWVsZE1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRDaGVja2JveE1vZHVsZSxcbiAgICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxcbiAgICBNYXRHcmlkTGlzdE1vZHVsZSxcbiAgICBNYXRTbmFja0Jhck1vZHVsZSxcbiAgICBNYXREYXRlcGlja2VyTW9kdWxlLFxuICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gICAgTWF0U2VsZWN0TW9kdWxlLFxuICAgIE1hdFRhYnNNb2R1bGUsXG4gICAgTWF0RXhwYW5zaW9uTW9kdWxlLFxuICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRm9ybUZpZWxkQ29tcG9uZW50LFxuICAgIEF1dG9Db21wbGV0ZUZpZWxkQ29tcG9uZW50LFxuICAgIExpc3RpbmdDb21wb25lbnQsXG4gICAgTW9kZWxGb3JtQ29tcG9uZW50LFxuICAgIEFwcFNjcmVlbkNvbXBvbmVudCxcbiAgICBMaXN0aW5nU2NyZWVuQ29tcG9uZW50LFxuICAgIE1vZGVsRm9ybVNjcmVlbkNvbXBvbmVudCxcbiAgICBGb3Jtc2V0Q29tcG9uZW50LFxuICAgIEZvcmVpZ25LZXlGaWVsZENvbXBvbmVudCxcbiAgICBMaXN0aW5nRGlhbG9nQ29tcG9uZW50LFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEh0dHBDbGllbnRNb2R1bGUsXG4gICAgQXV0b0NvbXBsZXRlRmllbGRDb21wb25lbnQsXG4gICAgTWF0VG9vbGJhck1vZHVsZSxcbiAgICBNYXRTaWRlbmF2TW9kdWxlLFxuICAgIE1hdExpc3RNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRUYWJsZU1vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLFxuICAgIE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxcbiAgICBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcbiAgICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gICAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsXG4gICAgTWF0R3JpZExpc3RNb2R1bGUsXG4gICAgTWF0U25hY2tCYXJNb2R1bGUsXG4gICAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgICBNYXREYXRlcGlja2VyTW9kdWxlLFxuICAgIE1hdFNlbGVjdE1vZHVsZSxcbiAgICBNYXRUYWJzTW9kdWxlLFxuICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcbiAgICBNYXRFeHBhbnNpb25Nb2R1bGUsXG4gICAgRm9ybUZpZWxkQ29tcG9uZW50LFxuICAgIExpc3RpbmdDb21wb25lbnQsXG4gICAgTW9kZWxGb3JtQ29tcG9uZW50LFxuICAgIEFwcFNjcmVlbkNvbXBvbmVudCxcbiAgICBMaXN0aW5nU2NyZWVuQ29tcG9uZW50LFxuICAgIE1vZGVsRm9ybVNjcmVlbkNvbXBvbmVudCxcbiAgICBGb3Jtc2V0Q29tcG9uZW50LFxuICAgIEZvcmVpZ25LZXlGaWVsZENvbXBvbmVudCxcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgTGlzdGluZ0RpYWxvZ0NvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIENydWRNb2R1bGUgeyB9XG4iXX0=
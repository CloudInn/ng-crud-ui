import { Component, ComponentFactoryResolver, Inject, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Metadata } from '../../models/metadata';
import { ErrorHanlderService } from '../../services/error-hanlder.service';

@Component({
    standalone: false,
  selector: 'ng-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.css']
})
export class SearchDialogComponent implements OnInit, OnDestroy {
  metadata: Metadata;
  /** Messages with no field of their own - the `detail` and `error` keys, and every 403. */
  strErrors: string[] = [];
  /** Messages the backend attached to a named field, rendered as "field : message". */
  errors: Array<{ key: string, value: string }> = [];
  hasErr = false;

  private errorSubscription: Subscription;

  @ViewChild('formView', { read: ViewContainerRef, static: false }) formView: ViewContainerRef;
  constructor(private ref: MatDialogRef<SearchDialogComponent>,
    private container: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private errorService: ErrorHanlderService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    // A search rejected by the backend has no other way to reach the user. The form in here only
    // emits its filters - the parent runs the request - so nothing on this path calls
    // ModelFormComponent.displayError/openSnackBar. That is what makes it safe to render the
    // error here: the duplicate that got ErrorHandlingComponent removed was the save flow showing
    // the snackbar and that component at once, and no save happens inside this dialog.
    //
    // Keep it that way. If a search view is ever configured with a form that saves, this
    // subscription and that snackbar would both fire and the double is back.
    this.errorSubscription = this.errorService.getError().subscribe(err => {
      this.hasErr = err?.hasErr === true && err?.error !== undefined;
      this.strErrors = [];
      this.errors = [];
      if (!this.hasErr) {
        return;
      }
      // 'forbidden' arrives already unwrapped to error.detail by ErrorHanlderService.
      if (err.type === 'forbidden') {
        this.strErrors.push(err.error);
      } else if (err.type === 'bad request') {
        this.collectErrors(err.error);
      }
    });
  }

  /**
   * A DRF error body is {field: messages}, where messages is a string, a list of strings, or a
   * nested body for a related object. `detail` and `error` are the two keys that carry a message
   * about the request as a whole rather than about a field.
   */
  private collectErrors(error: any): void {
    if (error === null || error === undefined) {
      return;
    }
    if (typeof error === 'string') {
      this.strErrors.push(error);
      return;
    }
    Object.keys(error).forEach(key => {
      const messages = Array.isArray(error[key]) ? error[key] : [error[key]];
      messages.forEach(message => {
        if (typeof message !== 'string') {
          this.collectErrors(message);
        } else if (key === 'error' || key === 'detail') {
          this.strErrors.push(message);
        } else {
          this.errors.push({ key, value: message });
        }
      });
    });
  }

  ngOnInit(): void {
    const viewConfig = this.data['viewConfig'].search.creationView;
    this.metadata = this.data['metadata'];
    const factory = this.resolver.resolveComponentFactory<any>(viewConfig.component);
    const component = this.container.createComponent(factory);
    component.instance.viewConfig = viewConfig;
    this.formView?.insert(component.hostView);
  }

  ngOnDestroy(): void {
    this.errorSubscription?.unsubscribe();
  }
}

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
  strErrors: string[] = [];
  errors: Array<{ key: string, value: string }> = [];
  hasErr = false;

  private errorSubscription: Subscription;

  @ViewChild('formView', { read: ViewContainerRef, static: false }) formView: ViewContainerRef;
  constructor(private ref: MatDialogRef<SearchDialogComponent>,
    private container: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private errorService: ErrorHanlderService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    // Nothing saves in here, so this cannot duplicate the save flow's snackbar - the double that
    // got ErrorHandlingComponent removed. A search view whose form can save would bring it back.
    this.errorSubscription = this.errorService.getError().subscribe(err => {
      this.hasErr = err?.hasErr === true && err?.error !== undefined;
      this.strErrors = [];
      this.errors = [];
      if (!this.hasErr) {
        return;
      }
      // ErrorHanlderService already unwraps a 403 to error.detail.
      if (err.type === 'forbidden') {
        this.strErrors.push(err.error);
      } else if (err.type === 'bad request') {
        this.collectErrors(err.error);
      }
    });
  }

  /** DRF body: {field: messages}; `detail` and `error` are request-wide rather than per field. */
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

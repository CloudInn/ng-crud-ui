import {
  Component, OnInit, ComponentFactoryResolver, Type, ComponentRef,
  ViewContainerRef, ViewChild, Inject, Optional
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Registry } from '../../services/registry.service';
import { ListingComponent } from '../../components/listing/listing.component';
import { ModelFormComponent } from '../../components/model-form/model-form.component';
import { FormsetComponent } from '../../components/formset/formset.component';
import { ViewConfig } from '../../models/views';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

const Components = {
  listing: ListingComponent,
  form: ModelFormComponent,
  formset: FormsetComponent,
};

@Component({
  templateUrl: 'screen-wrapper.component.html',
  styleUrls: ['screen-wrapper.component.css']
})
export class ScreenWrapperComponent implements OnInit {

  screen: ViewConfig;
  component: Type<any>;
  componentRef: ComponentRef<any>;
  searchComponentRef: ComponentRef<any>;
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef,static:false }) dynamicComponentContainer: ViewContainerRef;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    @Optional() public dialogRef: MatDialogRef<ScreenWrapperComponent>,
    private reg: Registry,
    private route: ActivatedRoute,
    private container: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private title: Title,
  ) { }

  ngOnInit() {
    // keep listening for route params changes, in case of
    // the model name changed, e.g: another model clicked from
    // the nav menu
    setTimeout(() => {
      this.route.url.subscribe(urls => {
        const p = [];
        let id;
        urls.forEach(url => {
          p.push(url.path);
        });
        const path = p.join('/');
        if (this.route.routeConfig) {
          this.screen = this.reg.screens[this.route.routeConfig.path];
        } else if (this.data) {
          this.screen = this.reg.screens[this.data.path];
          if(this.data.id) id = this.data.id;

        }
        if (!this.screen) {
          throw new Error('Screen not found in registry');
        }
        const factory = this.resolver.resolveComponentFactory<any>(this.screen.component);
        const componentRef = this.container.createComponent(factory);
        componentRef.instance.viewConfig = this.screen;
        Object.keys(this.route.snapshot.params).forEach(k => {
          componentRef.instance[k] = this.route.snapshot.params[k];
        });
        if(id) componentRef.instance['id'] = id;
        this.dynamicComponentContainer.insert(componentRef.hostView);
      });
    }, 0);
  }

}

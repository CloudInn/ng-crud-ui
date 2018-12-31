import { Component, OnInit, ComponentFactoryResolver, Type, ComponentRef, ViewContainerRef, ViewChild } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Registry } from '../../services/registry.service';
import { ListingComponent } from '../../components/listing/listing.component';
import { ModelFormComponent } from '../../components/model-form/model-form.component';
import { FormsetComponent } from '../../components/formset/formset.component';
import { ViewConfig } from '../../models/views';

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

    appName: string = null;
    moduleName: string = null;
    modelName: string = null;
    screen: ViewConfig;
    component: Type<any>;
    componentRef: ComponentRef<any>;
    searchComponentRef: ComponentRef<any>;
    @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

    constructor(
      private reg: Registry,
      private router: Router,
      private route: ActivatedRoute,
      private container: ViewContainerRef,
      private resolver: ComponentFactoryResolver,
      private title: Title,
    ) {}

    ngOnInit() {
      // keep listening for route params changes, in case of
      // the model name changed, e.g: another model clicked from
      // the nav menu
      this.route.url.subscribe(urls => {
        const p = [];
        urls.forEach(url => {
          p.push(url.path);
        });
        const path = p.join('/');
        this.screen = this.reg.screens[this.route.routeConfig.path];

        if (!this.screen) {
          throw new Error('Screen not found');
        }
        const factory = this.resolver.resolveComponentFactory<any>(this.screen.component);
        const componentRef = this.container.createComponent(factory);
        this.title.setTitle(this.screen.title);
        componentRef.instance.viewConfig = this.screen;
        Object.keys(this.route.snapshot.params).forEach(k => {
          componentRef.instance[k] = this.route.snapshot.params[k];
        });
        this.dynamicComponentContainer.insert(componentRef.hostView);
      });
    }

}

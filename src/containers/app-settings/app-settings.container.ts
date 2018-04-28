import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Registry, Navigator } from '../../services';

@Component({
  templateUrl: 'app-settings.container.html',
  styleUrls: ['app-settings.container.css']
})
export class AppSettingsContainer implements OnInit {

  app: any = null;
  moduleName = null;
  models = [];

  constructor(
    private reg: Registry,
    private router: Router,
    private route: ActivatedRoute,
    private navigator: Navigator,
  ) {
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.moduleName = params['module'];
    this.app = this.reg.getApp(this.moduleName, params['app']);
    this.models = this.app.models;

    if (!params['model_name']) {
      this.renderSidebar();
      this.router.navigate([`/${params['module']}`, params['app'], this.models[0].key]);
    }
  }

  // ngOnChanges() {
  //   this.route.params.subscribe(params => {
  //     this.moduleName = params['parent_app'];
  //     this.app = this.reg.getApp(params['app']);
  //     this.models = this.reg.getAppModels(params['app']);
  //   });
  // }
  renderSidebar() {
    const items = [];
    const item = { heading: this.app.name, children: [] };
    this.models.forEach(m => {
      item.children.push({ title: `${m.verbose_name}s`, url: `/${this.moduleName}/${this.app.key}/${m.key}` });
    });
    items.push(item);
    this.navigator.navItems.next(items);
  }
}

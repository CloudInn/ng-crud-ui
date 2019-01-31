import { Injectable } from '@angular/core';
import { Registry } from 'crud';
import { Navigator } from 'crud';

import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  items: ReplaySubject<any[]> = new ReplaySubject<any[]>();

  constructor(private reg: Registry, private nav: Navigator) {
    // nav.navItems.subscribe(res => {
    //   this.items.next(res);
    // });
    this.home();
   }

  public home() {
    const items = [
      {title: 'Home', url: '/', icon: 'home'},
      {title: 'POS', type: 'subheading'},
      {title: 'Terminals', url: '/pos/terminals', icon: 'restaurant'},
      {title: 'Inventory', type: 'subheading'},
      {title: 'Stores', url: '/inventory/stores', icon: 'shopping_cart'},
      {title: 'Income', type: 'subheading'},
      {title: 'Departments', url: '/income/departments', icon: 'book'},
      {title: 'PMS', type: 'subheading'},
      {title: 'Rooms', url: '/pms/rooms', icon: 'hotel'},
    ];
    // const modules = this.reg.getModules();
    // Object.keys(modules).forEach(key => {
    //     const m: any = modules[key];
    //     const item = {title: m.label, type: 'subheading'};
    //     items.push(item);
    //     m.apps.forEach(app => {
    //       const i = {
    //         title: app.label,
    //         icon: app.icon,
    //         url: `/${key}/${app.key}`
    //       };
    //       items.push(i);
    //     });
    // });
    this.items.next(items);
  }
}

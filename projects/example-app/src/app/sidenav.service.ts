import { Injectable } from '@angular/core';

import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  items: ReplaySubject<any[]> = new ReplaySubject<any[]>();

  constructor() {
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
      {title: 'Formsets', type: 'subheading'},
      {title: 'Todo List', url: '/todos', icon: 'supervised_user_circle'},
    ];
    this.items.next(items);
  }
}

import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavService } from './sidenav.service';
import { Registry } from 'crud';
import { ListingView, FormView } from 'crud';
import { TerminalMetadata } from './metadata/terminal.metadata';
import { DepartmentMetadata } from './metadata/department.metadata';
import { RoomMetadata } from './metadata/room.metadata';
import { StoreMetadata } from './metadata/store.metadata';
import { StoreSearchForm } from './forms/store.search.form';
import { RoomForm } from './forms/room.edit.form';
import { TerminalSearchForm } from './forms/terminal.search.form';
import { StoreListView } from './views/store.list.view';
import { ScreenWrapperComponent } from 'crud';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    public sidenav: SidenavService,
    private reg: Registry,
    private router: Router,
  ) {}

  ngOnInit() {
    // this.sidenav.home();
    // const f = new DefaultCrudForm(Terminal);
    // this.reg.registerMetadata(new TerminalMetadata());
    // this.reg.registerForm(new TerminalForm());
    this.registerViews();
    // push them to the router configuration
    Object.keys(this.reg.screens).forEach(s => {
      this.router.config.push({path: s, component: ScreenWrapperComponent});
    });
  }

  registerViews() {
    const terminalListing = new ListingView(new TerminalMetadata());
    terminalListing.search.enabled = true;
    terminalListing.search.view = new TerminalSearchForm(new TerminalMetadata());
    terminalListing.pagination.enabled = false;
    this.reg.registerScreen('pos/terminals', terminalListing);
    const terminalForm = new FormView(new TerminalMetadata());
    this.reg.registerScreen('pos/terminals/:id', terminalForm);
    //
    this.reg.registerScreen('inventory/stores', new StoreListView());
    this.reg.registerScreen('inventory/stores/:id', new FormView(new StoreMetadata()))
    //
    const departmentListing = new ListingView(new DepartmentMetadata());
    departmentListing.pagination.enabled = false;
    this.reg.registerScreen('income/departments', departmentListing);
    this.reg.registerScreen('income/departments/:id', new FormView(new DepartmentMetadata()));
    // rooms
    const roomListing = new ListingView(new RoomMetadata());
    roomListing.pagination.enabled = false;
    roomListing.search.enabled = false;
    this.reg.registerScreen('pms/rooms', roomListing);
    const roomForm = new RoomForm(new RoomMetadata());
    this.reg.registerScreen('pms/rooms/:id', roomForm);
  }

}

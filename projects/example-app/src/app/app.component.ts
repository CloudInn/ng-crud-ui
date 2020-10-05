import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavService } from './sidenav.service';
import { Registry } from 'crud';
import { ListingView, FormView } from 'crud';
import { TerminalMetadata } from './metadata/terminal.metadata';
import { DepartmentMetadata } from './metadata/department.metadata';
import { RoomMetadata } from './metadata/room.metadata';
import { StoreMetadata } from './metadata/store.metadata';
import { RoomForm } from './forms/room.edit.form';
import { TodoMetadata } from './metadata/todo.metadata';
import { StoreListView } from './views/store.list.view';
import { ScreenWrapperComponent } from 'crud';
import { StoreSearchForm } from './forms/store.search.form';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    public sidenav: SidenavService,
    private reg: Registry,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerViews();
    // push them to the router configuration
    Object.keys(this.reg.screens).forEach(s => {
      this.router.config.push({ path: s, component: ScreenWrapperComponent });
    });
  }

  registerViews() {
    const terminalListing = new ListingView(new TerminalMetadata(), {
      isDialog: false,
      search_settings: {
        enabled: true,
        search_key: [],
        mode: 'normal',
      }
    });
    terminalListing.pagination.enabled = false;
    // terminalListing.search.view = new TerminalSearchForm(new TerminalMetadata());
    this.reg.registerScreen('pos/terminals', terminalListing);
    const terminalForm = new FormView(new TerminalMetadata());
    // this.reg.registerScreen('pos/terminals/new', terminalForm);
    this.reg.registerScreen('pos/terminals/:id', terminalForm);
    //
    const viewSettings = {
      isDialog: false,
      search_settings: {
        enabled: false,
        mode: 'normal'
      }
    };
    this.reg.registerScreen('inventory/stores', new StoreListView(new StoreMetadata(), viewSettings));
    // this.reg.registerScreen('inventory/stores/new', new FormView(new StoreMetadata()));
    this.reg.registerScreen('inventory/stores/:id', new StoreSearchForm(new StoreMetadata()));
    //
    const departmentListing = new ListingView(new DepartmentMetadata(), {
      isDialog: false,
      search_settings: {
        enabled: true,
        search_key: [],
        mode: 'normal'
      }
    });
    departmentListing.pagination.enabled = false;
    this.reg.registerScreen('income/departments', departmentListing);
    this.reg.registerScreen('income/departments/:id', new FormView(new DepartmentMetadata()));
    // rooms
    const roomListing = new ListingView(new RoomMetadata(), {
      isDialog: false,
      search_settings: {
        enabled: true,
        search_key: [],
        mode: 'normal'
      }
    });
    roomListing.pagination.enabled = false;
    this.reg.registerScreen('pms/rooms', roomListing);
    // const roomForm = new FormView(new RoomFo());
    this.reg.registerScreen('pms/rooms/:id', new RoomForm(new RoomMetadata()));

    // todo
    const todoListing = new ListingView(new TodoMetadata(), {
      isDialog: false,
      search_settings: {
        enabled: true,
        search_key: [],
        mode: 'normal'
      }
    });
    todoListing.pagination.enabled = false;
    this.reg.registerScreen('todos', todoListing);
    const todoForm = new FormView(new TodoMetadata());
    // this.reg.registerScreen('todos/new', todoForm);
    this.reg.registerScreen('todos/:id', todoForm);
  }

}

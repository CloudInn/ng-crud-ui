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
import { ProfileMetadata } from './metadata/profile.metadata';

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
  ) { }

  ngOnInit() {
    this.registerViews();
    // push them to the router configuration
    Object.keys(this.reg.screens).forEach(s => {
      this.router.config.push({ path: s, component: ScreenWrapperComponent });
    });
  }

  registerViews() {
    const terminalListing = new ListingView(new TerminalMetadata());
    terminalListing.pagination.enabled = false;
    // terminalListing.search.view = new TerminalSearchForm(new TerminalMetadata());
    this.reg.registerScreen('pos/terminals', terminalListing);
    const terminalForm = new FormView(new TerminalMetadata());
    // this.reg.registerScreen('pos/terminals/new', terminalForm);
    this.reg.registerScreen('pos/terminals/:id', terminalForm);


    const profileListing = new ListingView(new ProfileMetadata());
    profileListing.pagination.enabled = false;
    // terminalListing.search.view = new TerminalSearchForm(new TerminalMetadata());
    this.reg.registerScreen('profiles', profileListing);
    const profileForm = new FormView(new ProfileMetadata());
    // this.reg.registerScreen('pos/terminals/new', terminalForm);
    this.reg.registerScreen('profiles/:id', profileForm);


    //
    this.reg.registerScreen('inventory/stores', new StoreListView());
    // this.reg.registerScreen('inventory/stores/new', new FormView(new StoreMetadata()));
    this.reg.registerScreen('inventory/stores/:id', new FormView(new StoreMetadata()));
    //
    const departmentListing = new ListingView(new DepartmentMetadata());
    departmentListing.pagination.enabled = false;
    this.reg.registerScreen('income/departments', departmentListing);
    this.reg.registerScreen('income/departments/:id', new FormView(new DepartmentMetadata()));
    // rooms
    const roomListing = new ListingView(new RoomMetadata());
    roomListing.pagination.enabled = false;
    this.reg.registerScreen('pms/rooms', roomListing);
    // const roomForm = new FormView(new RoomFo());
    this.reg.registerScreen('pms/rooms/:id', new RoomForm(new RoomMetadata()));

    // todo
    const todoListing = new ListingView(new TodoMetadata());
    todoListing.pagination.enabled = false;
    this.reg.registerScreen('todos', todoListing);
    const todoForm = new FormView(new TodoMetadata());
    // this.reg.registerScreen('todos/new', todoForm);
    this.reg.registerScreen('todos/:id', todoForm);
  }

}

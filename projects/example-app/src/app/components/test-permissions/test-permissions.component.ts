import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { PermissionsService } from 'crud';

@Component({
  selector: 'app-test-permissions',
  templateUrl: './test-permissions.component.html',
  styleUrls: ['./test-permissions.component.css']
})
export class TestPermissionsComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  permissions: string[];

  constructor(private permissionsService: PermissionsService) {}

  ngOnInit() {
    this .permissions = this.permissionsService.getUserPermissions();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our permission
    if ((value || '').trim()) {
      this.permissions.push(value.trim());
      this.updatePermissions();
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(permission: string): void {
    const index = this.permissions.indexOf(permission);

    if (index >= 0) {
      this.permissions.splice(index, 1);
      this.updatePermissions();
    }
  }

  updatePermissions(): void {
    this.permissionsService.setUserPermissions(this.permissions);
  }
}

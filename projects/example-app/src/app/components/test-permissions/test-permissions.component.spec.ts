import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPermissionsComponent } from './test-permissions.component';

describe('TestPermissionsComponent', () => {
  let component: TestPermissionsComponent;
  let fixture: ComponentFixture<TestPermissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestPermissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

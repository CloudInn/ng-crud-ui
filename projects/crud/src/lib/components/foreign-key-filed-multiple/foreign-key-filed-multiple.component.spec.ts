import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForeignKeyFiledMultipleComponent } from './foreign-key-filed-multiple.component';

describe('ForeignKeyFiledMultipleComponent', () => {
  let component: ForeignKeyFiledMultipleComponent;
  let fixture: ComponentFixture<ForeignKeyFiledMultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForeignKeyFiledMultipleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForeignKeyFiledMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

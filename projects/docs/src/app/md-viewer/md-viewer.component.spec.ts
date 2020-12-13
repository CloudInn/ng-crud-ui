import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MdViewerComponent } from './md-viewer.component';

describe('MdViewerComponent', () => {
  let component: MdViewerComponent;
  let fixture: ComponentFixture<MdViewerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MdViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

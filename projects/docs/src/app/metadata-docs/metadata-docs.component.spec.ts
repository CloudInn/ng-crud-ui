import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataDocsComponent } from './metadata-docs.component';

describe('MetadataDocsComponent', () => {
  let component: MetadataDocsComponent;
  let fixture: ComponentFixture<MetadataDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetadataDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

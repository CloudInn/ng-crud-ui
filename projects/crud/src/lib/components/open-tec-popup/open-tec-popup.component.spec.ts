import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenTecPopupComponent } from './open-tec-popup.component';

describe('OpenTecPopupComponent', () => {
  let component: OpenTecPopupComponent;
  let fixture: ComponentFixture<OpenTecPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenTecPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenTecPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

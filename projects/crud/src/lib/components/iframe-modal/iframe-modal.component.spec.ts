import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngxs/store';
import { Actions } from '@ngxs/store';
import { IframeModalComponent } from './iframe-modal.component';


describe('IframeModalComponent', () => {
  let component: IframeModalComponent;
  let fixture: ComponentFixture<IframeModalComponent>;
  beforeEach(() => {
    const matDialogRefStub = () => ({ close: () => ({}) });
    const domSanitizerStub = () => ({
      bypassSecurityTrustResourceUrl: src => ({})
    });
    const storeStub = () => ({ dispatch: arg => ({}) });
    const actionsStub = () => ({ pipe: arg => ({ subscribe: () => ({}) }) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [IframeModalComponent],
      providers: [
        { provide: MatDialogRef, useFactory: matDialogRefStub },
        { provide: DomSanitizer, useFactory: domSanitizerStub },
        { provide: Store, useFactory: storeStub },
        { provide: Actions, useFactory: actionsStub },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    });
    fixture = TestBed.createComponent(IframeModalComponent);
    component = fixture.componentInstance;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const domSanitizerStub: DomSanitizer = fixture.debugElement.injector.get(
        DomSanitizer
      );
      const storeStub: Store = fixture.debugElement.injector.get(Store);
      const actionsStub: Actions = fixture.debugElement.injector.get(Actions);
      spyOn(component, 'closeDialog').and.callThrough();
      spyOn(
        domSanitizerStub,
        'bypassSecurityTrustResourceUrl'
      ).and.callThrough();
      spyOn(storeStub, 'dispatch').and.callThrough();
      spyOn(actionsStub, 'pipe').and.callThrough();
      component.ngOnInit();
      expect(
        domSanitizerStub.bypassSecurityTrustResourceUrl
      ).toHaveBeenCalled();
      expect(actionsStub.pipe).toHaveBeenCalled();
    });
  });
  describe('closeDialog', () => {
    it('makes expected calls', () => {
      const matDialogRefStub = fixture.debugElement.injector.get(
        MatDialogRef
      );
      const storeStub: Store = fixture.debugElement.injector.get(Store);
      spyOn(matDialogRefStub, 'close').and.callThrough();
      spyOn(storeStub, 'dispatch').and.callThrough();
      component.closeDialog();
      expect(matDialogRefStub.close).toHaveBeenCalled();
      expect(storeStub.dispatch).toHaveBeenCalled();
    });
  });
});

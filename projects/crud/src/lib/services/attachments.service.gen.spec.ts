import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AttachmentsService } from './attachments.service';
import { HttpRequest, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AttachmentsService', () => {
  let service: AttachmentsService;
  let httpTestingController: HttpTestingController;
  let httpClientSpy: { get: jasmine.Spy };
  const mockId = 101;
  const mockfileId = 2;


  beforeEach(() => {
    TestBed.configureTestingModule({
    schemas: [NO_ERRORS_SCHEMA],
    imports: [],
    providers: [AttachmentsService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});

    httpTestingController = TestBed.inject(HttpTestingController);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = TestBed.inject(AttachmentsService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it(' should call deleteAttachment with the right API endpoint', () => {
    service.deleteAttachment(mockId, mockfileId).subscribe((resp) => {
      expect(resp).toBeTruthy();
    });
    httpTestingController.expectOne(
      (request: HttpRequest<any>) => request.url.includes('/api/reservation/individualreservation/v2/'));
  });

  it(' should call uploadAttachment with the right API endpoint', () => {
      const res = spyOn(service, 'uploadAttachments').and.callThrough();
    service.uploadAttachments(mockId);
      expect(res).toHaveBeenCalled();
    });

});

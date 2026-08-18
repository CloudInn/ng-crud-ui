import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { AttachmentsService } from './attachments.service';

describe('ApiService attachment uploads', () => {
    const api = '/api/core/individualprofile/v3/34120/attachments';

    let service: ApiService;
    let attachmentsService: AttachmentsService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ApiService, AttachmentsService],
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(ApiService);
        attachmentsService = TestBed.inject(AttachmentsService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    function queueFiles(count: number) {
        attachmentsService.attachmentsFormData = Array.from(
            { length: count },
            (value, index) => new File(['content'], `file-${index}.txt`)
        );
    }

    function openRequests(): TestRequest[] {
        return httpTestingController.match(api);
    }

    it('never keeps more than two uploads in flight', () => {
        queueFiles(5);
        service.post(api, {}, 'attachments').subscribe();

        const firstWindow = openRequests();
        expect(firstWindow.length).toBe(2);
        firstWindow.forEach(request => request.flush({}));

        const secondWindow = openRequests();
        expect(secondWindow.length).toBe(2);
        secondWindow.forEach(request => request.flush({}));

        const thirdWindow = openRequests();
        expect(thirdWindow.length).toBe(1);
        thirdWindow.forEach(request => request.flush({}));
    });

    it('posts every queued file exactly once', () => {
        queueFiles(5);
        const uploaded = [];
        service.post(api, {}, 'attachments').subscribe();

        let window = openRequests();
        while (window.length) {
            window.forEach(request => {
                uploaded.push((request.request.body as FormData).get('file')['name']);
                request.flush({});
            });
            window = openRequests();
        }

        expect(uploaded.sort()).toEqual([
            'file-0.txt', 'file-1.txt', 'file-2.txt', 'file-3.txt', 'file-4.txt',
        ]);
    });
});

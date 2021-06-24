import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ErrorHanlderService } from './error-hanlder.service';
import { AttachmentsService } from './attachments.service';


@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient, private attachmentsService: AttachmentsService) { }

    public fetch(api: string, params?: HttpParams): Observable<any> {
        return this.http.get(api, { params: params });
    }

    public put(api: string, body, params = {}): Observable<any> {
        let opts = new HttpParams();
        Object.keys(params).forEach(p => {
            if (params[p]) {
                opts = opts.set(p, params[p]);
            }
        });

        return this.http.put(api, body, { params: opts });
    }

    public post(api: string, body, fieldName?, params = {}): Observable<any> {
        console.log(fieldName)
        let opts = new HttpParams();
        Object.keys(params).forEach(p => {
            if (params[p]) {
                opts = opts.set(p, params[p]);
            }
        });
        if (fieldName && fieldName === 'attachments') {
            const attachments = this.attachmentsService.attachmentsFormData;
            console.log(attachments);
            if (attachments !== undefined) {
              const responses = [];
              attachments.forEach(file => {
                const formData: FormData = new FormData();
                formData.append('file', file, file.name);
                responses.push(this.http.post(
                  api,
                  formData, { withCredentials: true }).pipe(
                    catchError(error => of(error))
                  ));
              });
              return forkJoin(responses);
            }
        } else {
            return this.http.post(api, body, { params: opts });
        }

    }

    public delete(api: string, payload, join = false) {
        if (!join) {
            return this.http.delete(`${api}/${payload}`);
        } else {
            const responses = [];
            payload.forEach(row => {
                responses.push(this.http.delete(api, row.id).pipe(
                    catchError(error => of(error))
                ));
            });
            return forkJoin(responses);
        }
    }
}

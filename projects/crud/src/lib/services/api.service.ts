import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, forkJoin, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AttachmentsService } from './attachments.service';


@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient, private attachmentsService: AttachmentsService) { }

    public fetch(api: string, params?: HttpParams): Observable<any> {
        return this.http.get(api, {
            params: params
        });
    }

    public download(api: string, params?: HttpParams) {
        return this.http.get(api, {
            params: params,
            responseType: 'blob'
        });
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
        let opts = new HttpParams();
        Object.keys(params).forEach(p => {
            if (params[p]) {
                opts = opts.set(p, params[p]);
            }
        });
        if (fieldName && fieldName === 'attachments') {
            const attachments = this.attachmentsService.attachmentsFormData;
            if (attachments && attachments.length > 0) {
                const responses = [];
                attachments.forEach(file => {
                    const formData: FormData = new FormData();
                    formData.append('file', file, file.name);
                    responses.push(this.http.post(
                        api,
                        formData, { withCredentials: true }).pipe(
                            tap(res => {
                                this.attachmentsService.attachmentsFormData = [];
                            }),
                            catchError(error => throwError(error))
                        ));
                });
                return forkJoin(responses);
            } else {
                return of(null)
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

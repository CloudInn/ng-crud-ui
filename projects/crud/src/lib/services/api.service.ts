import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ErrorHanlderService } from './error-hanlder.service';


@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) { }

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

    public post(api: string, body, params = {}): Observable<any> {
        let opts = new HttpParams();
        Object.keys(params).forEach(p => {
            if (params[p]) {
                opts = opts.set(p, params[p]);
            }
        });

        return this.http.post(api, body, { params: opts });
    }

    public delete(api: string, payload, join = false) {
        if (!join) {
            return this.http.delete(`${api}/${payload}/`);
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ErrorHanlderService } from './error-hanlder.service';


@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient, private errorService: ErrorHanlderService) { }

    public fetch(api: string, params?: HttpParams): Observable<any> {
        return this.http.get(api, { params: params }).pipe(tap(
            res => {
                this.errorService.setError(null);
            }
        ),
            catchError(
                err => {
                    this.errorService.setError(err);
                    throw (err);
                }
            ));
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

    public delete(api: string, id) {
        return this.http.delete(`${api}/${id}/`);
    }
}

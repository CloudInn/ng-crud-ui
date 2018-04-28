import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {

    constructor(private http: HttpClient) { }

    public fetch(api: string, params?: any): Observable<any> {
        const opts = new HttpParams();
        Object.keys(params).forEach(p => {
            opts.set(p, params[p]);
        });

        return this.http.get(api, {params: opts});
    }

    public put(api: string, body, params = {}): Observable<any> {
        const opts = new HttpParams();
        Object.keys(params).forEach(p => {
            opts.set(p, params[p]);
        });

        return this.http.put(api, body, {params: opts});
    }

    public post(api: string, body, params = {}): Observable<any> {
        const opts = new HttpParams();
        Object.keys(params).forEach(p => {
            opts.set(p, params[p]);
        });

        return this.http.post(api, body, {params: opts});
    }

}

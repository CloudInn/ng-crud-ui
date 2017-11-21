import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {

    constructor(private http: Http) { }

    public fetch(api: string, params: any): Observable<any> {
        const opts = new RequestOptions();
        opts.search = new URLSearchParams();
        Object.keys(params).forEach(p => {
            opts.search.set(p, params[p]);
        });

        return this.http.get(api, opts).map(res => {
            return res.json();
        });
    }

    public put(api: string, body, params = {}): Observable<any> {
        const opts = new RequestOptions();
        opts.search = new URLSearchParams();
        Object.keys(params).forEach(p => {
            opts.search.set(p, params[p]);
        });

        return this.http.put(api, body, opts).map(res => res.json());
    }

    public post(api: string, body, params = {}): Observable<any> {
        const opts = new RequestOptions();
        opts.search = new URLSearchParams();
        Object.keys(params).forEach(p => {
            opts.search.set(p, params[p]);
        });

        return this.http.post(api, body, opts).map(res => res.json());
    }

}

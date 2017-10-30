import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {

  constructor(private http: Http) { }

  public fetch(api: string, params: any): Observable<any> {
    const opts = new RequestOptions();
    opts.search = new URLSearchParams();
    for(let p in params) {
      opts.search.set(p, params[p]);
    }

    return this.http.get(api, opts).map(res => {
      return res.json();
    });
  }

}

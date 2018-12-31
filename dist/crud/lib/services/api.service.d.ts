import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export declare class ApiService {
    private http;
    constructor(http: HttpClient);
    fetch(api: string, params?: any): Observable<any>;
    put(api: string, body: any, params?: {}): Observable<any>;
    post(api: string, body: any, params?: {}): Observable<any>;
}

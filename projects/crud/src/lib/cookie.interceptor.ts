import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class CookieInterceptor implements HttpInterceptor {
    constructor(private cookieService: CookieService) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     if (req.withCredentials) {
//       req = req.clone({headers: req.headers.set('X-CSRFToken', this.cookieService.get('csrftoken'))});
//     }
//     return next.handle(req);
//   }
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = this.cookieService.get('csrftoken');
    if (!!jwt) {
     req = req.clone({
       headers: req.headers.set('X-CSRFToken', this.cookieService.get('csrftoken'))
     });
   }
   return next.handle(req);
 }
}

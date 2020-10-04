import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import { tap, catchError } from 'rxjs/operators';
import { ErrorHanlderService } from './services/error-hanlder.service';

@Injectable()
export class CookieInterceptor implements HttpInterceptor {
    constructor(private cookieService: CookieService, private errorService: ErrorHanlderService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const jwt = this.cookieService.get('csrftoken');
        if (!!jwt) {
            req = req.clone({
                headers: req.headers.set('X-CSRFToken', this.cookieService.get('csrftoken'))
            });
        }
        return next.handle(req).pipe(
            catchError(
                err => {
                    this.handleError(err);
                    return throwError (err);
                }
            ));
    }
    private handleError(err) {
        this.errorService.setError(err);
    }
}


import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHanlderService {

  constructor() { }

  private errorSubject = new Subject<any>();

  setError(error) {
    if (error === null) {
      this.errorSubject.next({ hasErr: false });
    } else {
      switch (error.status) {
        case 400:
          this.defineErrorMessages(error, 'bad request');
          break;
        case 403:
          this.defineErrorMessages(error, 'forbidden');
          break;
      }
    }
  }

  defineErrorMessages(error, type) {
    switch (type) {
      case 'bad request':
        this.errorSubject.next({ error: error.error, type: 'bad request', hasErr: true });
        break;
      case 'forbidden':
        this.errorSubject.next({ error: error.error.detail, type: 'forbidden', hasErr: true });
        break;
    }

  }

  getError(): Observable<any> {
    return this.errorSubject;
  }
}

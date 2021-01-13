import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ErrorHanlderService } from '../../services/error-hanlder.service';

@Component({
  selector: 'ng-error-handling',
  templateUrl: './error-handling.component.html',
  styleUrls: ['./error-handling.component.css']
})
export class ErrorHandlingComponent implements OnDestroy {

  private errorSubscription: Subscription;
  strErrors = new Array();
  errors = new Array();
  keys = new Array();
  hasErr = false;

  constructor(
    private errorService: ErrorHanlderService) {

    this.errorSubscription = this.errorService.getError().subscribe(err => {
      if (err.error !== undefined) {
        this.hasErr = err.hasErr;
        this.keys = [];
        switch (err.type) {
          case 'bad request':
            this.setError(err.error);
            break;
          case 'forbidden':
            this.setForbiddenErrors(err.error);
            break;
          default:
            break;
        }
      } else {
        this.hasErr = false;
      }
    });
  }

  setError(error) {
    Object.keys(error).forEach(key => {
      this.keys.push(key);
    });
    this.keys.forEach(key => {
      this.declareError(key, error[key]);
    });
  }

  setForbiddenErrors(error) {
    this.strErrors.push(error);
  }

  declareError(key, error) {
    this.strErrors = [];
    this.errors = [];
    error.forEach(err => {
      // error is a string
      if (typeof (err) === 'string') {
        if (key !== 'error' && key !== 'detail') {
          this.errors.push({ key: key, value: err });
        } else {
          this.strErrors.push(err);
        }

      } else {
        // error is a new object of related fields errors
        this.setError(error[0]);
      }
    });
    let bool = false;
    if (!bool) {
      this.strErrors.forEach((err, i, object) => {
        if (object[i] === object[i + 1]) {
          bool = true;
        }
      });
    }
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }
}

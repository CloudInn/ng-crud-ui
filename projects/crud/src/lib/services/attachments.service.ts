import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AttachmentsService {
  private _attachments = new Array();
  id: string;
  constructor(private http: HttpClient,
    // private attachments: AttachmentsComponent
  ) { }

  public get attachmentsFormData() {
    return this._attachments;
  }
  public set attachmentsFormData(value) {
    this._attachments = value;
  }

}

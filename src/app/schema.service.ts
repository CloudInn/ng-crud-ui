import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Registry } from 'projects/crud/src/lib/services/registry.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {

  constructor(private http: HttpClient, private reg: Registry) { }

  load() {
    return this.http.get('/assets/schema.json').pipe(
      map(res => this.reg.register(res))
    );
  }
}

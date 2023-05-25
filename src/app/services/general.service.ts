import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  get(url: string): Observable<any> {
    const request = `${this.URL}/${url}`;
    return this.http.get<any>(request);
  }
  create(url: string, entity: any): Observable<any> {
    const request = `${this.URL}/${url}`;
    return this.http.post(request, entity);
  }
  update(url: string, entity: any): Observable<any> {
    const request = `${this.URL}/${url}/${entity.id}`;
    return this.http.put(request, entity);
  }
  delete(url: string, entity: any): Observable<any> {
    const request = `${this.URL}/${url}/${entity.id}`;
    return this.http.delete(request);
  }
}

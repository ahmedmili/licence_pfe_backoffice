import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Partner } from '../interfaces/partner';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  private httpOptions = {
    headers : new HttpHeaders({'Content-Type': 'application/json', 'Authorization':'Bearer ' + localStorage.getItem('token')})
  };
  endpoint = `${environment.api}/partners`;

  constructor(private http: HttpClient) { }

  all(): Observable<Partner[]> {
    return this.http.get<Partner[]>(this.endpoint, this.httpOptions);
  }

  create(data: any): Observable<Partner> {
    return this.http.post<Partner>(this.endpoint, data, this.httpOptions);
  }

  get(id: number): Observable<Partner> {
    return this.http.get<Partner>(`${this.endpoint}/${id}`, this.httpOptions);
  }

  update(id: number, data: any): Observable<Partner> {
    return this.http.put<Partner>(`${this.endpoint}/${id}`, data, this.httpOptions);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`, this.httpOptions);
  }
}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Partner } from '../interfaces/partner';
@Injectable({
  providedIn: 'root'
})
export class StatService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') })
  };
  endpoint = `${environment.api}/partners`;
  apiUrl = `${environment.api}/searchPartner`;

  constructor(private http: HttpClient) { }

  totalPartners(): Observable<any> {
    return this.http.get<any>(`${environment.api}/partnerstotal`, this.httpOptions);
  }
}

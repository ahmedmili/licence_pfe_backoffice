import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') })
  };

  constructor(private http: HttpClient) { }

  totalPartners(): Observable<any> {
    return this.http.get<any>(`${environment.api}/partnerstotal`, this.httpOptions);
  }

  totalUsers(): Observable<any> {
    return this.http.get<any>(`${environment.api}/userstotal`, this.httpOptions);
  }

  totalBoxes(): Observable<any> {
    return this.http.get<any>(`${environment.api}/boxestotal`, this.httpOptions);
  }

  totalOrders(): Observable<any> {
    return this.http.get<any>(`${environment.api}/orderstotal`, this.httpOptions);
  }

  getTotalCounts(): Observable<any> {
    return this.http.get<any>(`${environment.api}/getTotalCounts`, this.httpOptions);
  }

  getTotalBoxCounts(): Observable<any> {
    return this.http.get<any>(`${environment.api}/getTotalBoxCounts`, this.httpOptions);
  }

  getTotalUserCounts(): Observable<any> {
    return this.http.get<any>(`${environment.api}/getTotalUserCounts`, this.httpOptions);
  }

  getTotalPartnerCounts(): Observable<any> {
    return this.http.get<any>(`${environment.api}/getTotalPartnerCounts`, this.httpOptions);
  }
}

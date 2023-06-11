import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatService {
  // private httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') })
  // };

  constructor(private http: HttpClient) { }

  totalPartners(): Observable<any> {
    return this.http.get<any>(`${environment.api}/partnerstotal` );
  }

  totalUsers(): Observable<any> {
    return this.http.get<any>(`${environment.api}/userstotal` );
  }

  totalBoxes(): Observable<any> {
    return this.http.get<any>(`${environment.api}/boxestotal` );
  }

  totalOrders(): Observable<any> {
    return this.http.get<any>(`${environment.api}/orderstotal` );
  }

  getTotalCounts(): Observable<any> {
    return this.http.get<any>(`${environment.api}/getTotalCounts` );
  }

  getTotalBoxCounts(): Observable<any> {
    return this.http.get<any>(`${environment.api}/getTotalBoxCounts` );
  }

  getTotalUserCounts(): Observable<any> {
    return this.http.get<any>(`${environment.api}/getTotalUserCounts` );
  }

  getTotalPartnerCounts(): Observable<any> {
    return this.http.get<any>(`${environment.api}/getTotalPartnerCounts` );
  }
}

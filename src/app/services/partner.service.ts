import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Partner } from '../interfaces/partner';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  // private httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') })
  // };
  endpoint = `${environment.api}/partners`;
  apiUrl = `${environment.api}/searchPartner`;

  constructor(private http: HttpClient) { }

  all(): Observable<Partner[]> {
    return this.http.get<Partner[]>(this.endpoint);
  }

  create(data: any): Observable<any> {
    return this.http.post<Partner>(this.endpoint, data);
  }

  get(id: number): Observable<Partner> {
    return this.http.get<Partner>(`${this.endpoint}/${id}`);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.post<Partner>(`${environment.api}/update/${id}`, data);
  }
  
  updateImage(id: number, data: any): Observable<any> {
    return this.http.post<Partner>(`${environment.api}/updateImage/${id}`, data);
  }
  
  updatePassword(id: number, data: any): Observable<any> {
    return this.http.post<Partner>(`${environment.api}/updatePassword/${id}`, data);
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }

  updatePartnerStatus(id: number, newStatus: string) {
    return this.http.put<Partner>(`${this.endpoint}/status/${id}`, { status: newStatus });
  }

  getdetails(id: number): Observable<Partner> {
    return this.http.get<Partner>(`${this.endpoint}/partnerdetails/${id}`);
  }


  //Search function
  getPartners(search: string = "", category: string = ""): Observable<Partner[]> {
    let apiUrl = this.apiUrl;
  

    apiUrl += `?search=${search}&category=${category}`;

    return this.http.get<Partner[]>(apiUrl);
  }



  getFilteredPartners(category: string): Observable<Partner[]> {
    const url = `${environment.api}/filter?category=${category}`;
    return this.http.get<Partner[]>(url);
  }
  

}

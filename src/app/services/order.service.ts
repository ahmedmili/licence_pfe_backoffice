import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // private httpOptions = {
  //   headers : new HttpHeaders({'Content-Type': 'application/json', 'Authorization':'Bearer ' + localStorage.getItem('token')})
  // };
  endpoint = `${environment.api}/orders`;
  apiUrl=`${environment.api}/searchOrder`;
  constructor(private http: HttpClient) { }

  all(): Observable<Order[]>{
    return this.http.get<Order[]>(this.endpoint);
  }
  create(data:any):Observable<any>{
    return this.http.post<Order>(`${environment.api}/orders/addorder`,data)
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.endpoint}/deleteorder/${id}`);
  }

  get(id: number): Observable<Order>{
    return this.http.get<Order>(`${this.endpoint}/getorder/${id}`);
  }

  update(id: number,data: any): Observable<Order>{
    return this.http.put<Order>(`${this.endpoint}/updateorder/${id}`,data);
  }

  updateOrderStatus(id: number, newStatus: string) {
    return this.http.put<Order>(`${this.endpoint}/status/${id}`, { status: newStatus });
  }

  getdetails(id: number): Observable<Order>{
    return this.http.get<Order>(`${this.endpoint}/orderdetails/${id}`);
  }

    //Search function
  getOrders(search: string = "", status:string = ""): Observable<Order[]> {
    let apiUrl = this.apiUrl;

        apiUrl += `?search=${search}&status=${status}`;
      
      return this.http.get<Order[]>(apiUrl); 
    }

  
  getFilteredOrders(status: string): Observable<Order[]> {
    const url = `${environment.api}/filterorders?status=${status}`;
    return this.http.get<Order[]>(url);
  }

}

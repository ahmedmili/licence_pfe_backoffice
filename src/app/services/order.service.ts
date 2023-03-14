import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private httpOptions = {
    headers : new HttpHeaders({'Content-Type': 'application/json', 'Authorization':'Bearer ' + localStorage.getItem('token')})
  };
  endpoint = `${environment.api}/orders`;
  apiUrl=`${environment.api}/searchOrder`;
  constructor(private http: HttpClient) { }

  all(): Observable<Order[]>{
    return this.http.get<Order[]>(this.endpoint,this.httpOptions);
  }
  create(data:any):Observable<Order>{
    return this.http.post<Order>(`${environment.api}/orders/addorder`,data,this.httpOptions);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.endpoint}/deleteorder/${id}`,this.httpOptions);
  }

  get(id: number): Observable<Order>{
    return this.http.get<Order>(`${this.endpoint}/getorder/${id}`,this.httpOptions);
  }

  update(id: number,data: any): Observable<Order>{
    return this.http.put<Order>(`${this.endpoint}/updateorder/${id}`,data,this.httpOptions);
  }


  getdetails(id: number): Observable<Order>{
    return this.http.get<Order>(`${this.endpoint}/orderdetails/${id}`,this.httpOptions);
  }

    //Search function
  getOrders(search: string = "", status:string = ""): Observable<Order[]> {
    let apiUrl = this.apiUrl;
    let httpOptions = this.httpOptions;
      
        apiUrl += `?search=${search}&status=${status}`;
      
      return this.http.get<Order[]>(apiUrl, httpOptions); 
    }

  
  getFilteredOrders(status: string): Observable<Order[]> {
    const url = `${environment.api}/filterorders?status=${status}`;
    return this.http.get<Order[]>(url,this.httpOptions);
  }

}

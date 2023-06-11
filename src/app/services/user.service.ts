import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer ' + localStorage.getItem('token')
  //   })
  // };
  endpoint = `${environment.api}/users`;
  apiUrl=`${environment.api}/searchUser`;
  constructor(private http: HttpClient) {

  }

  all(): Observable<User[]> {
    return this.http.get<User[]>(this.endpoint );
  }


  create(data: any): Observable<any> {
    return this.http.post<User>(this.endpoint, data, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    });
  }

  get(id: number): Observable<User> {
    return this.http.get<User>(`${this.endpoint}/${id}` );
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put<User>(`${this.endpoint}/${id}`, data );
  }
  updatePassword(id: number, data: any): Observable<any> {
    return this.http.put<User>(`${this.endpoint}/password/${id}`, data );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}` );
  }

  updateUserStatus(id: number, newStatus: string) {
    return this.http.put<User>(`${this.endpoint}/status/${id}`, { status: newStatus } );
  }

  getdetails(id: number): Observable<any>{
    return this.http.get(`${this.endpoint}/userdetails/${id}`);
  }

  //Search function
  getUsers(search: string = "", status:string = ""): Observable<User[]> {
    let apiUrl = this.apiUrl;

      apiUrl += `?search=${search}&status=${status}`;

    return this.http.get<User[]>(apiUrl); 
  }

  getFilteredUsers(status: string): Observable<User[]> {
    const url = `${environment.api}/filterusers?status=${status}`;
    return this.http.get<User[]>(url);
  }


}

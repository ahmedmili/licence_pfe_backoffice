import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpOptions = {
    headers : new HttpHeaders({'Content-Type': 'application/json', 'Authorization':'Bearer ' + localStorage.getItem('token')})
  };
  endpoint = `${environment.api}/users`;
  constructor(private http:HttpClient) { 
   
  }

  all(): Observable<User[]>{
    return this.http.get<User[]>(this.endpoint,this.httpOptions);
  }

  create(data:any):Observable<User>{
    return this.http.post<User>(this.endpoint,data,this.httpOptions);
  }

  get(id: number): Observable<User>{
    return this.http.get<User>(`${this.endpoint}/${id}`,this.httpOptions);
  }

  update(id: number,data: any): Observable<User>{
    return this.http.put<User>(`${this.endpoint}/${id}`,data,this.httpOptions);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.endpoint}/${id}`,this.httpOptions);
  }

  getuserById(id: number){
    return this.http.get(`${this.endpoint}/${id}`,this.httpOptions);
  }
}

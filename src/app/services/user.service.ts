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
    endpoint='';
  constructor(private http:HttpClient) { 
    this.endpoint = `${environment.api}/users`;
  }

  all(): Observable<User[]>{
    return this.http.get<User[]>(this.endpoint,this.httpOptions);
  }
}

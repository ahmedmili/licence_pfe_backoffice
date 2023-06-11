import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {User} from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 

  // private httpOptions = {
  //   headers : new HttpHeaders({'Content-Type': 'application/json', 'Authorization':'Bearer ' + localStorage.getItem('token')})
  // };

   

  constructor(protected http: HttpClient) {
  }

  login(data: any): Observable<any> {
   return this.http.post<any>(`${environment.api}/login`, data, { observe: 'response' })
  }

  register(data: any): Observable<User> {
    return this.http.post<User>(`${environment.api}/register`, data);
  }

  user(): Observable<User> {
    return this.http.get<User>(`${environment.api}/user`);
  }

  logout() {
    localStorage.removeItem("token");
  }

  updateInfo(data:any): Observable<User> {
    return this.http.put<User>(`${environment.api}/users/info`, data);
  }

  updatePassword(data:any): Observable<User> {
    return this.http.put<User>(`${environment.api}/users/password`, data);
  }
}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Box } from '../interfaces/Box';

@Injectable({
  providedIn: 'root'
})
export class BoxService {
  private httpOptions = {
    headers : new HttpHeaders({'Content-Type': 'application/json', 'Authorization':'Bearer ' + localStorage.getItem('token')})
  };
    endpoint = `${environment.api}/boxs`;

    constructor(private http:HttpClient) { 
      
    }

    all(): Observable<Box[]>{
      return this.http.get<Box[]>(this.endpoint,this.httpOptions);
    }

    create(data:any):Observable<Box>{
      return this.http.post<Box>(this.endpoint,data,this.httpOptions);
    }

    get(id: number): Observable<Box>{
      return this.http.get<Box>(`${this.endpoint}/${id}`,this.httpOptions);
    }
  
    update(id: number,data: any): Observable<Box>{
      return this.http.put<Box>(`${this.endpoint}/${id}`,data,this.httpOptions);
    }
  
    delete(id: number): Observable<void>{
      return this.http.delete<void>(`${this.endpoint}/${id}`,this.httpOptions);
    }

     
  // searchPaniers(search: string): Observable<Panier[]> {
  //   return this.http.get<Panier[]>(`${environment.api}/searchboxs?search=${search}`,this.httpOptions);
  // }

}

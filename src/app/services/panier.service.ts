import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Panier } from '../interfaces/panier';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private httpOptions = {
    headers : new HttpHeaders({'Content-Type': 'application/json', 'Authorization':'Bearer ' + localStorage.getItem('token')})
  };
    endpoint = `${environment.api}/paniers`;

    constructor(private http:HttpClient) { 
      
    }

    all(): Observable<Panier[]>{
      return this.http.get<Panier[]>(this.endpoint,this.httpOptions);
    }

    create(data:any):Observable<Panier>{
      return this.http.post<Panier>(this.endpoint,data,this.httpOptions);
    }

    get(id: number): Observable<Panier>{
      return this.http.get<Panier>(`${this.endpoint}/${id}`,this.httpOptions);
    }
  
    update(id: number,data: any): Observable<Panier>{
      return this.http.put<Panier>(`${this.endpoint}/${id}`,data,this.httpOptions);
    }
  
    delete(id: number): Observable<void>{
      return this.http.delete<void>(`${this.endpoint}/${id}`,this.httpOptions);
    }
}

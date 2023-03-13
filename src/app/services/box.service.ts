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
  private httpOptions2 = {
    headers : new HttpHeaders({'Content-Type': 'multipart/form-data', 'Authorization':'Bearer ' + localStorage.getItem('token')})
  };
  
    endpoint = `${environment.api}/boxs`;
    apiUrl=`${environment.api}/searchBox`;

    constructor(private http:HttpClient) { 
      
    }

    all(): Observable<Box[]>{
      return this.http.get<Box[]>(this.endpoint,this.httpOptions);
    }

    create(data:any):Observable<any>{
      return this.http.post<Box>(this.endpoint,data,{
        headers : new HttpHeaders({
         // 'Content-Type': "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2),
          'Authorization':'Bearer ' + localStorage.getItem('token')})
      });
      
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


    getdetails(id: number): Observable<Box>{
      return this.http.get<Box>(`${this.endpoint}/boxdetails/${id}`,this.httpOptions);
    }

   //Search function
   getBoxs(search?: string): Observable<Box[]> {
    let apiUrl = this.apiUrl;
    let httpOptions = this.httpOptions;
    if (search) {
      apiUrl += `?search=${search}&search_fields=id,partner_id,title`;
    }
    return this.http.get<Box[]>(apiUrl, httpOptions); 
  }


}

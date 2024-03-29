import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Box } from '../interfaces/Box';


@Injectable({
  providedIn: 'root'
})
export class BoxService {
  // private httpOptions = {
  //   headers : new HttpHeaders({'Content-Type': 'application/json', 'Authorization':'Bearer ' + localStorage.getItem('token')})
  // };
  private httpOptions2 = {
    headers : new HttpHeaders(
      {
        'Content-Type': 'multipart/form-data' ,
                 'Authorization':'Bearer ' + localStorage.getItem('token')
        }
        )
  };
  
    endpoint = `${environment.api}/boxs`;
    apiUrl=`${environment.api}/searchBoxs`;

    constructor(private http:HttpClient) { 
      
    }

    all(): Observable<Box[]>{
      return this.http.get<Box[]>(this.endpoint);
    }

    create(data:any):Observable<any>{
      return this.http.post<Box>(this.endpoint,data,{
        headers : new HttpHeaders({
          'Authorization':'Bearer ' + localStorage.getItem('token')})
      });
      
    }

    get(id: number): Observable<any>{
      return this.http.get<Box>(`${this.endpoint}/${id}`);
    }
  
    update(id: number,data: any): Observable<any>{
      const headers = new HttpHeaders().set('Multipart-Interceptor', 'true');

      return this.http.post<Box>(`${environment.api}/updateBox/${id}`,data,
   
      { headers }
    );
     
    }
  
    delete(id: number): Observable<void>{
      return this.http.delete<void>(`${this.endpoint}/${id}`);
    }


    getdetails(id: number): Observable<Box>{
      return this.http.get<Box>(`${this.endpoint}/boxdetails/${id}`);
    }

    updateBoxStatus(id: number, newStatus: string) {
      return this.http.put<Box>(`${this.endpoint}/status/${id}`, { status: newStatus });
    }

  //Search function
  getBoxs(search: string = "", status:string = ""): Observable<Box[]> {
    let apiUrl = this.apiUrl;
    // let httpOptions = this.httpOptions;
  
      apiUrl += `?search=${search}&status=${status}`;
    
    return this.http.get<Box[]>(apiUrl); 
  }



  getFilteredBoxs(status: string): Observable<Box[]> {
    const url = `${environment.api}/filter?status=${status}`;
    return this.http.get<Box[]>(url);
  }



}

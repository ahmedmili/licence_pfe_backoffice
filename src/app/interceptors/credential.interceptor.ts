import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CredentialInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Check if the request requires the interceptor
    if (request.headers.has('Multipart-Interceptor')) {
      
      const req = request.clone({
        withCredentials: true,
        setHeaders: {
          Authorization: 'Bearer ' + localStorage.getItem("token")
        }
      });
      return next.handle(req);
    }else{
      const req = request.clone({
        withCredentials: true,
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem("token")
        }
      });
      return next.handle(req);
    }
    
    // return next.handle(request);
  }
}

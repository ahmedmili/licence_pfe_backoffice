import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Your authentication logic goes here
    const isAuthenticated = 
    localStorage.getItem('token'); // Check if user is authenticated

    if (isAuthenticated) {
      return true;
    } else {
      // Redirect to login page or any other desired route
      this.router.navigate(['/login']);
      return false;
    }
  }
}

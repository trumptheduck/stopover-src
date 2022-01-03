import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.authService.getAuthListener().pipe(
        map((isAuth) => {
          console.log(isAuth)
          if (!isAuth) {
            this.router.navigate(["home"]);
            return false;
          }
          if (!this.authService.user.isWriter) {
            return false;
          }
          return true;
        })
      );
  }
  
}

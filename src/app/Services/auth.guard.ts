import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthServiceService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const users = this._authService.getUser();
    const sessionUserData = JSON.parse(sessionStorage.getItem('userCredentials'));

    if (sessionUserData) {
      const status = users.find((user) => {
        return user.id == sessionUserData.id;
      })
      if (status) {

        return true
      }
    }
    console.log('from auth guard sessionUserData', sessionUserData);
    return this.router.navigate(['/login']);
  }

}

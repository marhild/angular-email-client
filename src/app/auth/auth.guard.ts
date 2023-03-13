import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { skipWhile, take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // signedin$ shows whether user is authenticated
      return this.authService.signedin$.pipe(
        // if value equal to null, skip
        skipWhile(value => value === null),
        map((value) => value!),
        // trick guard to mark subscriber as complete and emit boolean
        take(1),
        // check if user signed in
        tap((authenticated) => {
          if(!authenticated) {
            this.router.navigateByUrl('/');
          }
        })
      );
  }
}

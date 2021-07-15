import { UserState } from './../store/reducers/index';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isLoggedIn } from '../store/selectors/user.selector';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

//  Refactor later
isLoggedIn = true;
  constructor(private router: Router, private store: Store<UserState>) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if (localStorage.getItem('authToken')) {
    //   return true;
    // }

    return this.store.pipe(
      select(isLoggedIn),
      tap(loggedIn => {
        if (!loggedIn) {
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        }
      })
    );
  }
}

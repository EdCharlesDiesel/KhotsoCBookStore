import { tap } from 'rxjs/operators';
import { Login, UserActionTypes, Logout } from './../actions/user.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { defer, of } from 'rxjs';

@Injectable()
export class UserEffects {

  @Effect({ dispatch: false })
  login$ = this.actions$.pipe(
    ofType<Login>(UserActionTypes.LoginAction),
    tap(action =>
      localStorage.setItem('user', JSON.stringify(action.payload.user)
      )
    )
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<Logout>(UserActionTypes.LogoutAction),
    tap(() => {
      localStorage.removeItem('user');
      this.router.navigateByUrl('/login');
    })
  );

  @Effect()

  init$ = defer(() => {
    const userData = localStorage.getItem('user');

    // Will refactor later
    // if (userData != null) {
    //   return of(new Login(JSON.parse(userData)));
    // } else{
    //   return of();
    // }
  });

  constructor(private actions$: Actions, private router: Router) { }

}

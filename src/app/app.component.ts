import { UserState } from './store/reducers/user/user.reducer';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { map } from 'rxjs/operators';
import { isLoggedIn, isLoggedOut } from './store/selectors/user.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'KhotsoCBookStore';

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private authService: AuthenticationService, private store: Store<UserState>) {
    if (!localStorage.getItem('authToken')) {
      this.authService.setTempUserId();
    }
    this.authService.setUserDetails();
  }
  ngOnInit(): void {
    // this.isLoggedIn$ = this.store.pipe(
    //    map(state => state.loggedIn)
    //    select(isLoggedIn)
    // );

    // this.isLoggedOut$ = this.store.pipe(
    //    map(state => !state.loggedIn)
    //    select(isLoggedOut)
    // );
  }
}

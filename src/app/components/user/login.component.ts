import { Login } from '../../store/actions/user.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/components/shoppingcart/cart.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { User } from 'src/app/models/user';
import { takeUntil, tap } from 'rxjs/operators';
import { WishlistService } from 'src/app/services/wishlist.service';
import { Subject } from 'rxjs';
import { UserState } from 'src/app/store/reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  showPassword = true;
  userId;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private authenticationService: AuthenticationService,
    private subscriptionService: SubscriptionService,
    private wishlistService: WishlistService,
    private store: Store<UserState>) {
    this.userId = JSON.parse(localStorage.getItem('userId') || '{}');
  }

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  get username(): AbstractControl {
    return this.loginForm.get('username');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
    this.subscriptionService.userData.asObservable()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: User) => {
        this.userId = data.userId;
      });
  }

  login(): void {
    if (this.loginForm.valid) {

      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
      this.authenticationService.login(this.loginForm.value)
        .pipe(
          takeUntil(this.unsubscribe$),
          tap(user => {
            this.store.dispatch(new Login({ user }));
          })
        )
        .subscribe(
          () => {
            this.setShoppingCart();
            this.setWishlist();
            this.router.navigate([returnUrl]);
          },
          () => {
            this.loginForm.reset();
            this.loginForm.setErrors({
              invalidLogin: true
            });
          });
    }
  }

  setShoppingCart(): void {
    this.cartService.setCart(this.authenticationService.oldUserId, this.userId)
      .subscribe(result => {
        this.subscriptionService.cartItemcount$.next(result);
      }, error => {
        console.log('Error ocurred while setting shopping cart : ', error);
      });
  }

  setWishlist(): void {
    this.wishlistService.getWishlistItems(this.userId).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

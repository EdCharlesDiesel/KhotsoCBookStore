
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CartService } from '../cart.service';
import * as shoppingCartActions from './shoppingcart.actions';
import { ShoppingCart } from './../shoppingcart';
import { User } from 'src/app/models/user';
import { Book } from 'src/app/models/book';

@Injectable()
export class ShoppingCartEffects {
  currentUser: User;
  book: Book;
  userId;
  constructor(private shoppingCartService: CartService, private actions$: Actions) {
    this.userId = JSON.parse(localStorage.getItem('userId') || '{}');
    book: new Book();
  }

  @Effect()
  loadShoppingCarts$: Observable<Action> = this.actions$.pipe(
    ofType(shoppingCartActions.ShoppingCartActionTypes.Load),
    mergeMap(userId =>
      this.shoppingCartService.getCartItems(userId).pipe(
        map(shoppingCarts => (new shoppingCartActions.LoadSuccess(shoppingCarts))),
        catchError(err => of(new shoppingCartActions.LoadFail(err)))
      )
    )
  );



  @Effect()
  deleteShoppingCart$: Observable<Action> = this.actions$.pipe(
    ofType(shoppingCartActions.ShoppingCartActionTypes.DeleteShoppingCart),
    map((action: shoppingCartActions.DeleteShoppingCart) => action.payload),
    mergeMap((shoppingCartId: number) =>
      this.shoppingCartService.deleteOneCartItem(this.currentUser.userId, this.book.bookId).pipe(
        map(() => (new shoppingCartActions.DeleteShoppingCartSuccess(shoppingCartId))),
        catchError(err => of(new shoppingCartActions.DeleteShoppingCartFail(err)))
      )
    )
  );
}

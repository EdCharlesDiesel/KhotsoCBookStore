import { BookSubscriptionService } from './../services/book-subscription.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';


import * as bookActions from './bookSubscriptions.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { BookSubscription } from '../models/booksubscription';


@Injectable()
export class BookSubscriptionEffects {
  bookSubscription: BookSubscription;
  constructor(private bookSubscriptionService: BookSubscriptionService, private actions$: Actions) { }

  @Effect()
  public getBookSubscriptions = this.actions$.pipe(
    ofType<bookActions.GetBookSubscriptions>(bookActions.BookSubscriptionActionTypes.GET_BOOKSUB),
    mergeMap(async () => {
      return this.bookSubscriptionService.getBookSubs().pipe(
        map(() => new bookActions.GetBookSubscriptionsSuccess(this.bookSubscription))),
        catchError(err => of(new bookActions.GetBookSubscriptionsFailure(err))
        );
    })
  );

  @Effect()
  public addBookSubscription = this.actions$.pipe(
    ofType<bookActions.AddBookSubscription>(bookActions.BookSubscriptionActionTypes.ADD_BOOKSUB),
    mergeMap(async () => {
      return this.bookSubscriptionService.addBookSubscription(this.bookSubscription).pipe(
        map(newBookSubscription => (new bookActions.AddBookSubscriptionSuccess(newBookSubscription))),
        catchError(err => of(new bookActions.AddBookSubscriptionFailure(err)))
      );
    })
  );

  @Effect()
  public deleteBookSubscription = this.actions$.pipe(
    ofType<bookActions.DeleteBookSubscription>(bookActions.BookSubscriptionActionTypes.DELETE_BOOKSUB),
    map((action: bookActions.DeleteBookSubscription) => action.payload),
    mergeMap(async (bookSubId: number) => {
      return this.bookSubscriptionService.deleteBookSubscription(bookSubId).pipe(
        map(() => (new bookActions.DeleteBookSubscriptionSuccess(bookSubId))),
        catchError(err => of(new bookActions.DeleteBookSubscriptionFailure(err)))
      );
    })
  );}
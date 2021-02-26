
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap } from 'rxjs/operators';

/* NgRx */
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as bookSubscriptionActions from './bookSubscriptions.actions';
import { BookSubscriptionService } from 'src/app/services/book-subscription.service';
import { BookSubscription } from 'src/app/models/booksubscription';


@Injectable()
export class BookSubscriptionEffects {
  constructor(private bookSubscriptionService: BookSubscriptionService,
              private actions$: Actions) { }

  @Effect()
  loadBookSubscriptions$: Observable<Action> = this.actions$.pipe(
    ofType(bookSubscriptionActions.BookSubscriptionActionTypes.Load),
    mergeMap(action =>
      this.bookSubscriptionService.getBookSubscriptions().pipe(
        map(bookSubscriptions => (new bookSubscriptionActions.LoadSuccess(bookSubscriptions))),
        catchError(err => of(new bookSubscriptionActions.LoadFail(err)))
      )
    )
  );

  @Effect()
  createBookSubscription$: Observable<Action> = this.actions$.pipe(
    ofType(bookSubscriptionActions.BookSubscriptionActionTypes.CreateBookSubscription),
    map((action: bookSubscriptionActions.CreateBookSubscription) => action.payload),
    mergeMap((bookSubscription: BookSubscription) =>
      this.bookSubscriptionService.createBookSubscription(bookSubscription).pipe(
        map(newBookSubscription => (new bookSubscriptionActions.CreateBookSubscriptionSuccess(newBookSubscription))),
        catchError(err => of(new bookSubscriptionActions.CreateBookSubscriptionFail(err)))
      )
    )
  );

  @Effect()
  deleteBookSubscription$: Observable<Action> = this.actions$.pipe(
    ofType(bookSubscriptionActions.BookSubscriptionActionTypes.DeleteBookSubscription),
    map((action: bookSubscriptionActions.DeleteBookSubscription) => action.payload),
    mergeMap((bookSubscriptionId: number) =>
      this.bookSubscriptionService.deleteBookSubscription(bookSubscriptionId).pipe(
        map(() => (new bookSubscriptionActions.DeleteBookSubscriptionSuccess(bookSubscriptionId))),
        catchError(err => of(new bookSubscriptionActions.DeleteBookSubscriptionFail(err)))
      )
    )
  );
}


import { Injectable } from '@angular/core';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { BookService } from '../../../services/book.service';
import * as bookActions from './Book.actions'
import { Book } from '../../../models/book';

@Injectable()
export class BookEffects {
  constructor(private bookService: BookService,
              private actions$: Actions) { }

  @Effect()
  loadBooks$: Observable<Action> = this.actions$.pipe(
    ofType(bookActions.BookActionTypes.Load),
    mergeMap(action =>
      this.bookService.getAllBooks().pipe(
        map(books => (new bookActions.LoadSuccess(books))),
        catchError(err => of(new bookActions.LoadFail(err)))
      )
    )
  );
}

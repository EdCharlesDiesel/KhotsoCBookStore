
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { BookService } from '../../../services/book.service';
import * as bookActions from './book-filter.actions';
import { Book } from '../../../models/book';
import { Categories } from 'src/app/models/categories';

@Injectable()
export class BookFilterEffects {
  books: Book[]
  categories$: Observable<Categories[]>;
  constructor(private bookService: BookService,
    private actions$: Actions) { }

  @Effect()
  loadBookFilters$: Observable<Action> = this.actions$.pipe(
    ofType(bookActions.BookFilterActionTypes.Load),
    mergeMap(() =>
      this.bookService.categories$.pipe(
        map(categories => (new bookActions.LoadSuccess(categories))),
        catchError(err => of(new bookActions.LoadFail(err)))
      )
    )
  );
}

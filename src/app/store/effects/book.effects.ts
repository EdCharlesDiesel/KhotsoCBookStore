import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import * as bookActions from '../actions/book.action';

/* NgRx */
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';


@Injectable()
export class BookEffects {

  constructor(private _bookSvc: BookService,
              private actions$: Actions) { }

  @Effect()
  loadBooks$ = this.actions$.pipe(
    ofType(bookActions.BookActionTypes.Load),
    mergeMap(() =>
      this._bookSvc.getAllBooks().pipe(
        map((books: Book[]) => (new bookActions.LoadSuccess(books))),
        catchError(err => of(new bookActions.LoadFail(err)))
      )
    )
  );

  @Effect()
  updateBook$ = this.actions$.pipe(
    ofType(bookActions.BookActionTypes.UpdateBook),
    map((action: bookActions.UpdateBook) => action.payload),
    mergeMap((book: Book) =>
      this._bookSvc.updateBookDetails(book).pipe(
        map((updatedBook: Book) => (new bookActions.UpdateBookSuccess(updatedBook))),
        catchError(err => of(new bookActions.UpdateBookFail(err)))
      )
    )
  );

  @Effect()
  createBook$ = this.actions$.pipe(
    ofType(bookActions.BookActionTypes.CreateBook),
    map((action: bookActions.CreateBook) => action.payload),
    mergeMap((book: Book) =>
      this._bookSvc.addBook(book).pipe(
        map((newBook: Book) => (new bookActions.CreateBookSuccess(newBook))),
        catchError(err => of(new bookActions.CreateBookFail(err)))
      )
    )
  );

  @Effect()
  deleteBook$ = this.actions$.pipe(
    ofType(bookActions.BookActionTypes.DeleteBook),
    map((action: bookActions.DeleteBook) => action.payload),
    mergeMap((bookId: number) =>
      this._bookSvc.deleteBook(bookId).pipe(
        map(() => (new bookActions.DeleteBookSuccess(bookId))),
        catchError(err => of(new bookActions.DeleteBookFail(err)))
      )
    )
  );
}

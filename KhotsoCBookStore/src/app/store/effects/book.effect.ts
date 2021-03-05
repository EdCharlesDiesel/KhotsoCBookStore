import { SimilarBookFail } from './../actions/book.actions';
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { of } from "rxjs";
import { Observable } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { Book } from "src/app/models/book";
import { BookService } from "src/app/services/book.service";
import * as bookActions from '../actions/book.actions';

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

    @Effect()
    updateBook$: Observable<Action> = this.actions$.pipe(
        ofType(bookActions.BookActionTypes.UpdateBook),
        map((action: bookActions.UpdateBook) => action.payload),
        mergeMap((book: Book) =>
            this.bookService.updateBookDetails(book).pipe(
                map((updatedBook: Book) => {
                    return (new bookActions.UpdateBookSuccess(updatedBook));
                }),
                catchError(err => of(new bookActions.UpdateBookFail(err)))
            )
        )
    );

    @Effect()
    addBook$: Observable<Action> = this.actions$.pipe(
        ofType(bookActions.BookActionTypes.CreateBook),
        map((action: bookActions.CreateBook) => action.payload),
        mergeMap((book: Book) =>
            this.bookService.addBook(book).pipe(
                map((newBook: Book) => (new bookActions.CreateBookSuccess(newBook))),
                catchError(err => of(new bookActions.CreateBookFail(err)))
            )
        )
    );

    @Effect()
    deleteBook$: Observable<Action> = this.actions$.pipe(
        ofType(bookActions.BookActionTypes.DeleteBook),
        map((action: bookActions.DeleteBook) => action.payload),
        mergeMap((bookId: number) =>
            this.bookService.deleteBook(bookId).pipe(
                map(() => (new bookActions.DeleteBookSuccess(bookId))),
                catchError(err => of(new bookActions.DeleteBookFail(err)))
            )
        )
    );

    @Effect()
    similarBooks$: Observable<Action> = this.actions$.pipe(
        ofType(bookActions.BookActionTypes.SimilarBook),
        mergeMap(() =>
            this.bookService.getAllBooks().pipe(
                map(books => (new bookActions.SimilarBookSuccess(books))),
                catchError(err => of(new bookActions.SimilarBookFail(err)))
            )
        )
    );
}

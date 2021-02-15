import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Book } from './book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private booksUrl = 'api/books';
  private books: Book[];

  private selectedBookSource = new BehaviorSubject<Book | null>(null);
  selectedBookChanges$ = this.selectedBookSource.asObservable();

  constructor(private http: HttpClient) { }

  changeSelectedBook(selectedBook: Book | null): void {
    this.selectedBookSource.next(selectedBook);
  }

  getBooks(): Observable<Book[]> {
    if (this.books) {
      return of(this.books);
    }
    return this.http.get<Book[]>(this.booksUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        tap(data => this.books = data),
        catchError(this.handleError)
      );
  }

  // Return an initialized book
  newBook(): Book {
    return {
      id: 0,
      bookName: '',
      bookCode: 'New',
      description: '',
      starRating: 0
    };
  }

  createBook(book: Book): Observable<Book> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    book.id = null;
    return this.http.post<Book>(this.booksUrl, book, { headers: headers })
      .pipe(
        tap(data => console.log('createBook: ' + JSON.stringify(data))),
        tap(data => {
          this.books.push(data);
        }),
        catchError(this.handleError)
      );
  }

  deleteBook(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.booksUrl}/${id}`;
    return this.http.delete<Book>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteBook: ' + id)),
        tap(data => {
          const foundIndex = this.books.findIndex(item => item.id === id);
          if (foundIndex > -1) {
            this.books.splice(foundIndex, 1);
          }
        }),
        catchError(this.handleError)
      );
  }

  updateBook(book: Book): Observable<Book> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.booksUrl}/${book.id}`;
    return this.http.put<Book>(url, book, { headers: headers })
      .pipe(
        tap(() => console.log('updateBook: ' + book.id)),
        // Update the item in the list
        // This is required because the selected book that was edited
        // was a copy of the item from the array.
        tap(() => {
          const foundIndex = this.books.findIndex(item => item.id === book.id);
          if (foundIndex > -1) {
            this.books[foundIndex] = book;
          }
        }),
        // Return the book on an update
        map(() => book),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}

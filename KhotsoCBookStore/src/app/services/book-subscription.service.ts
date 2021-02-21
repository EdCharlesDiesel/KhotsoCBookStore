import { Book } from './../models/book';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { BookSubscription } from '../models/booksubscription';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BookSubscriptionService {

  private bookSubscriptions: BookSubscription[] = [];
  bookSubCount = 0;
  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = 'https://localhost:5000/api/BookSubscription/';
  }

  getBookSubscriptions(): Observable<BookSubscription[]> {
    return this.http.get<BookSubscription[]>(this.baseURL)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  
  addBookSubscription(bookSubscription: BookSubscription): Observable<BookSubscription> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    bookSubscription.bookSubId = null;
    return this.http.post<BookSubscription>(this.baseURL, bookSubscription, { headers })
      .pipe(
        tap(data => console.log('addBookSubscription: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteBookSubscription(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.baseURL}/${id}`;
    return this.http.delete<BookSubscription>(url, { headers })
      .pipe(
        tap(data => console.log('deleteBookSub: ' + id)),
        catchError(this.handleError)
      );
  }


  getBookSubs(): Observable<BookSubscription[]> {

    return this.http.get<BookSubscription[]>(this.baseURL)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }



  clearBookSub(bookSubId: number) {
    return this.http.delete<number>(this.baseURL + `${bookSubId}`, {});
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

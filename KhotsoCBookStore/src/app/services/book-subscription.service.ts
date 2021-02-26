
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { BookSubscription } from '../models/booksubscription';
import { SubscriptionService } from './subscription.service';


@Injectable({
  providedIn: 'root'
})
export class BookSubscriptionService {
  bookSubCount = 0;
  baseURL: string;

  constructor(private http: HttpClient,
              private subscriptionService: SubscriptionService) {
    this.baseURL = 'https://localhost:5000/api/bookSubscription';
  }

  getBookSubscriptions(): Observable<BookSubscription[]> {
    return this.http.get<BookSubscription[]>(this.baseURL)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createBookSubscription(bookSubscription: BookSubscription): Observable<BookSubscription> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    bookSubscription.bookSubId = null;
    return this.http.post<BookSubscription>(this.baseURL, bookSubscription, { headers })
      .pipe(
        tap(data => console.log('createBookSubscription: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteBookSubscription(bookId: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.baseURL}/${bookId}`;
    return this.http.delete<BookSubscription>(url, { headers })
      .pipe(
        tap(data => console.log('deleteBookSub: ' + bookId)),
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

  clearBookSubscription(userId: number) {
    return this.http.delete<number>(this.baseURL + `${userId}`, {}).pipe(
      map((response: number) => {
        this.subscriptionService.bookSubscriptionItem$.next([]);
        return response;
      })
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

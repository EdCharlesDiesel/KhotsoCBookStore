import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BookSubscription } from '../models/booksubscription';


@Injectable({
  providedIn: 'root'
})
export class BookSubscriptionService {

  bookSubCount = 0;
  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = 'https://localhost:5000/api/BookSubscription/';
  }

  
  addBookSubscription(bookSubscription:BookSubscription) {
    return this.http.post(this.baseURL, BookSubscription);
  }

  addSingleBookSubscription(bookSubId:number) {
    return this.http.get<number>(this.baseURL + `/${bookSubId}`);
  }


  getbookAllBookSubs() {
    return this.http.get(this.baseURL )
      .pipe(map((response: any) => {
        this.bookSubCount = response.length;
        return response;
      }));
  }

  removebookSubs(bookSubId: number) {
    return this.http.delete<number>(this.baseURL + `/${bookSubId}`, {});
  }

  deleteOnebookSub(bookSubId: number) {
    return this.http.put<number>(this.baseURL + `/${bookSubId}`, {});
  }

  clearBookSub(bookSubId: number) {
    return this.http.delete<number>(this.baseURL + `${bookSubId}`, {});
  }

}

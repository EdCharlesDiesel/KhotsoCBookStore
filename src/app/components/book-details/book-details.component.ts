import { BookRequested } from './../../store/actions/book.action';
import { selectBookById } from './../../store/selectors/book.selector';
import { select, Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError, filter, first, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { BooksState } from 'src/app/store/reducers/book.reducer';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  bookId: number;
  BookDetails$: Observable<Book>;
  userData$: Observable<User>;

  constructor(
    private store: Store<BooksState>,
    private bookService: BookService,
    private route: ActivatedRoute,
    private subscriptionService: SubscriptionService) {
    // this.bookId = this.route.snapshot.paramMap.get('id'); this.userId = JSON.parse(localStorage.getItem('userId') || '{}');
    this.bookId = JSON.parse(this.route.snapshot.paramMap.get('id') || '{}');
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.bookId = +params.id;
        this.getBookDetails();
      }
    );
    this.userData$ = this.subscriptionService.userData;
  }

  getBookDetails(): any {
    const bookId = this.route.params[this.bookId];

    return this.store.pipe(
      select(selectBookById(bookId)),
      tap(book => {
        if (!book) {
          this.store.dispatch(new BookRequested({ bookId }));
        }
      }),
      filter(book => !!book),
      first()
    ).subscribe(console.log);




    // this.BookDetails$ = this.bookService.getBookById(this.bookId)
    //   .pipe(
    //     catchError(error => {
    //       console.log('Error ocurred while fetching book data : ', error);
    //       return EMPTY;
    //     }));
  }
}

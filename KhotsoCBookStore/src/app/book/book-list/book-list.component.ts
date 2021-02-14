import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Book } from '../book';
import { BookService } from '../book.service';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'kc-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {
  pageTitle = 'Books';
  errorMessage: string;

  displayCode: boolean;

  books: Book[];

  // Used to highlight the selected book in the list
  selectedBook: Book | null;
  sub: Subscription;

  constructor(private store: Store<any>,
              private bookService: BookService) { }

  ngOnInit(): void {
    this.sub = this.bookService.selectedBookChanges$.subscribe(
      selectedBook => this.selectedBook = selectedBook
    );

    this.bookService.getBooks().subscribe(
      (books: Book[]) => this.books = books,
      (err: any) => this.errorMessage = err.error
    );

    // TODO: Unsubscribe
    this.store.pipe(select('books')).subscribe(
      books => {
        if (books) {
          this.displayCode = books.showBookCode;
        }
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  checkChanged(value: boolean): void {
    this.store.dispatch({
      type: 'TOGGLE_PRODUCT_CODE',
      payload: value
    });
  }

  newBook(): void {
    this.bookService.changeSelectedBook(this.bookService.newBook());
  }

  bookSelected(book: Book): void {
    this.bookService.changeSelectedBook(book);
  }

}

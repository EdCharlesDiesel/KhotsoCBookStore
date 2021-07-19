import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from 'src/app/models/book';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { switchMap, tap } from 'rxjs/operators';
import { SubscriptionService } from 'src/app/services/subscription.service';
// import * as bookActions from './state/book.actions';
import { Store } from '@ngrx/store';
import { BookState } from 'src/app/store/reducers/book.reducer';
import { Load, LoadSuccess } from 'src/app/store/actions/book.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public books: Book[];
  public filteredBooks: Book[];
  category: string;
  priceRange = Number.MAX_SAFE_INTEGER;
  isLoading: boolean;
  searchItem: string;

  constructor(
    private store: Store<BookState>,
    private route: ActivatedRoute,
    private bookService: BookService,
    private subscriptionService: SubscriptionService) {
    this.store.dispatch(new LoadSuccess(this.filteredBooks));
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getAllBookData();
  }

  getAllBookData(): void {
    this.store.dispatch(new Load());
    this.bookService.books$.pipe(switchMap(
      (data: Book[]) => {
        this.filteredBooks = data;
        return this.route.queryParams;
      })
      // ,
      // tap(() => {
      // })
    ).subscribe(params => {
      this.category = params.category;
      this.searchItem = params.item;
      this.subscriptionService.searchItemValue$.next(this.searchItem);
      this.filterBookData();
    });
  }

  filterPrice(value: number): any {
    this.priceRange = value;
    this.filterBookData();
  }

  filterBookData(): any {
    const filteredData = this.filteredBooks.filter(b => b.purchasePrice <= this.priceRange).slice();

    if (this.category) {
      this.books = filteredData.filter(b => b.category.toLowerCase() === this.category.toLowerCase());
    } else if (this.searchItem) {
      this.books = filteredData.filter(b => b.name.toLowerCase().indexOf(this.searchItem) !== -1
        || b.author.toLowerCase().indexOf(this.searchItem) !== -1);
    } else {
      this.books = filteredData;
    }
    this.isLoading = false;
  }

  ngOnDestroy(): any {
    this.subscriptionService.searchItemValue$.next('');
  }
}

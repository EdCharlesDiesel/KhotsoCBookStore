import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { BookSubscriptionService } from './book-subscription.service';
import { BookSubscriptionState } from './state/bookSubscriptions.reducers';
import * as fromBookSubscription from '../book-subscription/state/bookSubscriptions.selectors';
import * as bookSubscriptionActions from '../book-subscription/state/bookSubscriptions.actions';
import { BookSubscription } from './booksubscription';

@Component({
  selector: 'app-book-subscription',
  templateUrl: './book-subscription.component.html',
  styleUrls: ['./book-subscription.component.css']
})
export class BookSubscriptionComponent implements OnInit {

  selectedBookSubscription$: Observable<BookSubscription>;
  bookSubscriptions$: Observable<BookSubscription[]>;
  errorMessage$: Observable<string>;



  private bookSubStore: Store<BookSubscriptionState>
  public BookSub;
  public bookSubscriptionItems: BookSubscription[];
  userId;
  totalBooks: number;
  private unsubscribe$ = new Subject<void>();
  isLoading: boolean;

  constructor(
    private store: Store<fromBookSubscription.State>,

    private bookSubService: BookSubscriptionService,
    private snackBarService: SnackbarService,
    private subscriptionService: SubscriptionService) {
    this.userId = JSON.parse(localStorage.getItem('userId') || '{}');
    this.bookSubscriptionItems = [];
    this.totalBooks = 0;
    this.isLoading = false;
  }

  ngOnInit() {

    this.store.dispatch(new bookSubscriptionActions.Load());
    this.bookSubscriptions$ = this.store.pipe(select(fromBookSubscription.getBookSubscriptions));
    this.errorMessage$ = this.store.pipe(select(fromBookSubscription.getError));
    this.selectedBookSubscription$ = this.store.pipe(select(fromBookSubscription.getCurrentBookSubscription));



    this.bookSubscriptionItems = [];
    this.isLoading = true;
   this.getLoadBookSubscription();
  // this.newBookSubscription();
  }

  newBookSubscription(): void {
    this.store.dispatch(new bookSubscriptionActions.InitializeCurrentBookSubscription());
  }

  bookSubscriptionSelected(bookSubscription: BookSubscription): void {
    this.store.dispatch(new bookSubscriptionActions.SetCurrentBookSubscription(bookSubscription));
  }

  deleteBookSubscription(bookSubscription: BookSubscription): void {
    this.store.dispatch(new bookSubscriptionActions.DeleteBookSubscription(bookSubscription.bookSubId));
  }
 
  saveBookSubscription(bookSubscription: BookSubscription): void {
    this.store.dispatch(new bookSubscriptionActions.CreateBookSubscription(bookSubscription));
  }

  getTotalBooks() {
    return this.bookSubscriptionItems.length;
  }

  getLoadBookSubscription() {
    this.bookSubService.getBookSubscriptions()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result: BookSubscription[]) => {
          this.bookSubscriptionItems = result;
          this.getTotalBooks();
          this.isLoading = false;
        }, error => {
          console.log('Error ocurred while fetching: ', error);
      }
    );
  }


  deleteBookSub(bookSubId: number) {
    this.store.dispatch(new bookSubscriptionActions.DeleteBookSubscription(bookSubId));
    this.bookSubService.deleteBookSubscription(bookSubId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        () => {
          this.subscriptionService.bookSubItemcount$.next(bookSubId);
          this.snackBarService.showSnackBar('Book removed from your subscription list');
          this.getLoadBookSubscription();
        }, error => {
          console.log('Error ocurred while deleting  subscription item : ', error);
      });
  }

  // addBookSub(bookSub: BookSubscription) {
  //   this.bookSubService.addBookSubscription(bookSub)
  //     .pipe(takeUntil(this.unsubscribe$))
  //     .subscribe(
  //       result => {
  //         this.subscriptionService.bookSubItemcount$.next(bookSub.bookSubId);
  //         this.snackBarService.showSnackBar('One item added to book subbscription');
  //         this.getBookSubItems();
  //       }, error => {
  //         console.log('Error ocurred while adding book subscription  data : ', error);
  //       });
  // }




  // clearBookSubscription() {
  //   this.bookSubService.deleteBookSubscription()
  //     .pipe(takeUntil(this.unsubscribe$))
  //     .subscribe(
  //       result => {
  //         this.subscriptionService.cartItemcount$.next(result);
  //         this.snackBarService.showSnackBar('Cart cleared!!!');
  //         this.getShoppingbookSubItems();
  //       }, error => {
  //         console.log('Error ocurred while deleting cart item : ', error);
  //       });
  // }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

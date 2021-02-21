import { BookSubscriptionService } from './../../services/book-subscription.service';
import { BookSubscription } from './../../models/booksubscription';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-book-sub',
  templateUrl: './book-sub.component.html',
  styleUrls: ['./book-sub.component.css']
})
export class BookSubComponent implements OnInit {
public BookSub;
  public bookSubItems: BookSubscription[];
  userId;
  totalBooks: number;
  private unsubscribe$ = new Subject<void>();
  isLoading: boolean;

  constructor(
    private bookSubService: BookSubscriptionService,
    private snackBarService: SnackbarService,
    private subscriptionService: SubscriptionService) {
    this.userId = JSON.parse(localStorage.getItem('userId') || '{}');
    this.bookSubItems = [];
    this.totalBooks = 0;
    this.isLoading = false;
    

  }

  ngOnInit() {
    this.bookSubItems = [];
    this.isLoading = true;
    this.getBookSubItems();
  }

  getBookSubItems() {
    this.bookSubService.getbookAllBookSubs()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result: BookSubscription[]) => {
          this.bookSubItems = result;
          this.getTotalBooks();
          this.isLoading = false;
        }, error => {
          console.log('Error ocurred while fetching shopping cart item : ', error);
        });
  }

  getTotalBooks() {
    return this.bookSubItems.length;
    
  }

  // getTotalPrice() {
  //   this.totalPrice = 0;
  //   this.bookSubItems.forEach(item => {
  //     this.totalPrice += (item.book.price * item.quantity);
  //   });
  // }

  deleteBookSubtem(bookSubId: number) {
    this.bookSubService.removebookSubs(bookSubId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        result => {
          this.subscriptionService.bookSubItemcount$.next(result);
          this.snackBarService.showSnackBar('Book removed from your subscription list');
          this.getBookSubItems();
        }, error => {
          console.log('Error ocurred while deleting  subscription item : ', error);
        });
  }

  addBookSub(bookSub: number) {
    this.bookSubService.addSingleBookSubscription(bookSub)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        result => {
          this.subscriptionService.bookSubItemcount$.next(result);
          this.snackBarService.showSnackBar('One item added to book subbscription');
          this.getBookSubItems();
        }, error => {
          console.log('Error ocurred while adding book subscription  data : ', error);
        });
  }


  

  // clearBookSubscription() {
  //   this.bookSubService.clearbookSub()
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
import { ActionReducerMap } from '@ngrx/store';
import * as fromBooks from './books.reducer';

export interface BooksState{
  books:fromBooks.BookState
}

export const reducer: ActionReducerMap<BooksState> ={
  books: fromBooks.reducer,
}

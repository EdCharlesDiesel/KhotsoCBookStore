import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Book } from 'src/app/models/book';
import * as fromRoot from '../app.state';
import * as fromBooks from '../reducers/book.reducer';

// Extends the app state to include the book feature.
// This is required because books are lazy loaded.
// So the reference to BookState cannot be added to app.state.ts directly.
// export interface BookState extends fromRoot.AppState {
//   books: fromBooks.BookState;
// }

// Selector functions
const selectBooksState = createFeatureSelector<fromBooks.BooksState>('books');


export const selectBookById = (bookId: number): any => createSelector(
  selectBooksState,
  booksState => booksState.entities[bookId],
);

export const selectAllBooks = createSelector(
  selectBooksState,
  fromBooks.selectAll
);
  // export const getShowBookCode = createSelector(
  //   getBookFeatureState,
  //   state => state.showBookCode
  // );

// export const getCurrentBook = createSelector(
//   getBookFeatureState,
//   getCurrentBookId,
//   (state, currentBookId) => {
//     if (currentBookId === 0) {
//       return {
//         bookId: 0,
//         name: '',
//         text: '',
//         author: '',
//         category: '',
//         purchasePrice: '',
//         coverFileName: ''
//       };
//     } else {
//       return currentBookId ? state.books.find(p => p.bookId === currentBookId) : null;
//     }
//   }
// );

// export const getBooks = createSelector(
//   getBookFeatureState,
//   state => state.books
// );

// export const getError = createSelector(
//   getBookFeatureState,
//   state => state.error
// );

import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../store/states/global.state';
import * as fromBooks from '../reducers/book.reducers';


export interface State extends fromRoot.GlobalState {
    books: fromBooks.BookState;
}

// Selector functions
const getBookFeatureState = createFeatureSelector<fromBooks.BookState>('products');

export const getCurrentBookId = createSelector(
    getBookFeatureState,
    state => state.currentBookId
);

export const getCurrentBook = createSelector(
    getBookFeatureState,
    getCurrentBookId,
    (state, currentBookId) => {
        if (currentBookId === 0) {
            return {
                bookId: 0,
                name: '',
                text: '',
                author: '',
                category: '',
                purchasePrice: 0,
                coverFileName: ''
            };
        } else {
            return currentBookId ? state.books.find(p => p.bookId === currentBookId) : null;
        }
    }
);

export const getBooks = createSelector(
    getBookFeatureState,
    state => state.books
);

export const getError = createSelector(
    getBookFeatureState,
    state => state.error
);

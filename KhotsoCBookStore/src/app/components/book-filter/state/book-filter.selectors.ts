import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';
import * as fromRoot from '../../../state/app.state';
import * as fromBooks from './book-filter.reducers';

// Extends the app state to include the book feature.
// This is required because books are lazy loaded.
// So the reference to BookState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
    books: fromBooks.BookFilterState;
    
}

// Selector functions
const getBookFeatureState = createFeatureSelector<fromBooks.BookFilterState>('books');

export const getBooks = createSelector(
    getBookFeatureState,
    state => state.books
);

export const getError = createSelector(
    getBookFeatureState,
    state => state.error
);
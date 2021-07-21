import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Book } from 'src/app/models/book';
import { BookActions, BookActionTypes } from '../actions/book.action';

export const bookFeatureKey = 'book';

// State for this feature (Book)

// export type BooksState = EntityState<Book>
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BooksState extends EntityState<Book> {
}

export const adapter: EntityAdapter<Book> =
  createEntityAdapter<Book>();

export const initialBooksState: BooksState = adapter.getInitialState();

export function booksReducer(state = initialBooksState, action: BookActions): BooksState {
  switch (action.type) {
    case BookActionTypes.BookLoaded:
      return adapter.addOne(action.payload.book, state);

    default: {
      return state;
    }
  }
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();


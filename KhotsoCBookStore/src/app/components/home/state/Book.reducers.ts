
import { Book } from '../../../models/book';
import { BookActionTypes, BookActions } from './book.actions';

// State for this feature (Book)
export interface BookState {

  books: Book[];
  error: string;
}

const initialState: BookState = {
  books: [],
  error: ''
};

export function reducer(state = initialState, action: BookActions): BookState {

  switch (action.type) {

    case BookActionTypes.LoadSuccess:
      return {
        ...state,
        books: action.payload,
        error: ''
      };

    case BookActionTypes.LoadFail:
      return {
        ...state,
        books: [],
        error: action.payload
      };

    default:
      return state;
  }
}

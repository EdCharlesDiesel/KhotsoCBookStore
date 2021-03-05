
import { Book } from 'src/app/models/book';
import { BookActions,BookActionTypes } from '../actions/book.actions';


// State for this feature (Book)
export interface BookState {  
  currentBookId: number | null;
  books: Book[];
  error: string;
}

const initialState: BookState = {  
  currentBookId: null,
  books: [],
  error: ''
};

export function reducer(state = initialState, action: BookActions): BookState {

  switch (action.type) {

    case BookActionTypes.ClearCurrentBook:
      return {
        ...state,
        currentBookId: null
      };

    case BookActionTypes.InitializeCurrentBook:
      return {
        ...state,
        currentBookId: 0
      };

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

    case BookActionTypes.UpdateBookSuccess:
      const updatedBooks = state.books.map(
        item => action.payload.bookId === item.bookId ? action.payload : item);
      return {
        ...state,
        books: updatedBooks,
        currentBookId: action.payload.bookId,
        error: ''
      };

    case BookActionTypes.UpdateBookFail:
      return {
        ...state,
        error: action.payload
      };

    // After a create, the currentBook is the new book.
    case BookActionTypes.CreateBookSuccess:
      return {
        ...state,
        books: [...state.books, action.payload],
        currentBookId: action.payload.bookId,
        error: ''
      };

    case BookActionTypes.CreateBookFail:
      return {
        ...state,
        error: action.payload
      };

    // After a delete, the currentBook is null.
    case BookActionTypes.DeleteBookSuccess:
      return {
        ...state,
        books: state.books.filter(book => book.bookId !== action.payload),
        currentBookId: null,
        error: ''
      };

    case BookActionTypes.DeleteBookFail:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
}

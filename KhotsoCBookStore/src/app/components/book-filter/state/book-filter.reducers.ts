import { Categories } from './../../../models/categories';

import { Book } from 'src/app/models/book';
import { BookFilterActionTypes, BookFilterActions } from './book-filter.actions';

// State for this feature (BookFilter)
export interface BookFilterState {
categories: Categories[]
  books: Book[];
  error: string;
}

const initialState: BookFilterState = {
  categories: [],
  books: [],
  error: ''
};

export function reducer(state = initialState, action: BookFilterActions): BookFilterState {

  switch (action.type) {

    case BookFilterActionTypes.LoadSuccess:
      return {
        ...state,
        categories: action.payload,
        error: ''
      };

    case BookFilterActionTypes.LoadFail:
      return {
        ...state,      
        error: action.payload
      };

    default:
      return state;
  }
}

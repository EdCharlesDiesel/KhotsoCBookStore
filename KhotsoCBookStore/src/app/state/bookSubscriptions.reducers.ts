import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { BookSubscription } from '../models/booksubscription';

import { BookSubscriptionActions, BookSubscriptionActionTypes } from './bookSubscriptions.actions';

export interface BookSubscriptionState {

  currentBookSubscriptionId: number | null;
  bookSubscriptions: BookSubscription[];
  error: string;
}

const initialState: BookSubscriptionState = {

  currentBookSubscriptionId: null,
  bookSubscriptions: [] = [],
  error: ''
};



export function BookSubscriptionReducer(
  state: BookSubscriptionState = initialState,
  action: BookSubscriptionActions
): BookSubscriptionState {
  switch (action.type) {

    case BookSubscriptionActionTypes.GET_BOOKSUB_SUCCESS: {
      return {
        ...state,
        bookSubscriptions: [],
        error: ''
      };
    }

    case BookSubscriptionActionTypes.GET_BOOKSUB_FAILURE: {
      return {
        ...state,
        bookSubscriptions: [],
        error: action.payload
      };
    }


    case BookSubscriptionActionTypes.ADD_BOOKSUB_SUCCESS: {
      return {
        ...state,
        bookSubscriptions: [...state.bookSubscriptions, action.payload],
        currentBookSubscriptionId: action.payload.bookSubId,
        error: ''
      }
    }

    case BookSubscriptionActionTypes.ADD_BOOKSUB_FAILURE: {
      return {
        ...state,
        error: action.payload
      };
    }

    case BookSubscriptionActionTypes.DELETE_BOOKSUB_SUCCESS: {
      return {
        ...state,
        bookSubscriptions: state.bookSubscriptions.filter(bookSub => bookSub.bookSubId !== action.payload),
        currentBookSubscriptionId: null,
        error: ''
      };
    }

    case BookSubscriptionActionTypes.DELETE_BOOKSUB_FAILURE: {
      return {
        ...state,
        error: action.payload
      };
    }
    default:
      return state;
  }
}

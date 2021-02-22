
import { BookSubscription } from 'src/app/models/booksubscription';
import { BookSubscriptionActionTypes, BookSubscriptionActions } from './bookSubscriptions.actions';

// State for this feature (BookSubscription)
export interface BookSubscriptionState {
  currentBookSubscriptionId: number | null;
  bookSubscriptions: BookSubscription[];
  error: string;
}

const initialState: BookSubscriptionState = {
  currentBookSubscriptionId: null,
  bookSubscriptions: [],
  error: ''
};

export function reducer(state = initialState, action: BookSubscriptionActions): BookSubscriptionState {

  switch (action.type) {

    case BookSubscriptionActionTypes.SetCurrentBookSubscription:
      return {
        ...state,
        currentBookSubscriptionId: action.payload.bookSubId
      };

    case BookSubscriptionActionTypes.ClearCurrentBookSubscription:
      return {
        ...state,
        currentBookSubscriptionId: null
      };

    case BookSubscriptionActionTypes.InitializeCurrentBookSubscription:
      return {
        ...state,
        currentBookSubscriptionId: 0
      };

    case BookSubscriptionActionTypes.LoadSuccess:
      return {
        ...state,
        bookSubscriptions: action.payload,
        error: ''
      };

    case BookSubscriptionActionTypes.LoadFail:
      return {
        ...state,
        bookSubscriptions: [],
        error: action.payload
      };

       // After a create, the currentBookSubscription is the new bookSubscription.
    case BookSubscriptionActionTypes.CreateBookSubscriptionSuccess:
      return {
        ...state,
        bookSubscriptions: [...state.bookSubscriptions, action.payload],
        currentBookSubscriptionId: action.payload.bookSubId,
        error: ''
      };

    case BookSubscriptionActionTypes.CreateBookSubscriptionFail:
      return {
        ...state,
        error: action.payload
      };

    // After a delete, the currentBookSubscription is null.
    case BookSubscriptionActionTypes.DeleteBookSubscriptionSuccess:
      return {
        ...state,
        bookSubscriptions: state.bookSubscriptions.filter(bookSubscription => bookSubscription.bookSubId !== action.payload),
        currentBookSubscriptionId: null,
        error: ''
      };

    case BookSubscriptionActionTypes.DeleteBookSubscriptionFail:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
}

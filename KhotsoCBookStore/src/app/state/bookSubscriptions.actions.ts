import { Action } from '@ngrx/store';

import { BookSubscription } from '../models/booksubscription';

export enum BookSubscriptionActionTypes {
  GET_BOOKSUB = '[GET BOOKSUB]',
  GET_BOOKSUB_SUCCESS = '[GET_BOOKSUB] SUCCESS',
  GET_BOOKSUB_FAILURE = '[GET_BOOKSUB] FAILURE',

  ADD_BOOKSUB = '[ADD BOOKSUB]',
  ADD_BOOKSUB_SUCCESS = '[ADD_BOOKSUB] SUCCESS',
  ADD_BOOKSUB_FAILURE = '[ADD_BOOKSUB] FAILURE',

  // UPDATE_BOOKSUB = '[UPDATE BOOKSUB]',
  // UPDATE_BOOKSUB_SUCCESS = '[UPDATE_BOOKSUB] SUCCESS',
  // UPDATE_BOOKSUB_FAILURE = '[UPDATE_BOOKSUB] FAILURE',

  DELETE_BOOKSUB = '[DELETE BOOKSUB]',
  DELETE_BOOKSUB_SUCCESS = '[DELETE_BOOKSUB] SUCCESS',
  DELETE_BOOKSUB_FAILURE = '[DELETE_BOOKSUB] FAILURE',
}

export class GetBookSubscriptions implements Action {
  readonly type = BookSubscriptionActionTypes.GET_BOOKSUB;
}
export class GetBookSubscriptionsSuccess implements Action {
  readonly type = BookSubscriptionActionTypes.GET_BOOKSUB_SUCCESS;
  constructor( public payload: BookSubscription){}
}
export class GetBookSubscriptionsFailure implements Action {
  readonly type = BookSubscriptionActionTypes.GET_BOOKSUB_FAILURE;
  constructor( public payload: string){}
}

export class AddBookSubscription implements Action {
  readonly type = BookSubscriptionActionTypes.ADD_BOOKSUB;
  constructor(
    public payload: BookSubscription
  ) {}
}
export class AddBookSubscriptionSuccess implements Action {
  readonly type = BookSubscriptionActionTypes.ADD_BOOKSUB_SUCCESS;
  constructor(public payload: BookSubscription) { }
}
export class AddBookSubscriptionFailure implements Action {
  readonly type = BookSubscriptionActionTypes.ADD_BOOKSUB_FAILURE;
  constructor(public payload: string) { }
}

export class DeleteBookSubscription implements Action {
  readonly type = BookSubscriptionActionTypes.DELETE_BOOKSUB;
  constructor(public payload: number) {}
}

export class DeleteBookSubscriptionSuccess implements Action {
  readonly type = BookSubscriptionActionTypes.DELETE_BOOKSUB_SUCCESS;
  constructor(public payload: number) {}
}
export class DeleteBookSubscriptionFailure implements Action {
  readonly type = BookSubscriptionActionTypes.DELETE_BOOKSUB_FAILURE;
  constructor(public payload: string) {}
}

// export class UpdateBookSubscription implements Action {
//   readonly type = BookSubscriptionActionTypes.UPDATE_BOOKSUB;
//   constructor(
//     public payload: {
//       booKSubId: number;      
//     }
//   ) {}
// }
// export class UpdateBookSubscriptionSuccess implements Action {
//   readonly type = BookSubscriptionActionTypes.UPDATE_BOOKSUB_SUCCESS;
// }
// export class UpdateBookSubscriptionFailure implements Action {
//   readonly type = BookSubscriptionActionTypes.UPDATE_BOOKSUB_FAILURE;
// }



export type BookSubscriptionActions =
  | AddBookSubscription
  | AddBookSubscriptionSuccess
  | AddBookSubscriptionFailure
  | GetBookSubscriptions
  | GetBookSubscriptionsSuccess
  | GetBookSubscriptionsFailure
  // | UpdateBookSubscription
  // | UpdateBookSubscriptionSuccess
  // | UpdateBookSubscriptionFailure
  | DeleteBookSubscription
  | DeleteBookSubscriptionSuccess
  | DeleteBookSubscriptionFailure;

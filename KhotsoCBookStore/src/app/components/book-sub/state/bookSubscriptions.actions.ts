import { Action } from '@ngrx/store';

import { BookSubscription } from '../booksubscription';
export enum BookSubscriptionActionTypes {
  SetCurrentBookSubscription = '[BookSubscription] Set Current BookSubscription',
  ClearCurrentBookSubscription = '[BookSubscription] Clear Current BookSubscription',
  InitializeCurrentBookSubscription = '[BookSubscription] Initialize Current BookSubscription',
  Load = '[BookSubscription] Load',
  LoadSuccess = '[BookSubscription] Load Success',
  LoadFail = '[BookSubscription] Load Fail',
  CreateBookSubscription = '[BookSubscription] Create BookSubscription',
  CreateBookSubscriptionSuccess = '[BookSubscription] Create BookSubscription Success',
  CreateBookSubscriptionFail = '[BookSubscription] Create BookSubscription Fail',
  DeleteBookSubscription = '[BookSubscription] Delete BookSubscription',
  DeleteBookSubscriptionSuccess = '[BookSubscription] Delete BookSubscription Success',
  DeleteBookSubscriptionFail = '[BookSubscription] Delete BookSubscription Fail'
}

export class SetCurrentBookSubscription implements Action {
  readonly type = BookSubscriptionActionTypes.SetCurrentBookSubscription;

  constructor(public payload: BookSubscription) { }
}

export class ClearCurrentBookSubscription implements Action {
  readonly type = BookSubscriptionActionTypes.ClearCurrentBookSubscription;
}

export class InitializeCurrentBookSubscription implements Action {
  readonly type = BookSubscriptionActionTypes.InitializeCurrentBookSubscription;
}

export class Load implements Action {
  readonly type = BookSubscriptionActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = BookSubscriptionActionTypes.LoadSuccess;

  constructor(public payload: BookSubscription[]) { }
}

export class LoadFail implements Action {
  readonly type = BookSubscriptionActionTypes.LoadFail;

  constructor(public payload: string) { }
}

export class CreateBookSubscription implements Action {
  readonly type = BookSubscriptionActionTypes.CreateBookSubscription;

  constructor(public payload: BookSubscription) { }
}

export class CreateBookSubscriptionSuccess implements Action {
  readonly type = BookSubscriptionActionTypes.CreateBookSubscriptionSuccess;

  constructor(public payload: BookSubscription) { }
}

export class CreateBookSubscriptionFail implements Action {
  readonly type = BookSubscriptionActionTypes.CreateBookSubscriptionFail;

  constructor(public payload: string) { }
}

export class DeleteBookSubscription implements Action {
  readonly type = BookSubscriptionActionTypes.DeleteBookSubscription;

  constructor(public payload: number) { }
}

export class DeleteBookSubscriptionSuccess implements Action {
  readonly type = BookSubscriptionActionTypes.DeleteBookSubscriptionSuccess;

  constructor(public payload: number) { }
}

export class DeleteBookSubscriptionFail implements Action {
  readonly type = BookSubscriptionActionTypes.DeleteBookSubscriptionFail;

  constructor(public payload: string) { }
}

// Union the valid types
export type BookSubscriptionActions = 
  | SetCurrentBookSubscription
  | ClearCurrentBookSubscription
  | InitializeCurrentBookSubscription
  | Load
  | LoadSuccess
  | LoadFail
  | CreateBookSubscription
  | CreateBookSubscriptionSuccess
  | CreateBookSubscriptionFail
  | DeleteBookSubscription
  | DeleteBookSubscriptionSuccess
  | DeleteBookSubscriptionFail;


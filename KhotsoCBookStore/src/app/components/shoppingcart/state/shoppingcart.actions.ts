import { Action } from '@ngrx/store';

import { ShoppingCart } from '../shoppingcart';
export enum ShoppingCartActionTypes {
  GetTotalPrice = '[ShoppingCart] Get total price ',
  SetCurrentShoppingCart = '[ShoppingCart] Set Current ShoppingCart',
  ClearCurrentShoppingCart = '[ShoppingCart] Clear Current ShoppingCart',
  InitializeCurrentShoppingCart = '[ShoppingCart] Initialize Current ShoppingCart',
  Load = '[ShoppingCart] Load',
  LoadSuccess = '[ShoppingCart] Load Success',
  LoadFail = '[ShoppingCart] Load Fail',
  DeleteShoppingCart = '[ShoppingCart] Delete ShoppingCart',
  DeleteShoppingCartSuccess = '[ShoppingCart] Delete ShoppingCart Success',
  DeleteShoppingCartFail = '[ShoppingCart] Delete ShoppingCart Fail'
}

export class SetCurrentShoppingCart implements Action {
  readonly type = ShoppingCartActionTypes.SetCurrentShoppingCart;

  constructor(public payload: ShoppingCart) { }
}

export class ClearCurrentShoppingCart implements Action {
  readonly type = ShoppingCartActionTypes.ClearCurrentShoppingCart;
}

export class InitializeCurrentShoppingCart implements Action {
  readonly type = ShoppingCartActionTypes.InitializeCurrentShoppingCart;
}

export class Load implements Action {
  readonly type = ShoppingCartActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = ShoppingCartActionTypes.LoadSuccess;

  constructor(public payload: ShoppingCart[]) { }
}

export class LoadFail implements Action {
  readonly type = ShoppingCartActionTypes.LoadFail;

  constructor(public payload: string) { }
}

export class DeleteShoppingCart implements Action {
  readonly type = ShoppingCartActionTypes.DeleteShoppingCart;

  constructor(public payload: number) { }
}

export class DeleteShoppingCartSuccess implements Action {
  readonly type = ShoppingCartActionTypes.DeleteShoppingCartSuccess;

  constructor(public payload: number) { }
}

export class DeleteShoppingCartFail implements Action {
  readonly type = ShoppingCartActionTypes.DeleteShoppingCartFail;

  constructor(public payload: string) { }
}

// Union the valid types
export type ShoppingCartActions = 
  | SetCurrentShoppingCart
  | ClearCurrentShoppingCart
  | InitializeCurrentShoppingCart
  | Load
  | LoadSuccess
  | LoadFail  
  | DeleteShoppingCart
  | DeleteShoppingCartSuccess
  | DeleteShoppingCartFail;


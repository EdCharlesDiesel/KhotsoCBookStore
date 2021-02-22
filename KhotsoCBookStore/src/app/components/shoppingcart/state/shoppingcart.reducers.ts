
import { ShoppingCart } from '../shoppingcart';
import { ShoppingCartActionTypes, ShoppingCartActions } from './shoppingcart.actions';

// State for this feature (ShoppingCart)
export interface ShoppingCartState {
  currentShoppingCartId: number | null;
  shoppingCarts: ShoppingCart[];
  error: string;
}

const initialState: ShoppingCartState = {
  currentShoppingCartId: null,
  shoppingCarts: [],
  error: ''
};

export function reducer(state = initialState, action: ShoppingCartActions): ShoppingCartState {

  switch (action.type) {

  
    case ShoppingCartActionTypes.ClearCurrentShoppingCart:
      return {
        ...state,
        currentShoppingCartId: null
      };

    case ShoppingCartActionTypes.InitializeCurrentShoppingCart:
      return {
        ...state,
        currentShoppingCartId: 0
      };

    case ShoppingCartActionTypes.LoadSuccess:
      return {
        ...state,
        shoppingCarts: action.payload,
        error: ''
      };

    case ShoppingCartActionTypes.LoadFail:
      return {
        ...state,
        shoppingCarts: [],
        error: action.payload
      };  
    

    case ShoppingCartActionTypes.DeleteShoppingCartFail:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
}

import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';
import * as fromRoot from '../../../state/app.state';
import * as fromShoppingCarts from './shoppingcart.reducers';

// Extends the app state to include the shoppingCart feature.
// This is required because shoppingCarts are lazy loaded.
// So the reference to ShoppingCartState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
    shoppingCarts: fromShoppingCarts.ShoppingCartState;
}

// Selector functions
const getShoppingCartFeatureState = createFeatureSelector<fromShoppingCarts.ShoppingCartState>('shoppingCarts');


export const getCurrentShoppingCartId = createSelector(
    getShoppingCartFeatureState,
    state => state.currentShoppingCartId
);


export const getShoppingCarts = createSelector(
    getShoppingCartFeatureState,
    state => state.shoppingCarts
);

export const getError = createSelector(
    getShoppingCartFeatureState,
    state => state.error
);

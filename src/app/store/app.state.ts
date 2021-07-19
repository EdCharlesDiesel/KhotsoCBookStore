import { UserState } from './reducers/user.reducer';
import { BookState } from './reducers/book.reducer';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from 'src/environments/environment';

// Representation of the entire app state
// Extended by lazy loaded modules
export interface AppState {
  user?: UserState;
  book?: BookState;
  router: RouterReducerState<any>;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
};

export const metaReducers: MetaReducer<AppState>[] =
  !environment.production ? [storeFreeze] : [];

  // import { UserActionTypes } from '../actions/user.actions';
  // import { state } from '@angular/animations';
  // import { User } from './../../models/user';
  // import * as fromRouter from '@ngrx/router-store';
  // import {
  //   ActionReducer,
  //   ActionReducerMap,
  //   createFeatureSelector,
  //   createSelector,
  //   MetaReducer
  // } from '@ngrx/store';
  // import { environment } from '../../../environments/environment';
  // import { routerReducer, RouterReducerState } from '@ngrx/router-store';
  // import { storeFreeze } from 'ngrx-store-freeze';


  // // eslint-disable-next-line @typescript-eslint/no-empty-interface
  // export interface AppState {
  // //  router: RouterReducerState<any>;

  // router: fromRouter.RouterReducerState<any>;

  //  }

  // export const reducers: ActionReducerMap<AppState> = {
  // router: routerReducer
  // };

  // export function logger(reducer: ActionReducer<any>)
  //   : ActionReducer<any> {
  //   return (state, action) => {
  //     console.log("state before: ", state);
  //     console.log("action", action);

  //     return reducer(state, action);
  //   };
  // }

  // export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [
  //   storeFreeze
  // ] : [];

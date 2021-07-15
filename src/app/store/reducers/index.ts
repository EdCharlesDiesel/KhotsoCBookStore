import { UserActionTypes } from '../actions/user.actions';
import { state } from '@angular/animations';
import { User } from './../../models/user';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';


// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppState {
  router: RouterReducerState<any>;
 }

export const reducers: ActionReducerMap<AppState> = {
router: routerReducer
};


export function logger(reducer: ActionReducer<any>)
  : ActionReducer<any> {
  return (state, action) => {
    console.log("state before: ", state);
    console.log("action", action);

    return reducer(state, action);
  };

}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [
  storeFreeze
] : [];

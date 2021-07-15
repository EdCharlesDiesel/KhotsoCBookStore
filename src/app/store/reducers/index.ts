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
import { routerReducer } from '@ngrx/router-store';


// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserState { }

export const reducers: ActionReducerMap<UserState> = {
  // router: routerReducer
};


export function logger(reducer: ActionReducer<any>)
  : ActionReducer<any> {
  return (state, action) => {
    console.log("state before: ", state);
    console.log("action", action);

    return reducer(state, action);
  };

}

export const metaReducers: MetaReducer<UserState>[] = !environment.production ? [] : [];

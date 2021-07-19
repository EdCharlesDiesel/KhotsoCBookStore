import {
  ActionReducerMap,
  createFeatureSelector,
  MetaReducer
} from '@ngrx/store';
import {
  routerReducer, RouterReducerState
} from '@ngrx/router-store';

import { RouterStateUrl } from './CustomSerializer';
import { environment } from '../../../environments/environment';

export interface AppState {
  router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>(
  'router'
);

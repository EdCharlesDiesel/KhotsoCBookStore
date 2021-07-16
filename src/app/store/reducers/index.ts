import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';


// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppState {
    router: RouterReducerState<any>;
  // router: fromRouter.RouterReducerState<any>;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
};

export const metaReducers: MetaReducer<AppState>[] =
!environment.production ? [storeFreeze] : [];

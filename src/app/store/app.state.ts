import { UserState } from './reducers/user/user.reducer';
import { BookState } from './reducers/book/books.reducer';
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


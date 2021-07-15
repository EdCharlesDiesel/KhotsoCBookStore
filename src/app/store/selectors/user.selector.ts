import { UserState } from './../reducers/user/user.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

// export const selectUserState = state => state.userState;
export const selectUserState = createFeatureSelector <UserState>('user');

export const isLoggedIn = createSelector(
  // This is the projection fuction which takes all the result of the about code and privides the final vale
  selectUserState,
  userState => userState.loggedIn
);

export const isLoggedOut = createSelector(
  isLoggedIn,
  loggedIn => !loggedIn
);



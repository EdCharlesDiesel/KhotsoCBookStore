import { Categories } from './../../../models/categories';
import { Action } from '@ngrx/store';
import {Book} from '../../../models/book';
export enum BookFilterActionTypes {
  InitializeCurrentBookFilter = '[BookFilter] Initialize Current BookFilter',
  Load = '[BookFilter] Load',
  LoadSuccess = '[BookFilter] Load Success',
  LoadFail = '[BookFilter] Load Fail',
}

export class InitializeCurrentBookFilter implements Action {
  readonly type = BookFilterActionTypes.InitializeCurrentBookFilter;
}

export class Load implements Action {
  readonly type = BookFilterActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = BookFilterActionTypes.LoadSuccess;

  constructor(public payload: Categories[]) { }
}

export class LoadFail implements Action {
  readonly type = BookFilterActionTypes.LoadFail;

  constructor(public payload: string) { }
}

// Union the valid types
export type BookFilterActions =
  | InitializeCurrentBookFilter
  | Load
  | LoadSuccess
  | LoadFail;




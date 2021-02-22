import { Action } from '@ngrx/store';
import {Book} from '../../../models/book';
export enum BookActionTypes {
  InitializeCurrentBook = '[Book] Initialize Current Book',
  Load = '[Book] Load',
  LoadSuccess = '[Book] Load Success',
  LoadFail = '[Book] Load Fail',
}

export class InitializeCurrentBook implements Action {
  readonly type = BookActionTypes.InitializeCurrentBook;
}

export class Load implements Action {
  readonly type = BookActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = BookActionTypes.LoadSuccess;

  constructor(public payload: Book[]) { }
}

export class LoadFail implements Action {
  readonly type = BookActionTypes.LoadFail;

  constructor(public payload: string) { }
}

// Union the valid types
export type BookActions =
  | InitializeCurrentBook
  | Load
  | LoadSuccess
  | LoadFail;




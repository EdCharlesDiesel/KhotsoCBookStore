import { Book } from 'src/app/models/book';
import { Action } from "@ngrx/store";

//load books

export const LOAD_BOOKS = '[Books] Load Books';
export const LOAD_BOOKS_FAIL = '[Books] Load Books Fail';
export const LOAD_BOOKS_SUCCESS = '[Books] Load Books Success';



export class LoadBooksSuccess implements Action {
  readonly type = LOAD_BOOKS_SUCCESS;
  constructor(public payload: Book[]) { }
}

export class LoadBooksFail implements Action {
  readonly type = LOAD_BOOKS_FAIL;
  constructor(public payload: unknown) { }
}

export class LoadBooks implements Action {
  readonly type = LOAD_BOOKS;
}

//action Types
export type BooksAction = LoadBooks |
  LoadBooksSuccess |
  LoadBooksFail;

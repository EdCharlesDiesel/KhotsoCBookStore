import { Action } from '@ngrx/store';
import { Book } from 'src/app/models/book';

export enum BookActionTypes {
    ClearCurrentBook = '[Book] Clear Current Book',
    InitializeCurrentBook = '[Book] Initialize Current Book',
    Load = '[Book] Load',
    LoadSuccess = '[Book] Load Success',
    LoadFail = '[Book] Load Fail',
    UpdateBook = '[Book] Update Book',
    UpdateBookSuccess = '[Book] Update Book Success',
    UpdateBookFail = '[Book] Update Book Fail',
    CreateBook = '[Book] Create Book',
    CreateBookSuccess = '[Book] Create Book Success',
    CreateBookFail = '[Book] Create Book Fail',
    DeleteBook = '[Book] Delete Book',
    DeleteBookSuccess = '[Book] Delete Book Success',
    DeleteBookFail = '[Book] Delete Book Fail',
    SimilarBook = '[Book] Similar books',
    SimilarBookSuccess = '[Book] Similar books Success',
    SimilarBookFail = '[Book] Similar books Fail',
}



export class ClearCurrentBook implements Action {
    readonly type = BookActionTypes.ClearCurrentBook;
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

export class UpdateBook implements Action {
    readonly type = BookActionTypes.UpdateBook;

    constructor(public payload: Book) { }
}

export class UpdateBookSuccess implements Action {
    readonly type = BookActionTypes.UpdateBookSuccess;

    constructor(public payload: Book) { }
}

export class UpdateBookFail implements Action {
    readonly type = BookActionTypes.UpdateBookFail;
    constructor(public payload: string) { }
}

export class CreateBook implements Action {
    readonly type = BookActionTypes.CreateBook;

    constructor(public payload: Book) { }
}

export class CreateBookSuccess implements Action {
    readonly type = BookActionTypes.CreateBookSuccess;

    constructor(public payload: Book) { }
}

export class CreateBookFail implements Action {
    readonly type = BookActionTypes.CreateBookFail;

    constructor(public payload: string) { }
}

export class DeleteBook implements Action {
    readonly type = BookActionTypes.DeleteBook;

    constructor(public payload: number) { }
}

export class DeleteBookSuccess implements Action {
    readonly type = BookActionTypes.DeleteBookSuccess;

    constructor(public payload: number) { }
}

export class DeleteBookFail implements Action {
    readonly type = BookActionTypes.DeleteBookFail;

    constructor(public payload: string) { }
}
export class SimilarBook implements Action {
    readonly type = BookActionTypes.SimilarBook;

    constructor(public payload: number) { }
}

export class SimilarBookSuccess implements Action {
    readonly type = BookActionTypes.SimilarBookSuccess;

    constructor(public payload: number) { }
}

export class SimilarBookFail implements Action {
    readonly type = BookActionTypes.SimilarBookFail;

    constructor(public payload: string) { }
}

// Union the valid types
export type BookActions =
    | ClearCurrentBook
    | InitializeCurrentBook
    | Load
    | LoadSuccess
    | LoadFail
    | UpdateBook
    | UpdateBookSuccess
    | UpdateBookFail
    | CreateBook
    | CreateBookSuccess
    | CreateBookFail
    | DeleteBook
    | DeleteBookSuccess
    | DeleteBookFail
    | SimilarBook
    | SimilarBookSuccess
    | SimilarBookFail;


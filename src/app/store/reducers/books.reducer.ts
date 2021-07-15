// import { state } from '@angular/animations';
// import { Book } from "src/app/models/book";
// import * as fromBooks from '../actions/books.action'

// export interface BookState {
//   data: Book[];
//   loaded: boolean;
//   loading: boolean;
// }

// export const initialState: BookState = {
//   data: [
//     {
//       "bookId": 1,
//       "name": "Deep Learning with JavaScript",
//       "text": "Deep learning has transformed the fields of computer vision, image processing, and natural language applications.",
//       "author": "Charles",
//       "category": "Development",
//       "purchasePrice": 300,
//       "coverFileName": "Default_image"
//     },
//     {
//       "bookId": 2,
//       "name": "Webdevelopment-101",
//       "text": "Learn how to make better decisions and write cleaner Ruby code. This book shows you how to avoid messy code that is hard to test and which cripples productivity.",
//       "author": "Kagiso",
//       "category": "Development",
//       "purchasePrice": 300,
//       "coverFileName": "Default_image"
//     }
//   ],
//   loaded: false,
//   loading: false
// }

// export function reducer(
//   state = initialState,
//   action: fromBooks.BooksAction): BookState {
//   switch (action.type) {

//     case fromBooks.LOAD_BOOKS: {
//       return {
//         ...state,
//         loaded: true
//       };
//     }

//     case fromBooks.LOAD_BOOKS_SUCCESS: {
//       return {
//         ...state,
//         loading: false,
//         loaded: true
//       };
//     }
//     case fromBooks.LOAD_BOOKS_FAIL: {
//       return {
//         ...state,
//         loading: false,
//         loaded: false
//       };
//     }

//   }
//   return this.state;

// }


// export const getBooksLoading = (state: BookState): unknown => state.loading;
// export const getBooksLoaded = (state: BookState): unknown  => state.loaded;
// export const getBooks = (state: BookState): unknown  => state.data;

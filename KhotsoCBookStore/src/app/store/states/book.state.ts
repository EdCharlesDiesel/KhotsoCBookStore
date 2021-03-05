
import { Book } from 'src/app/models/book';


export interface IBookState {
    currentBookId: number | null;
    books: Book[];
    error: string;
}



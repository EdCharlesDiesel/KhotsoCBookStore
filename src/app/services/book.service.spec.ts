import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookService } from './book.service';
import { Book } from '../models/book';

// describe('BookService', () => {
//   beforeEach(() => TestBed.configureTestingModule({}));

//   it('should be created', () => {
//     const service: BookService = TestBed.inject(BookService);
//     expect(service).toBeTruthy();
//   });
// });

describe('BookService', () => {
  const books: Book[] = [];
  let bookService: BookService,
    httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        BookService
      ]
    });

    bookService = TestBed.get(BookService),
      httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should retrieve all books', () => {

    bookService.getAllBooks().subscribe(
      books => {
        expect(books).toBeTruthy('No books returned');

        expect(books.length).toBe(6, 'Incorrect number of books');

        // expect(books..description).toBe('Angular Testing Book');
      }
    );

    const req = httpTestingController.expectOne('/api/books');

    expect(req.request.method).toEqual('GET');

    req.flush({ payload: Object.values(books) });

  });


  afterEach(() => {
    httpTestingController.verify();
  });
});


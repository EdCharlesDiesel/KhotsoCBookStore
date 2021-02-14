import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { Book } from '../book';
import { BookService } from '../book.service';
import { GenericValidator } from '../../shared/generic-validator';
import { NumberValidators } from '../../shared/number.validator';

@Component({
  selector: 'kc-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit, OnDestroy {
  pageTitle = 'Book Edit';
  errorMessage = '';
  bookForm: FormGroup | undefined;

  book: Book | null | undefined;
  sub: Subscription | undefined;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder,
              private bookService: BookService) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      bookName: {
        required: 'Book name is required.',
        minlength: 'Book name must be at least three characters.',
        maxlength: 'Book name cannot exceed 50 characters.'
      },
      bookCode: {
        required: 'Book code is required.'
      },
      starRating: {
        range: 'Rate the book between 1 (lowest) and 5 (highest).'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    // Define the form group
    this.bookForm = this.fb.group({
      bookName: ['', [Validators.required,
                         Validators.minLength(3),
                         Validators.maxLength(50)]],
      bookCode: ['', Validators.required],
      starRating: ['', NumberValidators.range(1, 5)],
      description: ''
    });

    // Watch for changes to the currently selected book
    this.sub = this.bookService.selectedBookChanges$.subscribe(
      selectedBook => this.displayBook(selectedBook)
    );

    // Watch for value changes
    this.bookForm.valueChanges.subscribe(
      value => this.displayMessage = this.genericValidator.processMessages(this.bookForm)
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(this.bookForm);
  }

  displayBook(book: Book | null): void {
    // Set the local book property
    this.book = book;

    if (this.book) {
      // Reset the form back to pristine
      this.bookForm.reset();

      // Display the appropriate page title
      if (this.book.id === 0) {
        this.pageTitle = 'Add Book';
      } else {
        this.pageTitle = `Edit Book: ${this.book.bookName}`;
      }

      // Update the data on the form
      this.bookForm.patchValue({
        bookName: this.book.bookName,
        bookCode: this.book.bookCode,
        starRating: this.book.starRating,
        description: this.book.description
      });
    }
  }

  cancelEdit(): void {
    // Redisplay the currently selected book
    // replacing any edits made
    this.displayBook(this.book);
  }

  deleteBook(): void {
    if (this.book && this.book.id) {
      if (confirm(`Really delete the book: ${this.book.bookName}?`)) {
        this.bookService.deleteBook(this.book.id).subscribe(
          () => this.bookService.changeSelectedBook(null),
          (err: any) => this.errorMessage = err.error
        );
      }
    } else {
      // No need to delete, it was never saved
      this.bookService.changeSelectedBook(null);
    }
  }

  saveBook(): void {
    if (this.bookForm.valid) {
      if (this.bookForm.dirty) {
        // Copy over all of the original book properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const p = { ...this.book, ...this.bookForm.value };

        if (p.id === 0) {
          this.bookService.createBook(p).subscribe(
            book => this.bookService.changeSelectedBook(book),
            (err: any) => this.errorMessage = err.error
          );
        } else {
          this.bookService.updateBook(p).subscribe(
            book => this.bookService.changeSelectedBook(book),
            (err: any) => this.errorMessage = err.error
          );
        }
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

}

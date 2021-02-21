import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSubComponent } from './book-sub.component';

describe('BookSubComponent', () => {
  let component: BookSubComponent;
  let fixture: ComponentFixture<BookSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookSubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

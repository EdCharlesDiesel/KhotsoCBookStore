import { TestBed } from '@angular/core/testing';

import { BookSubscriptionService } from './book-subscription.service';

describe('BookSubscriptionService', () => {
  let service: BookSubscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookSubscriptionService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});

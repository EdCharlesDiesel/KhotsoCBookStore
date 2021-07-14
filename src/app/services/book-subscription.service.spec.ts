import { TestBed } from '@angular/core/testing';

import { BookSubscriptionService } from './book-subscription.service';

describe('BookSubscriptionService', () => {
  let service: BookSubscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookSubscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

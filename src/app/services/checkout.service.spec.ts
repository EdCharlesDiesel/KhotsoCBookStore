import { TestBed } from '@angular/core/testing';

import { CheckoutService } from './checkout.service';

describe('CheckoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: CheckoutService = TestBed.inject(CheckoutService);
    expect(service).toBeTruthy();
  });
});

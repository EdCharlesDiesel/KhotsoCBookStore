import { TestBed } from '@angular/core/testing';

import { MyordersService } from './myorders.service';

describe('MyordersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: MyordersService = TestBed.inject(MyordersService);
    expect(service).toBeTruthy();
  });
});

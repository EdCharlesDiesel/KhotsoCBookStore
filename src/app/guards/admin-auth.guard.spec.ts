import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { AdminAuthGuard } from './admin-auth.guard';

describe('AdminAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminAuthGuard]
    });
  });

  xit('should ...', inject([AdminAuthGuard], (guard: AdminAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});

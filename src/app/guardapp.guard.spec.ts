import { TestBed } from '@angular/core/testing';

import { GuardappGuard } from './guardapp.guard';

describe('GuardappGuard', () => {
  let guard: GuardappGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardappGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

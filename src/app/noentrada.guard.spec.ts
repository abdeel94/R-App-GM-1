import { TestBed } from '@angular/core/testing';

import { NoentradaGuard } from './noentrada.guard';

describe('NoentradaGuard', () => {
  let guard: NoentradaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoentradaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

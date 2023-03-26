import { TestBed } from '@angular/core/testing';

import { ComponentGuard } from './component.guard';

describe('ComponentGuard', () => {
  let guard: ComponentGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ComponentGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { PreventDashToSignupGuard } from './prevent-dash-to-signup.guard';

describe('PreventDashToSignupGuard', () => {
  let guard: PreventDashToSignupGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PreventDashToSignupGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

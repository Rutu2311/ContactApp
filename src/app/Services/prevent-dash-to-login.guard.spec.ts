import { TestBed } from '@angular/core/testing';

import { PreventDashToLoginGuard } from './prevent-dash-to-login.guard';

describe('PreventDashToLoginGuard', () => {
  let guard: PreventDashToLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PreventDashToLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

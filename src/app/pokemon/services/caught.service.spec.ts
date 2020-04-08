import { TestBed } from '@angular/core/testing';

import { CaughtService } from './caught.service';

describe('CaughtService', () => {
  let service: CaughtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaughtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

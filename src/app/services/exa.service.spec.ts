import { TestBed } from '@angular/core/testing';

import { ExaService } from './exa.service';

describe('ExaService', () => {
  let service: ExaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

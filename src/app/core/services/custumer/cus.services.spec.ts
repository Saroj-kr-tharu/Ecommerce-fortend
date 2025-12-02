import { TestBed } from '@angular/core/testing';

import { CusServices } from './cus.services';

describe('CusServices', () => {
  let service: CusServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CusServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

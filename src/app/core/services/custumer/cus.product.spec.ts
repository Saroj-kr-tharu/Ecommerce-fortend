import { TestBed } from '@angular/core/testing';

import { CusProduct } from './cus.product';

describe('CusProduct', () => {
  let service: CusProduct;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CusProduct);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

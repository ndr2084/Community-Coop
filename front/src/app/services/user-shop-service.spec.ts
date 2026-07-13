import { TestBed } from '@angular/core/testing';

import { UserShopService } from './user-shop-service';

describe('UserShopService', () => {
  let service: UserShopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserShopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

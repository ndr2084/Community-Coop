import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserShopItemCreation } from './user-shop-item-creation';

describe('UserShopItemCreation', () => {
  let component: UserShopItemCreation;
  let fixture: ComponentFixture<UserShopItemCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserShopItemCreation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserShopItemCreation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

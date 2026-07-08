import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserShop } from './user-shop';

describe('ShoppingLocation', () => {
  let component: UserShop;
  let fixture: ComponentFixture<UserShop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserShop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserShop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

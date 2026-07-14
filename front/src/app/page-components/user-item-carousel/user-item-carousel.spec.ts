import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserItemCarousel } from './user-item-carousel';

describe('UserItemCarousel', () => {
  let component: UserItemCarousel;
  let fixture: ComponentFixture<UserItemCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserItemCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserItemCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

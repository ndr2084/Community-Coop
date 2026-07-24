import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInteraction } from './user-interaction';

describe('UserInteraction', () => {
  let component: UserInteraction;
  let fixture: ComponentFixture<UserInteraction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInteraction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInteraction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

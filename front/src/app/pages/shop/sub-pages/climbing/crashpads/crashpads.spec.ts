import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Crashpads } from './crashpads';

describe('Crashpads', () => {
  let component: Crashpads;
  let fixture: ComponentFixture<Crashpads>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Crashpads]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Crashpads);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

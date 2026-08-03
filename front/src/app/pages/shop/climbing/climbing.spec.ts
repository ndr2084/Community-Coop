import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Climbing } from './climbing';

describe('Climbing', () => {
  let component: Climbing;
  let fixture: ComponentFixture<Climbing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Climbing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Climbing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Camping } from './camping';

describe('Camping', () => {
  let component: Camping;
  let fixture: ComponentFixture<Camping>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Camping]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Camping);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

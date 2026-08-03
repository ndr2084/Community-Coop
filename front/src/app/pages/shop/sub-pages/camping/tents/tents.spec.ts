import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tents } from './tents';

describe('Tents', () => {
  let component: Tents;
  let fixture: ComponentFixture<Tents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

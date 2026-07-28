import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EssentialPicks } from './essential-picks';

describe('EssentialPicks', () => {
  let component: EssentialPicks;
  let fixture: ComponentFixture<EssentialPicks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EssentialPicks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EssentialPicks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

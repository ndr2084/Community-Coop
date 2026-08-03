import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Watersports } from './watersports';

describe('Watersports', () => {
  let component: Watersports;
  let fixture: ComponentFixture<Watersports>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Watersports]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Watersports);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
